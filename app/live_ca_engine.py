import os
import json
import time
import urllib.parse
import urllib.request
from datetime import datetime, timezone
import feedparser

ARCHIVE_PATH = os.path.join(os.path.dirname(__file__), "data", "live_current_affairs.json")
os.makedirs(os.path.dirname(ARCHIVE_PATH), exist_ok=True)

PILLAR_QUERIES = {
    "Economic": "India economy RBI GDP inflation budget trade policy",
    "Social": "India education healthcare employment gender skilling social welfare",
    "Civic": "India urban governance Supreme Court digital public infrastructure municipal",
    "Domestic": "India infrastructure manufacturing states federalism agriculture energy",
    "International": "India foreign policy global trade geopolitics BRICS G20 supply chain"
}

def _fetch_rss_headlines(per_pillar: int = 4) -> dict:
    collected = {}
    for pillar, query in PILLAR_QUERIES.items():
        encoded = urllib.parse.quote(query)
        url = f"https://news.google.com/rss/search?q={encoded}&hl=en-IN&gl=IN&ceid=IN:en"
        feed = feedparser.parse(url)
        items = []
        seen = set()
        for entry in feed.entries[:12]:
            title = (entry.get("title") or "").split(" - ")[0].strip()
            if not title or title.lower() in seen:
                continue
            seen.add(title.lower())
            items.append({
                "title": title,
                "published": entry.get("published", ""),
                "source": (entry.get("source", {}) or {}).get("title", "News Feed")
            })
            if len(items) >= per_pillar:
                break
        collected[pillar] = items
    return collected

def load_archive() -> list:
    if not os.path.exists(ARCHIVE_PATH):
        return []
    try:
        with open(ARCHIVE_PATH, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return []

def save_archive(items: list) -> None:
    with open(ARCHIVE_PATH, "w", encoding="utf-8") as f:
        json.dump(items, f, ensure_ascii=False, indent=2)

def _synthesize_with_gemini_rest(headlines: dict, api_key: str, today_str: str) -> list:
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={api_key}"
    prompt_text = (
        "You are an IIM IPM & Undergraduate Admissions Panelist. Convert these live Indian and global news headlines "
        "into sharp, analytical Personal Interview (PI) and Written Ability Test (WAT) prompts for Class 12 / UG applicants. "
        "Return strictly a JSON array of objects, each with keys: "
        "'subDomain' (one of: Economic, Social, Civic, Domestic, International), "
        "'campus' (e.g. 'Live Weekly Briefing • IIM Indore / Rohtak / IIMB'), "
        "'category' (short topic tag), "
        "'prompt' (the full analytical PI/WAT question referencing the current issue), and "
        "'rubricHints' (array of 3 specific analytical/quantitative points the student must cover).\n\n"
        f"Headlines ({today_str}):\n{json.dumps(headlines, ensure_ascii=False)}"
    )
    payload = json.dumps({
        "contents": [{"parts": [{"text": prompt_text}]}],
        "generationConfig": {"responseMimeType": "application/json", "temperature": 0.4}
    }).encode("utf-8")
    req = urllib.request.Request(url, data=payload, headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=30) as resp:
        body = json.loads(resp.read().decode("utf-8"))
    raw_text = body["candidates"][0]["content"]["parts"][0]["text"]
    return json.loads(raw_text)

def refresh_live_current_affairs(force: bool = False, max_age_hours: int = 168) -> dict:
    existing = load_archive()
    if not force and existing and os.path.exists(ARCHIVE_PATH):
        age_hours = (time.time() - os.path.getmtime(ARCHIVE_PATH)) / 3600.0
        if age_hours < max_age_hours:
            return {"status": "cached", "count": len(existing), "items": existing}

    headlines = _fetch_rss_headlines(per_pillar=4)
    api_key = os.environ.get("GEMINI_API_KEY", "").strip()
    today_str = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    week_label = datetime.now(timezone.utc).strftime("Week %V, %Y")

    generated = []
    if api_key:
        try:
            raw_list = _synthesize_with_gemini_rest(headlines, api_key, today_str)
            for idx, item in enumerate(raw_list):
                generated.append({
                    "id": f"live_{int(time.time())}_{idx}",
                    "exams": ["ALL_IIM_MASTER", "IPMAT_INDORE_RANCHI", "IPMAT_ROHTAK", "JIPMAT_BG_JAMMU", "IIMB_UG_ECON_DS_DBE", "IIMM_IIML_TECH_MGMT"],
                    "group": "Current Affairs & Policy",
                    "subDomain": item.get("subDomain", "Economic"),
                    "dateTag": f"{week_label} ({today_str})",
                    "campus": item.get("campus", f"Live Current Affairs ({week_label})"),
                    "category": item.get("category", "Live Policy Issue"),
                    "prompt": item.get("prompt", ""),
                    "rubricHints": item.get("rubricHints", [])
                })
        except Exception:
            generated = []

    if not generated:
        for pillar, entries in headlines.items():
            for idx, ent in enumerate(entries):
                generated.append({
                    "id": f"rss_{pillar.lower()}_{int(time.time())}_{idx}",
                    "exams": ["ALL_IIM_MASTER", "IPMAT_INDORE_RANCHI", "IPMAT_ROHTAK", "JIPMAT_BG_JAMMU", "IIMB_UG_ECON_DS_DBE", "IIMM_IIML_TECH_MGMT"],
                    "group": "Current Affairs & Policy",
                    "subDomain": pillar,
                    "dateTag": f"{week_label} ({today_str})",
                    "campus": f"Live {pillar} Briefing ({week_label})",
                    "category": f"{pillar} Policy & Governance",
                    "prompt": f"[{today_str} Live Issue] '{ent['title']}'. Analyze the economic, social, and governance implications of this development for India's stakeholders.",
                    "rubricHints": [
                        "Identify primary stakeholders affected (consumers, businesses, regulators).",
                        "Evaluate short-term fiscal/operational trade-offs vs. long-term structural impact.",
                        "Conclude with a balanced, data-backed policy recommendation."
                    ]
                })

    seen_prompts = {x["prompt"].strip().lower() for x in existing}
    merged = [g for g in generated if g["prompt"].strip().lower() not in seen_prompts] + existing
    save_archive(merged)
    return {"status": "refreshed", "added": len(generated), "count": len(merged), "items": merged}