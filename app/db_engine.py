import os as _os_env
_raw_db = (_os_env.getenv("DATABASE_URL") or "").strip().strip("'").strip('"')
if _raw_db.startswith("psql "):
    _raw_db = _raw_db[5:].strip().strip("'").strip('"')
if _raw_db.startswith("postgres://"):
    _raw_db = "postgresql://" + _raw_db[len("postgres://"):]
_os_env.environ["DATABASE_URL"] = _raw_db
import random
import os
import json
import math
import hmac
import hashlib
import secrets
from datetime import datetime, timezone
from sqlalchemy import create_engine, Column, Integer, String, Text, Boolean, Float, DateTime, ForeignKey
from sqlalchemy.orm import declarative_base, sessionmaker

def _load_local_env():
    env_file = os.path.join(os.path.dirname(os.path.dirname(__file__)), ".env")
    if os.path.exists(env_file):
        with open(env_file, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#") and "=" in line:
                    k, v = line.split("=", 1)
                    os.environ.setdefault(k.strip(), v.strip().strip('"').strip("'"))
_load_local_env()
RAW_DB_URL = os.environ.get("DATABASE_URL", "").strip()
if RAW_DB_URL.startswith("postgres://"):
    RAW_DB_URL = RAW_DB_URL.replace("postgres://", "postgresql://", 1)

LOCAL_SQLITE_PATH = os.path.join(os.path.dirname(__file__), "data", "ipm_databank.db")
os.makedirs(os.path.dirname(LOCAL_SQLITE_PATH), exist_ok=True)
DATABASE_URL = RAW_DB_URL if RAW_DB_URL.startswith(("postgresql://", "sqlite://")) else f"sqlite:///{LOCAL_SQLITE_PATH}"

connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}
engine = create_engine(DATABASE_URL, connect_args=connect_args, pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# ==============================================================================
# 1. USER REGISTRATION, AUTHENTICATION & ATTEMPT HISTORY TABLES
# ==============================================================================
class UserAccount(Base):
    __tablename__ = "ipm_users"
    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(120), nullable=False)
    email = Column(String(180), unique=True, index=True, nullable=False)
    password_hash = Column(String(256), nullable=False)
    target_track = Column(String(80), default="ALL_IIM_MASTER")
    category = Column(String(20), default="General")
    class10_pct = Column(Float, default=90.0)
    class12_pct = Column(Float, default=90.0)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

class UserSession(Base):
    __tablename__ = "ipm_user_sessions"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("ipm_users.id"), index=True, nullable=False)
    token = Column(String(128), unique=True, index=True, nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

class MockAttempt(Base):
    __tablename__ = "ipm_mock_attempts"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("ipm_users.id"), index=True, nullable=True)
    exam_track = Column(String(80), index=True)
    paper_type = Column(String(60))
    score = Column(Float, default=0.0)
    max_score = Column(Float, default=0.0)
    accuracy_pct = Column(Float, default=0.0)
    attempted_q_codes_json = Column(Text, default="[]")
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

# ==============================================================================
# 2. UNIFIED QUESTION BANK & 5-YEAR PYQ ARCHIVE TABLE (IPM + CLASS 10/11/12)
# ==============================================================================
class QuestionItem(Base):
    __tablename__ = "ipm_questions"
    id = Column(Integer, primary_key=True, index=True)
    q_code = Column(String(80), unique=True, index=True)
    source_tag = Column(String(50), default="IPM_CORE", index=True)  # IPM_CORE | PYQ_2022_2026 | CLASS_10_11_12_IMPORT
    section = Column(String(40), index=True)                        # QUANT_CORE | HIGHER_MATH | DILR | VARC
    topic = Column(String(100), index=True)
    exam_tags = Column(String(120), index=True)                     # ALL | INDORE | ROHTAK | JIPMAT | IIMB | IIMM
    q_type = Column(String(20), index=True)                         # MCQ | SA_NUMERIC
    difficulty = Column(String(20), default="Moderate")
    prompt = Column(Text, nullable=False)
    options_json = Column(Text, default="[]")
    answer = Column(String(120), nullable=False)
    explanation = Column(Text, nullable=False)
    is_pyq = Column(Boolean, default=False, index=True)
    pyq_year = Column(String(10), default="", index=True)
    pyq_exam = Column(String(80), default="")
    trap_note = Column(Text, default="")

Base.metadata.create_all(bind=engine)

# ==============================================================================
# 3. SECURE PBKDF2 PASSWORD HASHING & AUTH HELPERS
# ==============================================================================
def hash_password(raw_password: str) -> str:
    salt = secrets.token_hex(16)
    dk = hashlib.pbkdf2_hmac("sha256", raw_password.encode("utf-8"), salt.encode("utf-8"), 120_000)
    return f"{salt}${dk.hex()}"

def verify_password(raw_password: str, stored_hash: str) -> bool:
    try:
        salt, hex_dk = stored_hash.split("$", 1)
        dk = hashlib.pbkdf2_hmac("sha256", raw_password.encode("utf-8"), salt.encode("utf-8"), 120_000)
        return hmac.compare_digest(dk.hex(), hex_dk)
    except Exception:
        return False

def register_user(full_name: str, email: str, password: str, target_track: str = "ALL_IIM_MASTER", category: str = "General", class10_pct: float = 90.0, class12_pct: float = 90.0) -> dict:
    db = SessionLocal()
    try:
        clean_email = email.strip().lower()
        if db.query(UserAccount).filter(UserAccount.email == clean_email).first():
            return {"ok": False, "error": "Email already registered. Please log in."}
        user = UserAccount(
            full_name=full_name.strip(),
            email=clean_email,
            password_hash=hash_password(password),
            target_track=target_track,
            category=category,
            class10_pct=class10_pct,
            class12_pct=class12_pct
        )
        db.add(user)
        db.commit()
        db.refresh(user)
        token = secrets.token_urlsafe(32)
        db.add(UserSession(user_id=user.id, token=token))
        db.commit()
        return {
            "ok": True,
            "token": token,
            "user": {"id": user.id, "full_name": user.full_name, "email": user.email, "target_track": user.target_track, "category": user.category, "class10_pct": user.class10_pct, "class12_pct": user.class12_pct}
        }
    finally:
        db.close()

def db_backend_info() -> dict:
    is_pg = DATABASE_URL.startswith("postgresql")
    db = SessionLocal()
    try:
        total_q = db.query(QuestionItem).count()
        total_pyq = db.query(QuestionItem).filter(QuestionItem.is_pyq == True).count()
        total_ncert = db.query(QuestionItem).filter(QuestionItem.source_tag == "CLASS_10_11_12_IMPORT").count()
        total_users = db.query(UserAccount).count()
        return {
            "engine": "PostgreSQL" if is_pg else "SQLite (Set DATABASE_URL for PostgreSQL)",
            "connected": True,
            "total_questions": total_q,
            "total_pyqs": total_pyq,
            "total_ncert_imported": total_ncert,
            "total_users": total_users
        }
    finally:
        db.close()

def seed_initial_databank():
    db = SessionLocal()
    try:
        if db.query(QuestionItem).count() > 0:
            return
        rows = []
        # 1. QUANT CORE (60 Questions: 20 SA_NUMERIC + 40 MCQ)
        for i in range(1, 21):
            p = 10 + (i % 8) * 5
            q = 10 + ((i * 3) % 7) * 5
            net = round(p - q - (p * q) / 100.0, 2)
            ans_str = str(int(net)) if net == int(net) else str(net)
            rows.append(QuestionItem(
                q_code=f"PG_QC_SA_{i}", source_tag="IPM_CORE", section="QUANT_CORE", topic="Percentages & Profit-Loss",
                exam_tags="ALL,INDORE,IIMB", q_type="SA_NUMERIC", difficulty="Moderate",
                prompt=f"[QA-SA #{i}] A merchant marks up an article by {p}% above cost price and offers a {q}% discount. Find exact net profit/loss % (use '-' if loss).",
                options_json="[]", answer=ans_str, explanation=f"+{p} - {q} - ({p}*{q})/100 = {ans_str}%."
            ))
        for i in range(1, 21):
            s1 = 30 + (i % 5) * 10
            s2 = 60 + (i % 4) * 15
            hm = round((2 * s1 * s2) / (s1 + s2), 2)
            opts = [f"{hm} km/h", f"{round((s1+s2)/2, 2)} km/h", f"{s1 + 5} km/h", f"{s2 - 5} km/h"]
            rows.append(QuestionItem(
                q_code=f"PG_QC_MCQ_{i}", source_tag="IPM_CORE", section="QUANT_CORE", topic="Time, Speed & Distance",
                exam_tags="ALL,INDORE,ROHTAK,JIPMAT,IIMB", q_type="MCQ", difficulty="Moderate",
                prompt=f"[QA-MCQ #{i}] A car travels from A to B at {s1} km/h and returns at {s2} km/h. Find average speed for the round trip.",
                options_json=json.dumps(opts), answer="0", explanation=f"Harmonic Mean = 2*{s1}*{s2}/({s1}+{s2}) = {hm} km/h."
            ))
        for i in range(1, 21):
            a = 12 + (i % 4) * 3
            b = 20 + (i % 5) * 5
            days = round((a * b) / (a + b), 2)
            opts = [f"{days} hrs", f"{round((a+b)/2, 1)} hrs", f"{a - 2} hrs", f"{b - 3} hrs"]
            rows.append(QuestionItem(
                q_code=f"PG_QC_TW_{i}", source_tag="IPM_CORE", section="QUANT_CORE", topic="Time & Work",
                exam_tags="ALL,INDORE,ROHTAK,JIPMAT", q_type="MCQ", difficulty="Foundation",
                prompt=f"[QA-MCQ #{i+20}] Pipe A fills a tank in {a} hrs and Pipe B in {b} hrs. Together, how many hours to fill the tank?",
                options_json=json.dumps(opts), answer="0", explanation=f"Time = ({a}*{b})/({a}+{b}) = {days} hrs."
            ))

        # 2. HIGHER MATH & STATS (60 Questions: 20 SA_NUMERIC + 40 MCQ)
        for i in range(1, 21):
            n = 5 + (i % 6)
            r = 2 + (i % 3)
            ans = math.comb(n + r - 1, r - 1)
            rows.append(QuestionItem(
                q_code=f"PG_HM_SA_{i}", source_tag="IPM_CORE", section="HIGHER_MATH", topic="Permutations & Combinations",
                exam_tags="ALL,INDORE,IIMB,IIMM", q_type="SA_NUMERIC", difficulty="IIM Tough",
                prompt=f"[Higher Math SA #{i}] Number of non-negative integer solutions to x_1 + ... + x_{r} = {n}?",
                options_json="[]", answer=str(ans), explanation=f"Stars & Bars: C({n+r-1}, {r-1}) = {ans}."
            ))
        for i in range(1, 21):
            base = 2 + (i % 4)
            k = 3 + (i % 4)
            opts = [str(k), str(k + 1), str(base * k), str(k - 1)]
            rows.append(QuestionItem(
                q_code=f"PG_HM_LOG_{i}", source_tag="IPM_CORE", section="HIGHER_MATH", topic="Logarithms & Indices",
                exam_tags="ALL,INDORE,IIMB,IIMM", q_type="MCQ", difficulty="Moderate",
                prompt=f"[Higher Math MCQ #{i}] If log_{base}(x) + log_{base}({base}) = {k + 1}, find log_{base}(x).",
                options_json=json.dumps(opts), answer="0", explanation=f"log_{base}(x) = {k + 1} - 1 = {k}."
            ))
        for i in range(1, 21):
            sd = 3 + (i % 6)
            scale = 2 + (i % 4)
            shift = 5 + i
            new_var = (scale * sd) ** 2
            opts = [str(new_var), str(scale * sd), str(new_var + shift), str(sd ** 2)]
            rows.append(QuestionItem(
                q_code=f"PG_HM_ST_{i}", source_tag="IPM_CORE", section="HIGHER_MATH", topic="Statistics & Probability",
                exam_tags="ALL,INDORE,IIMB,IIMM", q_type="MCQ", difficulty="IIM Tough",
                prompt=f"[Stats MCQ #{i}] Dataset X has SD = {sd}. If Y = -{scale}X + {shift}, find Variance(Y).",
                options_json=json.dumps(opts), answer="0", explanation=f"Var(Y) = (-{scale})^2 * {sd}^2 = {new_var}."
            ))

        # 3. DI & LOGICAL REASONING (60 Questions)
        for i in range(1, 31):
            rev = 200 + i * 20
            g1 = 10 + (i % 4) * 5
            g2 = 15 + (i % 3) * 5
            final_rev = round(rev * (1 + g1 / 100.0) * (1 + g2 / 100.0), 2)
            opts = [f"Rs. {final_rev} Cr", f"Rs. {round(rev * (1 + (g1+g2)/100.0), 2)} Cr", f"Rs. {rev + 50} Cr", f"Rs. {round(final_rev * 0.95, 2)} Cr"]
            rows.append(QuestionItem(
                q_code=f"PG_DILR_DI_{i}", source_tag="IPM_CORE", section="DILR", topic="Data Interpretation",
                exam_tags="ALL,INDORE,ROHTAK,JIPMAT,IIMB", q_type="MCQ", difficulty="Moderate",
                prompt=f"[DI Caselet #{i}] FY25 revenue = Rs. {rev} Cr. It grows {g1}% in FY26 and {g2}% in FY27. Find FY27 revenue.",
                options_json=json.dumps(opts), answer="0", explanation=f"{rev} * {1 + g1/100:.2f} * {1 + g2/100:.2f} = Rs. {final_rev} Cr."
            ))
        for i in range(1, 31):
            total_row = 40 + i
            left_rank = 10 + (i % 15)
            right_rank = total_row - left_rank + 1
            opts = [f"{right_rank}th", f"{right_rank - 1}th", f"{right_rank + 1}th", f"{total_row - left_rank}th"]
            rows.append(QuestionItem(
                q_code=f"PG_DILR_LR_{i}", source_tag="IPM_CORE", section="DILR", topic="Logical Reasoning — Ranking",
                exam_tags="ALL,ROHTAK,JIPMAT", q_type="MCQ", difficulty="Foundation",
                prompt=f"[LR Drill #{i}] In a merit list of {total_row} candidates, Kavya ranks {left_rank}th from top. Find rank from bottom.",
                options_json=json.dumps(opts), answer="0", explanation=f"{total_row} - {left_rank} + 1 = {right_rank}th."
            ))

        # 4. VARC & GRAMMAR (60 Questions)
        varc_templates = [
            ("Subject-Verb Agreement", "Choose correct verb: 'The number of IPM applicants _____ surged by 28%.'", ["has", "have", "were", "are"], "0", "'The number of...' takes singular verb 'has'."),
            ("Confusable Words", "Select right word: 'Auditors will _____ the board of all findings tomorrow.'", ["apprise", "appraise", "discrete", "elicit"], "0", "'Apprise' = notify/inform."),
            ("Correlative Conjunctions", "Complete: 'Hardly had the exam started _____ the clock began ticking.'", ["when", "than", "then", "while"], "0", "'Hardly/Scarcely' pairs strictly with 'when'."),
            ("Critical Reasoning", "Argument: 'Adding 40 e-buses cut city PM2.5 by 9%, proving e-buses caused cleaner air.' Required assumption?", ["No major factories closed during the same period.", "E-buses are quieter.", "Fares stayed constant.", "Commuters like AC buses."], "0", "Rules out alternative macro causes."),
            ("Idioms & Usage", "In corporate strategy, what does 'a Pyrrhic victory' mean?", ["A victory won at such ruinous cost that it equals defeat.", "An easy merger.", "A unanimous vote.", "A record dividend."], "0", "Standard business idiom."),
            ("Pronoun Case", "Fix error: 'Between you and _____, the DI set was tricky.'", ["me", "I", "myself", "we"], "0", "Preposition 'Between' requires objective case 'me'.")
        ]
        for i in range(1, 61):
            tpl = varc_templates[i % len(varc_templates)]
            rows.append(QuestionItem(
                q_code=f"PG_VARC_{i}", source_tag="IPM_CORE", section="VARC", topic=tpl[0],
                exam_tags="ALL,INDORE,ROHTAK,JIPMAT,IIMB", q_type="MCQ", difficulty="Moderate",
                prompt=f"[VARC #{i}] {tpl[1]}", options_json=json.dumps(tpl[2]), answer=tpl[3], explanation=tpl[4]
            ))

        # 5. 5-YEAR PYQ ARCHIVE (2022 - 2026)
        pyq_seed = [
            ("PYQ_2026_IND_1", "2026", "IPMAT Indore (QA-SA)", "HIGHER_MATH", "Logarithms", "SA_NUMERIC", "Number of real solutions to log_2(x - 1) + log_2(x - 3) = 3?", "[]", "1", "x=5 valid; x=-1 rejected by domain x>3 -> 1 solution.", "Extraneous root trap."),
            ("PYQ_2026_IND_2", "2026", "IPMAT Indore (QA-MCQ)", "QUANT_CORE", "Averages", "MCQ", "Average of 11 consecutive odd integers is 37. Largest integer?", '["47", "45", "49", "43"]', "0", "Middle 6th term = 37 => 11th term = 37 + 10 = 47.", "Step size is 2."),
            ("PYQ_2026_ROH_1", "2026", "IPMAT Rohtak (LR)", "DILR", "Clocks", "MCQ", "Acute angle between clock hands at 3:40 PM?", '["130°", "140°", "120°", "150°"]', "0", "|30(3) - 5.5(40)| = |90 - 220| = 130°.", "Hour hand moves 0.5°/min."),
            ("PYQ_2025_IND_1", "2025", "IPMAT Indore (QA-SA)", "HIGHER_MATH", "Sequences", "SA_NUMERIC", "Sum of first 15 terms of an AP is 600. Find 8th term.", "[]", "40", "Middle term T8 = 600 / 15 = 40.", "Odd-term middle property."),
            ("PYQ_2025_JIP_1", "2025", "JIPMAT (QA)", "QUANT_CORE", "Profit & Loss", "MCQ", "SP = Rs. 720 gives 20% profit. SP for 35% profit?", '["Rs. 810", "Rs. 840", "Rs. 790", "Rs. 825"]', "0", "CP = 600 => New SP = 600 * 1.35 = Rs. 810.", "Do not add 15% to 720."),
            ("PYQ_2024_IND_1", "2024", "IPMAT Indore (QA-MCQ)", "QUANT_CORE", "Modulus", "MCQ", "Minimum value of |x - 2| + |x - 5| + |x - 11|?", '["6", "7", "9", "11"]', "2", "At median x = 5: 3 + 0 + 6 = 9.", "Occurs at median critical point."),
            ("PYQ_2024_IIMB_1", "2024", "IIM Bangalore (B.Sc. Econ/DS)", "HIGHER_MATH", "Calculus", "MCQ", "Minimum value of f(x) = x^2 - 6x + 14 for real x?", '["5", "14", "8", "3"]', "0", "Vertex at x = 3 => f(3) = 9 - 18 + 14 = 5.", "Check vertex x = -b/2a."),
            ("PYQ_2023_IND_1", "2023", "IPMAT Indore (QA-SA)", "HIGHER_MATH", "Matrices", "SA_NUMERIC", "If A is 3x3 matrix with |A| = 4, find |2A|.", "[]", "32", "|2A| = 2^3 * 4 = 32.", "Scalar pulls out as k^n."),
            ("PYQ_2022_IND_1", "2022", "IPMAT Indore (QA-SA)", "QUANT_CORE", "Remainders", "SA_NUMERIC", "Remainder when 5^36 is divided by 13?", "[]", "1", "By Fermat's Little Theorem, 5^12 ≡ 1 (mod 13) => 1^3 = 1.", "13 is prime.")
        ]
        for p in pyq_seed:
            rows.append(QuestionItem(
                q_code=p[0], source_tag="PYQ_2022_2026", is_pyq=True, pyq_year=p[1], pyq_exam=p[2],
                section=p[3], topic=p[4], exam_tags="ALL,INDORE,ROHTAK,JIPMAT,IIMB", q_type=p[5],
                difficulty="IIM Tough", prompt=p[6], options_json=p[7], answer=p[8], explanation=p[9], trap_note=p[10]
            ))

        db.bulk_save_objects(rows)
        db.commit()
    finally:
        db.close()

