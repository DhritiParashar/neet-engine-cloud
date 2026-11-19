import os
import re
import json
import sqlite3
from app.db_engine import SessionLocal, QuestionItem

RELEVANT_KEYWORDS = (
    "probability", "permutation", "combination", "matrix", "matrices", "determinant",
    "logarithm", "sequence", "series", "arithmetic progression", "geometric progression",
    "quadratic", "inequality", "derivative", "integral", "function", "set", "relation",
    "statistics", "mean", "median", "variance", "standard deviation", "binomial",
    "ratio", "percentage", "profit", "interest", "trigonometry", "coordinate", "polynomial"
)

def _classify_section(text: str) -> str:
    low = text.lower()
    if any(k in low for k in ("matrix", "determinant", "derivative", "integral", "logarithm", "permutation", "combination", "probability", "variance", "standard deviation", "binomial", "sequence", "series")):
        return "HIGHER_MATH"
    return "QUANT_CORE"

def import_from_previous_projects(search_root: str = r"C:\Users\dhrit") -> dict:
    db = SessionLocal()
    imported = 0
    scanned_files = 0
    try:
        existing_prompts = {row[0].strip().lower() for row in db.query(QuestionItem.prompt).all()}
        if not os.path.exists(search_root):
            return {"imported": 0, "scanned_files": 0, "note": "Search root not found"}

        for folder_name in os.listdir(search_root):
            if folder_name in ("ipm_tutor", "AppData", ".cache", ".npm", ".vscode"):
                continue
            proj_path = os.path.join(search_root, folder_name)
            if not os.path.isdir(proj_path):
                continue

            for root_dir, dirs, files in os.walk(proj_path):
                dirs[:] = [d for d in dirs if d not in ("node_modules", ".git", "__pycache__", "venv", ".venv")]
                for fname in files:
                    fpath = os.path.join(root_dir, fname)
                    # Case A: SQLite databases from previous Class 10/11/12 projects
                    if fname.endswith((".db", ".sqlite", ".sqlite3")):
                        scanned_files += 1
                        try:
                            conn = sqlite3.connect(fpath)
                            cur = conn.cursor()
                            tables = [r[0] for r in cur.execute("SELECT name FROM sqlite_master WHERE type='table'").fetchall()]
                            for tbl in tables:
                                cols = [c[1].lower() for c in cur.execute(f"PRAGMA table_info({tbl})").fetchall()]
                                if any(k in cols for k in ("question", "prompt", "question_text")):
                                    rows = cur.execute(f"SELECT * FROM {tbl} LIMIT 500").fetchall()
                                    for idx, r in enumerate(rows):
                                        row_dict = dict(zip(cols, r))
                                        q_txt = str(row_dict.get("question") or row_dict.get("prompt") or row_dict.get("question_text") or "").strip()
                                        if len(q_txt) < 20 or q_txt.lower() in existing_prompts:
                                            continue
                                        if not any(kw in q_txt.lower() for kw in RELEVANT_KEYWORDS):
                                            continue
                                        opts = [str(row_dict.get(k)) for k in ("option_a", "option_b", "option_c", "option_d", "opt_a", "opt_b", "opt_c", "opt_d") if row_dict.get(k) is not None]
                                        if len(opts) < 2:
                                            continue
                                        ans_raw = str(row_dict.get("answer") or row_dict.get("correct_option") or "0").strip()
                                        ans_idx = {"A": "0", "B": "1", "C": "2", "D": "3"}.get(ans_raw.upper(), ans_raw if ans_raw.isdigit() else "0")
                                        exp = str(row_dict.get("explanation") or row_dict.get("solution") or "Imported from Class 10/11/12 NCERT Databank.")
                                        db.add(QuestionItem(
                                            q_code=f"NCERT_DB_{imported}_{idx}",
                                            source_tag="CLASS_10_11_12_IMPORT",
                                            section=_classify_section(q_txt),
                                            topic="Class 10/11/12 NCERT Bridge",
                                            exam_tags="ALL,INDORE,IIMB,IIMM",
                                            q_type="MCQ",
                                            difficulty="Moderate",
                                            prompt=f"[Class 10/11/12 Bank] {q_txt}",
                                            options_json=json.dumps(opts[:4]),
                                            answer=ans_idx,
                                            explanation=exp
                                        ))
                                        existing_prompts.add(q_txt.lower())
                                        imported += 1
                            conn.close()
                        except Exception:
                            pass

                    # Case B: JSON / JS question banks from previous Class 10/11/12 projects
                    elif fname.endswith((".json", ".js")) and os.path.getsize(fpath) < 3_000_000:
                        scanned_files += 1
                        try:
                            raw = open(fpath, "r", encoding="utf-8", errors="ignore").read()
                            # Extract JSON array if embedded in JS
                            m = re.search(r'(\[\s*\{.*?\}\s*\])', raw, flags=re.S)
                            if not m:
                                continue
                            arr = json.loads(m.group(1))
                            if not isinstance(arr, list):
                                continue
                            for idx, obj in enumerate(arr[:400]):
                                if not isinstance(obj, dict):
                                    continue
                                q_txt = str(obj.get("question") or obj.get("prompt") or obj.get("text") or "").strip()
                                opts = obj.get("options") or obj.get("choices") or []
                                if len(q_txt) < 20 or not isinstance(opts, list) or len(opts) < 2:
                                    continue
                                if q_txt.lower() in existing_prompts or not any(kw in q_txt.lower() for kw in RELEVANT_KEYWORDS):
                                    continue
                                ans_val = obj.get("answer", 0)
                                ans_str = {"A": "0", "B": "1", "C": "2", "D": "3"}.get(str(ans_val).upper(), str(ans_val) if str(ans_val).isdigit() else "0")
                                exp = str(obj.get("explanation") or obj.get("solution") or "Class 10/11/12 NCERT Conceptual Bridge.")
                                db.add(QuestionItem(
                                    q_code=f"NCERT_JS_{imported}_{idx}",
                                    source_tag="CLASS_10_11_12_IMPORT",
                                    section=_classify_section(q_txt),
                                    topic="Class 10/11/12 NCERT Bridge",
                                    exam_tags="ALL,INDORE,IIMB,IIMM",
                                    q_type="MCQ",
                                    difficulty="Moderate",
                                    prompt=f"[Class 10/11/12 Bank] {q_txt}",
                                    options_json=json.dumps([str(o) for o in opts[:4]]),
                                    answer=ans_str,
                                    explanation=exp
                                ))
                                existing_prompts.add(q_txt.lower())
                                imported += 1
                        except Exception:
                            pass

        if imported > 0:
            db.commit()
        return {"imported": imported, "scanned_files": scanned_files}
    finally:
        db.close()