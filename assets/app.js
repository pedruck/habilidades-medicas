(function () {
  "use strict";

  const P = window.PROCEDIMENTOS;
  const ITENS = window.ITENS;
  const DEST = window.DESTINOS;
  const Q = window.PERGUNTAS;
  const app = document.getElementById("app");
  const KEY = "habmed:v1";

  /* ---------- storage ---------- */
  let store = load();
  function load() {
    try { return JSON.parse(localStorage.getItem(KEY) || "{}") || {}; } catch (e) { return {}; }
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(store)); } catch (e) { /* sem storage: segue sem salvar */ }
  }

  /* ---------- helpers ---------- */
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const fmt = (s) => esc(s).replace(/\{\{(.+?)\}\}/g, '<span class="comp">$1</span>');
  const plain = (s) => String(s).replace(/\{\{|\}\}/g, "");
  const label = (st) => st.s || st.t;
  const keyOf = (st) => plain(label(st)).toLowerCase();
  const shuffle = (a) => {
    a = a.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  const pad = (n) => String(n).padStart(2, "0");
  const mmss = (ms) => { const s = Math.floor(ms / 1000); return pad(Math.floor(s / 60)) + ":" + pad(s % 60); };
  const byId = (id) => P.find((p) => p.id === id);
  const itemName = (id) => ITENS[id] || id;

  let toastT;
  function toast(msg) {
    const el = document.getElementById("toast");
    el.textContent = msg;
    el.classList.add("on");
    clearTimeout(toastT);
    toastT = setTimeout(() => el.classList.remove("on"), 2200);
  }

  function listas(p) {
    if (p.listas) return p.listas;
    const L = [{ id: "passos", nome: "Procedimento", passos: p.passos }];
    if (p.bandeja) {
      L.push({ id: "montar", nome: "Montar bandeja", passos: p.bandeja.montar });
      L.push({ id: "desfazer", nome: "Desfazer bandeja", passos: p.bandeja.desfazer });
    }
    if (p.ordemExtra) L.push({ id: "ordem", nome: p.ordemExtra.titulo, passos: p.ordemExtra.itens.map((t) => ({ t })) });
    return L;
  }

  /* ---------- view lifecycle ---------- */
  let cleanup = null;
  let onKey = null;
  document.addEventListener("keydown", (e) => {
    if (onKey && !e.metaKey && !e.ctrlKey && !e.altKey && !/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) onKey(e);
  });

  function route() {
    if (cleanup) { cleanup(); cleanup = null; }
    onKey = null;
    const parts = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean).map(decodeURIComponent);
    const top = parts[0] || "";
    document.querySelectorAll("[data-nav]").forEach((a) => a.classList.toggle("on", a.dataset.nav === (top === "p" ? "" : top)));
    if (top === "p" && byId(parts[1])) viewProc(byId(parts[1]), parts[2] || "estudar", parts[3], parts[4]);
    else if (top === "comparar") viewComparar();
    else if (top === "perguntas") viewPerguntas();
    else viewHome();
    window.scrollTo(0, 0);
  }
  window.addEventListener("hashchange", route);

  /* ---------- theme ---------- */
  const temaBtn = document.getElementById("tema");
  function applyTema() {
    const t = store.tema || "auto";
    temaBtn.dataset.t = t;
    temaBtn.setAttribute("aria-label", "Tema: " + (t === "auto" ? "automático" : t));
    if (t === "claro") document.documentElement.dataset.theme = "light";
    else if (t === "escuro") document.documentElement.dataset.theme = "dark";
    else delete document.documentElement.dataset.theme;
  }
  temaBtn.addEventListener("click", () => {
    const order = ["auto", "claro", "escuro"];
    store.tema = order[(order.indexOf(store.tema || "auto") + 1) % 3];
    save();
    applyTema();
    toast("Tema: " + (store.tema === "auto" ? "automático" : store.tema));
  });
  applyTema();

  /* ============================================================
     HOME
     ============================================================ */
  function viewHome() {
    const grupos = [...new Set(P.map((p) => p.grupo))];
    const card = (p) => {
      const L = listas(p)[0];
      const ord = (store.ord || {})[p.id + ":" + L.id];
      const chk = ((store.chk || {})[p.id] || [])[0];
      const meta = [`<span class="pill">${L.passos.length} passos</span>`];
      if (p.bandeja) meta.push('<span class="pill">bandeja</span>');
      if (ord) meta.push(`<span class="pill ${ord.best === 0 ? "ok" : "warn"}">ordem: ${ord.best} ${ord.best === 1 ? "erro" : "erros"}</span>`);
      if (chk) meta.push(`<span class="pill ${chk.pct >= 90 ? "ok" : chk.pct >= 70 ? "warn" : "bad"}">checklist ${chk.pct}%</span>`);
      return `<a class="pcard" href="#/p/${p.id}" style="--c:${p.cor}">
        <div class="pcard-top"><span class="badge">${esc(p.sigla)}</span><div><h3>${esc(p.nome)}</h3><div class="sub">${esc(p.sub)}</div></div></div>
        <div class="meta">${meta.join("")}</div></a>`;
    };
    app.innerHTML = `
      <section class="hero">
        <h1>Treino da prova prática</h1>
        <p>Decore a sequência que os professores vão observar no boneco: montar e desfazer a bandeja, passar cada sonda, lavar as mãos e se paramentar. Todo o conteúdo vem do seu resumo HA N1.</p>
      </section>
      ${grupos.map((g) => `<h2 class="section-t">${esc(g)}</h2><div class="grid">${P.filter((p) => p.grupo === g).map(card).join("")}</div>`).join("")}
      <h2 class="section-t">Revisão</h2>
      <div class="grid">
        <a class="pcard" href="#/comparar" style="--c:var(--accent)"><div class="pcard-top"><span class="badge">≠</span><div><h3>Comparar sondas</h3><div class="sub">Diferenças lado a lado + ordem dos EPIs</div></div></div></a>
        <a class="pcard" href="#/perguntas" style="--c:var(--accent)"><div class="pcard-top"><span class="badge">?</span><div><h3>Perguntas de conceito</h3><div class="sub">${Q.length} perguntas: números, posições, indicações</div></div></div>
          ${store.quiz ? `<div class="meta"><span class="pill">${store.quiz.acertos}/${store.quiz.total} acertos no total</span></div>` : ""}</a>
      </div>
      <h2 class="section-t">Como treinar</h2>
      <div class="card stack small">
        <p><b>1. Estudar:</b> leia o passo a passo. Depois ligue o <i>modo memória</i> e tente lembrar cada passo antes de revelar.</p>
        <p><b>2. Ordenar:</b> toque nos passos na ordem certa. Os erros são registrados.</p>
        <p><b>3. Próximo passo:</b> o site mostra um passo e você escolhe o que vem depois.</p>
        <p><b>4. Bandeja:</b> escolha os itens certos (há intrusos) e diga para onde vai cada material ao desfazer.</p>
        <p><b>5. Checklist:</b> faça o procedimento no boneco enquanto um colega marca cada passo, como o professor faria.</p>
      </div>`;
  }

  /* ============================================================
     PROCEDIMENTO
     ============================================================ */
  function viewProc(p, aba, sub, extra) {
    const tabs = [["estudar", "Estudar"], ["ordenar", "Ordenar"], ["proximo", "Próximo"]];
    if (p.bandeja) tabs.push(["bandeja", "Bandeja"]);
    tabs.push(["checklist", "Checklist"]);
    if (!tabs.some((t) => t[0] === aba)) aba = "estudar";

    app.innerHTML = `
      <a class="back" href="#/">← Treinos</a>
      <div class="phead" style="--c:${p.cor}">
        <span class="badge">${esc(p.sigla)}</span>
        <div><h1>${esc(p.nome)}</h1><p>${esc(p.sub)}</p></div>
      </div>
      <nav class="tabs" aria-label="Modos">${tabs.map(([id, n]) => `<a href="#/p/${p.id}/${id}" class="${id === aba ? "on" : ""}">${n}</a>`).join("")}</nav>
      <div id="pane"></div>`;
    const pane = document.getElementById("pane");

    if (aba === "bandeja") return paneBandeja(p, pane, sub);
    const L = listas(p);
    const lista = L.find((l) => l.id === sub) || L[0];
    const picker = L.length > 1
      ? `<div class="listpick seg" role="tablist">${L.map((l) => `<button type="button" data-lista="${l.id}" class="${l.id === lista.id ? "on" : ""}">${esc(l.nome)}</button>`).join("")}</div>`
      : "";
    pane.innerHTML = picker + '<div id="body"></div>';
    pane.querySelectorAll("[data-lista]").forEach((b) => b.addEventListener("click", () => { location.hash = `#/p/${p.id}/${aba}/${b.dataset.lista}`; }));
    const body = document.getElementById("body");
    ({ estudar: paneEstudar, ordenar: paneOrdenar, proximo: paneProximo, checklist: paneChecklist })[aba](p, lista, body, extra);
  }

  /* ---------- Estudar ---------- */
  function stepsHTML(passos, opts = {}) {
    let out = "";
    let fase = null;
    passos.forEach((s, i) => {
      if (s.f && s.f !== fase) { fase = s.f; out += `<div class="phase">${esc(fase)}</div>`; }
      out += `<li class="step${opts.hidden ? " hidden" : ""}" data-i="${i}">
        <span class="n">${i + 1}</span>
        <div><div class="t">${fmt(s.t)}${s.ref ? `<span class="ref">${esc(s.ref)}</span>` : ""}</div>
        ${s.d ? `<ul class="d">${s.d.map((x) => `<li>${fmt(x)}</li>`).join("")}</ul>` : ""}</div></li>`;
    });
    return `<ol class="steps">${out}</ol>`;
  }

  function paneEstudar(p, lista, body) {
    const teoria = (p.intro || []).concat(p.obs || []);
    let hidden = false;
    body.innerHTML = `
      <div class="stack">
        ${p.adaptado ? `<div class="callout info">${fmt(p.adaptado)}</div>` : ""}
        ${p.alertas && p.alertas.length ? `<div class="callout"><b>Atenção na prova</b><ul>${p.alertas.map((a) => `<li>${fmt(a)}</li>`).join("")}</ul></div>` : ""}
        ${teoria.length ? `<details class="theory"><summary>Teoria do material</summary><div class="body">${(p.intro || []).map((t) => `<p>${fmt(t)}</p>`).join("")}${p.obs && p.obs.length ? `<p><b>Observações</b></p><ul>${p.obs.map((t) => `<li>${fmt(t)}</li>`).join("")}</ul>` : ""}</div></details>` : ""}
        <div>
          <div class="memo-bar">
            <h2>${esc(lista.nome)} <span class="muted small">· ${lista.passos.length} passos</span></h2>
            <div class="row"><button type="button" class="btn" id="memo">Modo memória</button></div>
          </div>
          <div id="lst">${stepsHTML(lista.passos)}</div>
        </div>
      </div>`;
    const lst = body.querySelector("#lst");
    const memo = body.querySelector("#memo");
    memo.addEventListener("click", () => {
      hidden = !hidden;
      lst.innerHTML = stepsHTML(lista.passos, { hidden });
      memo.textContent = hidden ? "Revelar tudo" : "Modo memória";
      memo.classList.toggle("primary", hidden);
      if (hidden) toast("Tente lembrar cada passo e toque nele para conferir");
    });
    lst.addEventListener("click", (e) => {
      const li = e.target.closest(".step.hidden");
      if (li) li.classList.remove("hidden");
    });
  }

  /* ---------- Ordenar ---------- */
  function paneOrdenar(p, lista, body) {
    const recKey = p.id + ":" + lista.id;
    const long = lista.passos.length > 8;
    let bloco = long ? (store.bloco ?? 0) : 0;
    let st;

    function start() {
      const items = lista.passos.map((s, i) => ({ i, k: keyOf(s), s }));
      const size = bloco || items.length;
      st = { items, size, b: 0, errors: 0, placed: [], errAt: new Set(), t0: Date.now() };
      loadBlock();
    }
    function loadBlock() {
      st.pool = shuffle(st.items.slice(st.b * st.size, (st.b + 1) * st.size));
      st.streak = 0;
      draw();
    }
    function draw() {
      const blocks = Math.ceil(st.items.length / st.size);
      const prog = Math.round((st.placed.length / st.items.length) * 100);
      body.innerHTML = `
        <div class="game-head">
          <div class="stats"><span class="pill">${st.placed.length}/${st.items.length}</span>${blocks > 1 ? `<span class="pill">bloco ${st.b + 1}/${blocks}</span>` : ""}<span class="pill ${st.errors ? "bad" : "ok"}">${st.errors} ${st.errors === 1 ? "erro" : "erros"}</span></div>
          ${long ? `<div class="seg" aria-label="Tamanho do bloco"><button type="button" data-b="0" class="${bloco === 0 ? "on" : ""}">Tudo</button><button type="button" data-b="6" class="${bloco === 6 ? "on" : ""}">6 por vez</button></div>` : ""}
        </div>
        <div class="bar" style="margin-bottom:14px"><i style="width:${prog}%"></i></div>
        <p class="muted small" style="margin-bottom:10px">Toque no passo <b>${st.placed.length + 1}</b>.</p>
        <div class="pool">${st.pool.map((it, j) => `<button type="button" class="opt" data-j="${j}">${fmt(label(it.s))}</button>`).join("")}</div>
        ${st.placed.length ? `<h3 style="margin:20px 0 8px">Sequência</h3><ol class="placed">${st.placed.slice().reverse().map((it) => `<li class="${st.errAt.has(it.i) ? "err" : ""}"><b>${it.i + 1}</b><span>${fmt(label(it.s))}</span></li>`).join("")}</ol>` : ""}`;
      body.querySelectorAll("[data-b]").forEach((b) => b.addEventListener("click", () => {
        bloco = +b.dataset.b; store.bloco = bloco; save(); start();
      }));
      body.querySelectorAll(".opt[data-j]").forEach((b) => b.addEventListener("click", () => pick(+b.dataset.j, b)));
    }
    function pick(j, btn) {
      const expected = st.items[st.placed.length];
      const it = st.pool[j];
      if (it.k === expected.k) {
        st.pool.splice(j, 1);
        st.placed.push(expected);
        st.streak = 0;
        if (st.placed.length === st.items.length) return finish();
        if (!st.pool.length) { st.b++; return loadBlock(); }
        draw();
      } else {
        st.errors++;
        st.streak++;
        st.errAt.add(expected.i);
        btn.classList.remove("wrong");
        void btn.offsetWidth;
        btn.classList.add("wrong");
        body.querySelector(".stats .pill:last-child").outerHTML = `<span class="pill bad">${st.errors} ${st.errors === 1 ? "erro" : "erros"}</span>`;
        if (st.streak >= 3) {
          const hj = st.pool.findIndex((x) => x.k === expected.k);
          const hb = body.querySelector(`.opt[data-j="${hj}"]`);
          if (hb) hb.classList.add("hint");
        }
      }
    }
    function finish() {
      const ms = Date.now() - st.t0;
      store.ord = store.ord || {};
      const prev = store.ord[recKey];
      const best = prev ? Math.min(prev.best, st.errors) : st.errors;
      store.ord[recKey] = { best, n: (prev ? prev.n : 0) + 1 };
      save();
      const rev = st.items.filter((it) => st.errAt.has(it.i));
      body.innerHTML = `
        <div class="card result">
          <div class="big">${st.errors === 0 ? "Perfeito!" : st.errors + (st.errors === 1 ? " erro" : " erros")}</div>
          <p>${st.items.length} passos em ${mmss(ms)} · melhor resultado: ${best} ${best === 1 ? "erro" : "erros"}</p>
          <div class="row"><button type="button" class="btn primary" id="again">De novo</button><a class="btn" href="#/p/${p.id}/estudar/${lista.id}">Ver passo a passo</a></div>
        </div>
        ${rev.length ? `<h3 style="margin:20px 0 8px">Revise estes passos</h3>${stepsHTML(rev.map((it) => Object.assign({}, it.s, { f: null, t: `(${it.i + 1}) ` + it.s.t })))}` : ""}`;
      body.querySelector("#again").addEventListener("click", start);
    }
    start();
  }

  /* ---------- Próximo passo ---------- */
  function paneProximo(p, lista, body) {
    const ps = lista.passos;
    let st;
    function start() { st = { i: -1, ok: 0, bad: 0 }; ask(); }
    function options() {
      const c = st.i + 1;
      const ck = keyOf(ps[c]);
      const seen = new Set([ck]);
      if (st.i >= 0) seen.add(keyOf(ps[st.i]));
      const near = [], far = [];
      ps.forEach((s, j) => {
        const k = keyOf(s);
        if (seen.has(k)) return;
        seen.add(k);
        (Math.abs(j - c) <= 4 ? near : far).push(j);
      });
      let ds = shuffle(near).slice(0, 2);
      ds = ds.concat(shuffle(far).slice(0, 3 - ds.length));
      if (ds.length < 3) ds = ds.concat(shuffle(near.filter((x) => !ds.includes(x))).slice(0, 3 - ds.length));
      return shuffle([c].concat(ds));
    }
    function ask() {
      const c = st.i + 1;
      const ops = options();
      const total = ps.length;
      body.innerHTML = `
        <div class="game-head">
          <div class="stats"><span class="pill">${c + 1}/${total}</span><span class="pill ok">${st.ok} certos</span><span class="pill ${st.bad ? "bad" : ""}">${st.bad} errados</span></div>
          <button type="button" class="btn ghost small" id="restart">Recomeçar</button>
        </div>
        <div class="bar" style="margin-bottom:16px"><i style="width:${Math.round((c / total) * 100)}%"></i></div>
        <div class="card">
          <div class="prompt">${st.i < 0 ? "Qual é o <b>primeiro</b> passo?" : `Você acabou de fazer:<span class="prev"><b>${st.i + 1}.</b> ${fmt(label(ps[st.i]))}</span>Qual vem <b>depois</b>?`}</div>
          <div class="choices" style="margin-top:12px">${ops.map((j, n) => `<button type="button" class="opt" data-j="${j}"><span class="muted small">${n + 1}</span>&nbsp; ${fmt(label(ps[j]))}</button>`).join("")}</div>
          <div class="feedback" id="fb"></div>
        </div>`;
      body.querySelector("#restart").addEventListener("click", start);
      const btns = [...body.querySelectorAll(".opt")];
      let answered = false;
      const answer = (b) => {
        if (answered) return;
        answered = true;
        const right = +b.dataset.j === c;
        right ? st.ok++ : st.bad++;
        btns.forEach((x) => { x.disabled = true; if (+x.dataset.j === c) x.classList.add("right"); });
        if (!right) b.classList.add("wrong");
        const s = ps[c];
        body.querySelector("#fb").innerHTML = `
          <div class="callout ${right ? "info" : ""}"><b>${right ? "Isso!" : "Era este:"}</b> ${c + 1}. ${fmt(s.t)}${s.d ? `<ul>${s.d.map((x) => `<li>${fmt(x)}</li>`).join("")}</ul>` : ""}</div>
          <div class="row" style="margin-top:12px"><button type="button" class="btn primary" id="next">${c + 1 < ps.length ? "Continuar" : "Ver resultado"} ↵</button></div>`;
        body.querySelector("#next").addEventListener("click", next);
        body.querySelector("#next").focus();
      };
      const next = () => { st.i++; st.i + 1 < ps.length ? ask() : done(); };
      btns.forEach((b) => b.addEventListener("click", () => answer(b)));
      onKey = (e) => {
        if (!answered && /^[1-4]$/.test(e.key) && btns[+e.key - 1]) { e.preventDefault(); answer(btns[+e.key - 1]); }
        else if (answered && e.key === "Enter" && document.activeElement?.id !== "next") { e.preventDefault(); next(); }
      };
    }
    function done() {
      onKey = null;
      const pct = Math.round((st.ok / ps.length) * 100);
      body.innerHTML = `<div class="card result"><div class="big">${pct}%</div><p>${st.ok} de ${ps.length} passos certos</p>
        <div class="row"><button type="button" class="btn primary" id="again">De novo</button><a class="btn" href="#/p/${p.id}/ordenar/${lista.id}">Treinar a ordem</a></div></div>`;
      body.querySelector("#again").addEventListener("click", start);
    }
    start();
  }

  /* ---------- Bandeja ---------- */
  function paneBandeja(p, pane, sub) {
    const b = p.bandeja;
    const subs = [["montar", "Montar"], ["destino", "Destino do material"], ["sequencia", "Sequências"]];
    if (!subs.some((s) => s[0] === sub)) sub = "montar";
    pane.innerHTML = `<div class="listpick seg">${subs.map(([id, n]) => `<button type="button" data-s="${id}" class="${id === sub ? "on" : ""}">${n}</button>`).join("")}</div><div id="body"></div>`;
    pane.querySelectorAll("[data-s]").forEach((x) => x.addEventListener("click", () => { location.hash = `#/p/${p.id}/bandeja/${x.dataset.s}`; }));
    const body = pane.querySelector("#body");
    if (sub === "montar") montar(p, b, body);
    else if (sub === "destino") destino(p, b, body);
    else sequencia(p, b, body);
  }

  function montar(p, b, body) {
    let all, sel, checked;
    function start() {
      all = shuffle(
        b.itens.map(([id, nota, op]) => ({ id, nota, tipo: op ? "opc" : "req" }))
          .concat(b.distratores.map((id) => ({ id, tipo: "dis" })))
      );
      sel = new Set();
      checked = false;
      draw();
    }
    function draw() {
      const req = all.filter((x) => x.tipo === "req");
      let head = `<p class="muted" style="margin-bottom:12px">Toque em tudo que vai na bandeja de <b>${esc(p.nome.toLowerCase())}</b>. Há itens intrusos.</p>`;
      if (checked) {
        const hits = req.filter((x) => sel.has(x.id)).length;
        const wrong = all.filter((x) => x.tipo === "dis" && sel.has(x.id)).length;
        const ok = hits === req.length && !wrong;
        head = `<div class="callout ${ok ? "info" : ""}" style="margin-bottom:12px"><b>${ok ? "Bandeja completa!" : `${hits}/${req.length} itens certos · ${wrong} ${wrong === 1 ? "intruso" : "intrusos"}`}</b>
          <div class="small" style="margin-top:4px">Verde = certo · laranja = faltou · vermelho = não vai nesta bandeja · cinza = opcional</div></div>`;
      }
      body.innerHTML = `${head}
        <div class="pool compact">${all.map((x, j) => {
          let cls = sel.has(x.id) ? "sel" : "";
          let note = "";
          if (checked) {
            if (x.tipo === "req") { cls = sel.has(x.id) ? "right" : "missed"; note = sel.has(x.id) ? (x.nota || "") : "faltou" + (x.nota ? ` · ${x.nota}` : ""); }
            else if (x.tipo === "dis") { cls = sel.has(x.id) ? "wrong" : ""; note = sel.has(x.id) ? "não vai nesta bandeja" : ""; }
            else { cls = ""; note = "opcional" + (x.nota ? ` · ${x.nota}` : ""); }
          }
          return `<button type="button" class="opt ${cls}" data-j="${j}" ${checked ? "disabled" : ""} aria-pressed="${sel.has(x.id)}">${esc(itemName(x.id))}${note ? `<span class="note">${esc(note)}</span>` : ""}</button>`;
        }).join("")}</div>
        <div class="row" style="margin-top:16px">${checked
          ? `<button type="button" class="btn primary" id="again">Montar de novo</button><a class="btn" href="#/p/${p.id}/bandeja/sequencia">Ver a sequência de montagem</a>`
          : `<button type="button" class="btn primary" id="check">Conferir bandeja</button><span class="muted small">${sel.size} selecionados</span>`}</div>`;
      if (!checked) {
        body.querySelectorAll(".opt").forEach((el) => el.addEventListener("click", () => {
          const id = all[+el.dataset.j].id;
          sel.has(id) ? sel.delete(id) : sel.add(id);
          el.classList.toggle("sel", sel.has(id));
          el.setAttribute("aria-pressed", sel.has(id));
          body.querySelector(".row .muted").textContent = sel.size + " selecionados";
        }));
        body.querySelector("#check").addEventListener("click", () => { checked = true; draw(); window.scrollTo({ top: 0, behavior: "smooth" }); });
      } else {
        body.querySelector("#again").addEventListener("click", start);
      }
    }
    start();
  }

  function destino(p, b, body) {
    const dkeys = Object.keys(DEST);
    let rows, i, ok, errs;
    function start() {
      rows = shuffle(b.destino.map(([id, d, lbl]) => ({ nome: lbl || itemName(id), d })));
      i = 0; ok = 0; errs = [];
      ask();
    }
    function ask() {
      const r = rows[i];
      body.innerHTML = `
        <div class="game-head"><div class="stats"><span class="pill">${i + 1}/${rows.length}</span><span class="pill ok">${ok} certos</span></div></div>
        <div class="card">
          <p class="muted small">Procedimento terminado. Para onde vai?</p>
          <div class="item-big" style="margin-top:8px">${esc(r.nome)}</div>
          <div class="dest-grid">${dkeys.map((k, n) => `<button type="button" class="opt" data-k="${k}"><b>${n + 1}. ${esc(DEST[k].nome)}</b><span>${esc(DEST[k].dica)}</span></button>`).join("")}</div>
          <div id="fb" class="feedback"></div>
        </div>`;
      const btns = [...body.querySelectorAll(".opt")];
      let answered = false;
      const answer = (bt) => {
        if (answered) return;
        answered = true;
        const right = bt.dataset.k === r.d;
        if (right) ok++; else errs.push(r);
        btns.forEach((x) => { x.disabled = true; if (x.dataset.k === r.d) x.classList.add("right"); });
        if (!right) bt.classList.add("wrong");
        body.querySelector("#fb").innerHTML = `<div class="row"><button type="button" class="btn primary" id="next">${i + 1 < rows.length ? "Próximo" : "Ver resultado"} ↵</button></div>`;
        body.querySelector("#next").addEventListener("click", next);
        body.querySelector("#next").focus();
      };
      const next = () => { i++; i < rows.length ? ask() : done(); };
      btns.forEach((x) => x.addEventListener("click", () => answer(x)));
      onKey = (e) => {
        if (!answered && /^[1-6]$/.test(e.key)) { e.preventDefault(); answer(btns[+e.key - 1]); }
        else if (answered && e.key === "Enter" && document.activeElement?.id !== "next") { e.preventDefault(); next(); }
      };
    }
    function done() {
      onKey = null;
      body.innerHTML = `<div class="card result"><div class="big">${ok}/${rows.length}</div><p>destinos certos</p>
        <div class="row"><button type="button" class="btn primary" id="again">De novo</button></div></div>
        ${errs.length ? `<h3 style="margin:20px 0 8px">Revise</h3><ol class="steps">${errs.map((r, n) => `<li class="step"><span class="n">${n + 1}</span><div class="t">${esc(r.nome)} → <b>${esc(DEST[r.d].nome)}</b></div></li>`).join("")}</ol>` : ""}
        <p class="muted small" style="margin-top:16px">Os destinos do descarte não estão no material, que só diz “desprezar o material”, “higienizar a bandeja” e “encaminhar ao expurgo”. Eles seguem a rotina hospitalar. Confirme com o professor.</p>`;
      body.querySelector("#again").addEventListener("click", start);
    }
    start();
  }

  function sequencia(p, b, body) {
    body.innerHTML = `
      <div class="stack">
        <div>
          <div class="memo-bar"><h2>Montar a bandeja</h2><a class="btn" href="#/p/${p.id}/ordenar/montar">Treinar ordem</a></div>
          ${stepsHTML(b.montar)}
        </div>
        <div>
          <div class="memo-bar"><h2>Itens da bandeja</h2></div>
          <div class="card"><ul style="margin:0;padding-left:18px">${b.itens.map(([id, nota, op]) => `<li>${esc(itemName(id))}${nota ? ` <span class="muted small">(${esc(nota)})</span>` : ""}${op ? ' <span class="pill">opcional</span>' : ""}</li>`).join("")}</ul></div>
        </div>
        <div>
          <div class="memo-bar"><h2>Desfazer a bandeja</h2><a class="btn" href="#/p/${p.id}/ordenar/desfazer">Treinar ordem</a></div>
          ${stepsHTML(b.desfazer)}
        </div>
      </div>`;
  }

  /* ---------- Checklist ---------- */
  function paneChecklist(p, lista, body) {
    const ps = lista.passos;
    const marks = {};
    let elapsed = 0, t0 = null, iv = null;
    const now = () => elapsed + (t0 ? Date.now() - t0 : 0);
    const tick = () => { const el = body.querySelector("#tm"); if (el) el.textContent = mmss(now()); };
    function toggleTimer() {
      if (t0) { elapsed = now(); t0 = null; clearInterval(iv); iv = null; }
      else { t0 = Date.now(); iv = setInterval(tick, 250); }
      body.querySelector("#tbtn").textContent = t0 ? "Pausar" : (elapsed ? "Continuar" : "Iniciar");
      tick();
    }
    cleanup = () => clearInterval(iv);

    const score = () => {
      let pts = 0, n = 0;
      ps.forEach((_, i) => { const v = marks[i]; if (v) n++; if (v === "1") pts += 1; else if (v === "h") pts += 0.5; });
      return { pct: Math.round((pts / ps.length) * 100), n };
    };
    const hist = () => ((store.chk || {})[p.id] || []).filter((h) => h.lista === lista.id);

    function draw() {
      const { pct, n } = score();
      body.innerHTML = `
        <div class="callout info no-print" style="margin-bottom:12px">Faça o procedimento no boneco. Um colega (ou você mesmo, depois) marca cada passo: <b>✓</b> feito, <b>½</b> incompleto/fora de ordem, <b>✗</b> esqueceu.</div>
        <div class="chk-head">
          <div class="row"><span class="timer" id="tm">${mmss(now())}</span><button type="button" class="btn no-print" id="tbtn">${t0 ? "Pausar" : elapsed ? "Continuar" : "Iniciar"}</button></div>
          <div class="row"><span class="pill" id="sc">${n}/${ps.length} · ${pct}%</span><button type="button" class="btn primary no-print" id="fin">Finalizar</button></div>
        </div>
        <h2 style="margin:4px 0 12px">${esc(p.nome)}: ${esc(lista.nome)}</h2>
        <div id="rows">${ps.map((s, i) => `
          <div class="chk ${marks[i] ? "v-" + marks[i] : ""}" data-i="${i}">
            <span class="n">${i + 1}</span>
            <div class="t">${fmt(label(s))}${s.s && plain(s.s) !== plain(s.t) ? `<small>${fmt(s.t)}</small>` : ""}</div>
            <div class="tri">${[["1", "✓", "feito"], ["h", "½", "incompleto"], ["0", "✗", "não feito"]].map(([v, g, a]) => `<button type="button" data-v="${v}" class="${marks[i] === v ? "on" : ""}" aria-label="${a}">${g}</button>`).join("")}</div>
          </div>`).join("")}</div>
        <div class="row no-print" style="margin-top:16px">
          <button type="button" class="btn" id="print">Imprimir checklist</button>
          <button type="button" class="btn ghost" id="reset">Limpar marcações</button>
        </div>
        <div id="res"></div>
        ${hist().length ? `<div class="card no-print" style="margin-top:20px"><h3>Histórico</h3><ul class="hist">${hist().slice(0, 8).map((h) => `<li><span>${new Date(h.d).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })}</span><span>${h.tempo ? mmss(h.tempo) + " · " : ""}<b>${h.pct}%</b></span></li>`).join("")}</ul></div>` : ""}`;

      body.querySelector("#tbtn").addEventListener("click", toggleTimer);
      body.querySelector("#rows").addEventListener("click", (e) => {
        const bt = e.target.closest(".tri button");
        if (!bt) return;
        const row = bt.closest(".chk");
        const i = +row.dataset.i;
        marks[i] = marks[i] === bt.dataset.v ? undefined : bt.dataset.v;
        if (!marks[i]) delete marks[i];
        row.className = "chk" + (marks[i] ? " v-" + marks[i] : "");
        row.querySelectorAll(".tri button").forEach((x) => x.classList.toggle("on", x.dataset.v === marks[i]));
        const sc = score();
        body.querySelector("#sc").textContent = `${sc.n}/${ps.length} · ${sc.pct}%`;
      });
      body.querySelector("#print").addEventListener("click", () => window.print());
      body.querySelector("#reset").addEventListener("click", () => {
        Object.keys(marks).forEach((k) => delete marks[k]);
        elapsed = 0; t0 = null; clearInterval(iv); iv = null;
        draw();
      });
      body.querySelector("#fin").addEventListener("click", finish);
    }
    function finish() {
      if (t0) toggleTimer();
      const { pct, n } = score();
      if (!n) { toast("Marque pelo menos um passo"); return; }
      store.chk = store.chk || {};
      const arr = store.chk[p.id] || [];
      arr.unshift({ d: Date.now(), pct, tempo: now(), lista: lista.id });
      store.chk[p.id] = arr.slice(0, 30);
      save();
      const falhas = ps.map((s, i) => ({ s, i, v: marks[i] })).filter((x) => x.v !== "1");
      draw();
      body.querySelector("#res").innerHTML = `
        <div class="card result" style="margin-top:20px"><div class="big">${pct}%</div><p>${mmss(now())} · resultado salvo no histórico</p></div>
        ${falhas.length ? `<h3 style="margin:20px 0 8px">Para revisar</h3><ol class="steps">${falhas.map((x) => `<li class="step"><span class="n">${x.i + 1}</span><div><div class="t">${fmt(x.s.t)} <span class="pill ${x.v === "h" ? "warn" : "bad"}">${x.v === "h" ? "incompleto" : x.v === "0" ? "esqueceu" : "não marcado"}</span></div></div></li>`).join("")}</ol>` : ""}`;
      body.querySelector("#res").scrollIntoView({ behavior: "smooth", block: "start" });
    }
    draw();
  }

  /* ============================================================
     COMPARAR
     ============================================================ */
  function viewComparar() {
    const cols = ["SVD (Foley)", "Alívio (Nelaton)", "SNE", "SNG"];
    const rows = [
      ["Técnica", "Estéril", "Estéril", "Limpa (não estéril)", "Limpa (não estéril)"],
      ["Sonda", "Foley: 2 ou 3 vias, flexível, para permanência", "Nelaton: 1 via, mais rígida, retirada após esvaziar", "Longa (até o intestino); 2 entradas proximais (guia + teste); ponta de tungstênio; fio-guia", "1 entrada proximal; extremidade distal cheia de orifícios; sem fio-guia"],
      ["Luvas", "Procedimento (higiene íntima) → estéreis, 2 pares (tira o 1º após a antissepsia)", "Igual à SVD", "Procedimento; troca antes de lubrificar", "Procedimento; troca antes de lubrificar"],
      ["Posição", "♀ dorsal, joelhos flexionados · ♂ supina, coxas levemente contraídas", "Igual à SVD", "Fowler 90° (semi 45°); se contraindicado: DD, cabeça lateralizada e inclinada para frente", "Fowler"],
      ["Lubrificante", "Xilocaína; no ♂ pode injetar na uretra (seringa 20 ml)", "Igual à SVD", "Gel hidrossolúvel", "Gaze com gel hidrossolúvel"],
      ["Mensuração", "—", "—", "Nariz → lóbulo → xifoide → umbigo · ou xifoide + 10/15 cm · ou lóbulo 2× → xifoide (mais usual)", "Nariz → lóbulo → xifoide + 2/4 cm"],
      ["Confirmação", "Drenagem de urina", "Drenagem de urina", "20 ml de ar + ausculta epigástrica; aspirar conteúdo; RX (~1 h 30 min)", "20 ml de ar + ausculta epigástrica; aspirar conteúdo"],
      ["Fixação", "Balonete com água destilada (testar com seringa de 10 ml); ♀ coxa interna · ♂ suprapúbica", "Não fixa: retira após esvaziar", "Face, mesmo lado da narina, fita fina; depois decúbito lateral direito", "Face, mesmo lado da narina, fita fina; fechada ou aberta conforme prescrição"],
      ["Permanência", "Demora", "Minutos (alívio)", "Até 30 dias ou até obstruir", "Poucos dias; se precisar mais → SNE"],
      ["Contraindicação", "Obstrução mecânica da uretra; ITU baixa", "{{Mesmas da SVD}}", "Naso: desvio de septo, TCE · naso/oro: trauma raquimedular", "Naso: desvio de septo, TCE · naso/oro: trauma raquimedular"]
    ];
    app.innerHTML = `
      <a class="back" href="#/">← Treinos</a>
      <section class="hero" style="padding-top:12px"><h1>Comparar</h1><p>O que muda de uma sonda para outra: é aqui que a prova costuma pegar.</p></section>
      <h2 class="section-t">Sondas</h2>
      <div class="tbl-wrap"><table class="cmp"><thead><tr><th></th>${cols.map((c) => `<th>${c}</th>`).join("")}</tr></thead>
        <tbody>${rows.map(([h, ...v]) => `<tr><th>${h}</th>${v.map((x) => `<td>${fmt(x)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>
      <h2 class="section-t">Higienização das mãos</h2>
      <div class="tbl-wrap"><table class="cmp"><thead><tr><th></th><th>Simples (fora do CC)</th><th>Antissepsia cirúrgica (CC)</th></tr></thead><tbody>
        <tr><th>Produto</th><td>Sabonete líquido comum (remove a sujeira)</td><td>Clorexidina degermante 4% (escova/esponja)</td></tr>
        <tr><th>Área</th><td>Mãos e dedos</td><td>Mãos, antebraços e cotovelos</td></tr>
        <tr><th>Sequência</th><td>Palmas → palma/dorso entrelaçando → interdigitais → dorso dos dedos → polegar → polpas/unhas</td><td>Unhas → palma e dorso → dedos e interdigitais → antebraço</td></tr>
        <tr><th>Tempo</th><td>{{40 a 60 s (ANVISA)}}</td><td>3 a 5 minutos</td></tr>
        <tr><th>Posição</th><td>—</td><td>Mãos sempre acima dos cotovelos</td></tr>
        <tr><th>Enxágue</th><td>Enxaguar bem as mãos</td><td>Das mãos para os cotovelos</td></tr>
        <tr><th>Secagem</th><td>Papel-toalha descartável</td><td>Compressa estéril, compressiva, mãos → cotovelo, dobras diferentes</td></tr>
        <tr><th>Torneira</th><td>Fechar com papel-toalha</td><td>Cotovelo, joelho ou pés (se não tiver fotossensor)</td></tr>
      </tbody></table></div>
      <h2 class="section-t">Paramentação (EPI)</h2>
      <div class="ppe">
        <div class="card"><h3>Colocar</h3><ol><li>Avental</li><li>Máscara</li><li>Óculos</li><li>Gorro</li><li>Luva</li></ol></div>
        <div class="card"><h3>Retirar</h3><ol><li>Luvas</li><li>Avental</li><li>Gorro</li><li>Óculos</li><li>Máscara</li></ol></div>
        <div class="card"><h3>Com protetor facial</h3><p class="small muted" style="margin-top:6px">Colocar: avental → máscara PFF2 → óculos → touca → protetor facial → luvas</p><p class="small muted" style="margin-top:6px">Retirar: luvas → avental → protetor facial → touca → óculos → máscara</p></div>
      </div>
      <p class="muted small" style="margin-top:12px">A luva é a última a entrar e a primeira a sair. A máscara é a última a sair.</p>`;
  }

  /* ============================================================
     PERGUNTAS
     ============================================================ */
  function viewPerguntas() {
    const temas = [["", "Todas"], ["svd", "Vesical"], ["sne", "SNE"], ["sng", "SNG"], ["maos", "Mãos"], ["cirurgica", "Escovação"], ["paramentacao", "Paramentação"]];
    let tema = "";
    let fila, i, ok, errs;
    function intro() {
      onKey = null;
      const n = Q.filter((q) => !tema || q.tema === tema).length;
      app.innerHTML = `
        <a class="back" href="#/">← Treinos</a>
        <section class="hero" style="padding-top:12px"><h1>Perguntas de conceito</h1><p>Números, posições, indicações e contraindicações que o professor pode perguntar enquanto você faz o procedimento.</p></section>
        <div class="card stack">
          <div class="chips">${temas.map(([id, n]) => `<button type="button" class="chip ${id === tema ? "on" : ""}" data-t="${id}">${n}</button>`).join("")}</div>
          <p class="muted small">${n} perguntas neste tema · rodadas de até 10</p>
          <div class="row"><button type="button" class="btn primary" id="go">Começar</button></div>
        </div>`;
      app.querySelectorAll("[data-t]").forEach((b) => b.addEventListener("click", () => { tema = b.dataset.t; intro(); }));
      app.querySelector("#go").addEventListener("click", start);
    }
    function start() {
      fila = shuffle(Q.filter((q) => !tema || q.tema === tema)).slice(0, 10);
      i = 0; ok = 0; errs = [];
      ask();
    }
    function ask() {
      const q = fila[i];
      const ops = shuffle(q.o.map((t, j) => ({ t, ok: j === q.c })));
      app.innerHTML = `
        <a class="back" href="#/perguntas" id="sair">← Sair</a>
        <div class="game-head" style="margin-top:16px"><div class="stats"><span class="pill">${i + 1}/${fila.length}</span><span class="pill ok">${ok} certas</span></div></div>
        <div class="bar" style="margin-bottom:16px"><i style="width:${Math.round((i / fila.length) * 100)}%"></i></div>
        <div class="card">
          <p class="prompt"><b>${fmt(q.p)}</b></p>
          <div class="choices" style="margin-top:14px">${ops.map((o, n) => `<button type="button" class="opt" data-n="${n}"><span class="muted small">${n + 1}</span>&nbsp; ${fmt(o.t)}</button>`).join("")}</div>
          <div class="feedback" id="fb"></div>
        </div>`;
      app.querySelector("#sair").addEventListener("click", (e) => { e.preventDefault(); intro(); });
      const btns = [...app.querySelectorAll(".opt")];
      let answered = false;
      const answer = (b) => {
        if (answered) return;
        answered = true;
        const right = ops[+b.dataset.n].ok;
        if (right) ok++; else errs.push(q);
        btns.forEach((x) => { x.disabled = true; if (ops[+x.dataset.n].ok) x.classList.add("right"); });
        if (!right) b.classList.add("wrong");
        app.querySelector("#fb").innerHTML = `${q.e ? `<div class="callout info">${fmt(q.e)}</div>` : ""}
          <div class="row" style="margin-top:12px"><button type="button" class="btn primary" id="next">${i + 1 < fila.length ? "Próxima" : "Ver resultado"} ↵</button></div>`;
        app.querySelector("#next").addEventListener("click", next);
        app.querySelector("#next").focus();
      };
      const next = () => { i++; i < fila.length ? ask() : done(); };
      btns.forEach((b) => b.addEventListener("click", () => answer(b)));
      onKey = (e) => {
        if (!answered && /^[1-4]$/.test(e.key) && btns[+e.key - 1]) { e.preventDefault(); answer(btns[+e.key - 1]); }
        else if (answered && e.key === "Enter" && document.activeElement?.id !== "next") { e.preventDefault(); next(); }
      };
    }
    function done() {
      onKey = null;
      store.quiz = store.quiz || { acertos: 0, total: 0 };
      store.quiz.acertos += ok;
      store.quiz.total += fila.length;
      save();
      app.innerHTML = `
        <a class="back" href="#/">← Treinos</a>
        <div class="card result" style="margin-top:16px"><div class="big">${ok}/${fila.length}</div><p>respostas certas</p>
          <div class="row"><button type="button" class="btn primary" id="again">Nova rodada</button><button type="button" class="btn" id="trocar">Trocar tema</button></div></div>
        ${errs.length ? `<h3 style="margin:20px 0 8px">Revise</h3><ol class="steps">${errs.map((q, n) => `<li class="step"><span class="n">${n + 1}</span><div><div class="t">${fmt(q.p)}</div><div class="small" style="margin-top:4px"><b>${fmt(q.o[q.c])}</b></div></div></li>`).join("")}</ol>` : ""}`;
      app.querySelector("#again").addEventListener("click", start);
      app.querySelector("#trocar").addEventListener("click", intro);
    }
    intro();
  }

  route();
})();
