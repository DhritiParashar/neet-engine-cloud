from fastapi import Request
from typing import Any, Dict, List, Optional
import json
import os
from pathlib import Path
from typing import Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="GOALisB GRE General Master Engine API", version="1.0.0")

# UptimeRobot HEAD & Health Check Support (200 OK)
from fastapi import Response as _UptimeResponse

@app.middleware("http")
async def _uptime_head_middleware(request, call_next):
    if request.method == "HEAD":
        return _UptimeResponse(status_code=200)
    return await call_next(request)

@app.api_route("/health", methods=["GET", "HEAD"])
async def _health_check():
    return {"status": "ok"}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = Path(__file__).resolve().parent.parent
FRONTEND_DIR = BASE_DIR / "frontend"
DATA_DIR = FRONTEND_DIR / "data"
JS_DIR = FRONTEND_DIR / "js"

if DATA_DIR.exists():
    app.mount("/data", StaticFiles(directory=DATA_DIR), name="data")
if JS_DIR.exists():
    app.mount("/js", StaticFiles(directory=JS_DIR), name="js")

def _call_gemini(system_instruction: str, user_prompt: str) -> str:
    api_key = os.getenv("GEMINI_API_KEY", "").strip()
    if not api_key:
        return (
            "[Offline Evaluation Mode - Set GEMINI_API_KEY in Render Environment for live AI grading]\n"
            "1. Structure & Clarity: Ensure your opening sentence directly answers the prompt.\n"
            "2. Analytical Depth: Support claims with concrete data, economic logic, or academic principles.\n"
            "3. IIM Fit: Connect your reasoning to ethical leadership, social awareness, and quantitative rigor."
        )
    try:
        from google import genai
        client = genai.Client(api_key=api_key)
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=f"{system_instruction}\n\n{user_prompt}",
        )
        return response.text or "No response generated."
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f"Gemini evaluation error: {str(exc)}")

class EvaluationRequest(BaseModel):
    track: str
    prompt: str
    student_response: str
    mode: str = "PI_OR_WAT"

class DoubtRequest(BaseModel):
    track: str
    topic: str
    question: str
    student_attempt: Optional[str] = ""

class CallPredictorRequest(BaseModel):
    class10_pct: float
    class12_pct: float
    has_class12_math: bool
    ipmat_indore_sa: Optional[int] = 0
    ipmat_indore_mcq: Optional[int] = 0
    ipmat_indore_va: Optional[int] = 0
    ipmat_rohtak_score: Optional[int] = 0
    jipmat_score: Optional[int] = 0
    iimb_ug_score: Optional[int] = 0
    jee_main_percentile: Optional[float] = 0.0

class RegisterReq(BaseModel):
    full_name: str
    email: str
    password: str
    target_track: str = "ALL_IIM_MASTER"
    category: str = "General"
    class10_pct: float = 90.0
    class12_pct: float = 90.0

class LoginReq(BaseModel):
    email: str
    password: str

class MockGenReq(BaseModel):
    exam_mode: str = "ALL_IIM_MASTER"
    paper_type: str = "FULL_DIAGNOSTIC"
    include_ncert: bool = True
    exclude_codes: List[str] = []

class MockSubmitReq(BaseModel):
    token: Optional[str] = None
    exam_track: str
    paper_type: str
    score: float
    max_score: float
    accuracy_pct: float
    attempted_q_codes: List[str] = []

class ForgotInitReq(BaseModel):
    email: str

class ForgotConfirmReq(BaseModel):
    challenge_id: int
    reset_otp: str
    new_password: str

class RedeemVoucherReq(BaseModel):
    token: str
    code: str

class CreateVoucherReq(BaseModel):
    code: str
    label: str = "Beta Tester Pass"
    valid_days: int = 14
    max_uses: int = 50

@app.get("/")
def serve_home():
    index_file = FRONTEND_DIR / "index.html"
    if not index_file.exists():
        return {"status": "ok", "message": "GOALisB IIM UG & IPM Backend Active. Add frontend/index.html next."}
    return FileResponse(index_file)

class EvaluationRequest(BaseModel):
    track: str
    prompt: str
    student_response: str
    mode: str = "PI_OR_WAT"

class DoubtRequest(BaseModel):
    track: str
    topic: str
    question: str
    student_attempt: Optional[str] = ""

class CallPredictorRequest(BaseModel):
    class10_pct: float
    class12_pct: float
    has_class12_math: bool
    ipmat_indore_sa: Optional[int] = 0
    ipmat_indore_mcq: Optional[int] = 0
    ipmat_indore_va: Optional[int] = 0
    ipmat_rohtak_score: Optional[int] = 0
    jipmat_score: Optional[int] = 0
    iimb_ug_score: Optional[int] = 0
    jee_main_percentile: Optional[float] = 0.0

class RegisterReq(BaseModel):
    full_name: str
    email: str
    password: str
    target_track: str = "ALL_IIM_MASTER"
    category: str = "General"
    class10_pct: float = 90.0
    class12_pct: float = 90.0

class LoginReq(BaseModel):
    email: str
    password: str

class MockGenReq(BaseModel):
    exam_mode: str = "ALL_IIM_MASTER"
    paper_type: str = "FULL_DIAGNOSTIC"
    include_ncert: bool = True
    exclude_codes: List[str] = []

class MockSubmitReq(BaseModel):
    token: Optional[str] = None
    exam_track: str
    paper_type: str
    score: float
    max_score: float
    accuracy_pct: float
    attempted_q_codes: List[str] = []

class ForgotInitReq(BaseModel):
    email: str

class ForgotConfirmReq(BaseModel):
    challenge_id: int
    reset_otp: str
    new_password: str

class RedeemVoucherReq(BaseModel):
    token: str
    code: str

class CreateVoucherReq(BaseModel):
    code: str
    label: str = "Beta Tester Pass"
    valid_days: int = 14
    max_uses: int = 50

class EvaluationRequest(BaseModel):
    track: str
    prompt: str
    student_response: str
    mode: str = "PI_OR_WAT"

class DoubtRequest(BaseModel):
    track: str
    topic: str
    question: str
    student_attempt: Optional[str] = ""

class CallPredictorRequest(BaseModel):
    class10_pct: float
    class12_pct: float
    has_class12_math: bool
    ipmat_indore_sa: Optional[int] = 0
    ipmat_indore_mcq: Optional[int] = 0
    ipmat_indore_va: Optional[int] = 0
    ipmat_rohtak_score: Optional[int] = 0
    jipmat_score: Optional[int] = 0
    iimb_ug_score: Optional[int] = 0
    jee_main_percentile: Optional[float] = 0.0

class RegisterReq(BaseModel):
    full_name: str
    email: str
    password: str
    target_track: str = "ALL_IIM_MASTER"
    category: str = "General"
    class10_pct: float = 90.0
    class12_pct: float = 90.0

class LoginReq(BaseModel):
    email: str
    password: str

class MockGenReq(BaseModel):
    exam_mode: str = "ALL_IIM_MASTER"
    paper_type: str = "FULL_DIAGNOSTIC"
    include_ncert: bool = True
    exclude_codes: List[str] = []

class MockSubmitReq(BaseModel):
    token: Optional[str] = None
    exam_track: str
    paper_type: str
    score: float
    max_score: float
    accuracy_pct: float
    attempted_q_codes: List[str] = []

class ForgotInitReq(BaseModel):
    email: str

class ForgotConfirmReq(BaseModel):
    challenge_id: int
    reset_otp: str
    new_password: str

class RedeemVoucherReq(BaseModel):
    token: str
    code: str

class CreateVoucherReq(BaseModel):
    code: str
    label: str = "Beta Tester Pass"
    valid_days: int = 14
    max_uses: int = 50

@app.post("/api/evaluate")
def evaluate_response(req: EvaluationRequest):
    rubric = (
        "You are an ETS GRE Analytical Writing (0.0-6.0 Holistic Rubric) & Graduate Admissions Evaluator (evaluating candidates for IIM Indore, "
        "IIM Rohtak, IIM Ranchi, IIM Bodh Gaya, IIM Jammu, IIM Bangalore, IIM Mumbai, and IIM Lucknow). "
        "Grade the student's response out of 10 across four criteria: "
        "(1) Structured Communication, (2) Analytical & Quantitative Rigor, "
        "(3) Emotional Intelligence & Ethical Judgment, and (4) Domain/Current Affairs Accuracy. "
        "Provide specific strengths, red flags an IIM panel would grill, and a model 4-sentence answer."
    )
    user_text = f"Target Track: {req.track}\nMode: {req.mode}\nPrompt: {req.prompt}\nStudent Response: {req.student_response}"
    feedback = _call_gemini(rubric, user_text)
    return {"track": req.track, "feedback": feedback}

class EvaluationRequest(BaseModel):
    track: str
    prompt: str
    student_response: str
    mode: str = "PI_OR_WAT"

class DoubtRequest(BaseModel):
    track: str
    topic: str
    question: str
    student_attempt: Optional[str] = ""

class CallPredictorRequest(BaseModel):
    class10_pct: float
    class12_pct: float
    has_class12_math: bool
    ipmat_indore_sa: Optional[int] = 0
    ipmat_indore_mcq: Optional[int] = 0
    ipmat_indore_va: Optional[int] = 0
    ipmat_rohtak_score: Optional[int] = 0
    jipmat_score: Optional[int] = 0
    iimb_ug_score: Optional[int] = 0
    jee_main_percentile: Optional[float] = 0.0

class RegisterReq(BaseModel):
    full_name: str
    email: str
    password: str
    target_track: str = "ALL_IIM_MASTER"
    category: str = "General"
    class10_pct: float = 90.0
    class12_pct: float = 90.0

