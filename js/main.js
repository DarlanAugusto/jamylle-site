/* Interatividade da landing page — os dados vêm de config.js */
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = (s = "") => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const brl = n => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 0 });
  const waLink = msg => `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`;

  /* ---------- Textos ---------- */
  $$("[data-fill]").forEach(el => {
    const v = SITE[el.dataset.fill];
    if (v) el.textContent = v; else if (v === "") el.hidden = true;
  });
  $("#ano").textContent = new Date().getFullYear();
  document.title = `${SITE.nome} | ${SITE.titulo}`;

  /* ---------- Fotos (placeholder enquanto não houver arquivo) ---------- */
  const setPhoto = (el, src, label) => {
    if (src) { el.classList.add("has-img"); el.classList.remove("ph"); el.style.backgroundImage = `url("${src}")`; }
    else { el.classList.add("ph"); el.classList.remove("has-img"); el.style.backgroundImage = ""; el.dataset.label = label; }
  };
  const labels = { hero: "Foto destaque", perfil: "Foto dela", antes: "Antes", depois: "Depois" };
  $$("[data-photo]").forEach(el => setPhoto(el, SITE.fotos[el.dataset.photo], labels[el.dataset.photo]));

  /* ---------- Links de WhatsApp ---------- */
  const ctaPrecos = $("#cta-precos");
  if (SITE.msgPrecos) ctaPrecos.dataset.wa = SITE.msgPrecos; else ctaPrecos.hidden = true;
  $$("[data-wa]").forEach(a => { a.href = waLink(a.dataset.wa); a.target = "_blank"; a.rel = "noopener"; });

  /* ---------- Redes sociais ---------- */
  const redes = [
    ["whatsapp", waLink("Oi! Vim pelo seu site 💅"), "WhatsApp"],
    ["instagram", SITE.redes.instagram, "Instagram"],
    ["tiktok", SITE.redes.tiktok, "TikTok"],
    ["facebook", SITE.redes.facebook, "Facebook"],
  ].filter(r => r[1]);
  $(".socials").innerHTML = redes.map(([ic, url, nome]) =>
    `<a href="${esc(url)}" target="_blank" rel="noopener" aria-label="${nome}"><svg class="ico"><use href="#i-${ic}"/></svg></a>`).join("");

  /* ---------- Crédito do desenvolvedor ---------- */
  const cr = SITE.credito;
  if (cr && cr.nome) {
    const contatos = [
      ["whatsapp", cr.whatsapp && `https://wa.me/${cr.whatsapp}?text=${encodeURIComponent("Oi! Vi o site da Jamylle e quero um site também 🙂")}`, "WhatsApp"],
      ["linkedin", cr.linkedin, "LinkedIn"],
      ["instagram", cr.instagram, "Instagram"],
    ].filter(c => c[1]);
    const box = $(".footer__credit");
    box.innerHTML = `<span>Site desenvolvido por <strong>${esc(cr.nome)}</strong></span>` +
      contatos.map(([ic, url, nome]) => `<a href="${esc(url)}" target="_blank" rel="noopener" aria-label="${nome} de ${esc(cr.nome)}"><svg class="ico"><use href="#i-${ic}"/></svg>${nome}</a>`).join("");
    box.hidden = false;
  }

  /* ---------- Menu ---------- */
  const nav = $(".nav"), toggle = $(".nav__toggle"), menu = $("#menu");
  const setMenu = open => {
    toggle.setAttribute("aria-expanded", open);
    menu.classList.toggle("is-open", open);
    nav.classList.toggle("menu-open", open);
  };
  toggle.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
  $$("a", menu).forEach(a => a.addEventListener("click", () => setMenu(false)));

  const waFloat = $(".wa-float");
  const onScroll = () => {
    nav.classList.toggle("is-scrolled", scrollY > 20);
    waFloat.classList.toggle("is-visible", scrollY > 400);
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  // Mostra o balão "Agende agora!" uma vez, depois de 12s na página
  setTimeout(() => { waFloat.classList.add("show-tip"); setTimeout(() => waFloat.classList.remove("show-tip"), 4000); }, 12000);

  /* ---------- Galeria + filtro ---------- */
  const gallery = $(".gallery");
  gallery.innerHTML = SITE.galeria.map((g, i) => `
    <button class="gallery__item reveal" data-i="${i}" data-cat="${esc(g.categoria)}" aria-label="Ampliar: ${esc(g.titulo)}">
      <div class="bg${g.miniatura === "final" ? " bg--final" : ""}"></div>
      <figcaption>${esc(g.titulo)}</figcaption>
    </button>`).join("");
  $$(".gallery__item .bg").forEach((bg, i) => setPhoto(bg, SITE.galeria[i].foto, SITE.galeria[i].titulo));

  const filters = $(".filters");
  filters.innerHTML = ["Todos", ...SITE.categorias].map((c, i) =>
    `<button class="filter" role="tab" aria-selected="${i === 0}" data-cat="${esc(c)}">${esc(c)}</button>`).join("");
  filters.addEventListener("click", e => {
    const btn = e.target.closest(".filter");
    if (!btn) return;
    $$(".filter", filters).forEach(b => b.setAttribute("aria-selected", b === btn));
    const cat = btn.dataset.cat;
    $$(".gallery__item").forEach(it => it.classList.toggle("is-hidden", cat !== "Todos" && it.dataset.cat !== cat));
  });

  /* ---------- Lightbox ---------- */
  const lb = $(".lightbox"), lbImg = $(".lightbox__img"), lbCap = $(".lightbox figcaption"), lbCta = $(".lightbox__cta");
  let cur = 0, lastFocus;
  const visible = () => $$(".gallery__item:not(.is-hidden)").map(b => +b.dataset.i);
  const show = i => {
    cur = i;
    const g = SITE.galeria[i];
    setPhoto(lbImg, g.foto, g.titulo);
    lbCap.textContent = `${g.titulo} · ${g.categoria}`;
    lbCta.href = waLink(`Oi! Vi no seu site o trabalho "${g.titulo}" e quero fazer igual. Tem horário? 💅`);
    lbCta.target = "_blank"; lbCta.rel = "noopener";
  };
  const step = d => { const v = visible(); show(v[(v.indexOf(cur) + d + v.length) % v.length]); };
  const openLb = i => { lastFocus = document.activeElement; show(i); lb.hidden = false; document.body.style.overflow = "hidden"; $(".lightbox__close").focus(); };
  const closeLb = () => { lb.hidden = true; document.body.style.overflow = ""; lastFocus?.focus(); };

  gallery.addEventListener("click", e => { const it = e.target.closest(".gallery__item"); if (it) openLb(+it.dataset.i); });
  $(".lightbox__close").addEventListener("click", closeLb);
  $(".lightbox__nav--prev").addEventListener("click", () => step(-1));
  $(".lightbox__nav--next").addEventListener("click", () => step(1));
  lb.addEventListener("click", e => { if (e.target === lb) closeLb(); });
  addEventListener("keydown", e => {
    if (lb.hidden) return;
    if (e.key === "Escape") closeLb();
    if (e.key === "ArrowRight") step(1);
    if (e.key === "ArrowLeft") step(-1);
  });
  let touchX = null;
  lb.addEventListener("touchstart", e => { touchX = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", e => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
    touchX = null;
  });

  /* ---------- Serviços + chips do agendamento ---------- */
  const priceText = s => s.preco ? `${brl(s.preco)}${s.sufixo || ""}` : `<span class="service__ask">Valor no WhatsApp</span>`;
  $(".services").innerHTML = SITE.servicos.map((s, i) => `
    <button type="button" class="service reveal" data-i="${i}" aria-pressed="false">
      ${s.destaque ? `<span class="service__tag">${esc(s.destaque)}</span>` : ""}
      <span class="service__icon"><svg class="ico"><use href="#i-${i % 2 ? "sparkle" : "nail"}"/></svg></span>
      <h3>${esc(s.nome)}</h3>
      <p>${esc(s.desc)}</p>
      <span class="service__foot">
        <span class="service__price">${s.precoDe ? `<s>${brl(s.precoDe)}</s>` : ""}${priceText(s)}</span>
        <span class="service__time"><svg class="ico"><use href="#i-clock"/></svg>${esc(s.tempo || "")}</span>
      </span>
    </button>`).join("");

  $("#chips-servicos").innerHTML = SITE.servicos.map((s, i) =>
    `<label class="chip"><input type="checkbox" name="servico" value="${i}"><span>${esc(s.nome)}</span></label>`).join("");

  const form = $(".booking__form");
  const checks = () => $$("input[name=servico]", form);
  const syncServices = () => {
    const sel = checks().filter(c => c.checked).map(c => +c.value);
    $$(".service").forEach(card => {
      const on = sel.includes(+card.dataset.i);
      card.classList.toggle("is-selected", on);
      card.setAttribute("aria-pressed", on);
    });
    if (!temPreco) return;
    const total = sel.reduce((t, i) => t + (SITE.servicos[i].preco || 0), 0);
    const parcial = sel.some(i => SITE.servicos[i].sufixo || !SITE.servicos[i].preco);
    $("#total").textContent = sel.length ? (parcial ? "a partir de " : "") + brl(total) : "—";
  };
  const temPreco = SITE.servicos.some(s => s.preco);
  $(".booking__total").hidden = !temPreco;
  $(".services").addEventListener("click", e => {
    const card = e.target.closest(".service");
    if (!card) return;
    const box = checks()[+card.dataset.i];
    box.checked = !box.checked;
    syncServices();
  });
  form.addEventListener("change", syncServices);

  /* ---------- Envio do agendamento ---------- */
  const dateInput = form.elements.data;
  dateInput.min = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);

  form.addEventListener("submit", e => {
    e.preventDefault();
    const nome = form.elements.nome.value.trim();
    const sel = checks().filter(c => c.checked).map(c => SITE.servicos[+c.value]);
    const err = $(".form__error", form);
    if (!nome || !sel.length) {
      err.hidden = false;
      form.classList.remove("shake"); void form.offsetWidth; form.classList.add("shake");
      (nome ? checks()[0] : form.elements.nome).focus();
      return;
    }
    err.hidden = true;
    const data = dateInput.value ? new Date(dateInput.value + "T12:00").toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "2-digit" }) : "";
    const periodo = form.elements.periodo.value;
    const obs = form.elements.obs.value.trim();
    const linhas = [
      `Oi, ${SITE.primeiroNome}! Meu nome é ${nome} e quero agendar 💅`,
      ``,
      `*Serviço(s):* ${sel.map(s => s.nome).join(", ")}`,
      data ? `*Data:* ${data}` : null,
      `*Período:* ${periodo || "qualquer horário"}`,
      obs ? `*Obs.:* ${obs}` : null,
      ``,
      sel.every(s => s.preco) ? `Tem horário disponível?` : `Tem horário disponível? E qual o valor${sel.some(s => s.preco) ? " total" : ""}?`,
    ].filter(l => l !== null);
    window.open(waLink(linhas.join("\n")), "_blank", "noopener");
  });

  /* ---------- Antes e depois ---------- */
  const ba = $(".ba"), range = $(".ba__range");
  range.addEventListener("input", () => ba.style.setProperty("--pos", range.value + "%"));

  /* ---------- Depoimentos ---------- */
  const testiSection = $("#depoimentos");
  // depoimentosDemo: true mostra a seção só ao abrir o site localmente
  const local = ["", "localhost", "127.0.0.1"].includes(location.hostname);
  if (!SITE.depoimentos.length || (SITE.depoimentosDemo && !local)) testiSection.hidden = true;
  else {
    const track = $(".testi__track"), dots = $(".testi__dots");
    track.innerHTML = SITE.depoimentos.map(d => `
      <div class="testi__card"><blockquote>
        <div class="testi__stars">${'<svg class="ico"><use href="#i-star"/></svg>'.repeat(5)}</div>
        “${esc(d.texto)}”<cite>${esc(d.autor)}</cite>
      </blockquote></div>`).join("");
    dots.innerHTML = SITE.depoimentos.map((_, i) => `<button aria-label="Depoimento ${i + 1}"></button>`).join("");
    if (SITE.depoimentosDemo) dots.insertAdjacentHTML("afterend", `<p class="testi__demo">Depoimentos ilustrativos (exemplo)</p>`);
    let ti = 0, timer;
    const go = i => {
      ti = (i + SITE.depoimentos.length) % SITE.depoimentos.length;
      track.style.transform = `translateX(-${ti * 100}%)`;
      $$("button", dots).forEach((b, j) => b.setAttribute("aria-current", j === ti));
    };
    const auto = () => { clearInterval(timer); timer = setInterval(() => go(ti + 1), 6000); };
    dots.addEventListener("click", e => { const b = e.target.closest("button"); if (b) { go($$("button", dots).indexOf(b)); auto(); } });
    go(0); auto();
  }

  /* ---------- FAQ ---------- */
  $(".faq").innerHTML = SITE.faq.map(f => `<details><summary>${esc(f.p)}</summary><p>${esc(f.r)}</p></details>`).join("");
  $(".faq").addEventListener("toggle", e => {
    if (e.target.open) $$(".faq details").forEach(d => { if (d !== e.target) d.open = false; });
  }, true);

  /* ---------- Reflexo do vidro seguindo o cursor ---------- */
  if (matchMedia("(hover: hover)").matches) {
    const vidros = ".hero__badge, .service, .steps li, .testi__card blockquote, .faq details, .booking__form";
    addEventListener("pointermove", e => {
      const el = e.target.closest(vidros);
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
      el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
    }, { passive: true });
  }

  /* ---------- Animação ao rolar ---------- */
  const io = new IntersectionObserver(entries => entries.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
  }), { threshold: 0.12 });
  $$(".reveal").forEach(el => io.observe(el));
})();