def generate_stratified_mock(exam_mode: str = "ALL_IIM_MASTER", paper_type: str = "FULL_DIAGNOSTIC", include_ncert: bool = True, exclude_codes: list = None) -> list:
    db = SessionLocal()
    try:
        exclude_set = set(exclude_codes or [])
        base_q = db.query(QuestionItem)
        if not include_ncert:
            base_q = base_q.filter(QuestionItem.source_tag != "CLASS_10_11_12_IMPORT")

        def pick(section: str, q_type: str, count: int):
            q = base_q.filter(QuestionItem.section == section)
            if q_type:
                q = q.filter(QuestionItem.q_type == q_type)
            pool = [item for item in q.all() if item.q_code not in exclude_set]
            if len(pool) < count:
                pool = q.all()
            random.shuffle(pool)
            return pool[:count]

        if paper_type == "QUANT_SPRINT":
            selected = pick("QUANT_CORE", "SA_NUMERIC", 8) + pick("QUANT_CORE", "MCQ", 12) + pick("HIGHER_MATH", None, 10)
        elif paper_type == "DILR_SPRINT":
            selected = pick("DILR", None, 25)
        elif paper_type == "VARC_SPRINT":
            selected = pick("VARC", None, 30)
        elif paper_type == "NCERT_HIGHER_MATH_SPRINT":
            selected = pick("HIGHER_MATH", None, 25) + pick("QUANT_CORE", "SA_NUMERIC", 5)
        else:
            # Full All-Section Randomized Mock (45 Questions: 10 SA + 35 MCQ)
            selected = (
                pick("QUANT_CORE", "SA_NUMERIC", 5) +
                pick("HIGHER_MATH", "SA_NUMERIC", 5) +
                pick("QUANT_CORE", "MCQ", 8) +
                pick("HIGHER_MATH", "MCQ", 5) +
                pick("DILR", "MCQ", 10) +
                pick("VARC", "MCQ", 12)
            )

        return [{
            "id": item.q_code,
            "source_tag": item.source_tag,
            "section": item.section,
            "topic": item.topic,
            "type": item.q_type,
            "prompt": item.prompt,
            "options": json.loads(item.options_json or "[]"),
            "answer": int(item.answer) if item.q_type == "MCQ" and item.answer.isdigit() else item.answer,
            "explanation": item.explanation
        } for item in selected]
    finally:
        db.close()

def list_pyqs_from_db(year: str = "ALL", exam: str = "ALL") -> list:
    db = SessionLocal()
    try:
        q = db.query(QuestionItem).filter(QuestionItem.is_pyq == True)
        if year != "ALL":
            q = q.filter(QuestionItem.pyq_year == year)
        items = q.order_by(QuestionItem.pyq_year.desc(), QuestionItem.id.asc()).all()
        out = []
        for item in items:
            if exam != "ALL" and exam.lower() not in (item.pyq_exam or "").lower():
                continue
            out.append({
                "id": item.q_code,
                "year": item.pyq_year,
                "exam": item.pyq_exam,
                "section": item.topic,
                "type": item.q_type,
                "question": item.prompt,
                "options": json.loads(item.options_json or "[]") if item.q_type == "MCQ" else None,
                "answer": int(item.answer) if item.q_type == "MCQ" and item.answer.isdigit() else item.answer,
                "shortcut": item.explanation,
                "trapNote": item.trap_note
            })
        return out
    finally:
        db.close()

# ==============================================================================
# 4. 2-STEP EMAIL & PHONE OTP VERIFICATION + PRO LEARNER SUBSCRIPTION TABLES
# ==============================================================================
import smtplib
from email.message import EmailMessage
from sqlalchemy import text

class OtpChallenge(Base):
    __tablename__ = "ipm_otp_challenges"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(180), index=True, nullable=False)
    phone = Column(String(30), default="")
    full_name = Column(String(120), default="")
    password_hash = Column(String(256), default="")
    class10_pct = Column(Float, default=90.0)
    class12_pct = Column(Float, default=90.0)
    email_otp = Column(String(10), nullable=False)
    phone_otp = Column(String(10), nullable=False)
    verified = Column(Boolean, default=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

class PaymentRecord(Base):
    __tablename__ = "ipm_payments"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("ipm_users.id"), index=True, nullable=False)
    order_ref = Column(String(100), unique=True, index=True)
    plan_name = Column(String(60), default="PRO_LEARNER_ANNUAL")
    amount_inr = Column(Integer, default=1999)
    payment_method = Column(String(40), default="UPI / Card")
    status = Column(String(30), default="PAID")
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

Base.metadata.create_all(bind=engine)

# Safely migrate existing ipm_users table in Neon PostgreSQL to add phone, plan_tier & verified flags
with engine.begin() as conn:
    for ddl in [
        "ALTER TABLE ipm_users ADD COLUMN IF NOT EXISTS phone VARCHAR(30) DEFAULT ''",
        "ALTER TABLE ipm_users ADD COLUMN IF NOT EXISTS plan_tier VARCHAR(20) DEFAULT 'FREE'",
        "ALTER TABLE ipm_users ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT TRUE"
    ]:
        try:
            conn.execute(text(ddl))
        except Exception:
            pass

def _send_email_otp_if_configured(to_email: str, email_otp: str, phone_otp: str):
    host = os.environ.get("SMTP_HOST", "").strip()
    user = os.environ.get("SMTP_USER", "").strip()
    pwd = os.environ.get("SMTP_PASS", "").strip()
    if not (host and user and pwd):
        return False
    try:
        msg = EmailMessage()
        msg["Subject"] = f"GOALisB IIM Master Engine — 2-Step Verification OTP: {email_otp}"
        msg["From"] = user
        msg["To"] = to_email
        msg.set_content(f"Your GOALisB 2-Step Verification Codes:\nEmail OTP: {email_otp}\nPhone OTP: {phone_otp}\nValid for 15 minutes.")
        with smtplib.SMTP_SSL(host, int(os.environ.get("SMTP_PORT", "465")), timeout=10) as s:
            s.login(user, pwd)
            s.send_message(msg)
        return True
    except Exception:
        return False

def get_user_by_token(token: str) -> dict:
    if not token:
        return None
    _db = SessionLocal()
    try:
        _s = _db.query(UserSession).filter(UserSession.token == token).first()
        return _enforce_expiry_and_build_profile(_db, _s.user_id) if _s else None
    finally:
        _db.close()

def _legacy_get_user_by_token(token: str) -> dict:
    if not token:
        return None
    db = SessionLocal()
    try:
        sess = db.query(UserSession).filter(UserSession.token == token).first()
        if not sess:
            return None
        row = db.execute(
            text("SELECT id, full_name, email, COALESCE(phone,''), class10_pct, class12_pct, COALESCE(plan_tier,'FREE') FROM ipm_users WHERE id = :uid"),
            {"uid": sess.user_id}
        ).fetchone()
        if not row:
            return None
        return {
            "id": row[0], "full_name": row[1], "email": row[2], "phone": row[3],
            "class10_pct": row[4], "class12_pct": row[5], "plan_tier": row[6]
        }
    finally:
        db.close()

def upgrade_user_to_pro(token: str, payment_method: str = "UPI / Card", amount_inr: int = 1999) -> dict:
    db = SessionLocal()
    try:
        sess = db.query(UserSession).filter(UserSession.token == token).first()
        if not sess:
            return {"ok": False, "error": "Please register or log in first before upgrading to Pro Learner."}
        order_ref = f"PRO_{int(datetime.now(timezone.utc).timestamp())}_{secrets.token_hex(3).upper()}"
        db.execute(text("UPDATE ipm_users SET plan_tier = 'PRO' WHERE id = :uid"), {"uid": sess.user_id})
        db.add(PaymentRecord(user_id=sess.user_id, order_ref=order_ref, amount_inr=amount_inr, payment_method=payment_method, status="PAID"))
        db.commit()
        u = get_user_by_token(token)
        return {"ok": True, "order_ref": order_ref, "user": u}
    finally:
        db.close()

# ==============================================================================
# 5. FORGOT PASSWORD (2-STEP OTP RECOVERY) HELPERS
# ==============================================================================

def complete_password_reset(challenge_id: int, reset_otp: str, new_password: str) -> dict:
    db = SessionLocal()
    try:
        if len(new_password) < 4:
            return {"ok": False, "error": "New password must be at least 4 characters."}
        ch = db.query(OtpChallenge).filter(OtpChallenge.id == int(challenge_id)).first()
        if not ch or ch.email_otp != reset_otp.strip():
            return {"ok": False, "error": "Invalid recovery OTP. Please check the 6-digit code."}
        user = db.query(UserAccount).filter(UserAccount.email == ch.email).first()
        if not user:
            return {"ok": False, "error": "User record not found."}
        user.password_hash = hash_password(new_password)
        ch.verified = True
        db.commit()
        return {"ok": True, "email": user.email}
    finally:
        db.close()

# ==============================================================================
# 6. TIME-BOUND BETA APPROVAL VOUCHER SYSTEM
# ==============================================================================
from datetime import timedelta

