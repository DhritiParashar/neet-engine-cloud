window.IPM_USER = JSON.parse(localStorage.getItem("ipm_user_profile") || "null");
window.IPM_OTP_CHALLENGE_ID = null;
window.IPM_RESET_CHALLENGE_ID = null;
window.AUTH_VIEW = "login";

window.isProLearner = function () {
  return Boolean(window.IPM_USER && window.IPM_USER.plan_tier === "PRO");
};

window.getDemoUsage = function () {
  try {
    return JSON.parse(localStorage.getItem("ipm_demo_usage") || '{"ai_evals":0,"mocks_taken":0}');
  } catch (e) {
    return { ai_evals: 0, mocks_taken: 0 };
  }
};

window.bumpDemoUsage = function (key) {
  const u = window.getDemoUsage();
  u[key] = (u[key] || 0) + 1;
  localStorage.setItem("ipm_demo_usage", JSON.stringify(u));
  return u[key];
};

window.syncLoginGateVisibility = function () {
  const gate = document.getElementById("login-dashboard-gate");
  if (!gate) return;
  if (window.IPM_USER && window.IPM_USER.full_name) {
    gate.classList.add("hidden");
  } else {
    gate.classList.remove("hidden");
  }
};

window.renderHeaderAccountBar = function () { const user = window.IPM_USER || JSON.parse(localStorage.getItem("ipm_user_profile") || localStorage.getItem("goalisb_postgrad_profile_v1") || localStorage.getItem("ipm_user") || "{}");
  window.syncLoginGateVisibility();
  const pill = document.getElementById("header-profile-summary");
  const authBtn = document.getElementById("auth-header-btn");
  const planBtn = document.getElementById("plan-upgrade-btn");
  if (!pill || !authBtn || !planBtn) return;

  if (window.IPM_USER && window.IPM_USER.full_name) {
    const c10 = window.IPM_USER.class10_pct ?? 92;
    const c12 = window.IPM_USER.class12_pct ?? 90;
    const isPro = window.isProLearner();
    pill.classList.remove("hidden");
    pill.innerHTML = `
      <span class="font-bold text-white">&#128100; ${window.IPM_USER.full_name}</span>
      <span class="text-slate-400 mx-1">|</span>
      <span class="text-sky-300 font-semibold">Target: ${user.targetScore || "99+ Band"}</span>
      <span class="text-slate-400 mx-1">&bull;</span>
      <span class="text-emerald-300 font-semibold">Test Readiness</span>
    `;
    authBtn.textContent = "Logout";
    authBtn.onclick = window.logoutStudent;
    if (isPro) {
      let badgeText = "&#11088; PRO LEARNER (All 9 Modules Unlocked)";
      if (window.IPM_USER.pro_expires_at) {
        const msLeft = new Date(window.IPM_USER.pro_expires_at).getTime() - Date.now();
        if (msLeft > 0) {
          const hrsLeft = Math.floor(msLeft / 3600000);
          const days = Math.floor(hrsLeft / 24);
          const hrs = hrsLeft % 24;
          badgeText = `&#129514; BETA PRO (${days}d ${hrs}h left &bull; ${window.IPM_USER.voucher_code || "Voucher"})`;
        }
      }
      planBtn.className = "px-3 py-1.5 rounded-xl bg-amber-500 text-slate-950 text-xs font-extrabold shadow-sm cursor-pointer";
      planBtn.innerHTML = badgeText;
    } else {
      planBtn.className = "px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-sm cursor-pointer";
      planBtn.innerHTML = "&#128274; FREE DEMO (Restricted) &bull; Upgrade to Pro";
    }
  }
};

window.switchDashboardView = function (view) {
  window.AUTH_VIEW = view;
  ["dash-login-box", "dash-reg-box", "dash-forgot-box"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.add("hidden");
  });
  document.getElementById("dash-msg").textContent = "";

  if (view === "login") document.getElementById("dash-login-box").classList.remove("hidden");
  if (view === "register") {
    document.getElementById("dash-reg-box").classList.remove("hidden");
    document.getElementById("reg-step1").classList.remove("hidden");
    document.getElementById("reg-step2").classList.add("hidden");
  }
  if (view === "forgot") {
    document.getElementById("dash-forgot-box").classList.remove("hidden");
    document.getElementById("fp-step1").classList.remove("hidden");
    document.getElementById("fp-step2").classList.add("hidden");
  }

  ["tab-btn-login", "tab-btn-reg", "tab-btn-forgot"].forEach(id => {
    const b = document.getElementById(id);
    if (!b) return;
    const active = (id === "tab-btn-login" && view === "login") ||
                   (id === "tab-btn-reg" && view === "register") ||
                   (id === "tab-btn-forgot" && view === "forgot");
    b.className = active
      ? "flex-1 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold shadow"
      : "flex-1 py-2 rounded-xl bg-slate-950 text-slate-300 border border-slate-800 text-xs font-bold hover:border-indigo-500";
  });
};