class LoginReq(BaseModel):
    email: str
    password: str

class MockGenReq(BaseModel):
    exam_mode: str = "ALL_IIM_MASTER"
    paper_type: str = "FULL_DIAGNOSTIC"
    include_ncert: bool = True
    exclude_codes: List[str] = []

class MockSubmitReq(BaseModel):
    token: Optional[str] = None
    exam_track: str
    paper_type: str
    score: float
    max_score: float
    accuracy_pct: float
    attempted_q_codes: List[str] = []

class ForgotInitReq(BaseModel):
    email: str

class ForgotConfirmReq(BaseModel):
    challenge_id: int
    reset_otp: str
    new_password: str

class RedeemVoucherReq(BaseModel):
    token: str
    code: str

class CreateVoucherReq(BaseModel):
    code: str
    label: str = "Beta Tester Pass"
    valid_days: int = 14
    max_uses: int = 50

@app.post("/api/doubt")
def solve_doubt(req: DoubtRequest):
    system_prompt = (
        "You are an expert GRE 335+ Adaptive Quant & Verbal Tutor. "
        "Never jump straight to a dry answer. Provide: "
        "(1) Core Concept & Trap Warning (especially negative marking -1 vs SA 0 penalty), "
        "(2) Step-by-Step Derivation, and (3) A 30-Second Exam Shortcut."
    )
    user_text = f"Track: {req.track}\nTopic: {req.topic}\nQuestion: {req.question}\nStudent Attempt: {req.student_attempt}"
    solution = _call_gemini(system_prompt, user_text)
    return {"topic": req.topic, "solution": solution}

class EvaluationRequest(BaseModel):
    track: str
    prompt: str
    student_response: str
    mode: str = "PI_OR_WAT"

class DoubtRequest(BaseModel):
    track: str
    topic: str
    question: str
    student_attempt: Optional[str] = ""

class CallPredictorRequest(BaseModel):
    class10_pct: float
    class12_pct: float
    has_class12_math: bool
    ipmat_indore_sa: Optional[int] = 0
    ipmat_indore_mcq: Optional[int] = 0
    ipmat_indore_va: Optional[int] = 0
    ipmat_rohtak_score: Optional[int] = 0
    jipmat_score: Optional[int] = 0
    iimb_ug_score: Optional[int] = 0
    jee_main_percentile: Optional[float] = 0.0

class RegisterReq(BaseModel):
    full_name: str
    email: str
    password: str
    target_track: str = "ALL_IIM_MASTER"
    category: str = "General"
    class10_pct: float = 90.0
    class12_pct: float = 90.0

class LoginReq(BaseModel):
    email: str
    password: str

class MockGenReq(BaseModel):
    exam_mode: str = "ALL_IIM_MASTER"
    paper_type: str = "FULL_DIAGNOSTIC"
    include_ncert: bool = True
    exclude_codes: List[str] = []

class MockSubmitReq(BaseModel):
    token: Optional[str] = None
    exam_track: str
    paper_type: str
    score: float
    max_score: float
    accuracy_pct: float
    attempted_q_codes: List[str] = []

class ForgotInitReq(BaseModel):
    email: str

class ForgotConfirmReq(BaseModel):
    challenge_id: int
    reset_otp: str
    new_password: str

class RedeemVoucherReq(BaseModel):
    token: str
    code: str

class CreateVoucherReq(BaseModel):
    code: str
    label: str = "Beta Tester Pass"
    valid_days: int = 14
    max_uses: int = 50

@app.post("/api/call-predictor")
def predict_iim_calls(req: CallPredictorRequest):
    results = []

    indore_total = (req.ipmat_indore_sa or 0) + (req.ipmat_indore_mcq or 0) + (req.ipmat_indore_va or 0)
    indore_sectional_ok = (req.ipmat_indore_sa or 0) >= 20 and (req.ipmat_indore_mcq or 0) >= 35 and (req.ipmat_indore_va or 0) >= 110
    results.append({
        "campus": "IIM Indore (5-Yr IPM)",
        "eligible": True,
        "status": "High PI Call Probability" if (indore_total >= 180 and indore_sectional_ok) else "Borderline / Improve Sectionals",
        "note": f"Total: {indore_total}/360 | Sectional Cutoffs {'Cleared' if indore_sectional_ok else 'At Risk'} (65% ATS + 35% PI)."
    })
    results.append({
        "campus": "IIM Ranchi (5-Yr IPM)",
        "eligible": True,
        "status": "Strong Shortlist Zone" if indore_total >= 175 else "Target 180+ in IPMAT Indore",
        "note": f"Uses IPMAT Indore score ({indore_total}/360) + Class 10 ({req.class10_pct}%) & Class 12 ({req.class12_pct}%) profile."
    })

    rohtak_acad = ((req.class10_pct + req.class12_pct) / 2.0) * 0.40
    results.append({
        "campus": "IIM Rohtak (5-Yr IPM)",
        "eligible": True,
        "status": "Competitive" if ((req.ipmat_rohtak_score or 0) >= 380 and req.class12_pct >= 85) else "Needs Higher Mock Score / Academic Boost",
        "note": f"Rohtak Score: {req.ipmat_rohtak_score}/480 | Academic Component: {rohtak_acad:.1f}/40."
    })

    results.append({
        "campus": "IIM Bodh Gaya & IIM Jammu (5-Yr IPM)",
        "eligible": True,
        "status": "Direct Merit Zone (No PI)" if (req.jipmat_score or 0) >= 310 else "Target 315+/400 in JIPMAT",
        "note": f"JIPMAT Score: {req.jipmat_score}/400 (100% test-based merit list; no Personal Interview)."
    })

    results.append({
        "campus": "IIM Bangalore (B.Sc. Econ/DS & BBA DBE)",
        "eligible": req.class12_pct >= 60,
        "status": "Eligible for B.Sc. Hons & BBA DBE" if req.has_class12_math else "Eligible for BBA DBE (B.Sc. requires Class 12 Math)",
        "note": f"IIMB UG Score: {req.iimb_ug_score}/360 | Class 12 Math: {'Yes' if req.has_class12_math else 'No'}."
    })

    results.append({
        "campus": "IIM Mumbai (BS Digital Science & Business Mgmt)",
        "eligible": req.has_class12_math and req.class12_pct >= 60,
        "status": "Competitive JEE Main Zone" if (req.has_class12_math and (req.jee_main_percentile or 0) >= 95.0) else "Requires PCM + High JEE Main Percentile",
        "note": f"JEE Main Percentile: {req.jee_main_percentile}% (Class 12 Physics & Math mandatory)."
    })
    results.append({
        "campus": "IIM Lucknow (4-Yr UG Business, Tech & Innovation)",
        "eligible": req.class12_pct >= 60,
        "status": "Ready for Aptitude + PI Track",
        "note": "Covered under unified Higher Math, Analytical Reasoning & VARC modules."
    })

    return {"predictions": results}

from app.live_ca_engine import load_archive, refresh_live_current_affairs

class EvaluationRequest(BaseModel):
    track: str
    prompt: str
    student_response: str
    mode: str = "PI_OR_WAT"

class DoubtRequest(BaseModel):
    track: str
    topic: str
    question: str
    student_attempt: Optional[str] = ""

class CallPredictorRequest(BaseModel):
    class10_pct: float
    class12_pct: float
    has_class12_math: bool
    ipmat_indore_sa: Optional[int] = 0
    ipmat_indore_mcq: Optional[int] = 0
    ipmat_indore_va: Optional[int] = 0
    ipmat_rohtak_score: Optional[int] = 0
    jipmat_score: Optional[int] = 0
    iimb_ug_score: Optional[int] = 0
    jee_main_percentile: Optional[float] = 0.0

class RegisterReq(BaseModel):
    full_name: str
    email: str
    password: str
    target_track: str = "ALL_IIM_MASTER"
    category: str = "General"
    class10_pct: float = 90.0
    class12_pct: float = 90.0

class LoginReq(BaseModel):
    email: str
    password: str

class MockGenReq(BaseModel):
    exam_mode: str = "ALL_IIM_MASTER"
    paper_type: str = "FULL_DIAGNOSTIC"
    include_ncert: bool = True
    exclude_codes: List[str] = []

class MockSubmitReq(BaseModel):
    token: Optional[str] = None
    exam_track: str
    paper_type: str
    score: float
    max_score: float
    accuracy_pct: float
    attempted_q_codes: List[str] = []

class ForgotInitReq(BaseModel):
    email: str

class ForgotConfirmReq(BaseModel):
    challenge_id: int
    reset_otp: str
    new_password: str

class RedeemVoucherReq(BaseModel):
    token: str
    code: str

class CreateVoucherReq(BaseModel):
    code: str
    label: str = "Beta Tester Pass"
    valid_days: int = 14
    max_uses: int = 50

@app.get("/api/current-affairs")
def get_live_current_affairs():
    items = load_archive()
    if not items:
        return refresh_live_current_affairs(force=True)
    return {"status": "ok", "count": len(items), "items": items}

class EvaluationRequest(BaseModel):
    track: str
    prompt: str
    student_response: str
    mode: str = "PI_OR_WAT"

class DoubtRequest(BaseModel):
    track: str
    topic: str
    question: str
    student_attempt: Optional[str] = ""

class CallPredictorRequest(BaseModel):
    class10_pct: float
    class12_pct: float
    has_class12_math: bool
    ipmat_indore_sa: Optional[int] = 0
    ipmat_indore_mcq: Optional[int] = 0
    ipmat_indore_va: Optional[int] = 0
    ipmat_rohtak_score: Optional[int] = 0
    jipmat_score: Optional[int] = 0
    iimb_ug_score: Optional[int] = 0
    jee_main_percentile: Optional[float] = 0.0