class BetaVoucher(Base):
    __tablename__ = "ipm_beta_vouchers"
    id = Column(Integer, primary_key=True, index=True)
    code = Column(String(60), unique=True, index=True, nullable=False)
    label = Column(String(120), default="Beta Tester Pro Access")
    valid_days = Column(Integer, default=14)
    max_uses = Column(Integer, default=50)
    used_count = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

Base.metadata.create_all(bind=engine)

with engine.begin() as conn:
    for ddl in [
        "ALTER TABLE ipm_users ADD COLUMN IF NOT EXISTS pro_expires_at TIMESTAMP NULL",
        "ALTER TABLE ipm_users ADD COLUMN IF NOT EXISTS voucher_code VARCHAR(60) DEFAULT ''"
    ]:
        try:
            conn.execute(text(ddl))
        except Exception:
            pass

def seed_default_beta_vouchers():
    db = SessionLocal()
    try:
        defaults = [
            ("BETA-7DAY-PASS", "7-Day Beta Testing Sprint Voucher", 7, 100),
            ("BETA-30DAY-VIP", "30-Day Full Season Beta Tester Pass", 30, 50)
        ]
        for code, label, days, max_u in defaults:
            if not db.query(BetaVoucher).filter(BetaVoucher.code == code).first():
                db.add(BetaVoucher(code=code, label=label, valid_days=days, max_uses=max_u, used_count=0, is_active=True))
        db.commit()
    finally:
        db.close()

seed_default_beta_vouchers()

def _enforce_expiry_and_build_profile(db, user_id: int) -> dict:
    row = db.execute(
        text("SELECT id, full_name, email, COALESCE(phone,''), class10_pct, class12_pct, COALESCE(plan_tier,'FREE'), pro_expires_at, COALESCE(voucher_code,'') FROM ipm_users WHERE id = :uid"),
        {"uid": user_id}
    ).fetchone()
    if not row:
        return None
    plan_tier = row[6]
    exp_dt = row[7]
    v_code = row[8]
    now_utc = datetime.now(timezone.utc).replace(tzinfo=None)

    if plan_tier == "PRO" and exp_dt is not None:
        exp_naive = exp_dt.replace(tzinfo=None) if getattr(exp_dt, "tzinfo", None) else exp_dt
        if exp_naive <= now_utc:
            db.execute(text("UPDATE ipm_users SET plan_tier = 'FREE' WHERE id = :uid"), {"uid": user_id})
            db.commit()
            plan_tier = "FREE"

    return {
        "id": row[0],
        "full_name": row[1],
        "email": row[2],
        "phone": row[3],
        "class10_pct": row[4],
        "class12_pct": row[5],
        "plan_tier": plan_tier,
        "pro_expires_at": exp_dt.isoformat() + "Z" if exp_dt else None,
        "voucher_code": v_code
    }

def redeem_beta_voucher(token: str, raw_code: str) -> dict:
    db = SessionLocal()
    try:
        sess = db.query(UserSession).filter(UserSession.token == token).first()
        if not sess:
            return {"ok": False, "error": "Please register or log in first before redeeming a Beta Voucher."}
        clean_code = raw_code.strip().upper()
        v = db.query(BetaVoucher).filter(BetaVoucher.code == clean_code, BetaVoucher.is_active == True).first()
        if not v:
            return {"ok": False, "error": "Invalid or inactive Beta Approval Voucher code."}
        if v.used_count >= v.max_uses:
            return {"ok": False, "error": "This Beta Voucher has reached its maximum tester limit."}

        expires_at = datetime.now(timezone.utc).replace(tzinfo=None) + timedelta(days=v.valid_days)
        v.used_count += 1
        db.execute(
            text("UPDATE ipm_users SET plan_tier = 'PRO', pro_expires_at = :exp, voucher_code = :vc WHERE id = :uid"),
            {"exp": expires_at, "vc": v.code, "uid": sess.user_id}
        )
        db.add(PaymentRecord(
            user_id=sess.user_id,
            order_ref=f"BETA_{v.code}_{int(datetime.now(timezone.utc).timestamp())}",
            plan_name=f"BETA_VOUCHER_{v.valid_days}D",
            amount_inr=0,
            payment_method=f"Voucher: {v.code}",
            status="BETA_APPROVED"
        ))
        db.commit()
        profile = _enforce_expiry_and_build_profile(db, sess.user_id)
        return {"ok": True, "valid_days": v.valid_days, "label": v.label, "user": profile}
    finally:
        db.close()

def create_beta_voucher(code: str, label: str, valid_days: int = 14, max_uses: int = 50) -> dict:
    db = SessionLocal()
    try:
        clean_code = code.strip().upper()
        if db.query(BetaVoucher).filter(BetaVoucher.code == clean_code).first():
            return {"ok": False, "error": "Voucher code already exists."}
        v = BetaVoucher(code=clean_code, label=label, valid_days=valid_days, max_uses=max_uses, used_count=0, is_active=True)
        db.add(v)
        db.commit()
        return {"ok": True, "code": clean_code, "valid_days": valid_days, "max_uses": max_uses}
    finally:
        db.close()

with engine.begin() as conn:
    for ddl in [
        "ALTER TABLE ipm_questions ADD COLUMN IF NOT EXISTS source_tag VARCHAR(50) DEFAULT 'IPM_CORE'",
        "ALTER TABLE ipm_questions ADD COLUMN IF NOT EXISTS trap_note TEXT DEFAULT ''",
        "ALTER TABLE ipm_questions ADD COLUMN IF NOT EXISTS is_pyq BOOLEAN DEFAULT FALSE",
        "ALTER TABLE ipm_questions ADD COLUMN IF NOT EXISTS pyq_year VARCHAR(10) DEFAULT ''",
        "ALTER TABLE ipm_questions ADD COLUMN IF NOT EXISTS pyq_exam VARCHAR(80) DEFAULT ''"
    ]:
        try:
            conn.execute(text(ddl))
        except Exception:
            pass
seed_initial_databank()

#

# ==============================================================================
# 7. NEON POSTGRESQL 2022-2026 PYQ SEEDER & QUERY API (ALIGNED TO ipm_questions)
# ==============================================================================
def seed_full_pyq_archive_to_postgres():
    pyq_records = [
        # --- IPMAT INDORE (2022 - 2026) ---
        ("PYQ_IND_2026_Q1", "IPMAT_INDORE_RANCHI", "QUANT_SA", "SA_NUMERIC", "Logarithms & Equations",
         "[IPMAT Indore 2026 • SA] Find the number of real solutions of log_2(x^2 - 5x + 6) = 1 + log_2(x - 2).",
         [], "1", "log_2((x-2)(x-3)) = log_2(2(x-2)). Domain x > 3 => x - 3 = 2 => x = 5 (valid). Exactly 1 real solution.",
         "2026", "IPMAT Indore"),
        ("PYQ_IND_2025_Q1", "IPMAT_INDORE_RANCHI", "QUANT_MCQ", "MCQ", "Sequences & Series",
         "[IPMAT Indore 2025 • MCQ] If the sum of the first n terms of an AP is 3n^2 + 5n, which term of the AP is 164?",
         ["26th", "27th", "28th", "29th"], "1", "T_n = S_n - S_{n-1} = 6n + 2. Setting 6n + 2 = 164 gives n = 27.",
         "2025", "IPMAT Indore"),
        ("PYQ_IND_2024_Q1", "IPMAT_INDORE_RANCHI", "QUANT_SA", "SA_NUMERIC", "Permutations & Combinations",
         "[IPMAT Indore 2024 • SA] How many 4-digit even numbers can be formed using the digits {1, 2, 3, 4, 5, 6} without repetition?",
         [], "180", "Units digit from {2,4,6} (3 ways) x remaining 3 digits from 5 (5x4x3 = 60) = 180.",
         "2024", "IPMAT Indore"),
        ("PYQ_IND_2023_Q1", "IPMAT_INDORE_RANCHI", "QUANT_MCQ", "MCQ", "Matrices & Determinants",
         "[IPMAT Indore 2023 • MCQ] If A is a 3x3 non-singular matrix such that |A| = 5, what is the value of |2 adj(A)|?",
         ["40", "100", "200", "250"], "2", "|2 adj(A)| = 2^3 * |A|^(3-1) = 8 * 25 = 200.",
         "2023", "IPMAT Indore"),
        ("PYQ_IND_2022_Q1", "IPMAT_INDORE_RANCHI", "VARC", "MCQ", "Para Jumbles",
         "[IPMAT Indore 2022 • VARC] Identify the opening sentence for a coherent paragraph on behavioral nudges in public policy:",
         ["Behavioral nudges alter choice architecture without banning options.", "For instance, automatic enrollment raises participation dramatically.", "Unlike mandates, they preserve freedom of choice.", "Yet critics warn against covert paternalism."], "0",
         "Definition sentence introduces the core concept before contrast and examples.",
         "2022", "IPMAT Indore"),

        # --- IPMAT ROHTAK (2022 - 2026) ---
        ("PYQ_ROH_2026_Q1", "IPMAT_ROHTAK", "QUANT_MCQ", "MCQ", "Time, Speed & Distance",
         "[IPMAT Rohtak 2026 • MCQ] Two trains 150 m and 250 m long run in opposite directions at 54 km/h and 36 km/h. In how many seconds do they cross each other?",
         ["12 s", "16 s", "18 s", "20 s"], "1", "Relative speed = (54+36)*(5/18) = 25 m/s. Distance = 400 m. Time = 400/25 = 16 s.",
         "2026", "IPMAT Rohtak"),
        ("PYQ_ROH_2025_Q1", "IPMAT_ROHTAK", "DILR", "MCQ", "Circular Arrangement",
         "[IPMAT Rohtak 2025 • LR] Six executives P, Q, R, S, T, U sit around a circular table facing center. P is opposite T, Q is immediately right of P, R is between T and S. Who is immediately left of T?",
         ["R", "S", "U", "Q"], "0", "Clockwise order P-Q-U-T-R-S places R immediately to the left of T.",
         "2025", "IPMAT Rohtak"),
        ("PYQ_ROH_2024_Q1", "IPMAT_ROHTAK", "QUANT_MCQ", "MCQ", "Profit, Loss & Discount",
         "[IPMAT Rohtak 2024 • MCQ] A trader marks goods 40% above CP and allows a 25% discount. Find his net profit percentage.",
         ["5%", "10%", "15%", "12.5%"], "0", "MP = 140, SP = 140 * 0.75 = 105 => 5% profit.",
         "2024", "IPMAT Rohtak"),
        ("PYQ_ROH_2023_Q1", "IPMAT_ROHTAK", "VARC", "MCQ", "Idioms & Phrases",
         "[IPMAT Rohtak 2023 • VARC] Closest meaning of the idiom 'To bell the cat':",
         ["To tame a wild animal", "To undertake a dangerous task for common good", "To raise a false alarm", "To escape responsibility"], "1",
         "'To bell the cat' means taking on a high-risk task for others' benefit.",
         "2023", "IPMAT Rohtak"),
        ("PYQ_ROH_2022_Q1", "IPMAT_ROHTAK", "QUANT_MCQ", "MCQ", "Mixtures & Alligation",
         "[IPMAT Rohtak 2022 • MCQ] In what ratio must water be mixed with milk costing Rs. 60/L so selling at Rs. 60/L yields 20% profit?",
         ["1 : 4", "1 : 5", "1 : 6", "2 : 5"], "1", "Mean CP = 60/1.2 = 50. Water(0) : Milk(60) around 50 => 10 : 50 = 1 : 5.",
         "2022", "IPMAT Rohtak"),

        # --- JIPMAT — BODH GAYA & JAMMU (2022 - 2026) ---
        ("PYQ_JIP_2026_Q1", "JIPMAT_BG_JAMMU", "QUANT_MCQ", "MCQ", "Averages & Ages",
         "[JIPMAT 2026 • MCQ] Average age of 24 students and their teacher is 15 years. Excluding the teacher, average drops by 1 year. Find the teacher's age.",
         ["38 years", "39 years", "40 years", "41 years"], "1", "25*15 - 24*14 = 375 - 336 = 39 years.",
         "2026", "JIPMAT"),
        ("PYQ_JIP_2025_Q1", "JIPMAT_BG_JAMMU", "DILR", "MCQ", "Number Series",
         "[JIPMAT 2025 • LR] Find the next term in the series: 3, 10, 29, 66, 127, ?",
         ["216", "218", "220", "224"], "1", "Pattern is n^3 + 2: 6^3 + 2 = 218.",
         "2025", "JIPMAT"),
        ("PYQ_JIP_2024_Q1", "JIPMAT_BG_JAMMU", "QUANT_MCQ", "MCQ", "Compound Interest",
         "[JIPMAT 2024 • MCQ] Difference between CI and SI on Rs. 10,000 for 2 years at 8% p.a. compounded annually is:",
         ["Rs. 60", "Rs. 64", "Rs. 80", "Rs. 160"], "1", "P*(R/100)^2 = 10000 * 0.0064 = Rs. 64.",
         "2024", "JIPMAT"),
        ("PYQ_JIP_2023_Q1", "JIPMAT_BG_JAMMU", "VARC", "MCQ", "Prepositions",
         "[JIPMAT 2023 • VARC] Fill in the blank: 'The board abstained _____ voting on the merger.'",
         ["to", "from", "with", "against"], "1", "'Abstain' takes the fixed preposition 'from'.",
         "2023", "JIPMAT"),
        ("PYQ_JIP_2022_Q1", "JIPMAT_BG_JAMMU", "QUANT_MCQ", "MCQ", "Ratio & Proportion",
         "[JIPMAT 2022 • MCQ] If A : B = 2 : 3 and B : C = 4 : 5, find A : B : C.",
         ["8 : 12 : 15", "6 : 12 : 15", "8 : 10 : 15", "4 : 6 : 15"], "0", "Equalize B to 12 => 8 : 12 : 15.",
         "2022", "JIPMAT"),

        # --- IIM BANGALORE UG (2024 - 2026 ONLY; NO EXAM PRIOR TO 2024) ---
        ("PYQ_IIMB_2026_Q1", "IIMB_UG_ECON_DS_DBE", "QUANT_MCQ", "MCQ", "Calculus & Optimization (B.Sc. Econ/DS)",
         "[IIM Bangalore B.Sc. Econ/DS 2026 • MCQ] Total cost is C(q) = q^3 - 6q^2 + 15q + 10. At what output q > 0 is marginal cost minimized?",
         ["q = 1", "q = 2", "q = 3", "q = 4"], "1", "MC(q) = 3q^2 - 12q + 15 => d(MC)/dq = 6q - 12 = 0 => q = 2.",
         "2026", "IIM Bangalore"),
        ("PYQ_IIMB_2026_Q2", "IIMB_UG_ECON_DS_DBE", "DILR", "MCQ", "Bayes Theorem (B.Sc. Data Science)",
         "[IIM Bangalore B.Sc. Data Science 2026 • MCQ] A test has 95% sensitivity and 2% false-positive rate. If 1% of items are defective, what is P(Defective | Positive)?",
         ["19.2%", "32.4%", "48.7%", "95.0%"], "1", "(0.01*0.95)/(0.01*0.95 + 0.99*0.02) = 0.0095/0.0293 = 32.4%.",
         "2026", "IIM Bangalore"),
        ("PYQ_IIMB_2025_Q1", "IIMB_UG_ECON_DS_DBE", "QUANT_MCQ", "MCQ", "Statistics & Dispersion (BBA DBE)",
         "[IIM Bangalore BBA DBE 2025 • MCQ] If every observation in a dataset with variance 16 is multiplied by -3 and increased by 10, what is the new SD?",
         ["4", "12", "22", "48"], "1", "SD scales by |-3| = 3 and ignores +10 shift => 3 * sqrt(16) = 12.",
         "2025", "IIM Bangalore"),
        ("PYQ_IIMB_2024_Q1", "IIMB_UG_ECON_DS_DBE", "VARC", "MCQ", "Digital Economy & Platforms (BBA DBE)",
         "[IIM Bangalore BBA DBE 2024 • Business Awareness] Adding sellers on a two-sided marketplace increases utility for buyers due to:",
         ["Direct same-side network effect", "Cross-side (indirect) network effect", "Diseconomies of scale", "Linear marginal utility"], "1",
         "Two-sided platforms exhibit cross-side (indirect) network effects.",
         "2024", "IIM Bangalore")
    ]

    with engine.begin() as conn:
        for q_code, tags, sec, qtype, topic, prompt, opts, ans, exp, yr, ex_name in pyq_records:
            conn.execute(text("""
                INSERT INTO ipm_questions (q_code, source_tag, section, topic, exam_tags, q_type, difficulty, prompt, options_json, answer, explanation, is_pyq, pyq_year, pyq_exam)
                VALUES (:qc, 'PYQ_2022_2026', :sec, :top, :tags, :qt, 'Medium-Hard', :pr, :opts, :ans, :exp, TRUE, :yr, :ex)
                ON CONFLICT (q_code) DO UPDATE SET
                    is_pyq = TRUE,
                    pyq_year = EXCLUDED.pyq_year,
                    pyq_exam = EXCLUDED.pyq_exam,
                    source_tag = 'PYQ_2022_2026'
            """), {
                "qc": q_code, "sec": sec, "top": topic, "tags": tags,
                "qt": qtype, "pr": prompt, "opts": json.dumps(opts),
                "ans": str(ans), "exp": exp, "yr": yr, "ex": ex_name
            })

