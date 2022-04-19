const y=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&c(i)}).observe(document,{childList:!0,subtree:!0});function r(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerpolicy&&(n.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?n.credentials="include":e.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function c(e){if(e.ep)return;e.ep=!0;const n=r(e);fetch(e.href,n)}};y();const g="https://front-br-challenges.web.app/api/v2/green-thumb/";async function _(o={}){try{const t=new URL(g);Object.entries(o).forEach(([c,e])=>{t.searchParams.set(c,e)});const r=await fetch(t,{mode:"cors",headers:{"Content-Type":"application/json"}});if(!r.ok)throw new Error("Something wrong");return r.json()}catch(t){return console.error(t),null}}var w="/assets/toxic.401b708c.svg",b="/assets/pet.e41b16c5.svg",u="/assets/low-sun.47367377.svg",L="/assets/no-sun.1ccf44fe.svg",C="/assets/1-drop.fabc873b.svg",S="/assets/2-drops.880eb43d.svg",$="/assets/3-drops.c9d906c5.svg";function q(o="",t=""){const r={toxicity:{yes:w,no:b},sun:{high:u,low:u,no:L},water:{rarely:C,regularly:S,daily:$}};let c="";return o==="toxicity"?c=t?r.toxicity.yes:r.toxicity.no:c=r[o][t],`<img src="${c}" />`}function x(o){const t=o!=null&&o.staff_favorite?{containerClass:"content__sugestions__content__container-item--favourite",cardClass:"favourite",badge:'<div class="badge">\u2728 Staff favorite</div>'}:{containerClass:"",cardClass:"",badge:""},c=["toxicity","water","sun"].map(n=>q(n,o[n])).join("");return`
    <div class="content__sugestions__content__container-item column ${t.containerClass}">
      <div class="card ${t.cardClass}" style="flex-grow: 1">
        ${t.badge}
        <img
          src="${o.url}"
          alt="${o.name}"
          class="image"
        />
        <div class="footer container">
          <h3 class="title column">${o.name}</h3>
          <div class="details column">
            <span class="price">${o.price}</span>
            <div class="icons">
              ${c}
            </div>
          </div>
        </div>
      </div>
    </div>
  `}function E(o){const t=o.getAttribute("href"),r=document.querySelector(t).offsetTop;window.scroll({top:r,behavior:"smooth"})}function I(){const o=document.querySelector("[name=sun]"),t=document.querySelector("[name=water]"),r=document.querySelector("[name=pets]"),c=document.querySelector("a.button"),e=document.querySelector(".content__nocontent"),n=document.querySelector(".content__sugestions"),i=document.querySelector(".content__sugestions__content__container"),d={},f=[o,t,r];async function h(s={}){return Object.values(s).every(l=>!!l)?_(s):null}function p(s=[]){s.length?(!e.classList.contains("hidden")&&e.classList.toggle("hidden"),n.classList.contains("hidden")&&n.classList.toggle("hidden")):(e.classList.contains("hidden")&&e.classList.toggle("hidden"),!n.classList.contains("hidden")&&n.classList.toggle("hidden")),i.innerHTML=s.sort(a=>a!=null&&a.staff_favorite?-1:1).map(a=>x(a)).join("")}function m(s={}){return async({target:a})=>{s[a.name]=a.options[a.selectedIndex].value;const l=await h(s);p(l!=null?l:[])}}function v(s){s.preventDefault(),E(s.target)}c.addEventListener("click",v),f.forEach(s=>{d[s.name]=null,s.addEventListener("change",m(d))})}window.addEventListener("DOMContentLoaded",I);