class RegisterReq(BaseModel):
    full_name: str
    email: str
    password: str
    target_track: str = "ALL_IIM_MASTER"
    category: str = "General"
    class10_pct: float = 90.0
    class12_pct: float = 90.0

class LoginReq(BaseModel):
    email: str
    password: str

class MockGenReq(BaseModel):
    exam_mode: str = "ALL_IIM_MASTER"
    paper_type: str = "FULL_DIAGNOSTIC"
    include_ncert: bool = True
    exclude_codes: List[str] = []

class MockSubmitReq(BaseModel):
    token: Optional[str] = None
    exam_track: str
    paper_type: str
    score: float
    max_score: float
    accuracy_pct: float
    attempted_q_codes: List[str] = []

class ForgotInitReq(BaseModel):
    email: str

class ForgotConfirmReq(BaseModel):
    challenge_id: int
    reset_otp: str
    new_password: str

class RedeemVoucherReq(BaseModel):
    token: str
    code: str

class CreateVoucherReq(BaseModel):
    code: str
    label: str = "Beta Tester Pass"
    valid_days: int = 14
    max_uses: int = 50

@app.post("/api/current-affairs/refresh")
def trigger_live_ca_refresh():
    return refresh_live_current_affairs(force=True)

from pydantic import BaseModel
from typing import List, Optional
from app.db_engine import (
    seed_initial_databank, db_backend_info, register_user, login_user,
    generate_stratified_mock, list_pyqs_from_db, SessionLocal, MockAttempt, UserSession
)
from app.import_ncert_bank import import_from_previous_projects

seed_initial_databank()
import_from_previous_projects()

class EvaluationRequest(BaseModel):
    track: str
    prompt: str
    student_response: str
    mode: str = "PI_OR_WAT"

class DoubtRequest(BaseModel):
    track: str
    topic: str
    question: str
    student_attempt: Optional[str] = ""

class CallPredictorRequest(BaseModel):
    class10_pct: float
    class12_pct: float
    has_class12_math: bool
    ipmat_indore_sa: Optional[int] = 0
    ipmat_indore_mcq: Optional[int] = 0
    ipmat_indore_va: Optional[int] = 0
    ipmat_rohtak_score: Optional[int] = 0
    jipmat_score: Optional[int] = 0
    iimb_ug_score: Optional[int] = 0
    jee_main_percentile: Optional[float] = 0.0

class RegisterReq(BaseModel):
    full_name: str
    email: str
    password: str
    target_track: str = "ALL_IIM_MASTER"
    category: str = "General"
    class10_pct: float = 90.0
    class12_pct: float = 90.0

class LoginReq(BaseModel):
    email: str
    password: str

class MockGenReq(BaseModel):
    exam_mode: str = "ALL_IIM_MASTER"
    paper_type: str = "FULL_DIAGNOSTIC"
    include_ncert: bool = True
    exclude_codes: List[str] = []

class MockSubmitReq(BaseModel):
    token: Optional[str] = None
    exam_track: str
    paper_type: str
    score: float
    max_score: float
    accuracy_pct: float
    attempted_q_codes: List[str] = []

class ForgotInitReq(BaseModel):
    email: str

class ForgotConfirmReq(BaseModel):
    challenge_id: int
    reset_otp: str
    new_password: str

class RedeemVoucherReq(BaseModel):
    token: str
    code: str

class CreateVoucherReq(BaseModel):
    code: str
    label: str = "Beta Tester Pass"
    valid_days: int = 14
    max_uses: int = 50

@app.get("/api/db/status")
def api_db_status():
    return db_backend_info()

class EvaluationRequest(BaseModel):
    track: str
    prompt: str
    student_response: str
    mode: str = "PI_OR_WAT"

class DoubtRequest(BaseModel):
    track: str
    topic: str
    question: str
    student_attempt: Optional[str] = ""

class CallPredictorRequest(BaseModel):
    class10_pct: float
    class12_pct: float
    has_class12_math: bool
    ipmat_indore_sa: Optional[int] = 0
    ipmat_indore_mcq: Optional[int] = 0
    ipmat_indore_va: Optional[int] = 0
    ipmat_rohtak_score: Optional[int] = 0
    jipmat_score: Optional[int] = 0
    iimb_ug_score: Optional[int] = 0
    jee_main_percentile: Optional[float] = 0.0

class RegisterReq(BaseModel):
    full_name: str
    email: str
    password: str
    target_track: str = "ALL_IIM_MASTER"
    category: str = "General"
    class10_pct: float = 90.0
    class12_pct: float = 90.0

class LoginReq(BaseModel):
    email: str
    password: str

class MockGenReq(BaseModel):
    exam_mode: str = "ALL_IIM_MASTER"
    paper_type: str = "FULL_DIAGNOSTIC"
    include_ncert: bool = True
    exclude_codes: List[str] = []

class MockSubmitReq(BaseModel):
    token: Optional[str] = None
    exam_track: str
    paper_type: str
    score: float
    max_score: float
    accuracy_pct: float
    attempted_q_codes: List[str] = []

class ForgotInitReq(BaseModel):
    email: str

class ForgotConfirmReq(BaseModel):
    challenge_id: int
    reset_otp: str
    new_password: str

class RedeemVoucherReq(BaseModel):
    token: str
    code: str

class CreateVoucherReq(BaseModel):
    code: str
    label: str = "Beta Tester Pass"
    valid_days: int = 14
    max_uses: int = 50

@app.post("/api/db/import-ncert")
def api_import_ncert():
    res = import_from_previous_projects()
    return {**res, **db_backend_info()}

class EvaluationRequest(BaseModel):
    track: str
    prompt: str
    student_response: str
    mode: str = "PI_OR_WAT"

class DoubtRequest(BaseModel):
    track: str
    topic: str
    question: str
    student_attempt: Optional[str] = ""

class CallPredictorRequest(BaseModel):
    class10_pct: float
    class12_pct: float
    has_class12_math: bool
    ipmat_indore_sa: Optional[int] = 0
    ipmat_indore_mcq: Optional[int] = 0
    ipmat_indore_va: Optional[int] = 0
    ipmat_rohtak_score: Optional[int] = 0
    jipmat_score: Optional[int] = 0
    iimb_ug_score: Optional[int] = 0
    jee_main_percentile: Optional[float] = 0.0

class RegisterReq(BaseModel):
    full_name: str
    email: str
    password: str
    target_track: str = "ALL_IIM_MASTER"
    category: str = "General"
    class10_pct: float = 90.0
    class12_pct: float = 90.0

class LoginReq(BaseModel):
    email: str
    password: str

class MockGenReq(BaseModel):
    exam_mode: str = "ALL_IIM_MASTER"
    paper_type: str = "FULL_DIAGNOSTIC"
    include_ncert: bool = True
    exclude_codes: List[str] = []

class MockSubmitReq(BaseModel):
    token: Optional[str] = None
    exam_track: str
    paper_type: str
    score: float
    max_score: float
    accuracy_pct: float
    attempted_q_codes: List[str] = []

class ForgotInitReq(BaseModel):
    email: str

class ForgotConfirmReq(BaseModel):
    challenge_id: int
    reset_otp: str
    new_password: str

class RedeemVoucherReq(BaseModel):
    token: str
    code: str

class CreateVoucherReq(BaseModel):
    code: str
    label: str = "Beta Tester Pass"
    valid_days: int = 14
    max_uses: int = 50

@app.post("/api/auth/register")
def api_register(req: RegisterReq):
    return register_user(req.full_name, req.email, req.password, req.target_track, req.category, req.class10_pct, req.class12_pct)

class EvaluationRequest(BaseModel):
    track: str
    prompt: str
    student_response: str
    mode: str = "PI_OR_WAT"

class DoubtRequest(BaseModel):
    track: str
    topic: str
    question: str
    student_attempt: Optional[str] = ""

class CallPredictorRequest(BaseModel):
    class10_pct: float
    class12_pct: float
    has_class12_math: bool
    ipmat_indore_sa: Optional[int] = 0
    ipmat_indore_mcq: Optional[int] = 0
    ipmat_indore_va: Optional[int] = 0
    ipmat_rohtak_score: Optional[int] = 0
    jipmat_score: Optional[int] = 0
    iimb_ug_score: Optional[int] = 0
    jee_main_percentile: Optional[float] = 0.0

class RegisterReq(BaseModel):
    full_name: str
    email: str
    password: str
    target_track: str = "ALL_IIM_MASTER"
    category: str = "General"
    class10_pct: float = 90.0
    class12_pct: float = 90.0

class LoginReq(BaseModel):
    email: str
    password: str

class MockGenReq(BaseModel):
    exam_mode: str = "ALL_IIM_MASTER"
    paper_type: str = "FULL_DIAGNOSTIC"
    include_ncert: bool = True
    exclude_codes: List[str] = []

class MockSubmitReq(BaseModel):
    token: Optional[str] = None
    exam_track: str
    paper_type: str
    score: float
    max_score: float
    accuracy_pct: float
    attempted_q_codes: List[str] = []

class ForgotInitReq(BaseModel):
    email: str

class ForgotConfirmReq(BaseModel):
    challenge_id: int
    reset_otp: str
    new_password: str

class RedeemVoucherReq(BaseModel):
    token: str
    code: str

class CreateVoucherReq(BaseModel):
    code: str
    label: str = "Beta Tester Pass"
    valid_days: int = 14
    max_uses: int = 50

@app.post("/api/auth/login")
def api_login(req: LoginReq):
    return login_user(req.email, req.password)

class EvaluationRequest(BaseModel):
    track: str
    prompt: str
    student_response: str
    mode: str = "PI_OR_WAT"

