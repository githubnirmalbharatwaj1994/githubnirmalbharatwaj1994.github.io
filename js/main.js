(function () {
  "use strict";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Links from config.js ---------- */
  var links = window.SITE_LINKS || {};
  $$("[data-link]").forEach(function (a) {
    var url = links[a.getAttribute("data-link")];
    if (url) {
      a.href = url; a.target = "_blank"; a.rel = "noopener";
    } else {
      a.classList.add("soon");
      a.title = "Link coming soon";
      a.addEventListener("click", function (e) { e.preventDefault(); });
    }
  });

  /* ---------- Reveal on scroll + count-up ---------- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      en.target.classList.add("in");
      $$("[data-count]", en.target).forEach(countUp);
      io.unobserve(en.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
  $$(".reveal").forEach(function (el) { io.observe(el); });

  function countUp(el) {
    if (reduce) return;
    var end = parseFloat(el.getAttribute("data-count")), suf = el.getAttribute("data-suffix") || "";
    var t0 = null, dur = 1100;
    function tick(t) {
      if (!t0) t0 = t;
      var p = Math.min((t - t0) / dur, 1), e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(end * e) + suf;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* ---------- Active project (rail + gentle background tint) ---------- */
  var rail = $$(".rail a");
  var sections = $$("section[data-accent]");
  function hexToRgb(h) {
    h = h.replace("#", "");
    return [parseInt(h.substr(0, 2), 16), parseInt(h.substr(2, 2), 16), parseInt(h.substr(4, 2), 16)];
  }
  var spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      var s = en.target, c = hexToRgb(s.getAttribute("data-accent"));
      var dark = s.classList.contains("dark");
      document.body.style.setProperty("--tint", dark ? "rgba(0,0,0,0)" : "rgba(" + c.join(",") + ",0.05)");
      document.body.style.setProperty("--rail", s.style.getPropertyValue("--accent") || s.getAttribute("data-accent"));
      rail.forEach(function (a) { a.classList.toggle("on", a.getAttribute("href") === "#" + s.id); });
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach(function (s) { spy.observe(s); });

  /* ---------- Index hover preview ---------- */
  var prev = $("#preview"), pimg = $("img", prev);
  var px = 0, py = 0, cx = 0, cy = 0, raf = null;
  function loop() {
    cx += (px - cx) * 0.16; cy += (py - cy) * 0.16;
    prev.style.left = cx + "px"; prev.style.top = cy + "px";
    raf = requestAnimationFrame(loop);
  }
  $$(".index a").forEach(function (a) {
    a.addEventListener("mouseenter", function (e) {
      pimg.src = a.getAttribute("data-preview");
      px = cx = e.clientX + 40; py = cy = e.clientY;
      prev.classList.add("show");
      if (!raf) raf = requestAnimationFrame(loop);
    });
    a.addEventListener("mousemove", function (e) { px = e.clientX + 40; py = e.clientY; });
    a.addEventListener("mouseleave", function () {
      prev.classList.remove("show");
      cancelAnimationFrame(raf); raf = null;
    });
  });

  /* ---------- Lightbox ---------- */
  var lb = $("#lightbox"), lbImg = $("img", lb), lbCap = $(".lb-cap", lb);
  function openLb(fig) {
    var im = $("img", fig), cap = $("figcaption", fig);
    lbImg.src = im.currentSrc || im.src; lbImg.alt = im.alt;
    lbCap.textContent = cap ? cap.textContent : im.alt;
    lb.hidden = false; document.body.style.overflow = "hidden";
  }
  function closeLb() { lb.hidden = true; lbImg.src = ""; document.body.style.overflow = ""; }
  $$(".zoom").forEach(function (f) { f.addEventListener("click", function () { openLb(f); }); });
  lb.addEventListener("click", closeLb);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !lb.hidden) closeLb(); });

  /* ---------- Positioning map ---------- */
  var cap = $(".map-caption");
  $$(".bub").forEach(function (b) {
    function show() {
      $$(".bub").forEach(function (x) { x.classList.remove("on"); });
      b.classList.add("on");
      $("b", cap).textContent = b.getAttribute("data-t");
      $("span", cap).textContent = b.getAttribute("data-d").replace("&amp;", "&");
    }
    b.addEventListener("mouseenter", show);
    b.addEventListener("focus", show);
    b.addEventListener("click", show);
  });
  var opp = $(".bub.opp"); if (opp) opp.classList.add("on");

  /* ---------- Unit economics ---------- */
  var price = $("#price");
  function fmt(n) { return n.toLocaleString("en-IN"); }
  function econ() {
    var p = +price.value, cost = 300, invest = 3000000, m = p - cost;
    $("#priceOut").textContent = "Rs. " + fmt(p);
    $("#marginOut").textContent = "Rs. " + fmt(m);
    $("#beOut").textContent = fmt(Math.ceil(invest / m));
  }
  if (price) { price.addEventListener("input", econ); econ(); }

  /* ---------- Framework stepper ---------- */
  var steps = [
    { t: "1 · Trends & industries", p: "Start wide: which long-term shifts will shape demand, and in which industries?", c: ["Trends (5–10 years)", "Mega trends (25–50 years)", "Aerospace", "Defence", "Construction"] },
    { t: "2 · Supply chain analysis", p: "Follow the material through the chain to see where an opportunity sits, then work out who would buy.", c: ["Opportunity identification", "Customers: OEMs", "Fabricators", "Professionals", "Designers", "Manufacturers"] },
    { t: "3 · Applications convergence", p: "Test each candidate application against four lenses, then build the value proposition.", c: ["Feasibility", "Desirability", "Viability", "Sustainability", "Value: cost saving", "Time saving", "Performance", "Light weight"] },
    { t: "4 · Design & prototyping", p: "Turn the chosen application into something you can hold and measure.", c: ["Concept", "Proof of concept", "CAD", "Prototype", "Simulation", "Test"] },
    { t: "5 · Product pitch", p: "Demonstrate the product to the people who will decide.", c: ["Performance", "Benefits", "Value proposition"] }
  ];
  var tabs = $$("#steps [role=tab]"), body = $("#steps .step-body");
  function setStep(i) {
    var s = steps[i];
    tabs.forEach(function (t, k) { t.setAttribute("aria-selected", k === i ? "true" : "false"); });
    $("#stepTitle").textContent = s.t; $("#stepText").textContent = s.p;
    $("#stepChips").innerHTML = s.c.map(function (x) { return "<li>" + x + "</li>"; }).join("");
    $("#stepBar").style.width = ((i + 1) * 20) + "%";
    body.classList.remove("swap"); void body.offsetWidth; body.classList.add("swap");
  }
  tabs.forEach(function (t) { t.addEventListener("click", function () { setStep(+t.getAttribute("data-i")); }); });
  setStep(0);
})();