window.handleForgotStep1 = async function () {
  const msg = document.getElementById("dash-msg");
  msg.textContent = "";
  const email = document.getElementById("fp-email").value.trim();
  const r = await fetch("/api/auth/forgot-password/init", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email })
  });
  const data = await r.json();
  if (!data.ok) { msg.textContent = data.error || "Email not found."; return; }
  window.IPM_RESET_CHALLENGE_ID = data.challenge_id;
  document.getElementById("fp-step1").classList.add("hidden");
  document.getElementById("fp-step2").classList.remove("hidden");
  document.getElementById("fp-otp-banner").innerHTML =
    `Recovery OTP sent to <u>${data.email}</u>. <span class="text-amber-300">Sandbox Reset OTP: <strong>${data.demo_reset_otp}</strong></span>`;
};

window.handleForgotStep2 = async function () {
  const msg = document.getElementById("dash-msg");
  msg.textContent = "";
  const r = await fetch("/api/auth/forgot-password/confirm", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      challenge_id: window.IPM_RESET_CHALLENGE_ID,
      reset_otp: document.getElementById("fp-otp").value.trim(),
      new_password: document.getElementById("fp-new-pass").value
    })
  });
  const data = await r.json();
  if (!data.ok) { msg.textContent = data.error || "Could not reset password."; return; }
  window.switchDashboardView("login");
  document.getElementById("login-email").value = data.email;
  msg.className = "text-xs text-emerald-300 font-semibold";
  msg.textContent = "Password updated in PostgreSQL! Log in with your new password.";
};

window.openPaymentModal = function (reasonText) {
  const banner = document.getElementById("pay-gate-reason");
  if (banner) {
    banner.textContent = reasonText || "Your account is currently on FREE DEMO (restricted). Upgrade to Pro Learner to unlock all 9 modules across all 8 IIMs.";
  }
  document.getElementById("payment-modal").classList.remove("hidden");
};
window.closePaymentModal = function () {
  document.getElementById("payment-modal").classList.add("hidden");
};

window.completeProPayment = async function (method) {
  const token = localStorage.getItem("ipm_auth_token") || "";
  const r = await fetch("/api/billing/upgrade-pro", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, payment_method: method, amount_inr: 1999 })
  });
  const data = await r.json();
  if (!data.ok) { alert(data.error || "Payment failed."); return; }
  window.IPM_USER = data.user;
  localStorage.setItem("ipm_user_profile", JSON.stringify(data.user));
  const gateEl = document.getElementById("login-dashboard-gate");
  if (gateEl) { gateEl.classList.add("hidden"); gateEl.style.display = "none"; }
  try { if (window.renderHeaderAccountBar) window.renderHeaderAccountBar(); } catch (e) {}
  try { if (window.renderActiveTab) window.renderActiveTab(); else location.reload(); } catch (e) { location.reload(); }
};

window.buildProLockOverlay = function (title, detail) {
  return `
    <div class="mt-4 p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/70 to-slate-900 border border-amber-500/50 text-center space-y-2.5 shadow-xl">
      <div class="inline-block px-3 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[11px] font-extrabold uppercase">
        &#128274; Free Demo Restriction &bull; Pro Learner Required
      </div>
      <h4 class="text-base font-bold text-white">${title}</h4>
      <p class="text-xs text-slate-300 max-w-xl mx-auto">${detail}</p>
      <button onclick="window.openPaymentModal('${title.replace(/'/g, "")}')"
        class="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold shadow">
        &#11088; Unlock Full Access with Pro Learner (&#8377;1,999) &rarr;
      </button>
    </div>
  `;
};

