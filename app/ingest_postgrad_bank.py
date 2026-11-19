import hashlib, json
from sqlalchemy import text

SCHEMA_MIGRATION_SQL = [
    "ALTER TABLE ipm_questions ADD COLUMN IF NOT EXISTS source_type VARCHAR(32) DEFAULT 'OFFICIAL_PYQ'",
    "ALTER TABLE ipm_questions ADD COLUMN IF NOT EXISTS book_title VARCHAR(160) DEFAULT ''",
    "ALTER TABLE ipm_questions ADD COLUMN IF NOT EXISTS chapter_name VARCHAR(160) DEFAULT ''",
    "ALTER TABLE ipm_questions ADD COLUMN IF NOT EXISTS paper_slot VARCHAR(80) DEFAULT ''",
    "ALTER TABLE ipm_questions ADD COLUMN IF NOT EXISTS passage_group_id VARCHAR(64) DEFAULT ''",
    "ALTER TABLE ipm_questions ADD COLUMN IF NOT EXISTS passage_order INTEGER DEFAULT 1",
    "ALTER TABLE ipm_questions ADD COLUMN IF NOT EXISTS solution_rubric_json TEXT DEFAULT '{}'",
    "ALTER TABLE ipm_questions ADD COLUMN IF NOT EXISTS content_hash VARCHAR(64) DEFAULT ''",
    "CREATE INDEX IF NOT EXISTS idx_ipm_q_source_type ON ipm_questions (source_type)",
    "CREATE INDEX IF NOT EXISTS idx_ipm_q_chapter ON ipm_questions (chapter_name)",
    "CREATE INDEX IF NOT EXISTS idx_ipm_q_group ON ipm_questions (passage_group_id)"
]

def ensure_postgrad_schema(engine):
    with engine.begin() as conn:
        for stmt in SCHEMA_MIGRATION_SQL:
            try:
                conn.execute(text(stmt))
            except Exception:
                pass

def compute_stem_hash(prompt: str) -> str:
    norm = " ".join(str(prompt or "").lower().split())
    return hashlib.sha256(norm.encode("utf-8")).hexdigest()[:32]

def ingest_question_records(engine, records: list, exam_tag: str) -> dict:
    """
    Upserts graduate-level Past Paper (OFFICIAL_PYQ) and Reference Book Chapter (TEXTBOOK_CHAPTER)
    items into PostgreSQL with SHA-256 stem deduplication and structured solution rubrics.
    """
    ensure_postgrad_schema(engine)
    inserted, updated, skipped = 0, 0, 0
    upsert_sql = text("""
        INSERT INTO ipm_questions (
            q_code, source_tag, source_type, book_title, chapter_name, paper_slot,
            passage_group_id, passage_order, section, topic, exam_tags, q_type,
            difficulty, prompt, options_json, answer, explanation, solution_rubric_json,
            content_hash, is_pyq, pyq_year, pyq_exam
        ) VALUES (
            :q_code, :source_tag, :source_type, :book_title, :chapter_name, :paper_slot,
            :passage_group_id, :passage_order, :section, :topic, :exam_tags, :q_type,
            :difficulty, :prompt, :options_json, :answer, :explanation, :solution_rubric_json,
            :content_hash, :is_pyq, :pyq_year, :pyq_exam
        )
        ON CONFLICT (q_code) DO UPDATE SET
            source_type = EXCLUDED.source_type,
            book_title = EXCLUDED.book_title,
            chapter_name = EXCLUDED.chapter_name,
            paper_slot = EXCLUDED.paper_slot,
            passage_group_id = EXCLUDED.passage_group_id,
            passage_order = EXCLUDED.passage_order,
            section = EXCLUDED.section,
            topic = EXCLUDED.topic,
            exam_tags = EXCLUDED.exam_tags,
            q_type = EXCLUDED.q_type,
            difficulty = EXCLUDED.difficulty,
            prompt = EXCLUDED.prompt,
            options_json = EXCLUDED.options_json,
            answer = EXCLUDED.answer,
            explanation = EXCLUDED.explanation,
            solution_rubric_json = EXCLUDED.solution_rubric_json,
            content_hash = EXCLUDED.content_hash,
            is_pyq = EXCLUDED.is_pyq,
            pyq_year = EXCLUDED.pyq_year,
            pyq_exam = EXCLUDED.pyq_exam
    """)

    with engine.begin() as conn:
        existing_hashes = {
            r[0]: r[1] for r in conn.execute(
                text("SELECT content_hash, q_code FROM ipm_questions WHERE content_hash <> ''")
            ).fetchall()
        }
        for idx, rec in enumerate(records, start=1):
            prompt = str(rec.get("prompt") or "").strip()
            if not prompt:
                skipped += 1
                continue
            h = compute_stem_hash(prompt)
            q_code = str(rec.get("q_code") or f"{exam_tag}-ING-{h[:10].upper()}").strip()
            if h in existing_hashes and existing_hashes[h] != q_code:
                skipped += 1
                continue

            src_type = str(rec.get("source_type") or ("OFFICIAL_PYQ" if rec.get("is_pyq") else "TEXTBOOK_CHAPTER")).upper()
            is_pyq = (src_type == "OFFICIAL_PYQ")
            rubric = rec.get("solution_rubric") or {
                "principle": rec.get("topic", ""),
                "derivation": rec.get("explanation", ""),
                "shortcut": rec.get("shortcut", ""),
                "trap_warning": rec.get("trap_warning", "")
            }
            params = {
                "q_code": q_code,
                "source_tag": str(rec.get("source_tag") or f"{exam_tag}_{src_type}"),
                "source_type": src_type,
                "book_title": str(rec.get("book_title") or ""),
                "chapter_name": str(rec.get("chapter_name") or rec.get("topic") or ""),
                "paper_slot": str(rec.get("paper_slot") or rec.get("pyq_year") or ""),
                "passage_group_id": str(rec.get("passage_group_id") or ""),
                "passage_order": int(rec.get("passage_order") or 1),
                "section": str(rec.get("section") or "QUANT_CORE").upper(),
                "topic": str(rec.get("topic") or "General"),
                "exam_tags": str(rec.get("exam_tags") or exam_tag),
                "q_type": str(rec.get("q_type") or ("MCQ" if rec.get("options") else "SA_NUMERIC")),
                "difficulty": str(rec.get("difficulty") or "Postgraduate 99%ile"),
                "prompt": prompt,
                "options_json": json.dumps(rec.get("options") or []),
                "answer": str(rec.get("answer") if rec.get("answer") is not None else ""),
                "explanation": str(rec.get("explanation") or ""),
                "solution_rubric_json": json.dumps(rubric),
                "content_hash": h,
                "is_pyq": is_pyq,
                "pyq_year": str(rec.get("pyq_year") or "2026"),
                "pyq_exam": str(rec.get("pyq_exam") or exam_tag)
            }
            conn.execute(upsert_sql, params)
            existing_hashes[h] = q_code
            inserted += 1

    return {"inserted_or_updated": inserted, "duplicates_skipped": skipped}