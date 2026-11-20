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
def get_dynamic_mock_paper(exam: str = "JEE", scope: str = "FULL", difficulty: str = "MODERATE"):
    from sqlalchemy import text as _sa_text
    exam_code = exam.strip().upper()
    sc = scope.strip().upper()
    diff = difficulty.strip().upper()
    tier_order = (
        "CASE difficulty_tier WHEN 'AIR_TOP_500' THEN 1 WHEN 'CONTENDER_98_650' THEN 2 ELSE 3 END, RANDOM()"
        if diff == "TOUGH"
        else (
            "CASE difficulty_tier WHEN 'FOUNDATION' THEN 1 WHEN 'CONTENDER_98_650' THEN 2 ELSE 3 END, RANDOM()"
            if diff == "EASY"
            else "RANDOM()"
        )
    )
    eng = _get_science_engine()
    paper = []
    with eng.connect() as conn:
        if exam_code == "JEE":
            subjs = ("PHYSICS", "CHEMISTRY", "MATHEMATICS") if sc == "FULL" else (sc,)
            for subj in subjs:
                mcqs = conn.execute(_sa_text(f"""
                    SELECT id, question_code, subject, ncert_class, chapter_name, topic_tag,
                           exam_tags, question_type, difficulty_tier, prompt,
                           options_json, correct_answer, explanation
                    FROM jee_neet_questions
                    WHERE 'JEE' = ANY(exam_tags) AND subject = :s AND question_type != 'NUMERICAL_INT'
                    ORDER BY {tier_order} LIMIT 20
                """), {"s": subj}).mappings().all()
                nums = conn.execute(_sa_text(f"""
                    SELECT id, question_code, subject, ncert_class, chapter_name, topic_tag,
                           exam_tags, question_type, difficulty_tier, prompt,
                           options_json, correct_answer, explanation
                    FROM jee_neet_questions
                    WHERE 'JEE' = ANY(exam_tags) AND subject = :s AND question_type = 'NUMERICAL_INT'
                    ORDER BY {tier_order} LIMIT 5
                """), {"s": subj}).mappings().all()
                for r in mcqs:
                    d = dict(r); d["mock_sec"] = "Section A (MCQ)"; d["mock_subj"] = subj; paper.append(d)
                for r in nums:
                    d = dict(r); d["mock_sec"] = "Section B (Numerical)"; d["mock_subj"] = subj; paper.append(d)
        else:
            if sc == "FULL":
                subjs = ("PHYSICS", "CHEMISTRY", "BOTANY", "ZOOLOGY")
            elif sc == "BIOLOGY":
                subjs = ("BOTANY", "ZOOLOGY")
            else:
                subjs = (sc,)
            for subj in subjs:
                rows = conn.execute(_sa_text(f"""
                    SELECT id, question_code, subject, ncert_class, chapter_name, topic_tag,
                           exam_tags, question_type, difficulty_tier, prompt,
                           options_json, correct_answer, explanation
                    FROM jee_neet_questions
                    WHERE 'NEET' = ANY(exam_tags) AND subject = :s
                    ORDER BY {tier_order} LIMIT 45
                """), {"s": subj}).mappings().all()
                for r in rows:
                    d = dict(r); d["mock_sec"] = "Compulsory MCQ"; d["mock_subj"] = subj; paper.append(d)
    return {"ok": True, "exam": exam_code, "scope": sc, "difficulty": diff, "count": len(paper), "paper": paper}

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
        import json as _json, random as _rnd
        eng = _get_science_engine()
        with eng.begin() as conn:
            v2_cnt = conn.execute(_sa_text("SELECT COUNT(*) FROM jee_neet_questions WHERE question_code LIKE 'JEE-10X-V2-%' OR question_code LIKE 'NEET-10X-V2-%'")).scalar() or 0
            if v2_cnt >= 2700:
                return

            conn.execute(_sa_text("DELETE FROM jee_neet_questions WHERE question_code LIKE 'JEE-10X-%' OR question_code LIKE 'NEET-10X-%'"))
            rng = _rnd.Random(20261119)

            def pack_mcq(code, subj, cls, chap, tag, etags, tier, prompt, correct_str, distractors, exp):
                opts = [correct_str] + list(distractors[:3])
                rng.shuffle(opts)
                return {
                    "code": code, "subj": subj, "cls": cls, "chap": chap, "tag": tag,
                    "etags": etags, "qtype": "MCQ_SINGLE", "tier": tier, "prompt": prompt,
                    "opts": _json.dumps(opts), "ans": str(opts.index(correct_str)), "exp": exp
                }

            tiers = ["FOUNDATION", "CONTENDER_98_650", "AIR_TOP_500"]
            params_list = []

            # 1. JEE PHYSICS (240 Diverse MCQs + 60 Numericals = 300)
            for i in range(1, 241):
                m = (i % 6) + 2; v = ((i % 5) + 2) * 2; q_uc = (i % 7) + 2; d_cm = ((i % 4) + 2) * 10
                r_ohm = ((i % 6) + 2) * 5; volt = ((i % 5) + 2) * 12; focal = ((i % 5) + 2) * 10; u_obj = focal * 2
                arch = i % 6
                if arch == 0:
                    ke = 0.75 * m * (v ** 2)
                    params_list.append(pack_mcq(f"JEE-10X-V2-PHY-MCQ-{i:03d}", "PHYSICS", 11, "Rotational Motion", "ROT", ["JEE"], tiers[i%3],
                        f"A solid cylinder of mass {m} kg rolls without slipping on a horizontal surface at {v} m/s. Its total kinetic energy is:",
                        f"{ke:.1f} J", [f"{0.5*m*(v**2):.1f} J", f"{1.25*m*(v**2):.1f} J", f"{0.25*m*(v**2):.1f} J"],
                        "For a rolling solid cylinder (I = 1/2 mR^2), KE_total = (3/4)mv^2."))
                elif arch == 1:
                    r_m = d_cm / 100.0
                    ef = (9e9 * (q_uc * 1e-6)) / (r_m ** 2)
                    params_list.append(pack_mcq(f"JEE-10X-V2-PHY-MCQ-{i:03d}", "PHYSICS", 12, "Electrostatics", "ELEC", ["JEE"], tiers[i%3],
                        f"Find the magnitude of electric field in air at a distance of {d_cm} cm from a point charge of +{q_uc} uC:",
                        f"{ef:.2e} N/C", [f"{ef/2:.2e} N/C", f"{ef*2:.2e} N/C", f"{ef/10:.2e} N/C"],
                        "E = kq / r^2 with k = 9 x 10^9 N m^2 C^-2 and r in meters."))
                elif arch == 2:
                    pwr = (volt ** 2) / r_ohm
                    params_list.append(pack_mcq(f"JEE-10X-V2-PHY-MCQ-{i:03d}", "PHYSICS", 12, "Current Electricity", "CURR", ["JEE"], tiers[i%3],
                        f"A resistor of {r_ohm} ohm is connected across an ideal {volt} V DC source. Power dissipated as heat is:",
                        f"{pwr:.1f} W", [f"{pwr*2:.1f} W", f"{pwr/2:.1f} W", f"{volt*r_ohm:.1f} W"],
                        "Joule heating power P = V^2 / R."))
                elif arch == 3:
                    params_list.append(pack_mcq(f"JEE-10X-V2-PHY-MCQ-{i:03d}", "PHYSICS", 12, "Ray Optics", "OPT", ["JEE"], tiers[i%3],
                        f"An object is placed at {u_obj} cm in front of a convex lens of focal length +{focal} cm. The image distance v is:",
                        f"+{u_obj} cm", [f"+{focal} cm", f"-{u_obj} cm", f"+{focal//2} cm"],
                        "At u = -2f for a converging lens, 1/v - 1/(-2f) = 1/f => v = +2f."))
                elif arch == 4:
                    wl = ((i % 6) + 2) * 100
                    ev = 1240.0 / wl
                    params_list.append(pack_mcq(f"JEE-10X-V2-PHY-MCQ-{i:03d}", "PHYSICS", 12, "Dual Nature & Atoms", "MOD", ["JEE"], tiers[i%3],
                        f"Monochromatic light of wavelength {wl} nm has photon energy (take hc = 1240 eV-nm):",
                        f"{ev:.2f} eV", [f"{ev*2:.2f} eV", f"{ev/2:.2f} eV", f"{1240.0/(wl*10):.2f} eV"],
                        "Photon energy E = hc / lambda = 1240 / lambda(nm) in eV."))
                else:
                    alt = ((i % 5) + 1) * 320
                    g_h = round(9.8 * ((6400 / (6400 + alt)) ** 2), 2)
                    params_list.append(pack_mcq(f"JEE-10X-V2-PHY-MCQ-{i:03d}", "PHYSICS", 11, "Gravitation", "GRAV", ["JEE"], tiers[i%3],
                        f"Taking R_earth = 6400 km and g = 9.8 m/s^2, acceleration due to gravity at altitude h = {alt} km is:",
                        f"{g_h:.2f} m/s^2", [f"{9.8*(6400/(6400+alt)):.2f} m/s^2", "9.80 m/s^2", f"{g_h*0.5:.2f} m/s^2"],
                        "g(h) = g * [R / (R + h)]^2."))

            for i in range(1, 61):
                n_mol = (i % 4) + 1; dt = ((i % 5) + 2) * 10
                w_j = round(n_mol * 8.3 * dt)
                params_list.append({
                    "code": f"JEE-10X-V2-PHY-NUM-{i:03d}", "subj": "PHYSICS", "cls": 11, "chap": "Thermodynamics",
                    "tag": "THERMO", "etags": ["JEE"], "qtype": "NUMERICAL_INT", "tier": tiers[i%3],
                    "prompt": f"An ideal gas ({n_mol} mol) expands isobarically when heated by {dt} K (R = 8.3 J/mol-K). Work done by gas rounded to nearest integer (in J) is:",
                    "opts": None, "ans": str(w_j), "exp": "Isobaric work W = n * R * Delta_T."
                })

            # 2. JEE CHEMISTRY (240 Diverse MCQs + 60 Numericals = 300)
            for i in range(1, 241):
                arch = i % 5
                if arch == 0:
                    k_rate = ((i % 8) + 2) * 0.01
                    t75 = (2 * 0.693) / k_rate
                    params_list.append(pack_mcq(f"JEE-10X-V2-CHM-MCQ-{i:03d}", "CHEMISTRY", 12, "Chemical Kinetics", "KIN", ["JEE"], tiers[i%3],
                        f"For a first-order reaction with k = {k_rate:.2f} min^-1 (ln 2 = 0.693), time for 75% completion is:",
                        f"{t75:.1f} min", [f"{t75/2:.1f} min", f"{t75*1.5:.1f} min", f"{0.301/k_rate:.1f} min"],
                        "75% completion = 2 half-lives = 2 * (0.693 / k)."))
                elif arch == 1:
                    m_conc = ((i % 5) + 1) * 0.1
                    dtf = m_conc * 1.86
                    params_list.append(pack_mcq(f"JEE-10X-V2-CHM-MCQ-{i:03d}", "CHEMISTRY", 12, "Solutions", "SOL", ["JEE"], tiers[i%3],
                        f"Freezing point depression of a {m_conc:.1f} m aqueous glucose solution (Kf = 1.86 K kg/mol) is:",
                        f"{dtf:.3f} K", [f"{dtf*2:.3f} K", f"{dtf/2:.3f} K", "1.860 K"],
                        "Delta_Tf = i * Kf * m with van't Hoff factor i = 1 for glucose."))
                elif arch == 2:
                    hyb_cases = [
                        ("SF6", "sp3d2 (Octahedral)", ["sp3d (Trigonal bipyramidal)", "d2sp3 (Square planar)", "sp3 (Tetrahedral)"]),
                        ("XeF4", "sp3d2 (Square planar)", ["sp3 (Tetrahedral)", "sp3d (See-saw)", "sp2 (Trigonal planar)"]),
                        ("PCl5", "sp3d (Trigonal bipyramidal)", ["sp3d2 (Octahedral)", "sp3 (Pyramidal)", "dsp2 (Square planar)"]),
                        ("BF3", "sp2 (Trigonal planar)", ["sp3 (Pyramidal)", "sp (Linear)", "sp3d (T-shaped)"])
                    ]
                    sp, corr, dist = hyb_cases[i % 4]
                    params_list.append(pack_mcq(f"JEE-10X-V2-CHM-MCQ-{i:03d}", "CHEMISTRY", 11, "Chemical Bonding", "BOND", ["JEE"], tiers[i%3],
                        f"According to VSEPR theory, the hybridization and molecular geometry of {sp} (Set #{i}) are:",
                        corr, dist, f"Steric number calculation around the central atom in {sp} yields {corr}."))
                elif arch == 3:
                    org_cases = [
                        ("Anisole with HI (1 equiv, 373 K)", "Phenol + Methyl iodide", ["Iodobenzene + Methanol", "Benzene + CH3I", "2-Iodoanisole"]),
                        ("Cumene hydroperoxide with dilute H2SO4", "Phenol + Acetone", ["Benzaldehyde + Methanol", "Benzoic acid + Ethanol", "Acetophenone + H2O"]),
                        ("Benzaldehyde with 50% NaOH (Cannizzaro)", "Benzyl alcohol + Sodium benzoate", ["Cinnamic acid", "Benzoin", "Phenol + Formate"]),
                        ("Primary amide (RCONH2) with Br2 + KOH", "Primary amine with one less carbon", ["Nitrile (RCN)", "Carboxylic acid", "Secondary amine"])
                    ]
                    reag, corr, dist = org_cases[i % 4]
                    params_list.append(pack_mcq(f"JEE-10X-V2-CHM-MCQ-{i:03d}", "CHEMISTRY", 12, "Organic Mechanisms", "ORG", ["JEE"], tiers[i%3],
                        f"Identify the major organic product(s) obtained upon treating {reag} (Drill #{i}):",
                        corr, dist, f"Standard NCERT Class 12 Organic reaction mechanism for {reag} gives {corr}."))
                else:
                    ph_exp = (i % 5) + 2
                    params_list.append(pack_mcq(f"JEE-10X-V2-CHM-MCQ-{i:03d}", "CHEMISTRY", 11, "Ionic Equilibrium", "EQUIL", ["JEE"], tiers[i%3],
                        f"What is the pH of a {10**(-ph_exp):.0e} M aqueous HCl solution at 298 K?",
                        f"{ph_exp}.0", [f"{14 - ph_exp}.0", f"{ph_exp + 1}.0", f"{ph_exp - 1}.0"],
                        "For strong monoprotic acid [H+] = C, pH = -log10([H+])."))

            for i in range(1, 61):
                ec = round(0.70 + (i % 15) * 0.02, 2)
                ea = round(-0.20 - (i % 10) * 0.02, 2)
                mv = round((ec - ea) * 1000)
                params_list.append({
                    "code": f"JEE-10X-V2-CHM-NUM-{i:03d}", "subj": "CHEMISTRY", "cls": 12, "chap": "Electrochemistry",
                    "tag": "ELEC", "etags": ["JEE"], "qtype": "NUMERICAL_INT", "tier": tiers[i%3],
                    "prompt": f"Given E0_cathode = +{ec:.2f} V and E0_anode = {ea:.2f} V, standard EMF E0_cell (in mV) is:",
                    "opts": None, "ans": str(mv), "exp": "E0_cell = E0_cathode - E0_anode; multiply by 1000 for mV."
                })

            # 3. JEE MATHEMATICS (240 Diverse MCQs + 60 Numericals = 300)
            for i in range(1, 241):
                arch = i % 6
                if arch == 0:
                    a = (i % 7) + 2; b = (i % 5) + 3
                    params_list.append(pack_mcq(f"JEE-10X-V2-MAT-MCQ-{i:03d}", "MATHEMATICS", 12, "Limits & Continuity", "LIM", ["JEE"], tiers[i%3],
                        f"Evaluate lim (x -> 0) [sin({a}x) / ({b}x)]:",
                        f"{a}/{b}", [f"{b}/{a}", "1", "0"],
                        "Using lim(u->0) sin(u)/u = 1, the limit equals a/b."))
                elif arch == 1:
                    n_pow = (i % 6) + 3
                    params_list.append(pack_mcq(f"JEE-10X-V2-MAT-MCQ-{i:03d}", "MATHEMATICS", 12, "Definite Integration", "INT", ["JEE"], tiers[i%3],
                        f"Evaluate integral from 0 to pi/2 of [cos^{n_pow}(x) / (sin^{n_pow}(x) + cos^{n_pow}(x))] dx:",
                        "pi / 4", ["pi / 2", f"pi / {n_pow}", "1 / 2"],
                        "Applying King's property f(pi/2 - x) gives 2I = pi/2 => I = pi/4."))
                elif arch == 2:
                    d1 = (i % 5) + 2; d2 = (i % 4) + 3; k_sc = (i % 3) + 2
                    det_val = (k_sc ** 3) * (d1 * d2)
                    params_list.append(pack_mcq(f"JEE-10X-V2-MAT-MCQ-{i:03d}", "MATHEMATICS", 12, "Matrices & Determinants", "MAT", ["JEE"], tiers[i%3],
                        f"If A is a 3x3 matrix with |A| = {d1 * d2}, then |{k_sc}A| equals:",
                        str(det_val), [str(k_sc * d1 * d2), str((k_sc ** 2) * d1 * d2), str(3 * k_sc * d1 * d2)],
                        "For an n x n matrix, |kA| = k^n |A| = k^3 |A|."))
                elif arch == 3:
                    a1 = (i % 6) + 2; d_ap = (i % 4) + 3; n_t = 10
                    s10 = (n_t // 2) * (2 * a1 + (n_t - 1) * d_ap)
                    params_list.append(pack_mcq(f"JEE-10X-V2-MAT-MCQ-{i:03d}", "MATHEMATICS", 11, "Sequences & Series", "SEQ", ["JEE"], tiers[i%3],
                        f"Find the sum of the first 10 terms of an AP with first term a = {a1} and common difference d = {d_ap}:",
                        str(s10), [str(s10 + 10), str(s10 - 10), str(a1 + 9 * d_ap)],
                        "S_n = (n/2)[2a + (n-1)d]."))
                elif arch == 4:
                    p_a = round(0.2 + (i % 4) * 0.1, 1); p_b = round(0.3 + (i % 3) * 0.1, 1)
                    p_union = round(p_a + p_b - p_a * p_b, 2)
                    params_list.append(pack_mcq(f"JEE-10X-V2-MAT-MCQ-{i:03d}", "MATHEMATICS", 12, "Probability", "PROB", ["JEE"], tiers[i%3],
                        f"If A and B are independent events with P(A) = {p_a:.1f} and P(B) = {p_b:.1f}, find P(A U B):",
                        f"{p_union:.2f}", [f"{p_a + p_b:.2f}", f"{p_a * p_b:.2f}", f"{1 - p_union:.2f}"],
                        "For independent events, P(A U B) = P(A) + P(B) - P(A)P(B)."))
                else:
                    r_c = (i % 6) + 2; h_c = (i % 5) + 1; k_c = (i % 4) + 2
                    params_list.append(pack_mcq(f"JEE-10X-V2-MAT-MCQ-{i:03d}", "MATHEMATICS", 11, "Conic Sections", "CONIC", ["JEE"], tiers[i%3],
                        f"Find the radius of the circle (x - {h_c})^2 + (y + {k_c})^2 = {r_c ** 2}:",
                        str(r_c), [str(r_c ** 2), str(h_c + k_c), str(2 * r_c)],
                        "Standard form (x - h)^2 + (y - k)^2 = r^2 gives r = sqrt(r^2)."))

            for i in range(1, 61):
                c_val = (i % 8) + 2
                params_list.append({
                    "code": f"JEE-10X-V2-MAT-NUM-{i:03d}", "subj": "MATHEMATICS", "cls": 12, "chap": "Definite Integrals",
                    "tag": "CALC", "etags": ["JEE"], "qtype": "NUMERICAL_INT", "tier": tiers[i%3],
                    "prompt": f"Evaluate the definite integral of f(x) = 2x from x = 0 to x = {c_val}:",
                    "opts": None, "ans": str(c_val ** 2), "exp": "Antiderivative of 2x is x^2; [x^2]_0^c = c^2."
                })

            # 4. NEET 1,800 Diverse Items (450 Physics, 450 Chemistry, 450 Botany, 450 Zoology)
            qtypes = ["MCQ_SINGLE", "ASSERTION_REASON", "STATEMENT_I_II"]
            for i in range(1, 451):
                qt = qtypes[i % 3]
                wl = ((i % 7) + 2) * 100; ev = round(1240.0 / wl, 2)
                p_txt = f"A photon has wavelength {wl} nm (hc = 1240 eV-nm). Its energy is {ev:.2f} eV." if qt != "MCQ_SINGLE" else f"Calculate the energy of a photon of wavelength {wl} nm (hc = 1240 eV-nm):"
                if qt == "ASSERTION_REASON":
                    p_txt = f"Assertion (A): {p_txt}\nReason (R): Photon energy is inversely proportional to wavelength (E = hc/lambda)."
                elif qt == "STATEMENT_I_II":
                    p_txt = f"Statement I: {p_txt}\nStatement II: Increasing wavelength increases photon momentum."
                corr = f"{ev:.2f} eV" if qt == "MCQ_SINGLE" else ("Both A and R are true and R is the correct explanation of A" if qt == "ASSERTION_REASON" else "Statement I is true but Statement II is false")
                dists = [f"{ev*2:.2f} eV", f"{ev/2:.2f} eV", f"{ev+1:.2f} eV"] if qt == "MCQ_SINGLE" else ["Both statements are true", "Both statements are false", "Assertion is false but Reason is true"]
                item = pack_mcq(f"NEET-10X-V2-PHY-{i:03d}", "PHYSICS", 12, "Modern Physics & Optics", "NEET_PHY", ["NEET"], tiers[i%3], p_txt, corr, dists, "E = hc/lambda = 1240/lambda(nm); momentum p = h/lambda decreases with wavelength.")
                item["qtype"] = qt; params_list.append(item)

                m_c = ((i % 6) + 1) * 0.1; dtf = round(m_c * 1.86, 3)
                c_txt = f"A {m_c:.1f} m aqueous urea solution (Kf = 1.86 K kg/mol) shows freezing point depression of {dtf:.3f} K." if qt != "MCQ_SINGLE" else f"Calculate freezing point depression for {m_c:.1f} m aqueous urea (Kf = 1.86 K kg/mol):"
                if qt == "ASSERTION_REASON":
                    c_txt = f"Assertion (A): {c_txt}\nReason (R): Urea is a non-electrolyte in water with van't Hoff factor i = 1."
                elif qt == "STATEMENT_I_II":
                    c_txt = f"Statement I: {c_txt}\nStatement II: Adding non-volatile solute elevates the freezing point of water."
                item = pack_mcq(f"NEET-10X-V2-CHM-{i:03d}", "CHEMISTRY", 12, "Solutions & Colligative Properties", "NEET_CHM", ["NEET"], tiers[i%3], c_txt,
                    f"{dtf:.3f} K" if qt == "MCQ_SINGLE" else corr,
                    [f"{dtf*2:.3f} K", f"{dtf/2:.3f} K", "1.860 K"] if qt == "MCQ_SINGLE" else dists,
                    "Delta_Tf = i * Kf * m; non-volatile solutes depress freezing point.")
                item["qtype"] = qt; params_list.append(item)

                a_pct = (i % 20) + 15; g_pct = 50 - a_pct
                b_txt = f"In double-stranded DNA with {a_pct}% Adenine, Guanine constitutes {g_pct}% of total bases." if qt != "MCQ_SINGLE" else f"If double-stranded DNA contains {a_pct}% Adenine, what is the percentage of Guanine?"
                if qt == "ASSERTION_REASON":
                    b_txt = f"Assertion (A): {b_txt}\nReason (R): By Chargaff's rule, A = T and G = C so A + G = 50% in dsDNA."
                elif qt == "STATEMENT_I_II":
                    b_txt = f"Statement I: {b_txt}\nStatement II: Adenine pairs with Guanine via three hydrogen bonds."
                item = pack_mcq(f"NEET-10X-V2-BOT-{i:03d}", "BOTANY", 12, "Molecular Basis of Inheritance", "NEET_BOT", ["NEET"], tiers[i%3], b_txt,
                    f"{g_pct}%" if qt == "MCQ_SINGLE" else corr,
                    [f"{a_pct}%", f"{100-2*a_pct}%", "25%"] if qt == "MCQ_SINGLE" else dists,
                    "Chargaff's base-pairing rule: %A + %G = 50% in dsDNA.")
                item["qtype"] = qt; params_list.append(item)

                hr = 68 + (i % 15); sv = 65 + (i % 10); co = hr * sv
                z_txt = f"At heart rate {hr} beats/min and stroke volume {sv} mL, cardiac output is {co} mL/min." if qt != "MCQ_SINGLE" else f"Calculate cardiac output when heart rate is {hr} beats/min and stroke volume is {sv} mL:"
                if qt == "ASSERTION_REASON":
                    z_txt = f"Assertion (A): {z_txt}\nReason (R): Cardiac output equals stroke volume multiplied by heart rate per minute."
                elif qt == "STATEMENT_I_II":
                    z_txt = f"Statement I: {z_txt}\nStatement II: The SA node normally generates 120-140 action potentials per minute."
                item = pack_mcq(f"NEET-10X-V2-ZOO-{i:03d}", "ZOOLOGY", 11, "Body Fluids & Circulation", "NEET_ZOO", ["NEET"], tiers[i%3], z_txt,
                    f"{co} mL/min" if qt == "MCQ_SINGLE" else corr,
                    [f"{hr*50} mL/min", f"{sv*50} mL/min", "3600 mL/min"] if qt == "MCQ_SINGLE" else dists,
                    "Cardiac Output = Stroke Volume x Heart Rate (SA node fires ~70-75/min).")
                item["qtype"] = qt; params_list.append(item)

            stmt = _sa_text("""
                INSERT INTO jee_neet_questions
                (question_code, subject, ncert_class, chapter_name, topic_tag, exam_tags, question_type, difficulty_tier, prompt, options_json, correct_answer, explanation)
                VALUES (:code, :subj, :cls, :chap, :tag, :etags, :qtype, :tier, :prompt, CAST(:opts AS jsonb), :ans, :exp)
                ON CONFLICT (question_code) DO NOTHING
            """)
            conn.execute(stmt, params_list)
    except Exception as _e:
        print("10x Science bank seeder note:", _e)

import threading as _threading
_threading.Thread(target=_ensure_10x_science_question_bank, daemon=True).start()