window.applyFreeDemoGate = function () {
  if (!window.IPM_USER || window.isProLearner()) return;
  const activeTab = window.IPM_STATE.activeTab;
  const host = document.getElementById("tab-content-area");
  if (!host) return;
  const usage = window.getDemoUsage();

  // 1. Full Lock on Tab 6 (8-IIM Call Predictor) & Tab 9 (5-Yr PYQ Vault)
  if (activeTab === "tab6" || activeTab === "tab9") {
    host.innerHTML = `
      <div class="max-w-2xl mx-auto my-8 bg-slate-900 border border-amber-500/50 rounded-2xl p-6 text-center space-y-4 shadow-2xl">
        <div class="inline-block px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-extrabold uppercase tracking-wider">
          FREE DEMO Account &bull; Pro Learner Gate
        </div>
        <h2 class="text-xl font-bold text-white">
          ${activeTab === "tab6" ? "8-IIM Composite Call Predictor (Class X: " + window.IPM_USER.class10_pct + "% | Class XII: " + window.IPM_USER.class12_pct + "%)" : "2022–2026 Official-Pattern PYQ Vault"}
        </h2>
        <p class="text-xs md:text-sm text-slate-300 leading-relaxed">
          Your <strong>Free Demo</strong> account restricts the Call Predictor and 2022–2026 PYQ Vault. Upgrade to <strong>Pro Learner</strong> to open all 9 modules without limits.
        </p>
        <button onclick="window.openPaymentModal('Unlock ' + '${activeTab === "tab6" ? "8-IIM Call Predictor" : "5-Yr PYQ Vault"}' + ' & All Pro Learner Modules')"
          class="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold shadow">
          &#11088; Upgrade to Pro Learner (&#8377;1,999 / Full Season)
        </button>
      </div>
    `;
    return;
  }

  // 2. Top Free Demo Status Strip on Tabs 1-5, 7, 8
  const strip = document.createElement("div");
  strip.id = "free-demo-top-strip";
  strip.className = "mb-3 p-2.5 rounded-xl bg-rose-500/15 border border-rose-500/40 flex flex-wrap items-center justify-between gap-2 text-xs";
  strip.innerHTML = `
    <span class="text-slate-200">
      <span class="px-2 py-0.5 rounded bg-rose-600 text-white font-extrabold text-[10px] mr-1.5">FREE DEMO (RESTRICTED)</span>
      <strong>${window.IPM_USER.full_name}</strong> (Class X: <strong>${window.IPM_USER.class10_pct}%</strong> &bull; Class XII: <strong>${window.IPM_USER.class12_pct}%</strong>) &mdash;
      Capped to first 2 chapters, 3 examples/chapter, 5 traps, 2 AI evaluations & 1 diagnostic mock.
    </span>
    <button onclick="window.openPaymentModal()" class="px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-[11px]">
      Upgrade to Pro Learner &rarr;
    </button>
  `;
  host.prepend(strip);

  // 3. Tabs 1, 2, 3: Restrict sidebar chapters beyond index 1 & truncate worked examples/drills beyond first 3
  if (activeTab === "tab1" || activeTab === "tab2" || activeTab === "tab3") {
    const sideBtns = host.querySelectorAll("button[onclick*='Chapter'], button[onclick*='select']");
    sideBtns.forEach((btn, idx) => {
      if (idx >= 2) {
        btn.disabled = true;
        btn.classList.add("opacity-45", "cursor-not-allowed");
        if (!btn.innerHTML.includes("PRO")) {
          btn.innerHTML += ` <span class="ml-1 text-[10px] px-1.5 py-0.5 rounded bg-rose-600 text-white font-bold">&#128274; PRO</span>`;
        }
        btn.onclick = (e) => { e.preventDefault(); e.stopPropagation(); window.openPaymentModal("Chapters 3+ are locked in Free Demo. Upgrade to Pro Learner to unlock all chapters!"); };
      }
    });
    const detailPane = host.querySelector(".lg\\:col-span-8, .lg\\:col-span-9, .space-y-4");
    if (detailPane) {
      const cards = detailPane.querySelectorAll(".bg-slate-950, .rounded-xl.border");
      if (cards.length > 4) {
        cards.forEach((c, ci) => { if (ci >= 4) c.remove(); });
        detailPane.insertAdjacentHTML("beforeend", window.buildProLockOverlay(
          "27+ More Worked Examples & Chapter Drills Locked",
          "Free Demo previews the first 3 worked examples per chapter. Upgrade to Pro Learner to unlock all 360 worked examples and full practice sets."
        ));
      }
    }
  }

  // 4. Tab 4 (Trap Doctor): Restrict beyond first 5 traps + lock EV Simulator
  if (activeTab === "tab4") {
    const trapCards = host.querySelectorAll(".lg\\:col-span-5 > div.rounded-xl, .space-y-3 > div.rounded-xl");
    if (trapCards.length > 5) {
      trapCards.forEach((c, idx) => { if (idx >= 5) c.remove(); });
      const listCol = trapCards[0]?.parentElement;
      if (listCol) {
        listCol.insertAdjacentHTML("beforeend", window.buildProLockOverlay(
          "51 More Aptitude Traps Locked in Free Demo",
          "Free Demo includes 5 sample traps. Unlock Pro Learner for the complete 56-Trap Clinic across Arithmetic, Higher Math, DILR & VARC."
        ));
      }
    }
  }

  // 5. Tab 5 (AI PI/WAT Evaluator): Lock Live Weekly News Sync + Cap AI evaluations at 2
  if (activeTab === "tab5") {
    const syncBtn = host.querySelector("button[onclick*='fetchLiveCurrentAffairs']");
    if (syncBtn) {
      syncBtn.innerHTML = "&#128274; Live Weekly News (Pro Only)";
      syncBtn.onclick = (e) => { e.preventDefault(); window.openPaymentModal("Live Weekly RSS + Gemini Current Affairs synthesis requires Pro Learner."); };
    }
    const evalBtn = host.querySelector("button[onclick*='submitPiEvaluation']");
    if (evalBtn) {
      const rem = Math.max(0, 2 - (usage.ai_evals || 0));
      evalBtn.textContent = rem > 0
        ? `Evaluate with IIM Panel AI (${rem} Free Demo Eval${rem === 1 ? "" : "s"} Left)`
        : "🔒 Free Demo AI Limit Reached — Upgrade to Pro";
      const origEval = window.submitPiEvaluation;
      window.submitPiEvaluation = async function () {
        if (!window.isProLearner() && window.getDemoUsage().ai_evals >= 2) {
          window.openPaymentModal("You have used all 2 Free Demo AI evaluations. Upgrade to Pro Learner for unlimited IIM Panel grading!");
          return;
        }
        window.bumpDemoUsage("ai_evals");
        await origEval();
      };
    }
  }

  // 6. Tab 7 (Socratic Doubt Solver): Lock Modes 2 & 3 + Cap AI Doubt queries at 2
  if (activeTab === "tab7") {
    host.querySelectorAll("button[onclick*='setDoubtMode']").forEach(btn => {
      if (btn.textContent.includes("2.") || btn.textContent.includes("3.")) {
        btn.innerHTML += " &#128274; PRO";
        btn.onclick = (e) => { e.preventDefault(); window.openPaymentModal("30-Second Shortcuts & Full Derivations are locked in Free Demo. Upgrade to Pro Learner!"); };
      }
    });
    const askBtn = host.querySelector("button[onclick*='askSocraticTutor']");
    if (askBtn) {
      const rem = Math.max(0, 2 - (usage.ai_evals || 0));
      askBtn.textContent = rem > 0 ? `Ask Socratic Tutor (${rem} Free Demo Left)` : "🔒 Free Demo Limit Reached — Upgrade to Pro";
      const origAsk = window.askSocraticTutor;
      window.askSocraticTutor = async function () {
        if (!window.isProLearner() && window.getDemoUsage().ai_evals >= 2) {
          window.openPaymentModal("Free Demo AI Doubt limit reached (2/2). Upgrade to Pro Learner for unlimited Socratic tutoring!");
          return;
        }
        window.bumpDemoUsage("ai_evals");
        await origAsk();
      };
    }
  }

  // 7. Tab 8 (Timed Mock Engine): Lock Sectional Sprints & Limit to 1 Diagnostic Mock
  if (activeTab === "tab8") {
    host.querySelectorAll("button[onclick*='selectMockPaper']").forEach(btn => {
      if (!btn.textContent.includes("Full 45-Q")) {
        btn.innerHTML += " &#128274; PRO";
        btn.onclick = (e) => { e.preventDefault(); window.openPaymentModal("Sectional Sprints & Class 10/11/12 Higher Math Mocks require Pro Learner."); };
      }
    });
    const genBtn = host.querySelector("button[onclick*='fetchNewRandomMock']");
    if (genBtn && (usage.mocks_taken || 0) >= 1) {
      genBtn.innerHTML = "&#128274; Extra Random Mocks (Pro Only)";
      genBtn.onclick = (e) => { e.preventDefault(); window.openPaymentModal("Free Demo includes 1 Diagnostic Mock. Upgrade to Pro Learner for unlimited non-repeating PostgreSQL Mocks!"); };
    }
    const origScore = window.scoreMock;
    if (typeof origScore === "function" && !origScore._wrapped) {
      window.scoreMock = async function () {
        window.bumpDemoUsage("mocks_taken");
        await origScore();
      };
      window.scoreMock._wrapped = true;
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  window.renderHeaderAccountBar();
  const origRender = window.renderActiveTab;
  if (typeof origRender === "function") {
    window.renderActiveTab = function () {
      origRender();
      window.applyFreeDemoGate();
    };
    window.applyFreeDemoGate();
  }
});
window.redeemBetaVoucherCode = async function () {
  const token = localStorage.getItem("ipm_auth_token") || "";
  const code = (document.getElementById("beta-voucher-input").value || "").trim();
  if (!code) { alert("Enter a Beta Approval Voucher code first (e.g. BETA-7DAY-PASS)."); return; }
  const r = await fetch("/api/billing/redeem-voucher", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, code })
  });
  const data = await r.json();
  if (!data.ok) { alert(data.error || "Voucher redemption failed."); return; }
  window.IPM_USER = data.user;
  localStorage.setItem("ipm_user_profile", JSON.stringify(data.user));
  const gateEl = document.getElementById("login-dashboard-gate");
  if (gateEl) { gateEl.classList.add("hidden"); gateEl.style.display = "none"; }
  try { if (window.renderHeaderAccountBar) window.renderHeaderAccountBar(); } catch (e) {}
  try { if (window.renderActiveTab) window.renderActiveTab(); else location.reload(); } catch (e) { location.reload(); }
};