class DoubtRequest(BaseModel):
    track: str
    topic: str
    question: str
    student_attempt: Optional[str] = ""

class CallPredictorRequest(BaseModel):
    class10_pct: float
    class12_pct: float
    has_class12_math: bool
    ipmat_indore_sa: Optional[int] = 0
    ipmat_indore_mcq: Optional[int] = 0
    ipmat_indore_va: Optional[int] = 0
    ipmat_rohtak_score: Optional[int] = 0
    jipmat_score: Optional[int] = 0
    iimb_ug_score: Optional[int] = 0
    jee_main_percentile: Optional[float] = 0.0

class RegisterReq(BaseModel):
    full_name: str
    email: str
    password: str
    target_track: str = "ALL_IIM_MASTER"
    category: str = "General"
    class10_pct: float = 90.0
    class12_pct: float = 90.0

class LoginReq(BaseModel):
    email: str
    password: str

class MockGenReq(BaseModel):
    exam_mode: str = "ALL_IIM_MASTER"
    paper_type: str = "FULL_DIAGNOSTIC"
    include_ncert: bool = True
    exclude_codes: List[str] = []

class MockSubmitReq(BaseModel):
    token: Optional[str] = None
    exam_track: str
    paper_type: str
    score: float
    max_score: float
    accuracy_pct: float
    attempted_q_codes: List[str] = []

class ForgotInitReq(BaseModel):
    email: str

class ForgotConfirmReq(BaseModel):
    challenge_id: int
    reset_otp: str
    new_password: str

class RedeemVoucherReq(BaseModel):
    token: str
    code: str

class CreateVoucherReq(BaseModel):
    code: str
    label: str = "Beta Tester Pass"
    valid_days: int = 14
    max_uses: int = 50

@app.post("/api/mock/generate")
async def api_mock_generate(request: Request):
    import json
    from sqlalchemy import text
    from app.db_engine import engine, db_backend_info
    body = await request.json()
    paper_type = str(body.get("paper_type") or "FULL_DIAGNOSTIC").upper()
    exclude_codes = set(body.get("exclude_codes") or [])
    tag = "GRE_GENERAL"

    with engine.connect() as conn:
        total_pool = conn.execute(text("SELECT COUNT(*) FROM ipm_questions WHERE exam_tags LIKE :t"), {"t": f"%{tag}%"}).scalar() or 0
        def fetch_sec(sec_filter, target_n):
            sql = f"SELECT q_code, section, topic, q_type, difficulty, prompt, options_json, answer, explanation FROM ipm_questions WHERE exam_tags LIKE :t {sec_filter} ORDER BY RANDOM() LIMIT :lim"
            rows = conn.execute(text(sql), {"t": f"%{tag}%", "lim": target_n * 3}).mappings().all()
            unseen = [r for r in rows if r["q_code"] not in exclude_codes]
            seen = [r for r in rows if r["q_code"] in exclude_codes]
            picked = (unseen + seen)[:target_n]
            out = []
            for r in picked:
                opts = json.loads(r["options_json"]) if isinstance(r["options_json"], str) else (r["options_json"] or [])
                ans_raw = str(r["answer"] or "").strip()
                ans_val = int(ans_raw) if (opts and ans_raw.isdigit() and int(ans_raw) < len(opts)) else ans_raw
                out.append({"id": r["q_code"], "q_code": r["q_code"], "section": r["section"], "topic": r["topic"], "q_type": r["q_type"], "difficulty": r["difficulty"], "prompt": r["prompt"], "options": opts, "answer": ans_val, "explanation": r["explanation"]})
            return out

        if paper_type == "QUANT_SPRINT":
            qs = fetch_sec("AND UPPER(section) = 'QUANT_CORE'", 21)
        elif paper_type == "DILR_SPRINT":
            qs = fetch_sec("AND UPPER(section) = 'DILR'", 20)
        elif paper_type == "VARC_SPRINT":
            qs = fetch_sec("AND UPPER(section) = 'VARC'", 23)
        else:
            qs = fetch_sec("", 54)

    return {"questions": qs, "db": {"engine": db_backend_info().get("engine", "PostgreSQL"), "total_questions": total_pool}}
@app.post("/api/mock/submit")
def api_submit_mock(req: MockSubmitReq):
    db = SessionLocal()
    try:
        uid = None
        if req.token:
            sess = db.query(UserSession).filter(UserSession.token == req.token).first()
            if sess:
                uid = sess.user_id
        db.add(MockAttempt(
            user_id=uid,
            exam_track=req.exam_track,
            paper_type=req.paper_type,
            score=req.score,
            max_score=req.max_score,
            accuracy_pct=req.accuracy_pct,
            attempted_q_codes_json=json.dumps(req.attempted_q_codes)
        ))
        db.commit()
        return {"saved": True, "user_linked": uid is not None}
    finally:
        db.close()

class EvaluationRequest(BaseModel):
    track: str
    prompt: str
    student_response: str
    mode: str = "PI_OR_WAT"

class DoubtRequest(BaseModel):
    track: str
    topic: str
    question: str
    student_attempt: Optional[str] = ""

class CallPredictorRequest(BaseModel):
    class10_pct: float
    class12_pct: float
    has_class12_math: bool
    ipmat_indore_sa: Optional[int] = 0
    ipmat_indore_mcq: Optional[int] = 0
    ipmat_indore_va: Optional[int] = 0
    ipmat_rohtak_score: Optional[int] = 0
    jipmat_score: Optional[int] = 0
    iimb_ug_score: Optional[int] = 0
    jee_main_percentile: Optional[float] = 0.0

class RegisterReq(BaseModel):
    full_name: str
    email: str
    password: str
    target_track: str = "ALL_IIM_MASTER"
    category: str = "General"
    class10_pct: float = 90.0
    class12_pct: float = 90.0

class LoginReq(BaseModel):
    email: str
    password: str

class MockGenReq(BaseModel):
    exam_mode: str = "ALL_IIM_MASTER"
    paper_type: str = "FULL_DIAGNOSTIC"
    include_ncert: bool = True
    exclude_codes: List[str] = []

class MockSubmitReq(BaseModel):
    token: Optional[str] = None
    exam_track: str
    paper_type: str
    score: float
    max_score: float
    accuracy_pct: float
    attempted_q_codes: List[str] = []

class ForgotInitReq(BaseModel):
    email: str

class ForgotConfirmReq(BaseModel):
    challenge_id: int
    reset_otp: str
    new_password: str

class RedeemVoucherReq(BaseModel):
    token: str
    code: str

class CreateVoucherReq(BaseModel):
    code: str
    label: str = "Beta Tester Pass"
    valid_days: int = 14
    max_uses: int = 50

class OtpInitReq(BaseModel):
    full_name: str
    email: str
    phone: str
    password: str
    class10_pct: float = 90.0
    class12_pct: float = 90.0

class OtpVerifyReq(BaseModel):
    challenge_id: Optional[Any] = None
    email_otp: str
    phone_otp: Optional[str] = "EMAIL_ONLY"

class UpgradeProReq(BaseModel):
    token: str
    payment_method: str = "UPI"
    amount_inr: float = 0.0
@app.post("/api/auth/register-otp/init")
def api_reg_otp_init(req: OtpInitReq):
    return initiate_registration_otp(req.full_name, req.email, req.phone, req.password, req.class10_pct, req.class12_pct)

class EvaluationRequest(BaseModel):
    track: str
    prompt: str
    student_response: str
    mode: str = "PI_OR_WAT"

class DoubtRequest(BaseModel):
    track: str
    topic: str
    question: str
    student_attempt: Optional[str] = ""

class CallPredictorRequest(BaseModel):
    class10_pct: float
    class12_pct: float
    has_class12_math: bool
    ipmat_indore_sa: Optional[int] = 0
    ipmat_indore_mcq: Optional[int] = 0
    ipmat_indore_va: Optional[int] = 0
    ipmat_rohtak_score: Optional[int] = 0
    jipmat_score: Optional[int] = 0
    iimb_ug_score: Optional[int] = 0
    jee_main_percentile: Optional[float] = 0.0

class RegisterReq(BaseModel):
    full_name: str
    email: str
    password: str
    target_track: str = "ALL_IIM_MASTER"
    category: str = "General"
    class10_pct: float = 90.0
    class12_pct: float = 90.0

class LoginReq(BaseModel):
    email: str
    password: str

class MockGenReq(BaseModel):
    exam_mode: str = "ALL_IIM_MASTER"
    paper_type: str = "FULL_DIAGNOSTIC"
    include_ncert: bool = True
    exclude_codes: List[str] = []

class MockSubmitReq(BaseModel):
    token: Optional[str] = None
    exam_track: str
    paper_type: str
    score: float
    max_score: float
    accuracy_pct: float
    attempted_q_codes: List[str] = []

class ForgotInitReq(BaseModel):
    email: str

class ForgotConfirmReq(BaseModel):
    challenge_id: int
    reset_otp: str
    new_password: str

class RedeemVoucherReq(BaseModel):
    token: str
    code: str

class CreateVoucherReq(BaseModel):
    code: str
    label: str = "Beta Tester Pass"
    valid_days: int = 14
    max_uses: int = 50

@app.post("/api/auth/register-otp/verify")
def api_reg_otp_verify(req: OtpVerifyReq):
    return verify_registration_otp(int(req.challenge_id) if str(req.challenge_id or '').isdigit() else 0, req.email_otp, req.phone_otp)

class EvaluationRequest(BaseModel):
    track: str
    prompt: str
    student_response: str
    mode: str = "PI_OR_WAT"

class DoubtRequest(BaseModel):
    track: str
    topic: str
    question: str
    student_attempt: Optional[str] = ""

