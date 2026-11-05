/*
 * Pétille — logique propre à la page : panier local, kit et abonnement, menu, lettre.
 * Prix uniques (les mêmes que dans le HTML) : recharge 2,40 €, 2,04 € en abonnement, kit 19 €.
 * Livraison offerte dès 25 €, sinon 3,90 €. Rien n'est envoyé : paiement de démonstration.
 */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const PRIX = { unite: 2.4, abo: 2.04, kit: 19 };
  const SEUIL = 25, PORT = 3.9, CLE = "petille-panier";
  const euros = (n) => n.toLocaleString("fr-FR", { style: "currency", currency: "EUR" }).replace(/ | /g, " ");
  const echapper = (t) => String(t).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  let lignes = [];
  try { lignes = JSON.parse(localStorage.getItem(CLE) || "[]"); if (!Array.isArray(lignes)) lignes = []; } catch { lignes = []; }
  const sauver = () => { try { localStorage.setItem(CLE, JSON.stringify(lignes)); } catch { /* navigation privée */ } };

  const tiroir = $("#panier"), liste = $("[data-panier-liste]"), compte = $("[data-panier-compte]");
  const bouton = $("[data-ouvrir-panier]");

  // Vignette : le rendu fixe du flacon 3D de la recharge (ou du kit) dès qu'il existe, sinon la photo de repli
  const vignette = (l) => (window.petilleImages || {})[l.id.split("|")[0]] || l.img;
  document.addEventListener("petille:image", () => rendre());
  // Prélèvements à venir : ce que l'abonnement coûtera ensuite, et à partir de quand
  const dateDans = (mois) => { const d = new Date(); d.setMonth(d.getMonth() + mois); return d.toLocaleDateString("fr-FR", { day: "numeric", month: "long" }); };
  const recurrent = () => {
    const parMois = { 1: 0, 2: 0 };
    lignes.forEach((l) => {
      const [cle, mode] = l.id.split("|");
      if (cle === "kit" && mode !== "0") parMois[+mode] += l.qte * 4 * PRIX.abo;
      else if (mode === "abo") parMois[2] += l.qte * PRIX.abo;
    });
    const morceaux = [];
    if (parMois[1]) morceaux.push(`${euros(parMois[1])} tous les mois à partir du ${dateDans(1)}`);
    if (parMois[2]) morceaux.push(`${euros(parMois[2])} tous les 2 mois à partir du ${dateDans(2)}`);
    if (!morceaux.length) return "";
    return `Ensuite : ${morceaux.join(", et ")}. Sans engagement, arrêt en un clic.`;
  };

  const rendre = () => {
    const n = lignes.reduce((s, l) => s + l.qte, 0);
    const st = lignes.reduce((s, l) => s + l.qte * l.prix, 0);
    const port = st === 0 || st >= SEUIL ? 0 : PORT;
    compte.textContent = String(n);
    compte.classList.toggle("vide", n === 0);
    bouton.setAttribute("aria-label", `Panier, ${n} article${n > 1 ? "s" : ""}`);
    $("[data-panier-vide]").hidden = n > 0;
    $("[data-panier-totaux]").hidden = n === 0;
    liste.innerHTML = lignes.map((l, i) => `
      <li class="ligne-panier">
        <img src="${echapper(vignette(l))}" alt="" width="64" height="80">
        <div>
          <p class="font-semibold">${echapper(l.nom)}</p>
          <p class="text-[0.88rem] text-doux">${echapper(l.detail)} · ${euros(l.prix)}</p>
          <div class="mt-2 flex items-center justify-between gap-3">
            <span class="qte">
              <button type="button" data-moins="${i}" aria-label="Retirer un ${echapper(l.nom)}">−</button>
              <output aria-label="Quantité">${l.qte}</output>
              <button type="button" data-plus="${i}" aria-label="Ajouter un ${echapper(l.nom)}">+</button>
            </span>
            <span class="font-semibold">${euros(l.qte * l.prix)}</span>
          </div>
        </div>
      </li>`).join("");
    $("[data-panier-sous-total]").textContent = euros(st);
    $("[data-panier-port]").textContent = port ? euros(port) : "offerte";
    $("[data-panier-total]").textContent = euros(st + port);
    $("[data-panier-ensuite]").textContent = recurrent();
    $("[data-panier-seuil]").textContent = st === 0 ? "Livraison offerte dès 25 €."
      : st < SEUIL ? `Plus que ${euros(SEUIL - st)} pour la livraison offerte.` : "Livraison offerte.";
    // Relance : le nombre de recharges en abonnement qui couvre ce qui manque pour atteindre 25 €
    const relance = $("[data-relance-port]");
    const nb = Math.ceil((SEUIL - st) / PRIX.abo - 1e-9);
    // au-delà de 4 recharges, la relance coûterait bien plus que le port : on ne la propose pas
    relance.hidden = !(st > 0 && st < SEUIL && nb <= 4);
    if (!relance.hidden) {
      relance.dataset.nb = String(nb);
      relance.textContent = `Ajouter ${nb} recharge${nb > 1 ? "s" : ""} (${euros(nb * PRIX.abo)}),\u00a0port\u00a0offert`;
    }
    $("[data-panier-jauge]").style.transform = `scaleX(${Math.min(st / SEUIL, 1)})`;
  };

  const annonce = $("[data-annonce]");
  let minuterie;
  const annoncer = (t) => {
    annonce.textContent = t; annonce.classList.add("is-visible");
    clearTimeout(minuterie); minuterie = setTimeout(() => annonce.classList.remove("is-visible"), 3200);
  };
  const ajouter = (ligne, qte = 1) => {
    const l = lignes.find((x) => x.id === ligne.id);
    if (l) l.qte += qte; else lignes.push({ ...ligne, qte });
    sauver(); rendre();
    $("[data-panier-retour]").textContent = "";
    $("[data-header]")?.classList.remove("is-cache"); // l'en-tête revient : on voit le compteur grossir
    annoncer(`${qte > 1 ? `${qte} × ` : ""}${ligne.nom} (${ligne.detail}) : ajouté au panier.`);
    if (window.gsap && !matchMedia("(prefers-reduced-motion: reduce)").matches) gsap.fromTo(compte, { scale: 1.5 }, { scale: 1, duration: 0.45, ease: "back.out(3)" });
  };

  // Fiches : une fois ou abonnement, même prix que partout ailleurs
  $$(".fiche").forEach((f) => $("[data-ajouter]", f).addEventListener("click", () => {
    const mode = $("input[type=radio]:checked", f).value;
    ajouter({
      id: `${f.dataset.produit}|${mode}`, nom: f.dataset.nom, img: f.dataset.img, prix: PRIX[mode],
      detail: mode === "abo" ? "abonnement, tous les 2 mois" : "recharge à l'unité",
    });
  }));

  // Kit + rythme d'abonnement (le kit se paie aujourd'hui ; les recharges suivent)
  const rythme = () => $("input[name=rythme]:checked");
  const majAbo = () => {
    const r = rythme(); const v = r.value;
    const odo = $("[data-odometer]");
    $("[data-abo-texte]").textContent = v === "0" ? "Sans abonnement : vous rechargez à l'unité, 2,40 € la pastille." : "4 recharges à 2,04 €, soit";
    odo.closest("b").hidden = v === "0";
    $("[data-abo-rythme]").textContent = v === "0" ? "" : v === "1" ? "tous les mois" : "tous les 2 mois";
    // Texte lu par les lecteurs d'écran : une phrase entière, jamais les rouleaux de chiffres
    $("[data-abo-lu]").textContent = v === "0" ? "Sans abonnement : vous rechargez à l'unité, 2,40 € la pastille."
      : `4 recharges à 2,04 €, soit 8,16 € ${v === "1" ? "tous les mois" : "tous les 2 mois"}.`;
  };
  $$("input[name=rythme]").forEach((i) => i.addEventListener("change", majAbo));
  $$("[data-ajouter-kit]").forEach((b) => b.addEventListener("click", () => {
    const v = rythme()?.value ?? "2";
    ajouter({
      id: `kit|${v}`, nom: "Kit de départ", img: "images/kit-560.webp", prix: PRIX.kit,
      detail: v === "0" ? "sans abonnement" : v === "1" ? "puis 4 recharges (8,16 €) tous les mois" : "puis 4 recharges (8,16 €) tous les 2 mois",
    });
  }));

  liste.addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b) return;
    const i = +(b.dataset.plus ?? b.dataset.moins);
    if (!lignes[i]) return;
    lignes[i].qte += b.dataset.plus !== undefined ? 1 : -1;
    const reste = lignes[i].qte > 0;
    lignes = lignes.filter((l) => l.qte > 0);
    sauver(); rendre();
    (reste ? $(`[data-${b.dataset.plus !== undefined ? "plus" : "moins"}="${i}"]`, liste) : $("#t-panier"))?.focus();
  });
  // Sous 25 € : juste assez de recharges pour atteindre le seuil, et la livraison devient offerte
  $("[data-relance-port]").addEventListener("click", (e) => ajouter({
    id: "multi|abo", nom: "Multi-surfaces", img: "images/flacon-agrume-560.webp", prix: PRIX.abo,
    detail: "abonnement, tous les 2 mois",
  }, Math.max(1, +e.currentTarget.dataset.nb || 1)));
  $("[data-commander]").addEventListener("click", () => {
    $("[data-panier-retour]").textContent = "Démonstration : ici, le paiement sécurisé s'ouvrirait.";
  });

  // Dialogues : panier et menu
  const ouvrir = (d) => { d.showModal(); window.lenis?.stop(); };
  $$("dialog").forEach((d) => {
    d.addEventListener("close", () => window.lenis?.start());
    d.addEventListener("click", (e) => { if (e.target === d) d.close(); });
    $$("[data-fermer]", d).forEach((b) => b.addEventListener("click", () => d.close()));
  });
  bouton.addEventListener("click", () => { ouvrir(tiroir); $("#t-panier").focus(); });
  $("[data-ouvrir-menu]").addEventListener("click", () => ouvrir($("#menu")));
  $$("[data-lien-menu]").forEach((a) => a.addEventListener("click", () => $("#menu").close()));

  // Lettre (démonstration : rien n'est envoyé)
  const lettre = $("[data-form-lettre]");
  lettre.addEventListener("submit", (e) => {
    e.preventDefault();
    const champ = $("input[type=email]", lettre);
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(champ.value.trim());
    champ.setAttribute("aria-invalid", String(!ok));
    $("[data-lettre-retour]").textContent = ok ? "Merci, la prochaine lettre part début du mois." : "Il manque quelque chose à l'adresse, par exemple : vous@exemple.fr";
    if (!ok) champ.focus();
  });

  rendre();
})();