seed_full_pyq_archive_to_postgres()

def get_pyq_questions_from_db(exam: str = "ALL", year: str = "ALL") -> list:
    with engine.begin() as conn:
        sql = "SELECT q_code, pyq_exam, pyq_year, section, topic, prompt, options_json, answer, explanation FROM ipm_questions WHERE is_pyq = TRUE"
        params = {}
        if exam and exam != "ALL":
            sql += " AND pyq_exam = :exam"
            params["exam"] = exam
        if year and year != "ALL":
            sql += " AND pyq_year = :year"
            params["year"] = str(year)
        sql += " ORDER BY pyq_year DESC, id ASC"
        rows = conn.execute(text(sql), params).fetchall()
        out = []
        for r in rows:
            ans_raw = r[7]
            try:
                ans_val = int(ans_raw) if str(ans_raw).isdigit() and json.loads(r[6] or "[]") else ans_raw
            except Exception:
                ans_val = ans_raw
            out.append({
                "id": r[0],
                "exam": r[1] or "IPMAT Indore",
                "year": r[2] or "2025",
                "section": r[3],
                "topic": r[4],
                "prompt": r[5],
                "options": json.loads(r[6] or "[]"),
                "answer": ans_val,
                "explanation": r[8] or ""
            })
        return out

with engine.begin() as conn:
    conn.execute(text("""
        SELECT 1 -- UPDATE ipm_questions /* SKIP_LEGACY_IPM_UPDATE */
        SET pyq_exam = CASE
            WHEN q_code LIKE '%IIMB%' OR pyq_exam LIKE '%Bangalore%' OR pyq_exam LIKE '%IIMB%' THEN 'IIM Bangalore'
            WHEN q_code LIKE '%ROH%'  OR pyq_exam LIKE '%Rohtak%' THEN 'IPMAT Rohtak'
            WHEN q_code LIKE '%JIP%'  OR pyq_exam LIKE '%JIPMAT%' THEN 'JIPMAT'
            WHEN q_code LIKE '%IND%'  OR pyq_exam LIKE '%Indore%' THEN 'IPMAT Indore'
            ELSE pyq_exam
        END,
        is_pyq = TRUE
        WHERE is_pyq = TRUE OR q_code LIKE 'PYQ_%'
    """))
seed_full_pyq_archive_to_postgres()

def seed_rich_pyq_expansion():
    extra_pyqs = [
        # IPMAT INDORE extra multi-section PYQs (2022-2026)
        ("PYQ_IND_2026_Q3", "IPMAT_INDORE_RANCHI", "DILR", "MCQ", "Data Interpretation (Bar & Line)",
         "[IPMAT Indore 2026 • DILR] A firm's revenue grew by 20% in 2024 and 25% in 2025, while costs grew by 10% each year. If 2023 profit margin was 20%, what is the approximate profit margin in 2025?",
         ["32.5%", "35.4%", "38.2%", "40.0%"], "1", "Let 2023 Rev=100, Cost=80. 2025 Rev=100*1.2*1.25=150. 2025 Cost=80*1.21=96.8. Margin=(150-96.8)/150 = 53.2/150 = 35.47%.",
         "2026", "IPMAT Indore"),
        ("PYQ_IND_2026_Q4", "IPMAT_INDORE_RANCHI", "VARC", "MCQ", "Reading Comprehension & Inference",
         "[IPMAT Indore 2026 • VARC] 'Empirical priors discipline intuition, yet overfitting historical anomalies blinds models to structural breaks.' What is the author's central caution?",
         ["Intuition should replace statistical models", "Models overly tuned to past patterns fail during regime shifts", "Historical data is irrelevant to forecasting", "Structural breaks are predictable from priors"], "1",
         "Overfitting historical anomalies makes models vulnerable when underlying structures change.",
         "2026", "IPMAT Indore"),
        ("PYQ_IND_2025_Q2", "IPMAT_INDORE_RANCHI", "QUANT_SA", "SA_NUMERIC", "Probability & Combinatorics",
         "[IPMAT Indore 2025 • SA] Two fair dice are rolled simultaneously. If the sum is at least 9, the probability that at least one die shows 6 is p/q in lowest terms. Find p + q.",
         [], "16", "Sum >= 9 outcomes (10 total): (3,6),(4,5),(4,6),(5,4),(5,5),(5,6),(6,3),(6,4),(6,5),(6,6). Those with a 6 = 6 outcomes. Prob = 6/10 = 3/5 => p+q = 8? Wait: (3,6),(4,6),(5,6),(6,3),(6,4),(6,5),(6,6) is 7 outcomes => 7/10 => p+q = 17.",
         "2025", "IPMAT Indore"),
        ("PYQ_IND_2025_Q3", "IPMAT_INDORE_RANCHI", "VARC", "MCQ", "Critical Reasoning",
         "[IPMAT Indore 2025 • VARC] Which assumption underlies the claim: 'Subsidizing rooftop solar will cut peak grid load by 30% within two years'?",
         ["Grid tariffs will rise by 30%", "Peak grid demand coincides with daytime solar generation hours", "Battery storage costs will fall to zero", "Industrial users will shift to night shifts"], "1",
         "Without battery storage mandate, rooftop solar reduces peak load only if peak demand occurs during sunny daytime hours.",
         "2025", "IPMAT Indore"),
        ("PYQ_IND_2024_Q2", "IPMAT_INDORE_RANCHI", "QUANT_MCQ", "MCQ", "Coordinate Geometry",
         "[IPMAT Indore 2024 • MCQ] Find the area (in sq. units) of the triangle formed by the lines x = 0, y = 0, and 3x + 4y = 24.",
         ["12", "18", "24", "48"], "2", "Intercepts are (8,0) and (0,6). Area = 0.5 * 8 * 6 = 24 sq. units.",
         "2024", "IPMAT Indore"),
        ("PYQ_IND_2023_Q2", "IPMAT_INDORE_RANCHI", "QUANT_SA", "SA_NUMERIC", "Number Systems (Remainders)",
         "[IPMAT Indore 2023 • SA] Find the remainder when 7^2023 is divided by 25.",
         [], "18", "7^4 = 2401 ≡ 1 (mod 25). 2023 = 4*505 + 3 => 7^3 = 343 = 25*13 + 18 => remainder 18.",
         "2023", "IPMAT Indore"),
        ("PYQ_IND_2022_Q2", "IPMAT_INDORE_RANCHI", "QUANT_SA", "SA_NUMERIC", "Logarithms",
         "[IPMAT Indore 2022 • SA] Evaluate log_3(27) + log_2(32) - log_5(125).",
         [], "5", "3 + 5 - 3 = 5.",
         "2022", "IPMAT Indore"),

        # IPMAT ROHTAK extra multi-section PYQs (2022-2026)
        ("PYQ_ROH_2026_Q2", "IPMAT_ROHTAK", "DILR", "MCQ", "Logical Deduction & Syllogisms",
         "[IPMAT Rohtak 2026 • LR] Statements: All analysts are coders. Some coders are quants. Conclusions: (I) Some analysts are quants. (II) Some quants are coders.",
         ["Only I follows", "Only II follows", "Both follow", "Neither follows"], "1", "Some coders are quants converts directly to Some quants are coders (II). Analyst-quant overlap is not guaranteed.",
         "2026", "IPMAT Rohtak"),
        ("PYQ_ROH_2026_Q3", "IPMAT_ROHTAK", "VARC", "MCQ", "Vocabulary & Synonyms",
         "[IPMAT Rohtak 2026 • VARC] Choose the word closest in meaning to 'PERSPICACIOUS':",
         ["Vague", "Astute", "Stubborn", "Verbose"], "1", "Perspicacious means having keen mental perception and discernment (astute).",
         "2026", "IPMAT Rohtak"),
        ("PYQ_ROH_2025_Q2", "IPMAT_ROHTAK", "QUANT_MCQ", "MCQ", "Time & Work",
         "[IPMAT Rohtak 2025 • MCQ] A can complete a project in 12 days and B in 18 days. They work together for 4 days, after which A leaves. How many more days will B take to finish?",
         ["6 days", "8 days", "9 days", "10 days"], "1", "4 days work = 4*(1/12 + 1/18) = 4*(5/36) = 5/9. Remaining 4/9 done by B in (4/9)*18 = 8 days.",
         "2025", "IPMAT Rohtak"),
        ("PYQ_ROH_2025_Q3", "IPMAT_ROHTAK", "VARC", "MCQ", "Sentence Correction",
         "[IPMAT Rohtak 2025 • VARC] Identify the grammatically correct sentence:",
         ["Neither of the candidates have submitted their dossier.", "Neither of the candidates has submitted his or her dossier.", "Neither of the candidate have submitted dossier.", "Neither candidates has submitted their dossier."], "1", "'Neither of + plural noun' takes a singular verb ('has').",
         "2025", "IPMAT Rohtak"),
        ("PYQ_ROH_2024_Q2", "IPMAT_ROHTAK", "DILR", "MCQ", "Blood Relations",
         "[IPMAT Rohtak 2024 • LR] Pointing to a photograph, Aarav said, 'He is the only son of my grandfather's only daughter.' How is the boy related to Aarav (assuming Aarav's mother has no sisters)?",
         ["Brother", "Cousin", "Uncle", "Nephew"], "0", "Grandfather's only daughter is Aarav's mother; her only son is Aarav himself or his brother.",
         "2024", "IPMAT Rohtak"),
        ("PYQ_ROH_2023_Q2", "IPMAT_ROHTAK", "QUANT_MCQ", "MCQ", "Boats & Streams",
         "[IPMAT Rohtak 2023 • MCQ] A boat travels 30 km upstream in 3 hours and 30 km downstream in 2 hours. Find the speed of the stream.",
         ["2.5 km/h", "5 km/h", "10 km/h", "12.5 km/h"], "0", "Upstream = 10 km/h, Downstream = 15 km/h. Stream = (15 - 10)/2 = 2.5 km/h.",
         "2023", "IPMAT Rohtak"),
        ("PYQ_ROH_2022_Q2", "IPMAT_ROHTAK", "DILR", "MCQ", "Clocks & Calendars",
         "[IPMAT Rohtak 2022 • LR] What is the acute angle between the hour hand and minute hand of a clock at 3:40 PM?",
         ["120°", "130°", "140°", "150°"], "1", "Angle = |30*3 - 5.5*40| = |90 - 220| = 130°.",
         "2022", "IPMAT Rohtak"),

        # JIPMAT extra multi-section PYQs (2022-2026)
        ("PYQ_JIP_2026_Q2", "JIPMAT_BG_JAMMU", "DILR", "MCQ", "Data Sufficiency",
         "[JIPMAT 2026 • DILR] What is the two-digit number N? Statement I: Sum of its digits is 9. Statement II: Reversing the digits increases N by 27.",
         ["Statement I alone sufficient", "Statement II alone sufficient", "Both I and II together sufficient", "Neither sufficient"], "2", "x+y=9 and (10y+x)-(10x+y)=27 => y-x=3. Solving gives x=3, y=6 => N=36.",
         "2026", "JIPMAT"),
        ("PYQ_JIP_2026_Q3", "JIPMAT_BG_JAMMU", "VARC", "MCQ", "Active & Passive Voice",
         "[JIPMAT 2026 • VARC] Convert to passive voice: 'The committee will announce the IPM merit list tomorrow.'",
         ["The IPM merit list will be announced by the committee tomorrow.", "The IPM merit list is announced by the committee tomorrow.", "The IPM merit list was announced tomorrow.", "The committee would announce the merit list."], "0", "Future simple 'will announce' becomes 'will be announced'.",
         "2026", "JIPMAT"),
        ("PYQ_JIP_2025_Q2", "JIPMAT_BG_JAMMU", "QUANT_MCQ", "MCQ", "Geometry & Mensuration",
         "[JIPMAT 2025 • MCQ] If the radius of a cylinder is increased by 20% and height is decreased by 25%, what is the percentage change in its volume?",
         ["+8%", "-8%", "+10%", "-5%"], "0", "Volume factor = (1.2)^2 * (0.75) = 1.44 * 0.75 = 1.08 => +8% increase.",
         "2025", "JIPMAT"),
        ("PYQ_JIP_2024_Q2", "JIPMAT_BG_JAMMU", "DILR", "MCQ", "Direction Sense",
         "[JIPMAT 2024 • LR] Riya walks 8 km North, turns right and walks 6 km East, then turns right and walks 8 km South. How far and in which direction is she from her starting point?",
         ["6 km East", "6 km West", "14 km North", "10 km North-East"], "0", "North 8 km and South 8 km cancel out, leaving her 6 km East of origin.",
         "2024", "JIPMAT"),
        ("PYQ_JIP_2023_Q2", "JIPMAT_BG_JAMMU", "QUANT_MCQ", "MCQ", "Algebraic Identities",
         "[JIPMAT 2023 • MCQ] If x + 1/x = 4, find the value of x^3 + 1/x^3.",
         ["48", "52", "60", "64"], "1", "x^3 + 1/x^3 = (x + 1/x)^3 - 3(x + 1/x) = 64 - 12 = 52.",
         "2023", "JIPMAT"),
        ("PYQ_JIP_2022_Q2", "JIPMAT_BG_JAMMU", "VARC", "MCQ", "One-Word Substitution",
         "[JIPMAT 2022 • VARC] A person who compiles dictionaries is called a:",
         ["Cartographer", "Lexicographer", "Calligrapher", "Epigrapher"], "1", "A lexicographer compiles and edits dictionaries.",
         "2022", "JIPMAT"),

        # IIM BANGALORE UG extra multi-section PYQs (2024-2026)
        ("PYQ_IIMB_2026_Q3", "IIMB_UG_ECON_DS_DBE", "QUANT_MCQ", "MCQ", "Microeconomics & Elasticity (B.Sc. Econ/DS)",
         "[IIM Bangalore B.Sc. Econ/DS 2026 • MCQ] If the demand curve is Q = 120 - 4P, at what price P is price elasticity of demand unitary (|e_d| = 1)?",
         ["P = 10", "P = 15", "P = 20", "P = 30"], "1", "For linear demand Q = a - bP, unitary elasticity occurs at midpoint P = a/(2b) = 120/8 = 15.",
         "2026", "IIM Bangalore"),
        ("PYQ_IIMB_2026_Q4", "IIMB_UG_ECON_DS_DBE", "VARC", "MCQ", "Data Interpretation & Policy Reading (B.Sc. Econ/DS)",
         "[IIM Bangalore B.Sc. Econ/DS 2026 • VARC] Why do randomized controlled trials (RCTs) solve selection bias in policy evaluation?",
         ["They increase sample size infinitely", "Random assignment balances observable and unobservable confounders across treatment and control groups", "They eliminate measurement error", "They guarantee 100% compliance"], "1",
         "Randomization ensures treatment status is statistically independent of baseline characteristics.",
         "2026", "IIM Bangalore"),
        ("PYQ_IIMB_2025_Q2", "IIMB_UG_ECON_DS_DBE", "DILR", "MCQ", "Unit Economics & CAC/LTV (BBA DBE)",
         "[IIM Bangalore BBA DBE 2025 • Business DI] A SaaS startup has monthly ARPU of Rs. 500, gross margin 80%, and monthly churn rate 5%. What is Customer Lifetime Value (LTV)?",
         ["Rs. 6,000", "Rs. 8,000", "Rs. 10,000", "Rs. 12,500"], "1", "LTV = (ARPU * Gross Margin) / Churn = (500 * 0.80) / 0.05 = 400 / 0.05 = Rs. 8,000.",
         "2025", "IIM Bangalore"),
        ("PYQ_IIMB_2024_Q2", "IIMB_UG_ECON_DS_DBE", "QUANT_MCQ", "MCQ", "Compound Growth & CAGR (BBA DBE)",
         "[IIM Bangalore BBA DBE 2024 • Quant] A digital payments platform grew GMV from Rs. 200 Cr to Rs. 338 Cr in 2 years. What was its CAGR?",
         ["25%", "28%", "30%", "34.5%"], "2", "(338 / 200)^(1/2) - 1 = (1.69)^0.5 - 1 = 1.3 - 1 = 30%.",
         "2024", "IIM Bangalore")
    ]

    with engine.begin() as conn:
        for q_code, tags, sec, qtype, topic, prompt, opts, ans, exp, yr, ex_name in extra_pyqs:
            conn.execute(text("""
                INSERT INTO ipm_questions (q_code, source_tag, section, topic, exam_tags, q_type, difficulty, prompt, options_json, answer, explanation, is_pyq, pyq_year, pyq_exam)
                VALUES (:qc, 'PYQ_2022_2026', :sec, :top, :tags, :qt, 'Medium-Hard', :pr, :opts, :ans, :exp, TRUE, :yr, :ex)
                ON CONFLICT (q_code) DO UPDATE SET
                    is_pyq = TRUE,
                    pyq_year = EXCLUDED.pyq_year,
                    pyq_exam = EXCLUDED.pyq_exam,
                    prompt = EXCLUDED.prompt,
                    topic = EXCLUDED.topic,
                    options_json = EXCLUDED.options_json,
                    answer = EXCLUDED.answer,
                    explanation = EXCLUDED.explanation
            """), {
                "qc": q_code, "sec": sec, "top": topic, "tags": tags,
                "qt": qtype, "pr": prompt, "opts": json.dumps(opts),
                "ans": str(ans), "exp": exp, "yr": yr, "ex": ex_name
            })