// ==============================================================================
// COMPLETE UNIFIED AUTH SUITE: EMAIL-ONLY OTP + 10-MIN RESEND + LOGIN + LOGOUT
// ==============================================================================
window._RESEND_COOLDOWN_UNTIL = 0;

window.triggerResendOtp = async function (purpose) {
  const msg = document.getElementById("dash-msg");
  const now = Date.now();
  if (now < window._RESEND_COOLDOWN_UNTIL) {
    const waitSec = Math.ceil((window._RESEND_COOLDOWN_UNTIL - now) / 1000);
    msg.className = "text-xs text-amber-500 font-semibold";
    msg.textContent = `Please wait ${waitSec}s before requesting another resend.`;
    return;
  }
  const cid = purpose === "Password Reset" ? window.IPM_RESET_CHALLENGE_ID : window.IPM_OTP_CHALLENGE_ID;
  if (!cid) {
    msg.className = "text-xs text-rose-500 font-semibold";
    msg.textContent = "No active OTP session found. Please submit Step 1 first.";
    return;
  }
  msg.className = "text-xs text-indigo-600 font-semibold";
  msg.textContent = `Re-dispatching OTP for Ref #${cid}...`;
  try {
    const r = await fetch("/api/auth/otp/resend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ challenge_id: cid, purpose: purpose })
    });
    const data = await r.json();
    if (!r.ok || !data.ok) {
      msg.className = "text-xs text-rose-500 font-semibold";
      msg.textContent = data.error || "Failed to resend OTP.";
      return;
    }
    window._RESEND_COOLDOWN_UNTIL = Date.now() + 30000;
    const mins = Math.max(1, Math.round((data.expires_in || 600) / 60));
    msg.className = "text-xs text-emerald-600 font-semibold";
    msg.textContent = data.reused_same_otp
      ? `Same active OTP (Ref #${data.ref_id}) re-sent to ${data.email} — valid for ~${mins} min.`
      : `New OTP (Ref #${data.ref_id}) sent to ${data.email} — valid for 10 min.`;
  } catch (e) {
    msg.className = "text-xs text-rose-500 font-semibold";
    msg.textContent = "Resend network error: " + (e.message || e);
  }
};