class CallPredictorRequest(BaseModel):
    class10_pct: float
    class12_pct: float
    has_class12_math: bool
    ipmat_indore_sa: Optional[int] = 0
    ipmat_indore_mcq: Optional[int] = 0
    ipmat_indore_va: Optional[int] = 0
    ipmat_rohtak_score: Optional[int] = 0
    jipmat_score: Optional[int] = 0
    iimb_ug_score: Optional[int] = 0
    jee_main_percentile: Optional[float] = 0.0

class RegisterReq(BaseModel):
    full_name: str
    email: str
    password: str
    target_track: str = "ALL_IIM_MASTER"
    category: str = "General"
    class10_pct: float = 90.0
    class12_pct: float = 90.0

class LoginReq(BaseModel):
    email: str
    password: str

class MockGenReq(BaseModel):
    exam_mode: str = "ALL_IIM_MASTER"
    paper_type: str = "FULL_DIAGNOSTIC"
    include_ncert: bool = True
    exclude_codes: List[str] = []

class MockSubmitReq(BaseModel):
    token: Optional[str] = None
    exam_track: str
    paper_type: str
    score: float
    max_score: float
    accuracy_pct: float
    attempted_q_codes: List[str] = []

class ForgotInitReq(BaseModel):
    email: str

class ForgotConfirmReq(BaseModel):
    challenge_id: int
    reset_otp: str
    new_password: str

class RedeemVoucherReq(BaseModel):
    token: str
    code: str

class CreateVoucherReq(BaseModel):
    code: str
    label: str = "Beta Tester Pass"
    valid_days: int = 14
    max_uses: int = 50

from app.db_engine import (
    get_user_by_token,
    register_user,
    login_user,
    initiate_registration_otp,
    verify_registration_otp,
    upgrade_user_to_pro,
)
@app.get("/api/auth/me")
def api_auth_me(token: str = ""):
    u = get_user_by_token(token)
    if u:
        return {"ok": True, "user": u}
    return {"ok": False}

class EvaluationRequest(BaseModel):
    track: str
    prompt: str
    student_response: str
    mode: str = "PI_OR_WAT"

class DoubtRequest(BaseModel):
    track: str
    topic: str
    question: str
    student_attempt: Optional[str] = ""

class CallPredictorRequest(BaseModel):
    class10_pct: float
    class12_pct: float
    has_class12_math: bool
    ipmat_indore_sa: Optional[int] = 0
    ipmat_indore_mcq: Optional[int] = 0
    ipmat_indore_va: Optional[int] = 0
    ipmat_rohtak_score: Optional[int] = 0
    jipmat_score: Optional[int] = 0
    iimb_ug_score: Optional[int] = 0
    jee_main_percentile: Optional[float] = 0.0

class RegisterReq(BaseModel):
    full_name: str
    email: str
    password: str
    target_track: str = "ALL_IIM_MASTER"
    category: str = "General"
    class10_pct: float = 90.0
    class12_pct: float = 90.0

class LoginReq(BaseModel):
    email: str
    password: str

class MockGenReq(BaseModel):
    exam_mode: str = "ALL_IIM_MASTER"
    paper_type: str = "FULL_DIAGNOSTIC"
    include_ncert: bool = True
    exclude_codes: List[str] = []

class MockSubmitReq(BaseModel):
    token: Optional[str] = None
    exam_track: str
    paper_type: str
    score: float
    max_score: float
    accuracy_pct: float
    attempted_q_codes: List[str] = []

class ForgotInitReq(BaseModel):
    email: str

class ForgotConfirmReq(BaseModel):
    challenge_id: int
    reset_otp: str
    new_password: str

class RedeemVoucherReq(BaseModel):
    token: str
    code: str

class CreateVoucherReq(BaseModel):
    code: str
    label: str = "Beta Tester Pass"
    valid_days: int = 14
    max_uses: int = 50

@app.post("/api/billing/upgrade-pro")
def api_upgrade_pro(req: UpgradeProReq):
    return upgrade_user_to_pro(req.token, req.payment_method, req.amount_inr)

from app.db_engine import initiate_password_reset_otp, complete_password_reset

class EvaluationRequest(BaseModel):
    track: str
    prompt: str
    student_response: str
    mode: str = "PI_OR_WAT"

class DoubtRequest(BaseModel):
    track: str
    topic: str
    question: str
    student_attempt: Optional[str] = ""

class CallPredictorRequest(BaseModel):
    class10_pct: float
    class12_pct: float
    has_class12_math: bool
    ipmat_indore_sa: Optional[int] = 0
    ipmat_indore_mcq: Optional[int] = 0
    ipmat_indore_va: Optional[int] = 0
    ipmat_rohtak_score: Optional[int] = 0
    jipmat_score: Optional[int] = 0
    iimb_ug_score: Optional[int] = 0
    jee_main_percentile: Optional[float] = 0.0

class RegisterReq(BaseModel):
    full_name: str
    email: str
    password: str
    target_track: str = "ALL_IIM_MASTER"
    category: str = "General"
    class10_pct: float = 90.0
    class12_pct: float = 90.0

class LoginReq(BaseModel):
    email: str
    password: str

class MockGenReq(BaseModel):
    exam_mode: str = "ALL_IIM_MASTER"
    paper_type: str = "FULL_DIAGNOSTIC"
    include_ncert: bool = True
    exclude_codes: List[str] = []

class MockSubmitReq(BaseModel):
    token: Optional[str] = None
    exam_track: str
    paper_type: str
    score: float
    max_score: float
    accuracy_pct: float
    attempted_q_codes: List[str] = []

class ForgotInitReq(BaseModel):
    email: str

class ForgotConfirmReq(BaseModel):
    challenge_id: int
    reset_otp: str
    new_password: str

class RedeemVoucherReq(BaseModel):
    token: str
    code: str

class CreateVoucherReq(BaseModel):
    code: str
    label: str = "Beta Tester Pass"
    valid_days: int = 14
    max_uses: int = 50

@app.post("/api/auth/forgot-password/init")
def api_forgot_init(req: ForgotInitReq):
    return initiate_password_reset_otp(req.email)

class EvaluationRequest(BaseModel):
    track: str
    prompt: str
    student_response: str
    mode: str = "PI_OR_WAT"

class DoubtRequest(BaseModel):
    track: str
    topic: str
    question: str
    student_attempt: Optional[str] = ""

class CallPredictorRequest(BaseModel):
    class10_pct: float
    class12_pct: float
    has_class12_math: bool
    ipmat_indore_sa: Optional[int] = 0
    ipmat_indore_mcq: Optional[int] = 0
    ipmat_indore_va: Optional[int] = 0
    ipmat_rohtak_score: Optional[int] = 0
    jipmat_score: Optional[int] = 0
    iimb_ug_score: Optional[int] = 0
    jee_main_percentile: Optional[float] = 0.0

class RegisterReq(BaseModel):
    full_name: str
    email: str
    password: str
    target_track: str = "ALL_IIM_MASTER"
    category: str = "General"
    class10_pct: float = 90.0
    class12_pct: float = 90.0

class LoginReq(BaseModel):
    email: str
    password: str

class MockGenReq(BaseModel):
    exam_mode: str = "ALL_IIM_MASTER"
    paper_type: str = "FULL_DIAGNOSTIC"
    include_ncert: bool = True
    exclude_codes: List[str] = []

class MockSubmitReq(BaseModel):
    token: Optional[str] = None
    exam_track: str
    paper_type: str
    score: float
    max_score: float
    accuracy_pct: float
    attempted_q_codes: List[str] = []

class ForgotInitReq(BaseModel):
    email: str

class ForgotConfirmReq(BaseModel):
    challenge_id: int
    reset_otp: str
    new_password: str

class RedeemVoucherReq(BaseModel):
    token: str
    code: str

class CreateVoucherReq(BaseModel):
    code: str
    label: str = "Beta Tester Pass"
    valid_days: int = 14
    max_uses: int = 50

@app.post("/api/auth/forgot-password/confirm")
def api_forgot_confirm(req: ForgotConfirmReq):
    return complete_password_reset(req.challenge_id, req.reset_otp, req.new_password)

from app.db_engine import redeem_beta_voucher, create_beta_voucher, BetaVoucher

class EvaluationRequest(BaseModel):
    track: str
    prompt: str
    student_response: str
    mode: str = "PI_OR_WAT"

class DoubtRequest(BaseModel):
    track: str
    topic: str
    question: str
    student_attempt: Optional[str] = ""

class CallPredictorRequest(BaseModel):
    class10_pct: float
    class12_pct: float
    has_class12_math: bool
    ipmat_indore_sa: Optional[int] = 0
    ipmat_indore_mcq: Optional[int] = 0
    ipmat_indore_va: Optional[int] = 0
    ipmat_rohtak_score: Optional[int] = 0
    jipmat_score: Optional[int] = 0
    iimb_ug_score: Optional[int] = 0
    jee_main_percentile: Optional[float] = 0.0

class RegisterReq(BaseModel):
    full_name: str
    email: str
    password: str
    target_track: str = "ALL_IIM_MASTER"
    category: str = "General"
    class10_pct: float = 90.0
    class12_pct: float = 90.0

class LoginReq(BaseModel):
    email: str
    password: str

class MockGenReq(BaseModel):
    exam_mode: str = "ALL_IIM_MASTER"
    paper_type: str = "FULL_DIAGNOSTIC"
    include_ncert: bool = True
    exclude_codes: List[str] = []

class MockSubmitReq(BaseModel):
    token: Optional[str] = None
    exam_track: str
    paper_type: str
    score: float
    max_score: float
    accuracy_pct: float
    attempted_q_codes: List[str] = []

