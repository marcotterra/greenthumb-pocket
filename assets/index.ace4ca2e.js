const y=function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&c(i)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function c(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}};y();async function g(n={}){try{const{VITE_API_URL:o}={BASE_URL:"./",MODE:"production",DEV:!1,PROD:!0},r=new URL(o);Object.entries(n).forEach(([e,t])=>{r.searchParams.set(e,t)});const c=await fetch(r,{mode:"cors",headers:{"Content-Type":"application/json"}});if(!c.ok)throw new Error("Something wrong");return c.json()}catch(o){return console.error(o),null}}var _="./assets/toxic.401b708c.svg",w="./assets/pet.e41b16c5.svg",u="./assets/low-sun.47367377.svg",L="./assets/no-sun.1ccf44fe.svg",b="./assets/1-drop.fabc873b.svg",S="./assets/2-drops.880eb43d.svg",C="./assets/3-drops.c9d906c5.svg";function E(n="",o=""){const r={toxicity:{yes:_,no:w},sun:{high:u,low:u,no:L},water:{rarely:b,regularly:S,daily:C}};let c="";return n==="toxicity"?c=o?r.toxicity.yes:r.toxicity.no:c=r[n][o],`<img src="${c}" />`}function O(n){const o=n!=null&&n.staff_favorite?{containerClass:"content__sugestions__content__container-item--favourite",cardClass:"favourite",badge:'<div class="badge">\u2728 Staff favorite</div>'}:{containerClass:"",cardClass:"",badge:""},c=["toxicity","water","sun"].map(t=>E(t,n[t])).join("");return`
    <div class="content__sugestions__content__container-item column ${o.containerClass}">
      <div class="card ${o.cardClass}" style="flex-grow: 1">
        ${o.badge}
        <img
          src="${n.url}"
          alt="${n.name}"
          class="image"
        />
        <div class="footer container">
          <h3 class="title column">${n.name}</h3>
          <div class="details column">
            <span class="price">${n.price}</span>
            <div class="icons">
              ${c}
            </div>
          </div>
        </div>
      </div>
    </div>
  `}function $(n){const o=n.getAttribute("href"),r=document.querySelector(o).offsetTop;window.scroll({top:r,behavior:"smooth"})}function q(){const n=document.querySelector("[name=sun]"),o=document.querySelector("[name=water]"),r=document.querySelector("[name=pets]"),c=document.querySelector("a.button"),e=document.querySelector(".content__nocontent"),t=document.querySelector(".content__sugestions"),i=document.querySelector(".content__sugestions__content__container"),d={},f=[n,o,r];async function h(s={}){return Object.values(s).every(l=>!!l)?g(s):null}function p(s=[]){s.length?(!e.classList.contains("hidden")&&e.classList.toggle("hidden"),t.classList.contains("hidden")&&t.classList.toggle("hidden")):(e.classList.contains("hidden")&&e.classList.toggle("hidden"),!t.classList.contains("hidden")&&t.classList.toggle("hidden")),i.innerHTML=s.sort(a=>a!=null&&a.staff_favorite?-1:1).map(a=>O(a)).join("")}function m(s={}){return async({target:a})=>{s[a.name]=a.options[a.selectedIndex].value;const l=await h(s);p(l!=null?l:[])}}function v(s){s.preventDefault(),$(s.target)}c.addEventListener("click",v),f.forEach(s=>{d[s.name]=null,s.addEventListener("change",m(d))})}window.addEventListener("DOMContentLoaded",q);