window.handleDashboardLogin = async function () {
  const email = (document.getElementById("login-email")?.value || "").trim();
  const password = document.getElementById("login-pass")?.value || "";
  const msg = document.getElementById("dash-msg");
  if (msg) {
    msg.className = "text-xs text-indigo-500 font-semibold";
    msg.textContent = "Signing in...";
  }
  try {
    const r = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const raw = await r.text();
    let data = {};
    try { data = JSON.parse(raw); } catch (e) {
      if (msg) {
        msg.className = "text-xs text-rose-500 font-semibold";
        msg.textContent = `Server error (${r.status}): ${raw.slice(0, 120)}`;
      }
      return;
    }
    if (!r.ok || !data.ok) {
      if (msg) {
        msg.className = "text-xs text-rose-500 font-semibold";
        msg.textContent = data.error || data.detail || "Invalid email or password.";
      }
      return;
    }

    localStorage.setItem("ipm_auth_token", data.token);
    let userObj = data.user;
    try {
      const me = await (await fetch("/api/auth/me?token=" + encodeURIComponent(data.token))).json();
      if (me && me.ok && me.user) userObj = me.user;
    } catch (_) {}

    window.IPM_USER = userObj;
    localStorage.setItem("ipm_user_profile", JSON.stringify(userObj));
    localStorage.setItem("ipm_user", JSON.stringify(userObj));
    window.location.replace(window.location.pathname);
  } catch (err) {
    if (msg) {
      msg.className = "text-xs text-rose-500 font-semibold";
      msg.textContent = "Login network error: " + (err && err.message ? err.message : err);
    }
  }
};

