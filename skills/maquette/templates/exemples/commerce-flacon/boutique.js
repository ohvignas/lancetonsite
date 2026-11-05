/*
 * Ciste — la boutique : tout ce qui se lit dans window.CISTE (donnees.js) est écrit ici, une seule fois.
 *   textes des parfums dans la scène, bande des matières (carrousel fondu), fiches du catalogue, journal,
 *   séances de l'atelier, panier (vignette qui vole, compteur qui rebondit, annonce aria-live), formulaires, menu.
 * Chargé avant gestes.js : les cartes créées ici reçoivent les apparitions du kit.
 * Rien n'est vendu ni envoyé (exemple fictif).
 */
(() => {
  const D = window.CISTE;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduit = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const parfum = (id) => D.parfums.find((p) => p.id === id);
  const euros = (n) => new Intl.NumberFormat("fr-FR").format(n) + " €";
  const notesCourtes = (p) => `${p.notes.coeur.split(",")[0]}, ${p.notes.fond.split(",")[0]}`;

  /* ---------------------------------------------------------------- textes des parfums (scène, notes) */
  $$("[data-parfum]").forEach((bloc) => {
    const p = parfum(bloc.dataset.parfum);
    if (!p) return;
    const ecrire = (sel, txt) => $$(sel, bloc).forEach((el) => (el.textContent = txt));
    ecrire("[data-parfum-nom]", p.nom);
    ecrire("[data-parfum-famille]", p.famille);
    ecrire("[data-parfum-accord]", p.accord);
    ecrire("[data-parfum-notes]", notesCourtes(p));
    ecrire("[data-parfum-prix]", bloc.matches(".notes-fin") ? euros(p.prix[50]) : `50 ml, ${euros(p.prix[50])}`);
    $$("[data-parfum-alt]", bloc).forEach((img) => (img.alt = `Flacon Ciste ${p.nom}, liquide ${p.famille.toLowerCase()}`));
    $$("[data-note]", bloc).forEach((el) => (el.textContent = p.notes[el.dataset.note]));
  });

  /* ---------------------------------------------------------------- bande des matières (élément « carrousel fondu ») */
  const bande = $("[data-matieres]");
  if (bande) {
    bande.innerHTML = D.matieres.map((m) => `
      <li><figure style="background:${m.fond}"><img src="images/fiole-${m.id}.webp" width="480" height="600" alt="" loading="lazy">
      <figcaption>${m.nom} · ${m.lieu}</figcaption></figure></li>`).join("");
    const racine = bande.closest("[data-carrousel]");
    [...bande.children].forEach((li) => { const c = li.cloneNode(true); c.setAttribute("aria-hidden", "true"); bande.append(c); });
    const btn = $("[data-carrousel-pause]");
    btn?.addEventListener("click", () => {
      const p = racine.classList.toggle("en-pause");
      btn.setAttribute("aria-pressed", String(p));
      btn.lastElementChild.textContent = p ? "Relancer le défilement" : "Mettre en pause le défilement";
      btn.firstElementChild.textContent = p ? "▶" : "❚❚";
    });
    new IntersectionObserver(([e]) => racine.classList.toggle("hors-champ", !e.isIntersecting)).observe(racine);
  }

  /* ---------------------------------------------------------------- catalogue */
  const cat = $("[data-catalogue]");
  if (cat) {
    cat.setAttribute("data-reveal-group", "");
    cat.innerHTML = D.parfums.map((p) => `
      <li class="fiche" data-reveal-item style="--liquide:${p.liquide}">
        <figure class="fiche-img"><img src="images/flacon-${p.id}-400.webp" srcset="images/flacon-${p.id}-400.webp 400w, images/flacon-${p.id}.webp 800w" sizes="(min-width: 1100px) 20vw, (min-width: 640px) 40vw, 80vw" width="400" height="500" alt="Flacon Ciste ${p.nom}" loading="lazy" data-vignette></figure>
        <p class="famille">${p.famille}</p>
        <h3 class="fiche-nom">${p.nom}</h3>
        <p class="fiche-accord">${p.accord}</p>
        <fieldset class="contenance">
          <legend class="sr-only">Contenance de ${p.nom}</legend>
          <label><input type="radio" name="c-${p.id}" value="50" checked><span>50 ml</span></label>
          <label><input type="radio" name="c-${p.id}" value="100"><span>100 ml</span></label>
        </fieldset>
        <p class="fiche-prix" data-prix="${p.id}">${euros(p.prix[50])}</p>
        <button type="button" class="bouton bouton-plein" data-ajouter="${p.id}" data-contenance="50" aria-label="Ajouter ${p.nom} au panier">Ajouter</button>
      </li>`).join("");
    $$(".fiche", cat).forEach((f) => {
      const btn = $("[data-ajouter]", f), id = btn.dataset.ajouter;
      $$("input", f).forEach((r) => r.addEventListener("change", () => {
        btn.dataset.contenance = r.value;
        $("[data-prix]", f).textContent = euros(parfum(id).prix[r.value]);
      }));
    });
  }

  /* ---------------------------------------------------------------- journal */
  const art = $("[data-articles]");
  if (art) {
    art.setAttribute("data-reveal-group", "");
    const date = (iso) => new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" }).format(new Date(iso));
    art.innerHTML = D.articles.map((a) => `
      <li class="article" data-reveal-item>
        <!-- pas de lien tant que les articles n'existent pas : la carte annonce, elle ne mène nulle part -->
        <div class="article-lien">
          <figure><img src="${a.image}" alt="${a.alt}" loading="lazy" width="900" height="675"></figure>
          <p class="article-meta"><time datetime="${a.date}">${date(a.date)}</time> · ${a.sujet} · ${a.lecture} min de lecture</p>
          <h3>${a.titre}</h3>
        </div>
      </li>`).join("");
  }

  /* ---------------------------------------------------------------- séances de l'atelier */
  const sea = $("[data-seances]");
  if (sea) sea.innerHTML = D.seances.map((s) => `
    <label class="seance${s.reste ? "" : " complet"}"><input type="radio" name="seance" value="${s.id}" ${s.reste ? "" : "disabled"}>
      <span class="seance-jour">${s.jour}, <span class="nowrap">${s.heure.replace(/ /g, "\u00a0")}</span></span>
      <span class="seance-reste">${s.reste ? `${s.reste} place${s.reste > 1 ? "s" : ""}` : "complet"}</span></label>`).join("");

  // la liste des places suit la séance choisie : jamais plus que ce qu'il reste (6 au plus : la taille de l'atelier)
  const choixPlaces = $("#f-places"), aidePlaces = $("#aide-places");
  const majPlaces = () => {
    const coche = sea?.querySelector("input[name=seance]:checked");
    const s = coche && D.seances.find((x) => x.id === coche.value);
    const max = Math.min(D.atelier.places, s ? s.reste : D.atelier.places), avant = +choixPlaces.value || 1;
    choixPlaces.innerHTML = Array.from({ length: max }, (_, i) => `<option>${i + 1}</option>`).join("");
    choixPlaces.value = String(Math.min(avant, max));
    const n = +choixPlaces.value;
    aidePlaces.textContent = (s ? `Il reste ${s.reste}\u00a0place${s.reste > 1 ? "s" : ""} à cette séance. ` : "") + `${euros(n * D.atelier.prix)} pour ${n}\u00a0place${n > 1 ? "s" : ""}, à régler sur place.`
      + (s && s.reste < D.atelier.places ? " Un groupe plus grand\u00a0? Écrivez-nous, on ouvre une séance pour vous." : "");
  };
  sea?.addEventListener("change", majPlaces);
  choixPlaces?.addEventListener("change", majPlaces);

  /* ---------------------------------------------------------------- panier */
  const panier = [];
  const dlg = $("[data-panier]"), liste = $("[data-panier-liste]"), compte = $("[data-panier-compte]");
  const annonce = $("[data-annonce]"), toast = $("[data-toast]");
  const article = (id, contenance) => {
    if (id === "coffret") return { cle: "coffret", nom: D.coffret.nom, detail: D.coffret.detail, prix: D.coffret.prix, img: "images/coffret.webp" };
    const p = parfum(id);
    return { cle: `${id}-${contenance}`, nom: p.nom, detail: `Eau de parfum, ${contenance} ml`, prix: p.prix[contenance], img: `images/flacon-${id}-400.webp` };
  };
  const nombre = () => panier.reduce((s, a) => s + a.qte, 0);
  const afficher = () => {
    liste.innerHTML = panier.map((a, i) => `
      <li class="panier-article"><img src="${a.img}" alt="" width="64" height="80">
        <div><p class="panier-nom">${a.nom}</p><p class="panier-detail">${a.detail} · ${euros(a.prix)}</p></div>
        <div class="qte"><button type="button" data-qte="${i}" data-pas="-1" aria-label="Retirer un ${a.nom}">−</button><span aria-label="Quantité">${a.qte}</span><button type="button" data-qte="${i}" data-pas="1" aria-label="Ajouter un ${a.nom}">+</button></div>
      </li>`).join("");
    $("[data-panier-vide]").hidden = panier.length > 0;
    const sous = panier.reduce((s, a) => s + a.prix * a.qte, 0);
    $("[data-panier-total]").textContent = euros(sous);
    // livraison : offerte dès 80 € ; en dessous, le montant (à fournir par le client) est calculé à l'étape suivante
    $("[data-panier-livraison]").textContent = sous >= 80 ? "offerte" : sous > 0 ? `calculée à l'étape suivante (offerte dès 80 €, encore ${euros(80 - sous)})` : "offerte dès 80 €";
    // coffret + flacon dans la même commande : on dit tout de suite que la déduction vaut pour le flacon suivant
    $("[data-panier-coffret]").hidden = !(panier.some((a) => a.cle === "coffret") && panier.some((a) => a.cle !== "coffret"));
    compte.textContent = nombre();
    compte.nextElementSibling.textContent = nombre() > 1 ? " articles" : " article";
  };
  liste.addEventListener("click", (e) => {
    const b = e.target.closest("[data-qte]");
    if (!b) return;
    const a = panier[+b.dataset.qte];
    a.qte += +b.dataset.pas;
    if (a.qte <= 0) panier.splice(+b.dataset.qte, 1);
    afficher();
    annonce.textContent = `Panier : ${nombre()} article${nombre() > 1 ? "s" : ""}.`;
  });

  // la vignette vole du produit jusqu'au panier, puis le compteur rebondit
  const voler = (depuis, src) => {
    const cible = $("[data-panier-ouvrir]");
    if (reduit || !depuis || !cible || !window.gsap) return Promise.resolve();
    // l'en-tête (caché en descendant) revient pour qu'on voie le panier recevoir la vignette
    const ent = $(".entete"), cache = ent?.classList.contains("is-cache");
    ent?.classList.remove("is-cache");
    const a = depuis.getBoundingClientRect(), r = cible.getBoundingClientRect();
    const b = { left: r.left, width: r.width, height: r.height, top: r.top + (cache ? ent.offsetHeight : 0) };
    const v = document.createElement("img");
    v.src = src; v.alt = ""; v.className = "vignette-vol";
    const t = Math.min(a.width, a.height, 160);
    Object.assign(v.style, { width: t + "px", height: t * 1.25 + "px", left: a.left + a.width / 2 - t / 2 + "px", top: a.top + a.height / 2 - t * 0.625 + "px" });
    document.body.append(v);
    const dx = b.left + b.width / 2 - (a.left + a.width / 2), dy = b.top + b.height / 2 - (a.top + a.height / 2);
    return new Promise((ok) => {
      gsap.timeline({ onComplete: () => { v.remove(); ok(); } })
        .to(v, { x: dx, duration: 0.75, ease: "power1.inOut" }, 0)
        .to(v, { y: dy, duration: 0.75, ease: "back.in(1.4)" }, 0)
        .to(v, { scale: 0.18, opacity: 0.6, duration: 0.75, ease: "power2.in" }, 0);
    });
  };
  const rebondir = () => {
    if (reduit || !window.gsap) return;
    gsap.fromTo(compte, { scale: 1.6 }, { scale: 1, duration: 0.6, ease: "elastic.out(1, 0.4)" });
  };
  let minuteur;
  const montrerToast = (txt) => {
    toast.textContent = txt;
    toast.classList.add("visible");
    clearTimeout(minuteur);
    minuteur = setTimeout(() => toast.classList.remove("visible"), 2600);
  };
  document.addEventListener("click", async (e) => {
    const b = e.target.closest("[data-ajouter]");
    if (!b) return;
    const a = article(b.dataset.ajouter, b.dataset.contenance || "50");
    const ligne = panier.find((x) => x.cle === a.cle);
    ligne ? ligne.qte++ : panier.push({ ...a, qte: 1 });
    const source = b.closest(".fiche")?.querySelector("[data-vignette]") || b;
    voler(source, a.img).then(rebondir);
    setTimeout(afficher, reduit ? 0 : 700);
    const msg = `${a.nom}${a.cle === "coffret" ? "" : `, ${a.detail.split(", ")[1]}`} ajouté au panier. ${nombre()} article${nombre() > 1 ? "s" : ""}.`;
    annonce.textContent = msg;
    montrerToast(`${a.nom} ajouté au panier`);
  });
  $("[data-panier-ouvrir]").addEventListener("click", () => { afficher(); dlg.showModal(); window.gestes?.lenis?.stop(); });
  $("[data-panier-fermer]").addEventListener("click", () => dlg.close());
  dlg.addEventListener("close", () => window.gestes?.lenis?.start());
  dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); });
  $("[data-commander]").addEventListener("click", () => { $("[data-commande-note]").hidden = false; });
  afficher();

  /* ---------------------------------------------------------------- réservation de l'atelier (rien n'est envoyé) */
  const form = $("[data-reservation]");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    if (form.dataset.envoye) return; // une réservation par visite : le formulaire est déjà remplacé par le merci
    const seance = form.querySelector("input[name=seance]:checked");
    const prenom = $("#f-prenom"), mail = $("#f-mail");
    const regles = [
      [prenom, "err-prenom", prenom.value.trim().length > 0],
      [mail, "err-mail", /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail.value.trim())],
    ];
    let premier = null;
    $("#err-seance").hidden = !!seance;
    if (!seance) premier = form.querySelector("input[name=seance]:not(:disabled)");
    regles.forEach(([c, err, ok]) => {
      c.setAttribute("aria-invalid", String(!ok));
      const m = document.getElementById(err); m.hidden = ok; m.setAttribute("role", ok ? "" : "alert");
      if (!ok && !premier) premier = c;
    });
    // garde-fou : on ne réserve jamais plus de places qu'il n'en reste
    const sc = seance && D.seances.find((x) => x.id === seance.value), np = +$("#f-places").value;
    const tropDePlaces = sc && np > sc.reste, ep = $("#err-places");
    ep.hidden = !tropDePlaces; ep.setAttribute("role", tropDePlaces ? "alert" : "");
    $("#f-places").setAttribute("aria-invalid", String(!!tropDePlaces));
    if (tropDePlaces) { ep.textContent = `Il reste ${sc.reste} place${sc.reste > 1 ? "s" : ""} à cette séance.`; if (!premier) premier = $("#f-places"); }
    if (premier) { premier.focus(); return; }
    const s = sc, places = np;
    $("[data-merci-titre]").textContent = `C'est noté, ${prenom.value.trim().split(/\s+/)[0]}.`;
    $("[data-merci-texte]").textContent = `${s.jour}, ${s.heure}\u00a0: ${places} place${places > 1 ? "s" : ""}, ${euros(places * D.atelier.prix)} à régler sur place. Exemple fictif\u00a0: rien n'a été envoyé.`;
    form.dataset.envoye = "1";
    $("[data-form-champs]").hidden = true;
    const merci = $("[data-form-merci]"); merci.hidden = false; merci.focus();
  });

  /* ---------------------------------------------------------------- lettre (pied de page) */
  const lettre = $("[data-lettre]");
  lettre?.addEventListener("submit", (e) => {
    e.preventDefault();
    const c = lettre.querySelector("input"), ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.value.trim());
    c.setAttribute("aria-invalid", String(!ok));
    const m = $("#err-lettre"); m.hidden = ok; m.setAttribute("role", ok ? "" : "alert");
    if (!ok) { c.focus(); return; }
    $(".lettre-ligne", lettre).hidden = true;
    $(".lettre-merci", lettre).hidden = false;
  });

  /* ---------------------------------------------------------------- menu téléphone */
  const burger = $("[data-burger]"), menu = $("[data-menu]");
  const basculer = (ouvrir, rendre) => {
    burger.setAttribute("aria-expanded", String(ouvrir));
    burger.setAttribute("aria-label", ouvrir ? "Fermer le menu" : "Ouvrir le menu");
    menu.hidden = !ouvrir;
    document.documentElement.classList.toggle("menu-ouvert", ouvrir);
    const l = window.gestes?.lenis; if (l) ouvrir ? l.stop() : l.start();
    if (ouvrir) menu.querySelector("a").focus(); else if (rendre) burger.focus();
  };
  burger.addEventListener("click", () => basculer(burger.getAttribute("aria-expanded") !== "true"));
  menu.addEventListener("click", (e) => { if (e.target.closest("a")) basculer(false); });
  addEventListener("keydown", (e) => { if (e.key === "Escape" && !menu.hidden) basculer(false, true); });
  matchMedia("(min-width: 1024px)").addEventListener("change", (m) => { if (m.matches && !menu.hidden) basculer(false); });

  /* ---------------------------------------------------------------- reflet du verre liquide (élément « verre liquide ») */
  $$(".verre").forEach((el) => el.addEventListener("pointermove", (e) => {
    if (e.pointerType !== "mouse") return;
    const b = el.getBoundingClientRect();
    el.style.setProperty("--rx", `${e.clientX - b.left}px`);
    el.style.setProperty("--ry", `${e.clientY - b.top}px`);
  }));

  // les images du catalogue et du journal changent la hauteur de la page : recalculer les déclencheurs
  addEventListener("load", () => window.ScrollTrigger?.refresh());
})();
