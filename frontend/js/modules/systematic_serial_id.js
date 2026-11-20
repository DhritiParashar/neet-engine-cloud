// ==============================================================================
// GOALisB SYSTEMATIC SERIAL ID ENGINE (JEE MAIN / ADVANCED & NEET UG)
// Format: [EXAM]-[TRACK/SUBJECT]-[YYYYMMDD]-#[ATTEMPT]
// ==============================================================================
(function () {
  const HOST = (window.location.hostname || "").toLowerCase();
  const TITLE = (document.title || "").toUpperCase();
  const PORTAL = HOST.includes("neet") || TITLE.includes("NEET") ? "NEET" : "JEE";

  function detectSubTrack() {
    if (PORTAL === "NEET") return "FULL180";
    const mode = String(window._ACTIVE_JEE_MODE || window._ACTIVE_EXAM_MODE || "").toUpperCase();
    const pill = Array.from(document.querySelectorAll("header button"))
      .find(b => b.className && b.className.includes("bg-indigo-600") && /JEE|Advanced|Main/i.test(b.textContent || ""));
    const pillTxt = (pill ? pill.textContent : mode).toUpperCase();
    if (pillTxt.includes("ADV")) return "ADV-FULL54";
    return "MAIN-FULL75";
  }

  window.buildSystematicSerialId = function (portalOverride, trackOverride, isPractice, practiceCode) {
    const p = (portalOverride || PORTAL).toUpperCase();
    const now = new Date();
    const ymd = now.getFullYear().toString() +
      String(now.getMonth() + 1).padStart(2, "0") +
      String(now.getDate()).padStart(2, "0");

    const track = isPractice
      ? `PRAC-${String(practiceCode || "DRILL").toUpperCase()}`
      : (trackOverride || detectSubTrack());

    const prefixBase = `${p}-${track}-`;
    let priorCount = 0;
    const histKeys = ["ipm_mock_history_v1", "jee_mock_history_v1", "neet_mock_history_v1"];
    for (const k of histKeys) {
      try {
        const arr = JSON.parse(localStorage.getItem(k) || "[]");
        if (Array.isArray(arr)) {
          priorCount += arr.filter(h => {
            if (!h) return false;
            const sid = String(h.serialId || "");
            if (sid.startsWith(prefixBase)) return true;
            if (!isPractice && Number(h.score || 0) > 0 && !sid.includes("PRAC-")) {
              if (p === "JEE" && track.startsWith("ADV")) return /adv/i.test(String(h.blueprint || sid));
              if (p === "JEE" && track.startsWith("MAIN")) return !/adv/i.test(String(h.blueprint || sid));
              return true;
            }
            return false;
          }).length;
        }
      } catch (_) {}
    }

    const attemptNum = String(priorCount + 1).padStart(2, "0");
    return `${p}-${track}-${ymd}-#${attemptNum}`;
  };
})();