class ForgotInitReq(BaseModel):
    email: str

class ForgotConfirmReq(BaseModel):
    challenge_id: int
    reset_otp: str
    new_password: str

class RedeemVoucherReq(BaseModel):
    token: str
    code: str

class CreateVoucherReq(BaseModel):
    code: str
    label: str = "Beta Tester Pass"
    valid_days: int = 14
    max_uses: int = 50

@app.post("/api/billing/redeem-voucher")
def api_redeem_voucher(req: RedeemVoucherReq):
    return redeem_beta_voucher(req.token, req.code)

class EvaluationRequest(BaseModel):
    track: str
    prompt: str
    student_response: str
    mode: str = "PI_OR_WAT"

class DoubtRequest(BaseModel):
    track: str
    topic: str
    question: str
    student_attempt: Optional[str] = ""

class CallPredictorRequest(BaseModel):
    class10_pct: float
    class12_pct: float
    has_class12_math: bool
    ipmat_indore_sa: Optional[int] = 0
    ipmat_indore_mcq: Optional[int] = 0
    ipmat_indore_va: Optional[int] = 0
    ipmat_rohtak_score: Optional[int] = 0
    jipmat_score: Optional[int] = 0
    iimb_ug_score: Optional[int] = 0
    jee_main_percentile: Optional[float] = 0.0

class RegisterReq(BaseModel):
    full_name: str
    email: str
    password: str
    target_track: str = "ALL_IIM_MASTER"
    category: str = "General"
    class10_pct: float = 90.0
    class12_pct: float = 90.0

class LoginReq(BaseModel):
    email: str
    password: str

class MockGenReq(BaseModel):
    exam_mode: str = "ALL_IIM_MASTER"
    paper_type: str = "FULL_DIAGNOSTIC"
    include_ncert: bool = True
    exclude_codes: List[str] = []

class MockSubmitReq(BaseModel):
    token: Optional[str] = None
    exam_track: str
    paper_type: str
    score: float
    max_score: float
    accuracy_pct: float
    attempted_q_codes: List[str] = []

class ForgotInitReq(BaseModel):
    email: str

class ForgotConfirmReq(BaseModel):
    challenge_id: int
    reset_otp: str
    new_password: str

class RedeemVoucherReq(BaseModel):
    token: str
    code: str

class CreateVoucherReq(BaseModel):
    code: str
    label: str = "Beta Tester Pass"
    valid_days: int = 14
    max_uses: int = 50

@app.post("/api/admin/vouchers/create")
def api_create_voucher(req: CreateVoucherReq):
    return create_beta_voucher(req.code, req.label, req.valid_days, req.max_uses)

class EvaluationRequest(BaseModel):
    track: str
    prompt: str
    student_response: str
    mode: str = "PI_OR_WAT"

class DoubtRequest(BaseModel):
    track: str
    topic: str
    question: str
    student_attempt: Optional[str] = ""

class CallPredictorRequest(BaseModel):
    class10_pct: float
    class12_pct: float
    has_class12_math: bool
    ipmat_indore_sa: Optional[int] = 0
    ipmat_indore_mcq: Optional[int] = 0
    ipmat_indore_va: Optional[int] = 0
    ipmat_rohtak_score: Optional[int] = 0
    jipmat_score: Optional[int] = 0
    iimb_ug_score: Optional[int] = 0
    jee_main_percentile: Optional[float] = 0.0

class RegisterReq(BaseModel):
    full_name: str
    email: str
    password: str
    target_track: str = "ALL_IIM_MASTER"
    category: str = "General"
    class10_pct: float = 90.0
    class12_pct: float = 90.0

class LoginReq(BaseModel):
    email: str
    password: str

class MockGenReq(BaseModel):
    exam_mode: str = "ALL_IIM_MASTER"
    paper_type: str = "FULL_DIAGNOSTIC"
    include_ncert: bool = True
    exclude_codes: List[str] = []

class MockSubmitReq(BaseModel):
    token: Optional[str] = None
    exam_track: str
    paper_type: str
    score: float
    max_score: float
    accuracy_pct: float
    attempted_q_codes: List[str] = []

class ForgotInitReq(BaseModel):
    email: str

class ForgotConfirmReq(BaseModel):
    challenge_id: int
    reset_otp: str
    new_password: str

class RedeemVoucherReq(BaseModel):
    token: str
    code: str

class CreateVoucherReq(BaseModel):
    code: str
    label: str = "Beta Tester Pass"
    valid_days: int = 14
    max_uses: int = 50

@app.get("/api/admin/vouchers")
def api_list_vouchers():
    db = SessionLocal()
    try:
        rows = db.query(BetaVoucher).order_by(BetaVoucher.id.desc()).all()
        return {"vouchers": [{"code": r.code, "label": r.label, "valid_days": r.valid_days, "used": r.used_count, "max_uses": r.max_uses, "active": r.is_active} for r in rows]}
    finally:
        db.close()

from app.db_engine import get_pyq_questions_from_db
class EvaluationRequest(BaseModel):
    track: str
    prompt: str
    student_response: str
    mode: str = "PI_OR_WAT"

class DoubtRequest(BaseModel):
    track: str
    topic: str
    question: str
    student_attempt: Optional[str] = ""

class CallPredictorRequest(BaseModel):
    class10_pct: float
    class12_pct: float
    has_class12_math: bool
    ipmat_indore_sa: Optional[int] = 0
    ipmat_indore_mcq: Optional[int] = 0
    ipmat_indore_va: Optional[int] = 0
    ipmat_rohtak_score: Optional[int] = 0
    jipmat_score: Optional[int] = 0
    iimb_ug_score: Optional[int] = 0
    jee_main_percentile: Optional[float] = 0.0

class RegisterReq(BaseModel):
    full_name: str
    email: str
    password: str
    target_track: str = "ALL_IIM_MASTER"
    category: str = "General"
    class10_pct: float = 90.0
    class12_pct: float = 90.0

class LoginReq(BaseModel):
    email: str
    password: str

class MockGenReq(BaseModel):
    exam_mode: str = "ALL_IIM_MASTER"
    paper_type: str = "FULL_DIAGNOSTIC"
    include_ncert: bool = True
    exclude_codes: List[str] = []

class MockSubmitReq(BaseModel):
    token: Optional[str] = None
    exam_track: str
    paper_type: str
    score: float
    max_score: float
    accuracy_pct: float
    attempted_q_codes: List[str] = []

class ForgotInitReq(BaseModel):
    email: str

class ForgotConfirmReq(BaseModel):
    challenge_id: int
    reset_otp: str
    new_password: str

class RedeemVoucherReq(BaseModel):
    token: str
    code: str

class CreateVoucherReq(BaseModel):
    code: str
    label: str = "Beta Tester Pass"
    valid_days: int = 14
    max_uses: int = 50

@app.get("/api/questions")
def api_get_questions(section: str = "ALL", topic: str = "ALL", exam: str = "ALL", pyq_only: bool = False, limit: int = 25):
    import json
    from sqlalchemy import text
    from app.db_engine import engine
    clauses = ["1=1"]
    params = {"lim": max(1, min(limit, 600))}
    if section and section.upper() != "ALL":
        clauses.append("UPPER(section) = :sec")
        params["sec"] = section.upper().strip()
    if topic and topic.upper() != "ALL":
        clauses.append("topic LIKE :top")
        params["top"] = f"%{topic.strip()}%"
    if exam and exam.upper() != "ALL":
        clauses.append("(exam_tags LIKE :ex OR pyq_exam LIKE :ex)")
        params["ex"] = f"%{exam.strip()}%"
    if pyq_only:
        clauses.append("is_pyq = TRUE")
    sql = f"""
        SELECT q_code, section, topic, exam_tags, q_type, difficulty, prompt,
               options_json, answer, explanation, is_pyq, pyq_year, pyq_exam
        FROM ipm_questions
        WHERE {' AND '.join(clauses)}
        ORDER BY RANDOM()
        LIMIT :lim
    """
    with engine.connect() as conn:
        rows = conn.execute(text(sql), params).mappings().all()
    out = []
    for r in rows:
        opts = r["options_json"]
        if isinstance(opts, str):
            try:
                opts = json.loads(opts)
            except Exception:
                opts = []
        ans_raw = str(r["answer"] or "").strip()
        ans_val = int(ans_raw) if (opts and ans_raw.isdigit() and int(ans_raw) < len(opts)) else ans_raw
        out.append({
            "id": r["q_code"],
            "section": r["section"],
            "topic": r["topic"],
            "exam_tags": r["exam_tags"],
            "q_type": r["q_type"],
            "difficulty": r["difficulty"],
            "prompt": r["prompt"],
            "options": opts or [],
            "answer": ans_val,
            "explanation": r["explanation"],
            "is_pyq": bool(r["is_pyq"]),
            "year": r["pyq_year"],
            "exam": r["pyq_exam"] or r["exam_tags"]
        })
    return {"count": len(out), "questions": out}
class EvaluationRequest(BaseModel):
    track: str
    prompt: str
    student_response: str
    mode: str = "PI_OR_WAT"

class DoubtRequest(BaseModel):
    track: str
    topic: str
    question: str
    student_attempt: Optional[str] = ""

class CallPredictorRequest(BaseModel):
    class10_pct: float
    class12_pct: float
    has_class12_math: bool
    ipmat_indore_sa: Optional[int] = 0
    ipmat_indore_mcq: Optional[int] = 0
    ipmat_indore_va: Optional[int] = 0
    ipmat_rohtak_score: Optional[int] = 0
    jipmat_score: Optional[int] = 0
    iimb_ug_score: Optional[int] = 0
    jee_main_percentile: Optional[float] = 0.0