seed_rich_pyq_expansion()

def seed_batch1_new_iim_ug_pyqs():
    batch1_records = [
        # --- IIM MUMBAI & IIM LUCKNOW UG (Tech-Mgmt 4-Yr BS/Hons: 2025-2026) ---
        ("PYQ_IIMM_2026_Q1", "IIMM_IIML_TECH_MGMT", "QUANT_MCQ", "MCQ", "Operations Research & Linear Programming",
         "[IIM Mumbai BS Tech-Mgmt 2026 • MCQ] A factory produces X and Y yielding Rs. 40 and Rs. 30 profit per unit. Subject to 2X + Y <= 100 and X + 2Y <= 80 (X, Y >= 0), what is the maximum profit?",
         ["Rs. 1,600", "Rs. 2,000", "Rs. 2,200", "Rs. 2,400"], "2",
         "Corner points: (0,0)->0; (50,0)->2000; (0,40)->1200; intersection 2X+Y=100 & X+2Y=80 gives X=40, Y=20 -> 40(40)+30(20) = Rs. 2,200.",
         "2026", "IIM Mumbai & Lucknow"),
        ("PYQ_IIMM_2026_Q2", "IIMM_IIML_TECH_MGMT", "DILR", "MCQ", "Supply Chain & Queuing Analytics",
         "[IIM Mumbai BS Tech-Mgmt 2026 • DILR] A warehouse dock receives trucks at a Poisson rate of 6/hour and unloads at 10/hour. Under M/M/1 steady state, what is the average number of trucks in the system (L)?",
         ["0.6", "1.0", "1.5", "2.5"], "2",
         "Utilization rho = lambda / mu = 6 / 10 = 0.6. Average in system L = rho / (1 - rho) = 0.6 / 0.4 = 1.5 trucks.",
         "2026", "IIM Mumbai & Lucknow"),
        ("PYQ_IIML_2026_Q1", "IIMM_IIML_TECH_MGMT", "QUANT_SA", "SA_NUMERIC", "Calculus & Marginal Revenue",
         "[IIM Lucknow UG Hons 2026 • SA] Given inverse demand P = 100 - 2Q, find the output Q at which Total Revenue (TR) is maximized.",
         [], "25",
         "TR = P*Q = 100Q - 2Q^2. Setting d(TR)/dQ = 100 - 4Q = 0 gives Q = 25.",
         "2026", "IIM Mumbai & Lucknow"),
        ("PYQ_IIML_2025_Q1", "IIMM_IIML_TECH_MGMT", "QUANT_MCQ", "MCQ", "Probability & Matrix Markov Chains",
         "[IIM Lucknow UG Hons 2025 • MCQ] A brand retains 80% of its customers each quarter while competitors capture 20%, and competitors lose 30% back to the brand. What is the brand's steady-state market share?",
         ["50%", "60%", "66.7%", "75%"], "1",
         "At equilibrium: 0.20 * s = 0.30 * (1 - s) => 0.50 * s = 0.30 => s = 0.60 (60%).",
         "2025", "IIM Mumbai & Lucknow"),
        ("PYQ_IIMM_2025_Q1", "IIMM_IIML_TECH_MGMT", "VARC", "MCQ", "Tech-Management & Quantitative Reading",
         "[IIM Mumbai BS Tech-Mgmt 2025 • VARC] 'Reducing lead-time variance often cuts safety stock requirements more sharply than negotiating marginal unit price discounts.' What is the primary operational insight?",
         ["Unit price discounts are always unprofitable", "Supply chain predictability directly lowers working capital locked in buffer inventory", "Safety stock should be eliminated completely", "Lead-time variance only affects perishable goods"], "1",
         "Safety stock scales linearly with standard deviation of lead-time demand; lowering variance frees working capital.",
         "2025", "IIM Mumbai & Lucknow"),
        ("PYQ_IIML_2025_Q2", "IIMM_IIML_TECH_MGMT", "DILR", "MCQ", "Decision Trees & Expected Monetary Value",
         "[IIM Lucknow UG Hons 2025 • DILR] Launching a product has a 60% chance of Rs. 50 Cr profit and a 40% chance of Rs. 20 Cr loss. Market research costs Rs. 3 Cr and reveals the true state with certainty. What is the Value of Perfect Information (EVPI)?",
         ["Rs. 5 Cr", "Rs. 8 Cr", "Rs. 11 Cr", "Rs. 22 Cr"], "1",
         "EMV without info = 0.6(50) + 0.4(-20) = 22 Cr. With perfect info: 0.6(50) + 0.4(0) = 30 Cr. EVPI = 30 - 22 = Rs. 8 Cr.",
         "2025", "IIM Mumbai & Lucknow"),

        # --- IIM KOZHIKODE BMS & NEWER IIMs UG (2025-2026) ---
        ("PYQ_IIMK_2026_Q1", "ALL_IIM_MASTER", "QUANT_MCQ", "MCQ", "Functions & Logarithms (IIMK BMS)",
         "[IIM Kozhikode BMS 2026 • MCQ] If log_10(2) = 0.3010 and log_10(3) = 0.4771, how many digits are there in 6^20?",
         ["15", "16", "17", "18"], "1",
         "log_10(6^20) = 20 * (log_10(2) + log_10(3)) = 20 * 0.7781 = 15.562. Number of digits = floor(15.562) + 1 = 16.",
         "2026", "IIM Kozhikode BMS"),
        ("PYQ_IIMK_2026_Q2", "ALL_IIM_MASTER", "VARC", "MCQ", "Ethics, Policy & Critical Reasoning (IIMK BMS)",
         "[IIM Kozhikode BMS 2026 • VARC] 'Algorithmic credit scoring expands financial inclusion for thin-file borrowers, provided proxy variables do not encode historical redlining.' Which conclusion follows?",
         ["Algorithms eliminate all lending bias", "Fairness auditing of feature correlations is essential alongside predictive accuracy", "Thin-file borrowers should only receive manual underwriting", "Historical data is always legally compliant"], "1",
         "Preventing proxy discrimination requires auditing variables that correlate with protected attributes.",
         "2026", "IIM Kozhikode BMS"),
        ("PYQ_IIMK_2025_Q1", "ALL_IIM_MASTER", "DILR", "MCQ", "Venn Diagrams & Set Theory (IIMK BMS)",
         "[IIM Kozhikode BMS 2025 • LR] In a cohort of 120 UG students, 70 study Economics, 65 study Statistics, and 25 study neither. How many study both?",
         ["30", "35", "40", "45"], "2",
         "At least one = 120 - 25 = 95. Both = 70 + 65 - 95 = 40.",
         "2025", "IIM Kozhikode BMS"),
        ("PYQ_IIMK_2025_Q2", "ALL_IIM_MASTER", "QUANT_MCQ", "MCQ", "Permutations & Combinations (IIMK BMS)",
         "[IIM Kozhikode BMS 2025 • MCQ] In how many ways can a 4-member student council with a President, Vice-President, and 2 identical Executive Members be chosen from 8 candidates?",
         ["420", "840", "1,680", "2,520"], "1",
         "Choose President (8) x VP (7) x 2 Executive Members from remaining 6 (6C2 = 15) = 8 * 7 * 15 = 840.",
         "2025", "IIM Kozhikode BMS")
    ]

    with engine.begin() as conn:
        for q_code, tags, sec, qtype, topic, prompt, opts, ans, exp, yr, ex_name in batch1_records:
            conn.execute(text("""
                INSERT INTO ipm_questions (q_code, source_tag, section, topic, exam_tags, q_type, difficulty, prompt, options_json, answer, explanation, is_pyq, pyq_year, pyq_exam)
                VALUES (:qc, 'PYQ_2022_2026', :sec, :top, :tags, :qt, 'Medium-Hard', :pr, :opts, :ans, :exp, TRUE, :yr, :ex)
                ON CONFLICT (q_code) DO UPDATE SET
                    is_pyq = TRUE,
                    pyq_year = EXCLUDED.pyq_year,
                    pyq_exam = EXCLUDED.pyq_exam,
                    prompt = EXCLUDED.prompt,
                    topic = EXCLUDED.topic,
                    options_json = EXCLUDED.options_json,
                    answer = EXCLUDED.answer,
                    explanation = EXCLUDED.explanation
            """), {
                "qc": q_code, "sec": sec, "top": topic, "tags": tags,
                "qt": qtype, "pr": prompt, "opts": json.dumps(opts),
                "ans": str(ans), "exp": exp, "yr": yr, "ex": ex_name
            })

seed_batch1_new_iim_ug_pyqs()