window.logoutStudent = function (e) {
  if (e) { e.preventDefault(); e.stopPropagation(); }
  const tok = localStorage.getItem("ipm_auth_token") || "";
  if (tok) {
    try {
      fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: tok }),
        keepalive: true
      }).catch(() => {});
    } catch (_) {}
  }
  try { localStorage.clear(); } catch (_) {}
  try { sessionStorage.clear(); } catch (_) {}
  window.IPM_USER = null;
  window.location.replace(window.location.pathname + "?logged_out=1");
};

window.syncHeaderLogoutUI = function () {
  if (window._syncingHeader) return;
  window._syncingHeader = true;
  try {
    const user = window.IPM_USER || JSON.parse(localStorage.getItem("ipm_user_profile") || localStorage.getItem("ipm_user") || "{}");
    const header = document.querySelector("header");
    if (header) {
      const pill = document.getElementById("header-profile-summary");
      const authBtn = document.getElementById("auth-header-btn");
      if (pill && user && user.full_name) {
        pill.classList.remove("hidden");
        pill.innerHTML = `<span class="font-bold">&#128100; ${user.full_name}</span> <span class="opacity-60 mx-1">|</span> <span class="text-emerald-400 font-semibold">${user.plan_tier === "PRO" ? "PRO LEARNER" : "FREE DEMO"}</span>`;
      }
      if (authBtn) {
        if (user && user.full_name) {
          authBtn.textContent = "Logout / Exit";
          authBtn.onclick = window.logoutStudent;
        } else {
          authBtn.textContent = "Login / Register";
        }
      }
      header.querySelectorAll("button, a").forEach(btn => {
        const txt = (btn.textContent || "").trim();
        if (/^(Login\s*\/\s*Register|Logout|Logout\s*\/\s*Exit|Exit)$/i.test(txt)) {
          if (user && user.full_name) {
            btn.textContent = "Logout / Exit";
            btn.classList.remove("bg-indigo-600", "hover:bg-indigo-500");
            btn.classList.add("bg-rose-600", "hover:bg-rose-500", "text-white");
            btn.onclick = window.logoutStudent;
          } else {
            btn.textContent = "Login / Register";
            btn.classList.remove("bg-rose-600", "hover:bg-rose-500");
            btn.classList.add("bg-indigo-600", "hover:bg-indigo-500", "text-white");
          }
        }
      });
      const walker = document.createTreeWalker(header, NodeFilter.SHOW_TEXT, null);
      let node;
      while ((node = walker.nextNode())) {
        if (node.nodeValue && (node.nodeValue.includes("Dina Shah") || node.nodeValue.includes("Guest Aspirant"))) {
          const targetName = (user && user.full_name) ? user.full_name : "Guest Aspirant";
          node.nodeValue = node.nodeValue.replace(/Dina Shah|Guest Aspirant/g, targetName);
        }
      }
    }

    // Ensure high-contrast white text on dark left hero panel of login gate
    const gate = document.getElementById("login-dashboard-gate");
    if (gate) {
      const darkPanel = gate.querySelector("[class*='from-slate-9'], [class*='from-indigo-950'], [class*='bg-slate-9']");
      if (darkPanel) {
        darkPanel.style.color = "#f8fafc";
        darkPanel.querySelectorAll("h1, h2, h3, p, li, span").forEach(el => {
          if (!el.className.includes("text-indigo-400") && !el.className.includes("text-emerald")) {
            el.style.color = "#f1f5f9";
          }
        });
      }
    }
  } finally {
    window._syncingHeader = false;
  }
};

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(window.syncHeaderLogoutUI, 200);
});

// ==============================================================================
// FIX HTTP 422 PAYLOAD ON VERIFY + READABLE ERROR PARSING + HERO CONTRAST
// ==============================================================================
window._PENDING_REG_EMAIL = window._PENDING_REG_EMAIL || "";

(function injectHeroContrastStyle() {
  if (document.getElementById("goalisb-hero-contrast-fix")) return;
  const st = document.createElement("style");
  st.id = "goalisb-hero-contrast-fix";
  st.textContent = `
    #login-dashboard-gate .bg-gradient-to-br,
    #login-dashboard-gate [class*="from-slate-9"],
    #login-dashboard-gate [class*="from-indigo-950"] {
      color: #f8fafc !important;
    }
    #login-dashboard-gate .bg-gradient-to-br h1,
    #login-dashboard-gate .bg-gradient-to-br h2,
    #login-dashboard-gate .bg-gradient-to-br h3,
    #login-dashboard-gate .bg-gradient-to-br p,
    #login-dashboard-gate .bg-gradient-to-br li,
    #login-dashboard-gate [class*="from-slate-9"] h1,
    #login-dashboard-gate [class*="from-slate-9"] h2,
    #login-dashboard-gate [class*="from-slate-9"] p,
    #login-dashboard-gate [class*="from-slate-9"] li {
      color: #f1f5f9 !important;
    }
  `;
  document.head.appendChild(st);
})();