class RegisterReq(BaseModel):
    full_name: str
    email: str
    password: str
    target_track: str = "ALL_IIM_MASTER"
    category: str = "General"
    class10_pct: float = 90.0
    class12_pct: float = 90.0

class LoginReq(BaseModel):
    email: str
    password: str

class MockGenReq(BaseModel):
    exam_mode: str = "ALL_IIM_MASTER"
    paper_type: str = "FULL_DIAGNOSTIC"
    include_ncert: bool = True
    exclude_codes: List[str] = []

class MockSubmitReq(BaseModel):
    token: Optional[str] = None
    exam_track: str
    paper_type: str
    score: float
    max_score: float
    accuracy_pct: float
    attempted_q_codes: List[str] = []

class ForgotInitReq(BaseModel):
    email: str

class ForgotConfirmReq(BaseModel):
    challenge_id: int
    reset_otp: str
    new_password: str

class RedeemVoucherReq(BaseModel):
    token: str
    code: str

class CreateVoucherReq(BaseModel):
    code: str
    label: str = "Beta Tester Pass"
    valid_days: int = 14
    max_uses: int = 50

@app.get("/api/pyq")
def api_get_pyq(exam: str = "ALL", year: str = "ALL"):
    from app.db_engine import get_pyq_questions_from_db, seed_full_pyq_archive_to_postgres, seed_rich_pyq_expansion, seed_batch1_new_iim_ug_pyqs, seed_batch2_flagship_papers, seed_batch3_cuet_and_indore_archive, db_backend_info
    items = get_pyq_questions_from_db("ALL", "ALL")
    if len(items) < 100:
        seed_full_pyq_archive_to_postgres()
        seed_rich_pyq_expansion()
        seed_batch1_new_iim_ug_pyqs()
        seed_batch2_flagship_papers()
        seed_batch3_cuet_and_indore_archive()
        items = get_pyq_questions_from_db("ALL", "ALL")
    return {"count": len(items), "questions": items, "db": db_backend_info()}

@app.on_event("startup")
def on_startup_seed_postgrad():
    # Startup seeding disabled — Neon shared science bank managed via offline seeder
    pass

@app.get("/api/questions/catalog")
async def api_questions_catalog(source_type: str = "", chapter: str = "", section: str = "", limit: int = 100):
    import json
    from sqlalchemy import text
    from app.db_engine import engine
    from app.ingest_postgrad_bank import ensure_postgrad_schema
    ensure_postgrad_schema(engine)

    clauses = ["1=1"]
    params = {"lim": min(max(1, limit), 300)}
    if source_type:
        clauses.append("UPPER(source_type) = :st")
        params["st"] = source_type.upper()
    if chapter:
        clauses.append("LOWER(chapter_name) LIKE :ch")
        params["ch"] = f"%{chapter.lower()}%"
    if section:
        clauses.append("UPPER(section) = :sec")
        params["sec"] = section.upper()

    where_sql = " AND ".join(clauses)
    with engine.connect() as conn:
        rows = conn.execute(text(f"""
            SELECT q_code, source_type, book_title, chapter_name, paper_slot, passage_group_id,
                   passage_order, section, topic, q_type, difficulty, prompt, options_json,
                   answer, explanation, solution_rubric_json
            FROM ipm_questions
            WHERE {where_sql}
            ORDER BY passage_group_id ASC, passage_order ASC, q_code ASC
            LIMIT :lim
        """), params).mappings().all()

        chapters = [r[0] for r in conn.execute(text(
            "SELECT DISTINCT chapter_name FROM ipm_questions WHERE chapter_name <> '' ORDER BY chapter_name"
        )).fetchall()]

    items = []
    for r in rows:
        items.append({
            **dict(r),
            "options": json.loads(r["options_json"] or "[]"),
            "solution_rubric": json.loads(r["solution_rubric_json"] or "{}")
        })
    return {"count": len(items), "chapters": chapters, "questions": items}

@app.post("/api/admin/ingest-bank")
async def api_admin_ingest_bank(request: Request):
    from app.db_engine import engine
    from app.ingest_postgrad_bank import ingest_question_records
    payload = await request.json()
    records = payload.get("questions") or []
    exam_tag = str(payload.get("exam_tag") or "CAT_2026")
    stats = ingest_question_records(engine, records, exam_tag)
    return {"status": "ok", **stats}

from fastapi.responses import JSONResponse

@app.api_route("/health", methods=["GET", "HEAD"])
async def health_check():
    return JSONResponse({"status": "ok"})

from starlette.responses import Response

@app.middleware("http")
async def head_ping_middleware(request, call_next):
    if request.method == "HEAD":
        return Response(status_code=200)
    return await call_next(request)

from app.db_engine import resend_otp_challenge

@app.post("/api/auth/otp/resend")
async def api_resend_otp(request: Request):
    body = await request.json()
    cid = body.get("challenge_id")
    purpose = body.get("purpose", "Account Registration")
    if not cid:
        return {"ok": False, "error": "Missing challenge_id. Please submit Step 1 first."}
    return resend_otp_challenge(int(str(cid).strip()), purpose)


# ==============================================================================
# SHARED JEE & NEET SCIENCE BANK ENDPOINTS (NEON POSTGRESQL)
# ==============================================================================
import os as _sa_os
from sqlalchemy import create_engine as _sa_create_engine, text as _sa_text

def _get_science_engine():
    if "engine" in globals() and globals()["engine"] is not None:
        return globals()["engine"]
    db_url = _sa_os.getenv("DATABASE_URL", "")
    if db_url.startswith("postgres://"):
        db_url = "postgresql://" + db_url[len("postgres://"):]
    return _sa_create_engine(db_url, pool_pre_ping=True)


@app.get("/api/science/mock-paper")
def get_dynamic_mock_paper(exam: str = "JEE"):
    from sqlalchemy import text as _sa_text
    exam_code = exam.strip().upper()
    eng = _get_science_engine()
    paper = []
    with eng.connect() as conn:
        if exam_code == "JEE":
            for subj in ("PHYSICS", "CHEMISTRY", "MATHEMATICS"):
                mcqs = conn.execute(_sa_text("""
                    SELECT id, question_code, subject, ncert_class, chapter_name, topic_tag,
                           exam_tags, question_type, difficulty_tier, prompt,
                           options_json, correct_answer, explanation
                    FROM jee_neet_questions
                    WHERE 'JEE' = ANY(exam_tags) AND subject = :s AND question_type != 'NUMERICAL_INT'
                    ORDER BY RANDOM() LIMIT 20
                """), {"s": subj}).mappings().all()
                nums = conn.execute(_sa_text("""
                    SELECT id, question_code, subject, ncert_class, chapter_name, topic_tag,
                           exam_tags, question_type, difficulty_tier, prompt,
                           options_json, correct_answer, explanation
                    FROM jee_neet_questions
                    WHERE 'JEE' = ANY(exam_tags) AND subject = :s AND question_type = 'NUMERICAL_INT'
                    ORDER BY RANDOM() LIMIT 5
                """), {"s": subj}).mappings().all()
                for r in mcqs:
                    d = dict(r); d["mock_sec"] = "Section A (MCQ)"; d["mock_subj"] = subj; paper.append(d)
                for r in nums:
                    d = dict(r); d["mock_sec"] = "Section B (Numerical)"; d["mock_subj"] = subj; paper.append(d)
        else:
            for subj in ("PHYSICS", "CHEMISTRY", "BOTANY", "ZOOLOGY"):
                rows = conn.execute(_sa_text("""
                    SELECT id, question_code, subject, ncert_class, chapter_name, topic_tag,
                           exam_tags, question_type, difficulty_tier, prompt,
                           options_json, correct_answer, explanation
                    FROM jee_neet_questions
                    WHERE 'NEET' = ANY(exam_tags) AND subject = :s
                    ORDER BY RANDOM() LIMIT 45
                """), {"s": subj}).mappings().all()
                for r in rows:
                    d = dict(r); d["mock_sec"] = "Compulsory MCQ"; d["mock_subj"] = subj; paper.append(d)
    return {"ok": True, "exam": exam_code, "count": len(paper), "paper": paper}


@app.get("/api/science/questions")
def get_science_questions(exam: str = "JEE", subject: str = "", limit: int = 200):
    try:
        exam_code = exam.strip().upper()
        subj_code = subject.strip().upper()
        sql = """
            SELECT id, question_code, subject, ncert_class, chapter_name, topic_tag,
                   exam_tags, question_type, difficulty_tier, prompt,
                   options_json, correct_answer, explanation
            FROM jee_neet_questions
            WHERE CAST(:exam_code AS TEXT) = ANY(exam_tags)
              AND (:subj_code = '' OR subject = :subj_code)
            ORDER BY ncert_class, subject, question_code
            LIMIT :lim
        """
        eng = _get_science_engine()
        with eng.connect() as conn:
            rows = conn.execute(
                _sa_text(sql),
                {"exam_code": exam_code, "subj_code": subj_code, "lim": max(1, min(limit, 1000))}
            ).mappings().all()
        return {"ok": True, "exam": exam_code, "count": len(rows), "questions": [dict(r) for r in rows]}
    except Exception as e:
        return {"ok": False, "error": str(e), "questions": []}

