/* Vitrine Lance ton site : gestes communs (accueil + bibliothèque). Aucune dépendance. */
(function(){
'use strict';
const reduit=matchMedia('(prefers-reduced-motion: reduce)');
const V=window.Vitrine={reduit};

/* ---------- En-tête condensé ---------- */
const entete=document.getElementById('entete');
if(entete){const f=()=>entete.classList.toggle('condense',scrollY>24);addEventListener('scroll',f,{passive:true});f()}

/* ---------- Apparition en cascade ---------- */
V.observer=function(racine){
  const els=(racine||document).querySelectorAll('.apparait:not(.vu)');
  if(reduit.matches||!('IntersectionObserver' in window)){els.forEach(e=>e.classList.add('vu'));return}
  const io=new IntersectionObserver(es=>{let i=0;es.forEach(e=>{if(!e.isIntersecting)return;const el=e.target;
    if(el.dataset.cascade!==undefined)el.style.setProperty('--retard',(i++*0.07)+'s');el.classList.add('vu');io.unobserve(el)})},{threshold:.1,rootMargin:'0px 0px -4% 0px'});
  els.forEach(e=>io.observe(e));
};

/* ---------- Annonce aria-live ---------- */
const annonce=document.getElementById('annonce');
V.annoncer=t=>{if(!annonce)return;annonce.textContent='';requestAnimationFrame(()=>annonce.textContent=t)};

/* ---------- Copie : presse-papiers, sinon textarea + execCommand (file://) ---------- */
V.copierTexte=async function(t){
  try{if(navigator.clipboard&&window.isSecureContext!==false){await navigator.clipboard.writeText(t);return true}}catch(e){}
  try{const ta=document.createElement('textarea');ta.value=t;ta.setAttribute('readonly','');ta.style.cssText='position:fixed;top:0;left:0;opacity:0;pointer-events:none';
    document.body.appendChild(ta);ta.select();ta.setSelectionRange(0,t.length);const ok=document.execCommand('copy');ta.remove();return ok}catch(e){return false}
};
V.CONTENU_COPIER=(libelle='Copier le prompt')=>`<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="4" width="12" height="16" rx="2"/><path d="M8 6H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2"/></svg><svg class="ok" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg><span class="txt">${libelle}</span>`;
/* b : bouton ; texte : à copier ; nom : pour l'annonce */
V.copier=async function(b,texte,nom){
  const ok=await V.copierTexte(texte),txt=b.querySelector('.txt'),orig=b.dataset.libelle||(b.dataset.libelle=txt.textContent);
  clearTimeout(b._t);b.classList.remove('copie');void b.offsetWidth;
  if(ok){b.classList.add('copie');txt.textContent='Copié';V.annoncer(`${nom} copié dans le presse-papiers.`)}
  else{txt.textContent='Échec, ouvrez « Voir »';V.annoncer('La copie a échoué. Ouvrez le texte pour le sélectionner.')}
  b._t=setTimeout(()=>{b.classList.remove('copie');txt.textContent=orig},2000);
  return ok;
};

/* ---------- Dialogue « Voir le prompt » ---------- */
const fenetre=document.getElementById('fenetre');
if(fenetre){
  const fCopier=document.getElementById('fenetre-copier');let dernier=null,courant=null;
  fCopier.innerHTML=V.CONTENU_COPIER();
  V.voir=function(declencheur,titre,texte,nomAnnonce){
    dernier=declencheur;courant={texte,nomAnnonce};
    document.getElementById('fenetre-titre').textContent=titre;
    document.getElementById('fenetre-texte').textContent=texte;
    fCopier.setAttribute('aria-label',`Copier le prompt de ${titre}`);
    fenetre.showModal();fCopier.focus();
  };
  fCopier.addEventListener('click',()=>courant&&V.copier(fCopier,courant.texte,courant.nomAnnonce));
  fenetre.querySelector('.fermer').addEventListener('click',()=>fenetre.close());
  fenetre.addEventListener('click',e=>{if(e.target===fenetre)fenetre.close()});
  fenetre.addEventListener('close',()=>{if(dernier)dernier.focus()});
}

/* ---------- Pastille glissante des groupes de filtres ---------- */
V.pastille=function(groupe){
  const p=groupe.querySelector('.pastille');
  const place=()=>{const b=groupe.querySelector('[aria-pressed="true"],[aria-selected="true"]');if(!b||!p)return;
    p.style.width=b.offsetWidth+'px';p.style.height=b.offsetHeight+'px';p.style.transform=`translate(${b.offsetLeft}px,${b.offsetTop}px)`};
  addEventListener('resize',place);(document.fonts?document.fonts.ready:Promise.resolve()).then(place);place();
  return place;
};

/* ---------- Images : 3 essais en cas d'échec ---------- */
V.reessayer=function(img){img.addEventListener('error',()=>{const n=+(img.dataset.essais||0);if(n>=3)return;img.dataset.essais=n+1;
  const base=img.src.split('?')[0];setTimeout(()=>{img.src=base+'?r='+(n+1)+'-'+Date.now()},400*(n+1))})};

/* ---------- Fond de hero : shader WebGL léger (bruit fbm doré), repli CSS ---------- */
/* Aperçu vidéo d'une carte : joue au survol et au focus clavier, s'arrête en sortie.
   Écran tactile : joue la carte la plus visible, une seule vidéo à la fois. Mouvement réduit : rien ne joue. */
const tactile=matchMedia('(hover: none)');
let videoEnCours=null;
const ratios=new Map();
function arreterVideo(v){if(!v)return;v.pause();v._carte.classList.remove('lecture');if(videoEnCours===v)videoEnCours=null;
  clearTimeout(v._t);v._t=setTimeout(()=>{if(v.paused)try{v.currentTime=0}catch(e){}},500)}
function jouerVideo(v){if(reduit.matches)return;if(videoEnCours&&videoEnCours!==v)arreterVideo(videoEnCours);videoEnCours=v;
  if(!v.poster&&v.dataset.poster)v.poster=v.dataset.poster;v._carte.classList.add('lecture');clearTimeout(v._t);
  const p=v.play();if(p&&p.catch)p.catch(()=>{})}
const prochePoster=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){const v=e.target._video;if(v&&!v.poster&&v.dataset.poster)v.poster=v.dataset.poster;prochePoster.unobserve(e.target)}}),{rootMargin:'300px 0px'});
const visibles=new IntersectionObserver(es=>{
  es.forEach(e=>ratios.set(e.target,e.isIntersecting?e.intersectionRatio:0));
  if(!tactile.matches||reduit.matches)return;
  let meilleur=null,max=.6;ratios.forEach((r,c)=>{if(r>=max&&!c.classList.contains('cache')){max=r;meilleur=c}});
  if(meilleur)jouerVideo(meilleur._video);else arreterVideo(videoEnCours);
},{threshold:[0,.3,.6,.8,1]});
V.lecteurVideo=function(carte,video,lien){
  if(!video)return;video._carte=carte;carte._video=video;video.muted=true;
  prochePoster.observe(carte);visibles.observe(carte);
  carte.addEventListener('pointerenter',e=>{if(e.pointerType!=='touch'&&!tactile.matches)jouerVideo(video)});
  carte.addEventListener('pointerleave',e=>{if(e.pointerType!=='touch'&&!tactile.matches)arreterVideo(video)});
  if(lien){lien.addEventListener('focus',()=>{if(lien.matches(':focus-visible'))jouerVideo(video)});
    lien.addEventListener('blur',()=>{if(!carte.matches(':hover'))arreterVideo(video)})}
};
document.addEventListener('visibilitychange',()=>{if(document.hidden)arreterVideo(videoEnCours)});
reduit.addEventListener&&reduit.addEventListener('change',()=>{if(reduit.matches)arreterVideo(videoEnCours)});