window._formatApiError = function (data, fallback) {
  if (!data) return fallback;
  if (typeof data.error === "string" && data.error) return data.error;
  if (typeof data.detail === "string" && data.detail) return data.detail;
  if (Array.isArray(data.detail)) {
    return data.detail.map(d => (d.loc ? d.loc.slice(-1)[0] + ": " : "") + (d.msg || JSON.stringify(d))).join("; ");
  }
  return fallback;
};

const _origHandleRegStep1 = window.handleRegStep1;
window.handleRegStep1 = async function () {
  const emailEl = document.getElementById("reg-email");
  if (emailEl && emailEl.value.trim()) {
    window._PENDING_REG_EMAIL = emailEl.value.trim().toLowerCase();
  }
  return _origHandleRegStep1.apply(this, arguments);
};

window.handleRegStep2Verify = async function () {
  const emailOtp = (document.getElementById("reg-email-otp")?.value || "").trim();
  const msg = document.getElementById("dash-msg");
  if (!emailOtp || emailOtp.length !== 6) {
    msg.className = "text-xs text-rose-500 font-semibold";
    msg.textContent = "Please enter the 6-digit Email OTP sent to your inbox.";
    return;
  }
  const emailVal = (
    window._PENDING_REG_EMAIL ||
    document.getElementById("reg-email")?.value ||
    document.querySelector("#reg-otp-banner u")?.textContent ||
    ""
  ).trim().toLowerCase();

  msg.className = "text-xs text-indigo-600 font-semibold";
  msg.textContent = "Verifying Email OTP & activating workspace...";
  try {
    const r = await fetch("/api/auth/register-otp/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        challenge_id: String(window.IPM_OTP_CHALLENGE_ID),
        email: emailVal,
        email_otp: emailOtp,
        otp: emailOtp,
        phone_otp: "EMAIL_ONLY"
      })
    });
    const data = await r.json();
    if (!r.ok || !data.ok) {
      msg.className = "text-xs text-rose-500 font-semibold";
      msg.textContent = window._formatApiError(data, `Verification failed (${r.status}).`);
      return;
    }
    localStorage.setItem("ipm_auth_token", data.token);
    window.IPM_USER = data.user;
    localStorage.setItem("ipm_user_profile", JSON.stringify(data.user));
    localStorage.setItem("ipm_user", JSON.stringify(data.user));
    window.location.replace(window.location.pathname);
  } catch (err) {
    msg.className = "text-xs text-rose-500 font-semibold";
    msg.textContent = "Verification network error: " + (err && err.message ? err.message : err);
  }
};

// ============================================================================
// RESTORED AUTH MODAL / LOGIN GATE OPENER (OVERRIDES pg-boot-auth-gate)
// ============================================================================
window.openAuthModal = function () {
  const bootStyle = document.getElementById("pg-boot-auth-gate");
  if (bootStyle) bootStyle.remove();

  const el = document.getElementById("login-dashboard-gate") || document.getElementById("auth-modal");
  if (el) {
    el.classList.remove("hidden");
    el.style.setProperty("display", "flex", "important");
    el.style.setProperty("opacity", "1", "important");
    el.style.setProperty("visibility", "visible", "important");
    el.style.setProperty("pointer-events", "auto", "important");
    el.style.setProperty("z-index", "9999", "important");
    const emailInput = el.querySelector('#login-email, input[type="email"]');
    if (emailInput) setTimeout(() => emailInput.focus(), 50);
  }
};

window.closeAuthModal = function () {
  ["auth-modal", "login-modal", "login-dashboard-gate"].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.classList.add("hidden");
      el.style.setProperty("display", "none", "important");
    }
  });
};