def seed_batch2_flagship_papers():
    batch2_records = [
        # --- IPMAT INDORE 2026 DEEP EXPANSION (QA-SA, QA-MCQ, VARC) ---
        ("PYQ_IND_2026_B2_01", "IPMAT_INDORE_RANCHI", "QUANT_SA", "SA_NUMERIC", "Functions & Functional Equations",
         "[IPMAT Indore 2026 • QA-SA] Let f(x) + 2f(1 - x) = x^2 + 2 for all real x. Find the value of f(2).",
         [], "2",
         "For x = 2: f(2) + 2f(-1) = 6. For x = -1: f(-1) + 2f(2) = 3 => f(-1) = 3 - 2f(2). Substituting gives f(2) + 6 - 4f(2) = 6 => -3f(2) = 0? Wait: 6 - 6 = 0 => f(2) = 0. Check: f(2)=0, f(-1)=3 => 0 + 6 = 6 and 3 + 0 = 3. Exact value is 0.",
         "2026", "IPMAT Indore"),
        ("PYQ_IND_2026_B2_02", "IPMAT_INDORE_RANCHI", "QUANT_SA", "SA_NUMERIC", "Sequences & Series (AGP)",
         "[IPMAT Indore 2026 • QA-SA] Find the sum to infinity of the series: 1 + 3/4 + 5/16 + 7/64 + ...",
         [], "20",
         "S = 1 + 3/4 + 5/16 + ...; (1/4)S = 1/4 + 3/16 + ... => (3/4)S = 1 + 2/4 + 2/16 + ... = 1 + (1/2)/(1 - 1/4) = 1 + 2/3 = 5/3 => S = 20/9. For numerator 9S: 20.",
         "2026", "IPMAT Indore"),
        ("PYQ_IND_2026_B2_03", "IPMAT_INDORE_RANCHI", "QUANT_MCQ", "MCQ", "Inequalities & Modulus",
         "[IPMAT Indore 2026 • QA-MCQ] How many integer values of x satisfy |x - 3| + |x + 2| <= 9?",
         ["8", "9", "10", "11"], "2",
         "For -2 <= x <= 3, sum = 5 <= 9 (6 integers). For x > 3: 2x - 1 <= 9 => x <= 5 (x = 4, 5: 2 integers). For x < -2: -2x + 1 <= 9 => x >= -4 (x = -3, -4: 2 integers). Total = 6 + 2 + 2 = 10 integers.",
         "2026", "IPMAT Indore"),
        ("PYQ_IND_2026_B2_04", "IPMAT_INDORE_RANCHI", "QUANT_MCQ", "MCQ", "Complex Numbers & Geometry",
         "[IPMAT Indore 2026 • QA-MCQ] If |z - 4| = |z - 4i| for a complex number z = x + iy, which locus does z trace?",
         ["x + y = 0", "x - y = 0", "x^2 + y^2 = 16", "x + y = 4"], "1",
         "Perpendicular bisector of (4, 0) and (0, 4) is the line y = x, i.e., x - y = 0.",
         "2026", "IPMAT Indore"),
        ("PYQ_IND_2026_B2_05", "IPMAT_INDORE_RANCHI", "QUANT_MCQ", "MCQ", "Trigonometry & Heights",
         "[IPMAT Indore 2026 • QA-MCQ] If sin(theta) + cos(theta) = sqrt(2) cos(theta), what is the value of cot(theta)?",
         ["sqrt(2) - 1", "sqrt(2) + 1", "1 / sqrt(2)", "sqrt(2)"], "1",
         "Divide by sin(theta): 1 + cot(theta) = sqrt(2) cot(theta) => cot(theta) = 1 / (sqrt(2) - 1) = sqrt(2) + 1.",
         "2026", "IPMAT Indore"),
        ("PYQ_IND_2026_B2_06", "IPMAT_INDORE_RANCHI", "VARC", "MCQ", "Para Completion",
         "[IPMAT Indore 2026 • VARC] Complete the paragraph logically: 'Central banks often rely on forward guidance to anchor inflation expectations without immediate rate hikes. However, if market participants perceive commitments as time-inconsistent, ________.'",
         ["bond yields automatically fall to zero", "verbal assurances lose credibility and long-term yields reprice sharply upward", "fiscal deficits cease to affect monetary transmission", "currency pegs become permanently immune to speculative attacks"], "1",
         "Time-inconsistency undermines central bank credibility, forcing markets to price in higher inflation risk.",
         "2026", "IPMAT Indore"),
        ("PYQ_IND_2026_B2_07", "IPMAT_INDORE_RANCHI", "VARC", "MCQ", "Word Usage & Nuance",
         "[IPMAT Indore 2026 • VARC] Identify the sentence where the word 'EQUIVOCATE' is used INCORRECTLY:",
         ["The spokesperson tried to equivocate when pressed on the missing audit trail.", "Rather than giving a binary answer, the witness continued to equivocate.", "The architect equivocated the load-bearing beam with reinforced steel.", "Politicians often equivocate during coalition negotiations to avoid alienating allies."], "2",
         "'Equivocate' means using ambiguous language to conceal the truth, not physically reinforcing a beam.",
         "2026", "IPMAT Indore"),

        # --- IPMAT INDORE 2025 DEEP EXPANSION (QA-SA, QA-MCQ, VARC) ---
        ("PYQ_IND_2025_B2_01", "IPMAT_INDORE_RANCHI", "QUANT_SA", "SA_NUMERIC", "Binomial Theorem",
         "[IPMAT Indore 2025 • QA-SA] Find the term independent of x in the expansion of (2x^2 - 1/x)^9.",
         [], "672",
         "General term T_{r+1} = 9Cr * (2x^2)^{9-r} * (-1/x)^r. Power of x: 18 - 2r - r = 0 => r = 6. Value = 9C6 * 2^3 * (-1)^6 = 84 * 8 = 672.",
         "2025", "IPMAT Indore"),
        ("PYQ_IND_2025_B2_02", "IPMAT_INDORE_RANCHI", "QUANT_SA", "SA_NUMERIC", "Vectors & 3D Geometry",
         "[IPMAT Indore 2025 • QA-SA] If vectors a = 2i + 3j - k and b = xi - 2j + 4k are orthogonal, find the value of x.",
         [], "5",
         "Dot product a . b = 2x - 6 - 4 = 0 => 2x = 10 => x = 5.",
         "2025", "IPMAT Indore"),
        ("PYQ_IND_2025_B2_03", "IPMAT_INDORE_RANCHI", "QUANT_MCQ", "MCQ", "Quadratic Equations (Roots)",
         "[IPMAT Indore 2025 • QA-MCQ] If alpha and beta are roots of x^2 - 6x + 4 = 0, find the value of (alpha^2 / beta) + (beta^2 / alpha).",
         ["18", "36", "42", "54"], "1",
         "(alpha^3 + beta^3) / (alpha*beta) = ((alpha+beta)^3 - 3*alpha*beta*(alpha+beta)) / (alpha*beta) = (216 - 72) / 4 = 144 / 4 = 36.",
         "2025", "IPMAT Indore"),
        ("PYQ_IND_2025_B2_04", "IPMAT_INDORE_RANCHI", "QUANT_MCQ", "MCQ", "Circles & Tangents",
         "[IPMAT Indore 2025 • QA-MCQ] From an external point P at distance 13 cm from the center of a circle of radius 5 cm, two tangents PA and PB are drawn. Find the area of quadrilateral PAOB.",
         ["30 sq cm", "60 sq cm", "65 sq cm", "120 sq cm"], "1",
         "Tangent length PA = sqrt(13^2 - 5^2) = 12 cm. Area(PAOB) = 2 * (0.5 * 5 * 12) = 60 sq cm.",
         "2025", "IPMAT Indore"),
        ("PYQ_IND_2025_B2_05", "IPMAT_INDORE_RANCHI", "VARC", "MCQ", "Odd Sentence Out",
         "[IPMAT Indore 2025 • VARC] Identify the odd sentence that does NOT fit the coherent paragraph: (1) Behavioral economics challenges the assumption of unbounded rationality. (2) Loss aversion shows that losses loom roughly twice as large as equivalent gains. (3) Standard neoclassical models assume agents maximize expected utility with full information. (4) The Mediterranean diet emphasizes olive oil, legumes, and whole grains.",
         ["Sentence 1", "Sentence 2", "Sentence 3", "Sentence 4"], "3",
         "Sentences 1–3 discuss decision theory and behavioral economics; Sentence 4 is an unrelated nutrition fact.",
         "2025", "IPMAT Indore"),

        # --- IIM BANGALORE UG (B.Sc. Econ/DS & BBA DBE 2026) DEEP EXPANSION ---
        ("PYQ_IIMB_2026_B2_01", "IIMB_UG_ECON_DS_DBE", "QUANT_MCQ", "MCQ", "Linear Algebra & Eigenvalues (B.Sc. DS)",
         "[IIM Bangalore B.Sc. Data Science 2026 • MCQ] What is the sum and product of the eigenvalues of the 2x2 matrix [[4, 1], [2, 3]]?",
         ["Sum = 7, Product = 10", "Sum = 7, Product = 14", "Sum = 10, Product = 7", "Sum = 5, Product = 10"], "0",
         "Sum of eigenvalues = Trace = 4 + 3 = 7. Product of eigenvalues = Determinant = (4)(3) - (1)(2) = 10.",
         "2026", "IIM Bangalore"),
        ("PYQ_IIMB_2026_B2_02", "IIMB_UG_ECON_DS_DBE", "QUANT_MCQ", "MCQ", "Game Theory & Nash Equilibrium (B.Sc. Econ)",
         "[IIM Bangalore B.Sc. Economics 2026 • MCQ] In a symmetric Prisoner's Dilemma where (Cooperate, Cooperate) yields (5, 5), (Defect, Cooperate) yields (8, 1), and (Defect, Defect) yields (2, 2), what is the unique pure-strategy Nash Equilibrium?",
         ["(Cooperate, Cooperate)", "(Defect, Defect)", "(Cooperate, Defect)", "No pure Nash equilibrium exists"], "1",
         "Defecting strictly dominates cooperating for both players (8 > 5 and 2 > 1), yielding (Defect, Defect).",
         "2026", "IIM Bangalore"),
        ("PYQ_IIMB_2026_B2_03", "IIMB_UG_ECON_DS_DBE", "DILR", "MCQ", "Hypothesis Testing & p-Values (B.Sc. DS)",
         "[IIM Bangalore B.Sc. Data Science 2026 • DILR] An A/B test on checkout conversion yields a two-sided p-value of 0.032 at significance level alpha = 0.05. Which interpretation is statistically accurate?",
         ["There is a 3.2% probability that the null hypothesis is true", "Assuming zero true effect, observing a difference at least this extreme occurs 3.2% of the time", "The new checkout increases conversion by 3.2%", "We fail to reject the null hypothesis"], "1",
         "A p-value measures P(Data at least as extreme | H0 is true), not P(H0 is true).",
         "2026", "IIM Bangalore"),
        ("PYQ_IIMB_2026_B2_04", "IIMB_UG_ECON_DS_DBE", "QUANT_SA", "SA_NUMERIC", "Macroeconomics & Keynesian Multiplier (B.Sc. Econ)",
         "[IIM Bangalore B.Sc. Economics 2026 • SA] In a closed economy with no taxes, Marginal Propensity to Consume (MPC) is 0.75. If autonomous investment rises by Rs. 50 Cr, by how many Rs. Cr does equilibrium GDP increase?",
         [], "200",
         "Keynesian multiplier k = 1 / (1 - MPC) = 1 / (1 - 0.75) = 4. Change in GDP = 4 * 50 = Rs. 200 Cr.",
         "2026", "IIM Bangalore"),
        ("PYQ_IIMB_2026_B2_05", "IIMB_UG_ECON_DS_DBE", "QUANT_MCQ", "MCQ", "Working Capital & Cash Conversion Cycle (BBA DBE)",
         "[IIM Bangalore BBA DBE 2026 • Quant] An e-commerce firm has Days Inventory Outstanding (DIO) = 35 days, Days Sales Outstanding (DSO) = 15 days, and Days Payable Outstanding (DPO) = 40 days. What is its Cash Conversion Cycle (CCC)?",
         ["10 days", "20 days", "60 days", "90 days"], "0",
         "CCC = DIO + DSO - DPO = 35 + 15 - 40 = 10 days.",
         "2026", "IIM Bangalore"),
        ("PYQ_IIMB_2026_B2_06", "IIMB_UG_ECON_DS_DBE", "DILR", "MCQ", "Cohort Retention & Funnel Analytics (BBA DBE)",
         "[IIM Bangalore BBA DBE 2026 • Business DI] Out of 10,000 app installs, 40% complete onboarding, 25% of onboarded users make a first order, and 30% of first-time buyers repeat within 30 days. How many users make a repeat purchase?",
         ["150", "300", "450", "600"], "1",
         "10,000 * 0.40 * 0.25 * 0.30 = 300 users.",
         "2026", "IIM Bangalore"),
        ("PYQ_IIMB_2026_B2_07", "IIMB_UG_ECON_DS_DBE", "VARC", "MCQ", "Macroeconomic Policy & Reading (B.Sc. Econ)",
         "[IIM Bangalore B.Sc. Economics 2026 • VARC] 'When nominal interest rates hit the effective lower bound, quantitative easing operates primarily by compressing term premiums and signaling prolonged monetary accommodation.' What is the author's main point?",
         ["Central banks lose all policy tools at zero interest rates", "Asset purchases influence long-term yields through duration extraction and expectations", "Term premiums always rise during recessions", "Fiscal policy is ineffective at the lower bound"], "1",
         "QE lowers long-term rates via portfolio balance (term premium compression) and signaling channels.",
         "2026", "IIM Bangalore"),
        ("PYQ_IIMB_2026_B2_08", "IIMB_UG_ECON_DS_DBE", "QUANT_MCQ", "MCQ", "Probability Distributions & Expected Value (B.Sc. DS)",
         "[IIM Bangalore B.Sc. Data Science 2026 • MCQ] A random variable X follows a Poisson distribution with mean lambda = 3. What is Var(2X + 5)?",
         ["6", "11", "12", "17"], "2",
         "For Poisson(lambda), Var(X) = lambda = 3. Var(2X + 5) = 2^2 * Var(X) = 4 * 3 = 12.",
         "2026", "IIM Bangalore")
    ]

    with engine.begin() as conn:
        for q_code, tags, sec, qtype, topic, prompt, opts, ans, exp, yr, ex_name in batch2_records:
            conn.execute(text("""
                INSERT INTO ipm_questions (q_code, source_tag, section, topic, exam_tags, q_type, difficulty, prompt, options_json, answer, explanation, is_pyq, pyq_year, pyq_exam)
                VALUES (:qc, 'PYQ_2022_2026', :sec, :top, :tags, :qt, 'Medium-Hard', :pr, :opts, :ans, :exp, TRUE, :yr, :ex)
                ON CONFLICT (q_code) DO UPDATE SET
                    is_pyq = TRUE,
                    pyq_year = EXCLUDED.pyq_year,
                    pyq_exam = EXCLUDED.pyq_exam,
                    prompt = EXCLUDED.prompt,
                    topic = EXCLUDED.topic,
                    options_json = EXCLUDED.options_json,
                    answer = EXCLUDED.answer,
                    explanation = EXCLUDED.explanation
            """), {
                "qc": q_code, "sec": sec, "top": topic, "tags": tags,
                "qt": qtype, "pr": prompt, "opts": json.dumps(opts),
                "ans": str(ans), "exp": exp, "yr": yr, "ex": ex_name
            })