@app.get("/api/science/modules")
def get_science_modules(exam: str = "JEE", subject: str = ""):
    try:
        exam_code = exam.strip().upper()
        subj_code = subject.strip().upper()
        sql = """
            SELECT id, module_code, subject, ncert_class, chapter_title, subtitle,
                   exam_tags, weightage_label, target_pace, strategy_tag,
                   overview, concept_bridge, laws_json, worked_examples_json
            FROM jee_neet_study_modules
            WHERE CAST(:exam_code AS TEXT) = ANY(exam_tags)
              AND (:subj_code = '' OR subject = :subj_code)
            ORDER BY ncert_class, subject, module_code
        """
        eng = _get_science_engine()
        with eng.connect() as conn:
            rows = conn.execute(
                _sa_text(sql),
                {"exam_code": exam_code, "subj_code": subj_code}
            ).mappings().all()
        return {"ok": True, "exam": exam_code, "count": len(rows), "modules": [dict(r) for r in rows]}
    except Exception as e:
        return {"ok": False, "error": str(e), "modules": []}



def _ensure_10x_science_question_bank():
    try:
        from sqlalchemy import text as _sa_text
        import json as _json
        eng = _get_science_engine()
        with eng.begin() as conn:
            jee_cnt = conn.execute(_sa_text("SELECT COUNT(*) FROM jee_neet_questions WHERE 'JEE' = ANY(exam_tags)")).scalar() or 0
            neet_cnt = conn.execute(_sa_text("SELECT COUNT(*) FROM jee_neet_questions WHERE 'NEET' = ANY(exam_tags)")).scalar() or 0
            if jee_cnt >= 900 and neet_cnt >= 1800:
                return

            rows = []
            # 1. JEE 900-Item Expansion (300 Physics, 300 Chemistry, 300 Math = 12x 75-Q Mock)
            jee_specs = [
                ("PHYSICS", 11, "Rotational Dynamics & Gravitation", "ROT_GRAV",
                 lambda k: (f"A uniform solid cylinder of mass {(k%7)+2} kg and radius {((k%5)+1)*0.1:.1f} m rolls without slipping with center-of-mass speed {((k%6)+2)*2} m/s. Total kinetic energy (in J) is:",
                            [f"{0.75*((k%7)+2)*(((k%6)+2)*2)**2:.1f} J", f"{0.5*((k%7)+2)*(((k%6)+2)*2)**2:.1f} J", f"{1.5*((k%7)+2)*(((k%6)+2)*2)**2:.1f} J", f"{0.25*((k%7)+2)*(((k%6)+2)*2)**2:.1f} J"], "0",
                            "Total KE = (1/2)mv^2 + (1/2)Iw^2 = (3/4)mv^2 for a solid cylinder (I = 1/2 mR^2)."),
                 lambda k: (f"An ideal monoatomic gas ({(k%4)+1} moles) undergoes isobaric expansion with temperature rise {((k%5)+2)*10} K (R = 8.3 J/mol-K). Work done by gas rounded to nearest integer (in J) is:",
                            str(round(((k%4)+1)*8.3*((k%5)+2)*10)),
                            "For isobaric process, W = n R Delta_T.")),
                ("CHEMISTRY", 12, "Electrochemistry & Chemical Kinetics", "ELEC_KIN",
                 lambda k: (f"For a first-order reaction with rate constant k = {((k%8)+2)*0.01:.2f} min^-1, the time required for 75% completion (ln 2 = 0.693) is:",
                            [f"{(2*0.693)/(((k%8)+2)*0.01):.1f} min", f"{(0.693)/(((k%8)+2)*0.01):.1f} min", f"{(3*0.693)/(((k%8)+2)*0.01):.1f} min", f"{(0.301)/(((k%8)+2)*0.01):.1f} min"], "0",
                            "75% completion corresponds to two half-lives: t_75% = 2 * t_1/2 = 2 * (0.693 / k)."),
                 lambda k: (f"Calculate the standard cell potential E0_cell (in mV) when E0_cathode = +{0.70 + (k%15)*0.02:.2f} V and E0_anode = -{0.20 + (k%10)*0.02:.2f} V:",
                            str(round(((0.70 + (k%15)*0.02) - (-0.20 - (k%10)*0.02))*1000)),
                            "E0_cell = E0_cathode - E0_anode, converted to mV by multiplying by 1000.")),
                ("MATHEMATICS", 12, "Definite Integrals & Differential Equations", "CALC_VEC",
                 lambda k: (f"Evaluate the definite integral I = integral from 0 to pi/2 of [sin^{k%5+2}(x) / (sin^{k%5+2}(x) + cos^{k%5+2}(x))] dx:",
                            ["pi / 4", "pi / 2", "pi / 6", "1 / 2"], "0",
                            "Using King's property f(a+b-x) = f(x), 2I = pi/2 => I = pi/4."),
                 lambda k: (f"Find the number of real roots of the quadratic equation x^2 - {((k%6)+3)*2}x + {((k%4)+1)} = 0:",
                            "2",
                            "Discriminant D = b^2 - 4ac > 0, hence 2 distinct real roots."))
            ]
            tiers = ["FOUNDATION", "CONTENDER_98_650", "AIR_TOP_500"]
            for subj, cls, chap, tag, mcq_fn, num_fn in jee_specs:
                for i in range(1, 241):
                    p, opts, ans, exp = mcq_fn(i)
                    rows.append((f"JEE-10X-{subj[:3]}-MCQ-{i:03d}", subj, cls, chap, tag, ["JEE"], "MCQ_SINGLE", tiers[i % 3], p, _json.dumps(opts), ans, exp))
                for i in range(1, 61):
                    p, ans, exp = num_fn(i)
                    rows.append((f"JEE-10X-{subj[:3]}-NUM-{i:03d}", subj, cls, chap, tag, ["JEE"], "NUMERICAL_INT", tiers[i % 3], p, None, ans, exp))

            # 2. NEET 1,800-Item Expansion (450 Physics, 450 Chemistry, 450 Botany, 450 Zoology = 10x 180-Q Mock)
            neet_specs = [
                ("PHYSICS", 11, "Laws of Motion, Optics & Modern Physics", "NEET_PHY",
                 lambda k: (f"A photon of wavelength {((k%6)+2)*100} nm strikes a metal surface (hc = 1240 eV-nm). The energy of the incident photon is:",
                            [f"{1240/(((k%6)+2)*100):.2f} eV", f"{620/(((k%6)+2)*100):.2f} eV", f"{2480/(((k%6)+2)*100):.2f} eV", f"{124/(((k%6)+2)*100):.2f} eV"], "0",
                            "E = hc / lambda = 1240 / lambda(nm) in eV.")),
                ("CHEMISTRY", 12, "Coordination Compounds, Solutions & Biomolecules", "NEET_CHM",
                 lambda k: (f"An aqueous solution contains {((k%5)+1)*0.1:.1f} molal non-electrolyte solute (Kf = 1.86 K kg/mol). The depression in freezing point Delta_Tf is:",
                            [f"{((k%5)+1)*0.1*1.86:.3f} K", f"{((k%5)+1)*0.2*1.86:.3f} K", f"{((k%5)+1)*0.05*1.86:.3f} K", f"{1.86:.3f} K"], "0",
                            "Delta_Tf = i * Kf * m = 1 * 1.86 * m.")),
                ("BOTANY", 12, "Molecular Basis of Inheritance & Cell Cycle", "NEET_BOT",
                 lambda k: (f"In a dsDNA segment of {((k%9)+2)*100} base pairs containing {(k%20)+15}% Adenine, the percentage of Guanine bases according to Chargaff's rule is:",
                            [f"{50 - ((k%20)+15)}%", f"{(k%20)+15}%", f"{100 - 2*((k%20)+15)}%", "25%"], "0",
                            "By Chargaff's rule, A + G = 50% in double-stranded DNA, so %G = 50% - %A.")),
                ("ZOOLOGY", 11, "Human Physiology, Neural Control & Immunity", "NEET_ZOO",
                 lambda k: (f"If a healthy adult has heart rate {68 + (k%15)} beats/min and stroke volume {65 + (k%10)} mL, the cardiac output per minute is:",
                            [f"{(68+(k%15))*(65+(k%10))} mL/min", f"{(68+(k%15))*50} mL/min", f"{(65+(k%10))*50} mL/min", "3500 mL/min"], "0",
                            "Cardiac Output = Heart Rate x Stroke Volume."))
            ]
            qtypes = ["MCQ_SINGLE", "ASSERTION_REASON", "STATEMENT_I_II"]
            for subj, cls, chap, tag, fn in neet_specs:
                for i in range(1, 451):
                    p, opts, ans, exp = fn(i)
                    qt = qtypes[i % 3]
                    if qt == "ASSERTION_REASON":
                        p = f"Assertion (A): {p}\nReason (R): This follows directly from standard NCERT Class {cls} {subj.title()} principles."
                    elif qt == "STATEMENT_I_II":
                        p = f"Statement I: {p}\nStatement II: Quantitative stoichiometry and NCERT laws govern this result."
                    rows.append((f"NEET-10X-{subj[:3]}-{i:03d}", subj, cls, chap, tag, ["NEET"], qt, tiers[i % 3], p, _json.dumps(opts), ans, exp))

            stmt = _sa_text("""
                INSERT INTO jee_neet_questions
                (question_code, subject, ncert_class, chapter_name, topic_tag, exam_tags, question_type, difficulty_tier, prompt, options_json, correct_answer, explanation)
                VALUES (:code, :subj, :cls, :chap, :tag, :etags, :qtype, :tier, :prompt, CAST(:opts AS jsonb), :ans, :exp)
                ON CONFLICT (question_code) DO NOTHING
            """)
            for r in rows:
                conn.execute(stmt, {
                    "code": r[0], "subj": r[1], "cls": r[2], "chap": r[3], "tag": r[4],
                    "etags": r[5], "qtype": r[6], "tier": r[7], "prompt": r[8],
                    "opts": r[9], "ans": r[10], "exp": r[11]
                })
    except Exception as _e:
        print("10x Science bank seeder note:", _e)

try:
    _ensure_10x_science_question_bank()
except Exception:
    pass