// ============================================================================
// CAPTURE-PHASE CLICK INTERCEPTOR (CATCHES BOTH #auth-header-btn AND pg-boot BUTTON)
// ============================================================================
document.addEventListener("click", function (e) {
  const btn = e.target && e.target.closest("button, a");
  if (!btn) return;
  const label = (btn.textContent || "").trim();
  const isLoginBtn = btn.id === "auth-header-btn" || /Login\s*\/\s*Register/i.test(label) || (btn.getAttribute("onclick") || "").includes("openAuthModal");
  if (!isLoginBtn) return;

  const user = window.IPM_USER || JSON.parse(localStorage.getItem("ipm_user_profile") || localStorage.getItem("ipm_user") || "{}");
  if (user && user.full_name && /Logout|Exit/i.test(label)) {
    if (typeof window.logoutStudent === "function") window.logoutStudent(e);
    return;
  }

  e.preventDefault();
  e.stopImmediatePropagation();
  const bootStyle = document.getElementById("pg-boot-auth-gate");
  if (bootStyle) bootStyle.remove();
  const el = document.getElementById("login-dashboard-gate") || document.getElementById("auth-modal");
  if (el) {
    el.classList.remove("hidden");
    el.style.setProperty("display", "flex", "important");
    el.style.setProperty("opacity", "1", "important");
    el.style.setProperty("visibility", "visible", "important");
    el.style.setProperty("pointer-events", "auto", "important");
    el.style.setProperty("z-index", "99999", "important");
    const emailInput = el.querySelector('#login-email, input[type="email"]');
    if (emailInput) setTimeout(() => emailInput.focus(), 50);
  }
}, true);


// ============================================================================
// UNIFIED POSTGRAD AUTH GATE + STEP-1 REGISTRATION + PROFILE HYDRATION
// ============================================================================
window.openPostgradAuthGate = function (mode) {
  ["pg-boot-auth-gate-style", "pg-hide-gate-style"].forEach(id => {
    const s = document.getElementById(id);
    if (s) s.remove();
  });
  const el = document.getElementById("login-dashboard-gate");
  if (!el) return;
  el.classList.remove("hidden");
  el.removeAttribute("hidden");
  el.style.setProperty("display", "flex", "important");
  el.style.setProperty("opacity", "1", "important");
  el.style.setProperty("visibility", "visible", "important");
  el.style.setProperty("pointer-events", "auto", "important");
  el.style.setProperty("z-index", "99999", "important");

  if (mode === "REGISTER" && typeof window.switchDashboardView === "function") {
    window.switchDashboardView("register");
  } else if (typeof window.switchDashboardView === "function") {
    window.switchDashboardView("login");
  }
  const emailInput = el.querySelector('#login-email, #reg-name, input[type="email"]');
  if (emailInput) setTimeout(() => emailInput.focus(), 50);
};
window.openAuthModal = window.openPostgradAuthGate;

window.handleRegStep1 = async function () {
  const msg = document.getElementById("dash-msg");
  if (msg) {
    msg.className = "text-xs text-indigo-400 font-semibold";
    msg.textContent = "Sending Email Verification OTP...";
  }
  const full_name = (document.getElementById("reg-name")?.value || "").trim();
  const class10_pct = parseFloat(document.getElementById("reg-c10")?.value || "90");
  const class12_pct = parseFloat(document.getElementById("reg-c12")?.value || "90");
  const phone = (document.getElementById("reg-phone")?.value || "").trim();
  const email = (document.getElementById("reg-email")?.value || "").trim().toLowerCase();
  const password = document.getElementById("reg-pass")?.value || "";

  if (!full_name || !email || password.length < 4) {
    if (msg) {
      msg.className = "text-xs text-rose-400 font-semibold";
      msg.textContent = "Please enter your full name, valid email, and password (min 4 chars).";
    }
    return;
  }
  window._PENDING_REG_EMAIL = email;
  try {
    const r = await fetch("/api/auth/register-otp/init", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ full_name, email, phone, password, class10_pct, class12_pct })
    });
    const data = await r.json();
    if (!r.ok || !data.ok) {
      if (msg) {
        msg.className = "text-xs text-rose-400 font-semibold";
        msg.textContent = window._formatApiError ? window._formatApiError(data, "Could not send OTP.") : (data.error || "Could not send OTP.");
      }
      return;
    }
    window.IPM_OTP_CHALLENGE_ID = data.challenge_id;
    document.getElementById("reg-step1")?.classList.add("hidden");
    document.getElementById("reg-step2")?.classList.remove("hidden");
    const banner = document.getElementById("reg-otp-banner");
    if (banner) {
      banner.innerHTML = `6-digit verification OTP sent to <u>${email}</u> (Ref #${data.ref_id || data.challenge_id}).` +
        (data.demo_email_otp ? ` <span class="text-amber-300">Sandbox OTP: <strong>${data.demo_email_otp}</strong></span>` : "");
    }
    if (msg) msg.textContent = "";
  } catch (err) {
    if (msg) {
      msg.className = "text-xs text-rose-400 font-semibold";
      msg.textContent = "Network error: " + (err.message || err);
    }
  }
};