V.fond=function(conteneur,bouton){
  if(!conteneur)return;
  const cv=conteneur.querySelector('canvas');
  let gl=null;try{gl=cv.getContext('webgl',{antialias:false,alpha:false,powerPreference:'low-power',preserveDrawingBuffer:false})}catch(e){}
  if(!gl){if(bouton)bouton.hidden=true;return}
  const vs='attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
  const fs=`precision mediump float;uniform vec2 r;uniform float t;
  float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
  float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
  float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*n(p);p=p*2.03+vec2(1.7,9.2);a*=.5;}return v;}
  void main(){vec2 uv=gl_FragCoord.xy/r;vec2 q=uv;q.x*=r.x/r.y;float T=t*.035;
    vec2 w=vec2(fbm(q*1.6+vec2(T,-T*.6)),fbm(q*1.6+vec2(-T*.8,T)+4.1));
    float f=fbm(q*1.25+w*1.7+vec2(T*.5,0.));
    vec3 fond=vec3(.051,.051,.047);
    vec3 or=vec3(.85,.70,.42),cuivre=vec3(.75,.42,.22),ombre=vec3(.20,.14,.08);
    float h1=smoothstep(.95,.0,distance(uv,vec2(.82,.78+.04*sin(t*.11))));
    float h2=smoothstep(1.05,.0,distance(uv,vec2(.12,.42+.05*cos(t*.09))));
    vec3 c=fond;
    float l=smoothstep(.5,.92,f);
    c+=or*l*l*h1*1.25;
    c+=cuivre*l*l*h2*1.1;
    float crete=pow(max(0.,1.-abs(f-.66)*14.),4.);
    c+=mix(cuivre,or,uv.x)*crete*.16*(h1+h2);
    c*=.92+.08*smoothstep(.0,.6,uv.y);
    float g=h(gl_FragCoord.xy+fract(t)*91.)*.035;c+=g-.0175;
    gl_FragColor=vec4(c,1.);}`;
  const sh=(type,src)=>{const s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);return gl.getShaderParameter(s,gl.COMPILE_STATUS)?s:null};
  const v=sh(gl.VERTEX_SHADER,vs),f=sh(gl.FRAGMENT_SHADER,fs);if(!v||!f){if(bouton)bouton.hidden=true;return}
  const pr=gl.createProgram();gl.attachShader(pr,v);gl.attachShader(pr,f);gl.linkProgram(pr);
  if(!gl.getProgramParameter(pr,gl.LINK_STATUS)){if(bouton)bouton.hidden=true;return}
  gl.useProgram(pr);
  const buf=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buf);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),gl.STATIC_DRAW);
  const loc=gl.getAttribLocation(pr,'p');gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);
  const uR=gl.getUniformLocation(pr,'r'),uT=gl.getUniformLocation(pr,'t');
  const ECH=.5; /* demi-résolution : le flou du bruit le permet, et ça coûte 4 fois moins */
  const taille=()=>{const w=Math.max(1,Math.round(cv.clientWidth*ECH)),hh=Math.max(1,Math.round(cv.clientHeight*ECH));if(cv.width!==w||cv.height!==hh){cv.width=w;cv.height=hh;gl.viewport(0,0,w,hh)}gl.uniform2f(uR,cv.width,cv.height)};
  let temps=37,dernier=0,raf=0,visible=true,enPause=reduit.matches,dessine=false;
  const image=()=>{taille();gl.uniform1f(uT,temps);gl.drawArrays(gl.TRIANGLES,0,3);if(!dessine){dessine=true;cv.classList.add('pret')}};
  const boucle=now=>{if(dernier)temps+=Math.min(.05,(now-dernier)/1000);dernier=now;image();raf=requestAnimationFrame(boucle)};
  const maj=()=>{cancelAnimationFrame(raf);raf=0;dernier=0;if(!enPause&&visible&&!document.hidden)raf=requestAnimationFrame(boucle);else image()};
  const majBouton=()=>{if(!bouton)return;bouton.setAttribute('aria-pressed',String(enPause));
    bouton.querySelector('.txt').textContent=enPause?'Animer le fond':'Figer le fond';
    bouton.querySelector('svg').innerHTML=enPause?'<path d="M3 1.5v9l7.5-4.5z"/>':'<path d="M2.5 1.5h2.6v9H2.5zM6.9 1.5h2.6v9H6.9z"/>'};
  if(bouton){bouton.addEventListener('click',()=>{enPause=!enPause;majBouton();maj()});majBouton()}
  if('IntersectionObserver' in window)new IntersectionObserver(es=>{const vis=es[0].isIntersecting;if(vis!==visible){visible=vis;maj()}}).observe(conteneur);
  document.addEventListener('visibilitychange',maj);
  reduit.addEventListener&&reduit.addEventListener('change',()=>{enPause=reduit.matches;majBouton();maj()});
  addEventListener('resize',()=>{if(!raf)image()});
  maj();
};
})();