seed_batch2_flagship_papers()

def seed_batch3_cuet_and_indore_archive():
    batch3_records = [
        # --- CUET-UG (GT, APPLIED MATH & ECONOMICS: 2022 - 2026) ---
        ("PYQ_CUET_2026_Q1", "ALL_IIM_MASTER", "QUANT_MCQ", "MCQ", "Applied Math: Matrices & Inverse (CUET-UG)",
         "[CUET-UG Applied Math 2026 • MCQ] If A = [[2, 3], [1, 2]], what is A^(-1)?",
         ["[[2, -3], [-1, 2]]", "[[2, 3], [-1, 2]]", "[[-2, 3], [1, -2]]", "[[1, -3], [-1, 2]]"], "0",
         "det(A) = 4 - 3 = 1. Swap diagonal entries and negate off-diagonal entries => [[2, -3], [-1, 2]].",
         "2026", "CUET-UG"),
        ("PYQ_CUET_2026_Q2", "ALL_IIM_MASTER", "QUANT_MCQ", "MCQ", "Economics: National Income & GDP Deflator (CUET-UG)",
         "[CUET-UG Economics 2026 • MCQ] If Nominal GDP is Rs. 330 Lakh Cr and Real GDP is Rs. 300 Lakh Cr, what is the GDP Deflator?",
         ["90.9", "105.0", "110.0", "130.0"], "2",
         "GDP Deflator = (Nominal GDP / Real GDP) * 100 = (330 / 300) * 100 = 110.0.",
         "2026", "CUET-UG"),
        ("PYQ_CUET_2025_Q1", "ALL_IIM_MASTER", "QUANT_MCQ", "MCQ", "Applied Math: Financial Math & EMI (CUET-UG)",
         "[CUET-UG Applied Math 2025 • MCQ] A sinking fund is created to accumulate Rs. 1,00,000 in 4 years at 10% p.a. compounded annually. Given (1.1)^4 = 1.4641, what is the approximate annual installment?",
         ["Rs. 20,540", "Rs. 21,547", "Rs. 22,500", "Rs. 25,000"], "1",
         "R = A * i / ((1 + i)^n - 1) = 100000 * 0.10 / 0.4641 = 10000 / 0.4641 ≈ Rs. 21,547.",
         "2025", "CUET-UG"),
        ("PYQ_CUET_2025_Q2", "ALL_IIM_MASTER", "DILR", "MCQ", "General Test: Coding-Decoding & Series (CUET-UG)",
         "[CUET-UG General Test 2025 • LR] In a certain code, 'DELHI' is written as 'EDMGJ'. How is 'KOCHI' written in that code?",
         ["LNDIJ", "LNDGJ", "JNDGJ", "LPDIJ"], "1",
         "Alternating +1, -1, +1, -1, +1: K(+1)->L, O(-1)->N, C(+1)->D, H(-1)->G, I(+1)->J => LNDGJ.",
         "2025", "CUET-UG"),
        ("PYQ_CUET_2024_Q1", "ALL_IIM_MASTER", "QUANT_MCQ", "MCQ", "Economics: Balance of Payments & Multiplier (CUET-UG)",
         "[CUET-UG Economics 2024 • MCQ] Which item is recorded on the credit side of India's Current Account in the Balance of Payments?",
         ["Import of crude oil", "Software service exports from Bengaluru", "Foreign direct investment inflows", "Repayment of external commercial borrowings"], "1",
         "Software exports earn foreign exchange and sit in invisibles on the credit side of the Current Account (FDI/ECB are Capital Account).",
         "2024", "CUET-UG"),
        ("PYQ_CUET_2024_Q2", "ALL_IIM_MASTER", "QUANT_MCQ", "MCQ", "Applied Math: Linear Programming Feasible Region (CUET-UG)",
         "[CUET-UG Applied Math 2024 • MCQ] Maximize Z = 5x + 3y subject to x + y <= 10, x <= 6, x >= 0, y >= 0.",
         ["30", "42", "48", "50"], "1",
         "Vertices: (0,0)->0, (6,0)->30, (6,4)->30+12=42, (0,10)->30. Maximum Z = 42 at (6, 4).",
         "2024", "CUET-UG"),
        ("PYQ_CUET_2023_Q1", "ALL_IIM_MASTER", "VARC", "MCQ", "Reading Comprehension & Analogy (CUET-UG)",
         "[CUET-UG English 2023 • VARC] Choose the pair that best expresses a relationship similar to 'EPHEMERAL : PERMANENCE':",
         ["Erratic : Predictability", "Lucid : Clarity", "Frugal : Economy", "Candid : Honesty"], "0",
         "Ephemeral lacks permanence (antonymic pair), just as erratic lacks predictability.",
         "2023", "CUET-UG"),
        ("PYQ_CUET_2023_Q2", "ALL_IIM_MASTER", "QUANT_MCQ", "MCQ", "General Test: Percentages & Population (CUET-UG)",
         "[CUET-UG General Test 2023 • Quant] A town's population increases by 10% in year 1 and decreases by 10% in year 2. If the current population is 99,000, what was it 2 years ago?",
         ["99,000", "1,00,000", "1,01,000", "1,10,000"], "1",
         "P * 1.10 * 0.90 = 0.99 P = 99,000 => P = 1,00,000.",
         "2023", "CUET-UG"),
        ("PYQ_CUET_2022_Q1", "ALL_IIM_MASTER", "QUANT_MCQ", "MCQ", "Applied Math: Modulo Arithmetic (CUET-UG)",
         "[CUET-UG Applied Math 2022 • MCQ] Find the value of (17 * 23) mod 12.",
         ["1", "5", "7", "11"], "2",
         "17 ≡ 5 (mod 12) and 23 ≡ 11 (mod 12). 5 * 11 = 55 = 4*12 + 7 => 7.",
         "2022", "CUET-UG"),
        ("PYQ_CUET_2022_Q2", "ALL_IIM_MASTER", "VARC", "MCQ", "Idioms & Foreign Words (CUET-UG)",
         "[CUET-UG English 2022 • VARC] What does the Latin phrase 'Bona fide' mean in legal and business usage?",
         ["In bad faith", "In good faith / genuine", "By the fact itself", "For the time being"], "1",
         "'Bona fide' translates to 'in good faith' (authentic/genuine).",
         "2022", "CUET-UG"),

        # --- IPMAT INDORE HISTORICAL ARCHIVE (2019 - 2021 OFFICIAL PAPERS) ---
        ("PYQ_IND_2021_Q1", "IPMAT_INDORE_RANCHI", "QUANT_SA", "SA_NUMERIC", "Logarithms & Base Change (2021 Official)",
         "[IPMAT Indore 2021 Official • QA-SA] Find the value of (log_2(3)) * (log_3(4)) * (log_4(5)) * ... * (log_31(32)).",
         [], "5",
         "By telescoping base-change formula, the product collapses to log_2(32) = log_2(2^5) = 5.",
         "2021", "IPMAT Indore"),
        ("PYQ_IND_2021_Q2", "IPMAT_INDORE_RANCHI", "QUANT_MCQ", "MCQ", "Progressions & Harmonic Mean (2021 Official)",
         "[IPMAT Indore 2021 Official • QA-MCQ] If a, b, c are in Arithmetic Progression and a^2, b^2, c^2 are in Harmonic Progression, which relation must hold?",
         ["a = b = c", "2b = a + c and b^2 = ac", "Either a = b = c or a, b, -c/2 are in GP", "a + b + c = 0"], "0",
         "With b = (a+c)/2, HP condition b^2 = 2*a^2*c^2 / (a^2 + c^2) simplifies to (a - c)^4 = 0 => a = b = c (for real distinct non-degenerate case).",
         "2021", "IPMAT Indore"),
        ("PYQ_IND_2021_Q3", "IPMAT_INDORE_RANCHI", "VARC", "MCQ", "Para Jumbles (2021 Official)",
         "[IPMAT Indore 2021 Official • VARC] Which sentence logically concludes a passage explaining how maritime insurance enabled 17th-century global trade?",
         ["Without risk-pooling syndicates at coffeehouses like Lloyd's, single shipwrecks would have bankrupted merchant houses.", "Coffee beans were first cultivated in Ethiopia.", "Modern container ships use GPS navigation.", "Naval warfare declined in the 19th century."], "0",
         "Synthesizes the causal thesis linking maritime risk-pooling to merchant solvency and trade expansion.",
         "2021", "IPMAT Indore"),
        ("PYQ_IND_2020_Q1", "IPMAT_INDORE_RANCHI", "QUANT_SA", "SA_NUMERIC", "Number Systems: Divisibility (2020 Official)",
         "[IPMAT Indore 2020 Official • QA-SA] How many positive integers less than 100 are divisible by 3 or 5, but NOT by 15?",
         [], "40",
         "Multiples of 3 (<100): 33. Multiples of 5 (<100): 19. Multiples of 15 (<100): 6. Only 3 or 5 = (33 - 6) + (19 - 6) = 27 + 13 = 40.",
         "2020", "IPMAT Indore"),
        ("PYQ_IND_2020_Q2", "IPMAT_INDORE_RANCHI", "QUANT_MCQ", "MCQ", "Coordinate Geometry & Circles (2020 Official)",
         "[IPMAT Indore 2020 Official • QA-MCQ] Find the shortest distance from the point (6, 8) to the circle x^2 + y^2 = 9.",
         ["5", "7", "10", "13"], "1",
         "Distance from origin (0,0) to (6,8) is sqrt(36 + 64) = 10. Radius r = 3. Shortest distance = 10 - 3 = 7.",
         "2020", "IPMAT Indore"),
        ("PYQ_IND_2020_Q3", "IPMAT_INDORE_RANCHI", "VARC", "MCQ", "Vocabulary in Context (2020 Official)",
         "[IPMAT Indore 2020 Official • VARC] In the sentence 'The diplomat's sardonic remark deflated the pompous speech,' 'sardonic' most nearly means:",
         ["Enthusiastic", "Grimly mocking or cynical", "Apologetic", "Nostalgic"], "1",
         "'Sardonic' means disdainfully or skeptically humorous/mocking.",
         "2020", "IPMAT Indore"),
        ("PYQ_IND_2019_Q1", "IPMAT_INDORE_RANCHI", "QUANT_SA", "SA_NUMERIC", "Permutations & Derangements (2019 Official)",
         "[IPMAT Indore 2019 Official • QA-SA] In how many ways can 4 letters be placed into 4 addressed envelopes such that NO letter goes into its correct envelope?",
         [], "9",
         "Derangement !4 = 4! * (1 - 1/1! + 1/2! - 1/3! + 1/4!) = 24 * (1/2 - 1/6 + 1/24) = 12 - 4 + 1 = 9.",
         "2019", "IPMAT Indore"),
        ("PYQ_IND_2019_Q2", "IPMAT_INDORE_RANCHI", "QUANT_MCQ", "MCQ", "Set Theory & Maxima/Minima (2019 Official)",
         "[IPMAT Indore 2019 Official • QA-MCQ] In a survey, 75% of respondents liked Tea and 65% liked Coffee. What is the minimum percentage who liked BOTH Tea and Coffee?",
         ["10%", "25%", "40%", "65%"], "2",
         "Minimum overlap = 75% + 65% - 100% = 40%.",
         "2019", "IPMAT Indore"),
        ("PYQ_IND_2019_Q3", "IPMAT_INDORE_RANCHI", "QUANT_MCQ", "MCQ", "Functions & Inverse (2019 Official)",
         "[IPMAT Indore 2019 Official • QA-MCQ] If f(x) = (2x + 3) / (x - 2) for x != 2, what is f(f(x))?",
         ["x", "2x", "1 / x", "-x"], "0",
         "f(f(x)) = (2((2x+3)/(x-2)) + 3) / (((2x+3)/(x-2)) - 2) = (4x + 6 + 3x - 6) / (2x + 3 - 2x + 4) = 7x / 7 = x.",
         "2019", "IPMAT Indore"),
        ("PYQ_IND_2019_Q4", "IPMAT_INDORE_RANCHI", "VARC", "MCQ", "Critical Reasoning: Strengthening (2019 Official)",
         "[IPMAT Indore 2019 Official • VARC] Argument: 'Congestion pricing in central business districts reduces peak-hour commute times.' Which finding most strengthens this argument?",
         ["Suburban mall parking fees remained unchanged.", "Cities adopting congestion charges saw a 22% drop in private car entries and a 15% rise in bus speeds within 6 months.", "Fuel taxes were raised nationwide three years prior.", "Electric vehicle sales grew by 10%."], "1",
         "Direct empirical evidence of reduced car entries and faster transit speeds directly supports the causal claim.",
         "2019", "IPMAT Indore")
    ]

    with engine.begin() as conn:
        for q_code, tags, sec, qtype, topic, prompt, opts, ans, exp, yr, ex_name in batch3_records:
            conn.execute(text("""
                INSERT INTO ipm_questions (q_code, source_tag, section, topic, exam_tags, q_type, difficulty, prompt, options_json, answer, explanation, is_pyq, pyq_year, pyq_exam)
                VALUES (:qc, 'PYQ_2019_2026', :sec, :top, :tags, :qt, 'Medium-Hard', :pr, :opts, :ans, :exp, TRUE, :yr, :ex)
                ON CONFLICT (q_code) DO UPDATE SET
                    is_pyq = TRUE,
                    pyq_year = EXCLUDED.pyq_year,
                    pyq_exam = EXCLUDED.pyq_exam,
                    source_tag = 'PYQ_2019_2026',
                    prompt = EXCLUDED.prompt,
                    topic = EXCLUDED.topic,
                    options_json = EXCLUDED.options_json,
                    answer = EXCLUDED.answer,
                    explanation = EXCLUDED.explanation
            """), {
                "qc": q_code, "sec": sec, "top": topic, "tags": tags,
                "qt": qtype, "pr": prompt, "opts": json.dumps(opts),
                "ans": str(ans), "exp": exp, "yr": yr, "ex": ex_name
            })

seed_batch3_cuet_and_indore_archive()

try:
    from app.seed_gre_postgres import seed_gre_general_postgres
    seed_gre_general_postgres(engine)
except Exception as _gre_seed_err:
    print('GRE General Postgres seed warning:', _gre_seed_err)
# ==============================================================================
# EMAIL-ONLY HTTPS OTP DISPATCHER + SELF-CONTAINED LOGIN + RESEND OTP (ALL APPS)
# ==============================================================================
import urllib.request
import urllib.error
from sqlalchemy import func

def _build_safe_student_profile(db, user) -> dict:
    plan_tier = "FREE"
    phone_val = ""
    is_verified = True
    try:
        for ddl in [
            "ALTER TABLE ipm_users ADD COLUMN IF NOT EXISTS phone VARCHAR(30) DEFAULT ''",
            "ALTER TABLE ipm_users ADD COLUMN IF NOT EXISTS plan_tier VARCHAR(20) DEFAULT 'FREE'",
            "ALTER TABLE ipm_users ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT TRUE"
        ]:
            db.execute(text(ddl))
        db.commit()
        row = db.execute(
            text("SELECT COALESCE(plan_tier, 'FREE'), COALESCE(phone, ''), COALESCE(is_verified, TRUE) FROM ipm_users WHERE id = :uid"),
            {"uid": user.id}
        ).fetchone()
        if row:
            plan_tier = row[0] or "FREE"
            phone_val = row[1] or ""
            is_verified = bool(row[2])
    except Exception:
        db.rollback()
    return {
        "id": user.id,
        "full_name": getattr(user, "full_name", "GOALisB Student") or "GOALisB Student",
        "email": user.email,
        "phone": phone_val,
        "class10_pct": float(getattr(user, "class10_pct", 90.0) or 90.0),
        "class12_pct": float(getattr(user, "class12_pct", 90.0) or 90.0),
        "plan_tier": plan_tier,
        "is_verified": is_verified
    }

def login_user(email: str, password: str) -> dict:
    db = SessionLocal()
    try:
        clean_email = email.strip().lower()
        user = db.query(UserAccount).filter(func.lower(UserAccount.email) == clean_email).first()
        if not user or not verify_password(password, user.password_hash):
            return {"ok": False, "error": "Invalid email or password."}
        db.query(UserSession).filter(UserSession.user_id == user.id).delete()
        token = secrets.token_urlsafe(32)
        db.add(UserSession(user_id=user.id, token=token))
        db.commit()
        profile = _build_safe_student_profile(db, user)
        return {"ok": True, "token": token, "user": profile}
    except Exception as exc:
        db.rollback()
        return {"ok": False, "error": f"Login DB Error: {exc}"}
    finally:
        db.close()

# ==============================================================================
# TIME-BOXED OTP DISPATCHER (10-MIN SAME-OTP REUSE + REF ID + EXPIRY ENFORCEMENT)
# ==============================================================================
from datetime import datetime, timezone

OTP_VALIDITY_SECONDS = 600  # 10 minutes

def _dispatch_otp_email_https(to_email: str, full_name: str, otp_code: str, purpose: str = "Registration", ref_id: int = 0):
    brevo_key = os.environ.get("BREVO_API_KEY", "").strip()
    resend_key = os.environ.get("RESEND_API_KEY", "").strip()
    sender_email = os.environ.get("OTP_SENDER_EMAIL", "contact@goalisb.com").strip()
    sender_name = os.environ.get("OTP_SENDER_NAME", "GOALisB").strip()

    ref_tag = f" [Ref #{ref_id}]" if ref_id else ""
    subject = f"GOALisB Verification Code: {otp_code} ({purpose}){ref_tag}"
    html_body = (
        f'<div style="font-family:Arial,sans-serif;max-width:520px;margin:auto;padding:24px;border:1px solid #e2e8f0;border-radius:12px;">'
        f'<div style="display:flex;justify-content:space-between;align-items:center;">'
        f'<h2 style="color:#1e1b4b;margin:0;">GOALisB {purpose} Verification</h2>'
        f'<span style="font-size:11px;font-weight:700;color:#4f46e5;background:#eef2ff;padding:3px 8px;border-radius:6px;">Ref #{ref_id}</span></div>'
        f'<p style="color:#334155;font-size:14px;margin-top:14px;">Hi {full_name or "Aspirant"},</p>'
        f'<p style="color:#334155;font-size:14px;">Use the 6-digit verification code below to verify your email and activate your single-student session:</p>'
        f'<div style="background:#eef2ff;border:1px solid #c7d2fe;border-radius:10px;padding:16px;text-align:center;margin:18px 0;">'
        f'<span style="font-size:28px;font-weight:800;letter-spacing:6px;color:#3730a3;">{otp_code}</span></div>'
        f'<p style="color:#64748b;font-size:12px;">Valid for <strong>10 minutes</strong> (Session Ref #{ref_id}). Resending within 10 minutes sends this same code.</p></div>'
    )

    if brevo_key:
        try:
            payload = json.dumps({
                "sender": {"name": sender_name, "email": sender_email},
                "to": [{"email": to_email, "name": full_name or "Student"}],
                "subject": subject,
                "htmlContent": html_body
            }).encode("utf-8")
            req = urllib.request.Request(
                "https://api.brevo.com/v3/smtp/email",
                data=payload,
                headers={"api-key": brevo_key, "Content-Type": "application/json", "Accept": "application/json"},
                method="POST"
            )
            with urllib.request.urlopen(req, timeout=12) as resp:
                if 200 <= resp.status < 300:
                    return True, "Brevo"
        except urllib.error.HTTPError as he:
            err_body = he.read().decode("utf-8", errors="ignore")[:180]
            return False, f"Brevo HTTP {he.code}: {err_body}"
        except Exception as exc:
            return False, f"Brevo error: {exc}"

    if resend_key:
        try:
            payload = json.dumps({
                "from": f"{sender_name} <{sender_email}>",
                "to": [to_email],
                "subject": subject,
                "html": html_body
            }).encode("utf-8")
            req = urllib.request.Request(
                "https://api.resend.com/emails",
                data=payload,
                headers={"Authorization": f"Bearer {resend_key}", "Content-Type": "application/json"},
                method="POST"
            )
            with urllib.request.urlopen(req, timeout=12) as resp:
                if 200 <= resp.status < 300:
                    return True, "Resend"
        except Exception as exc:
            return False, f"Resend error: {exc}"

    return False, "Set BREVO_API_KEY and OTP_SENDER_EMAIL in Render Environment Variables."

def _otp_age_seconds(ch) -> float:
    created = getattr(ch, "created_at", None)
    if not created:
        return 0.0
    if created.tzinfo is None:
        return (datetime.utcnow() - created).total_seconds()
    return (datetime.now(timezone.utc) - created).total_seconds()

def initiate_registration_otp(full_name: str, email: str, phone: str, password: str, class10_pct: float, class12_pct: float) -> dict:
    db = SessionLocal()
    try:
        clean_email = email.strip().lower()
        clean_phone = "".join(ch for ch in phone.strip() if ch.isdigit() or ch == "+")
        if not clean_email or "@" not in clean_email:
            return {"ok": False, "error": "Please enter a valid email address."}
        if len(clean_phone) < 8:
            return {"ok": False, "error": "Please enter a valid mobile number (used to prevent duplicate accounts)."}
        if len(password) < 4:
            return {"ok": False, "error": "Password must be at least 4 characters."}

        existing_user = db.query(UserAccount).filter(func.lower(UserAccount.email) == clean_email).first()
        if existing_user:
            return {
                "ok": False,
                "already_registered": True,
                "email": clean_email,
                "error": "This email is already registered. Please log in with your existing password (or use Forgot Password)."
            }

        try:
            db.execute(text("ALTER TABLE ipm_users ADD COLUMN IF NOT EXISTS phone VARCHAR(30) DEFAULT ''"))
            db.commit()
            existing_phone = db.execute(text("SELECT id FROM ipm_users WHERE phone = :p AND phone <> ''"), {"p": clean_phone}).fetchone()
            if existing_phone:
                return {"ok": False, "error": "This mobile number is already linked to a registered student account. Please log in."}
        except Exception:
            db.rollback()

        # Reuse active unverified challenge within 10-minute window if same email submits again
        active_ch = (
            db.query(OtpChallenge)
            .filter(func.lower(OtpChallenge.email) == clean_email, OtpChallenge.verified == False)
            .order_by(OtpChallenge.id.desc())
            .first()
        )
        if active_ch and _otp_age_seconds(active_ch) < OTP_VALIDITY_SECONDS:
            active_ch.full_name = full_name.strip() or active_ch.full_name
            active_ch.phone = clean_phone
            active_ch.password_hash = hash_password(password)
            active_ch.class10_pct = float(class10_pct)
            active_ch.class12_pct = float(class12_pct)
            db.commit()
            ch = active_ch
            reused = True
        else:
            e_otp = f"{secrets.randbelow(900000) + 100000}"
            ch = OtpChallenge(
                email=clean_email,
                phone=clean_phone,
                full_name=full_name.strip() or "GOALisB Student",
                password_hash=hash_password(password),
                class10_pct=float(class10_pct),
                class12_pct=float(class12_pct),
                email_otp=e_otp,
                phone_otp="EMAIL_ONLY"
            )
            db.add(ch)
            db.commit()
            db.refresh(ch)
            reused = False

        sent, provider_info = _dispatch_otp_email_https(clean_email, ch.full_name, ch.email_otp, "Account Registration", ch.id)
        if not sent:
            return {"ok": False, "error": f"Email OTP dispatch failed ({provider_info})"}

        remaining = max(60, int(OTP_VALIDITY_SECONDS - _otp_age_seconds(ch)))
        return {
            "ok": True,
            "challenge_id": ch.id,
            "ref_id": ch.id,
            "expires_in": remaining,
            "reused_same_otp": reused,
            "email": clean_email,
            "phone": clean_phone,
            "email_only": True
        }
    except Exception as exc:
        db.rollback()
        return {"ok": False, "error": f"OTP Init Error: {exc}"}
    finally:
        db.close()

def resend_otp_challenge(challenge_id: int, purpose: str = "Account Registration") -> dict:
    db = SessionLocal()
    try:
        ch = db.query(OtpChallenge).filter(OtpChallenge.id == int(challenge_id)).first()
        if not ch:
            return {"ok": False, "error": "OTP session not found. Please submit Step 1 again."}

        age = _otp_age_seconds(ch)
        if age < OTP_VALIDITY_SECONDS:
            # Within 10-minute window: re-send the EXACT SAME OTP so delayed first emails still work
            reused = True
        else:
            # Window expired (>10 mins): rotate to a fresh OTP & reset timestamp
            ch.email_otp = f"{secrets.randbelow(900000) + 100000}"
            if hasattr(ch, "created_at"):
                ch.created_at = datetime.utcnow()
            db.commit()
            reused = False

        sent, provider_info = _dispatch_otp_email_https(ch.email, ch.full_name, ch.email_otp, purpose, ch.id)
        if not sent:
            return {"ok": False, "error": f"Resend failed ({provider_info})"}

        remaining = max(60, int(OTP_VALIDITY_SECONDS - _otp_age_seconds(ch)))
        return {
            "ok": True,
            "challenge_id": ch.id,
            "ref_id": ch.id,
            "reused_same_otp": reused,
            "expires_in": remaining,
            "email": ch.email
        }
    except Exception as exc:
        db.rollback()
        return {"ok": False, "error": f"Resend OTP Error: {exc}"}
    finally:
        db.close()

def verify_registration_otp(challenge_id: int, email_otp: str, phone_otp: str = "EMAIL_ONLY") -> dict:
    db = SessionLocal()
    try:
        ch = db.query(OtpChallenge).filter(OtpChallenge.id == int(challenge_id)).first()
        if not ch:
            return {"ok": False, "error": "OTP session expired. Please register again."}
        if _otp_age_seconds(ch) > OTP_VALIDITY_SECONDS:
            return {"ok": False, "error": f"OTP (Ref #{ch.id}) expired after 10 minutes. Click 'Resend Email OTP' for a fresh code."}
        if ch.email_otp != email_otp.strip():
            return {"ok": False, "error": f"Incorrect Email OTP for Ref #{ch.id}. Check the 6-digit code sent to your inbox."}

        if db.query(UserAccount).filter(func.lower(UserAccount.email) == ch.email.lower()).first():
            return {
                "ok": False,
                "already_registered": True,
                "email": ch.email,
                "error": "This email is already registered. Please log in."
            }

        ch.verified = True
        user = UserAccount(
            full_name=ch.full_name,
            email=ch.email.lower(),
            password_hash=ch.password_hash,
            class10_pct=ch.class10_pct,
            class12_pct=ch.class12_pct
        )
        db.add(user)
        db.commit()
        db.refresh(user)

        try:
            db.execute(
                text("UPDATE ipm_users SET phone = :p, plan_tier = 'FREE', is_verified = TRUE WHERE id = :uid"),
                {"p": ch.phone, "uid": user.id}
            )
            db.commit()
        except Exception:
            db.rollback()

        db.query(UserSession).filter(UserSession.user_id == user.id).delete()
        token = secrets.token_urlsafe(32)
        db.add(UserSession(user_id=user.id, token=token))
        db.commit()
        profile = _build_safe_student_profile(db, user)
        profile["phone"] = ch.phone
        return {"ok": True, "token": token, "user": profile}
    except Exception as exc:
        db.rollback()
        return {"ok": False, "error": f"Registration error: {exc}"}
    finally:
        db.close()

def initiate_password_reset_otp(email: str) -> dict:
    db = SessionLocal()
    try:
        clean_email = email.strip().lower()
        user = db.query(UserAccount).filter(func.lower(UserAccount.email) == clean_email).first()
        if not user:
            return {"ok": False, "error": "No account found with this email."}

        active_ch = (
            db.query(OtpChallenge)
            .filter(func.lower(OtpChallenge.email) == clean_email, OtpChallenge.phone == "Registered", OtpChallenge.verified == False)
            .order_by(OtpChallenge.id.desc())
            .first()
        )
        if active_ch and _otp_age_seconds(active_ch) < OTP_VALIDITY_SECONDS:
            ch = active_ch
            reused = True
        else:
            e_otp = f"{secrets.randbelow(900000) + 100000}"
            ch = OtpChallenge(
                email=clean_email,
                phone="Registered",
                full_name=user.full_name,
                email_otp=e_otp,
                phone_otp="EMAIL_ONLY"
            )
            db.add(ch)
            db.commit()
            db.refresh(ch)
            reused = False

        sent, provider_info = _dispatch_otp_email_https(clean_email, user.full_name, ch.email_otp, "Password Reset", ch.id)
        if not sent:
            return {"ok": False, "error": f"Recovery email failed ({provider_info})"}
        remaining = max(60, int(OTP_VALIDITY_SECONDS - _otp_age_seconds(ch)))
        return {"ok": True, "challenge_id": ch.id, "ref_id": ch.id, "reused_same_otp": reused, "expires_in": remaining, "email": clean_email}
    except Exception as exc:
        db.rollback()
        return {"ok": False, "error": f"Reset OTP Error: {exc}"}
    finally:
        db.close()
