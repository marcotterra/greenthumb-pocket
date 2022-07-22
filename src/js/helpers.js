import toxic from "../images/icons/toxic.svg";
import pet from "../images/icons/pet.svg";
import lowSun from "../images/icons/low-sun.svg";
import noSun from "../images/icons/no-sun.svg";
import oneDrop from "../images/icons/1-drop.svg";
import twoDrops from "../images/icons/2-drops.svg";
import threeDrops from "../images/icons/3-drops.svg";

function generateIconElement(key = "", value = "") {
  const assets = {
    toxicity: {
      yes: toxic,
      no: pet,
    },
    sun: {
      high: lowSun,
      low: lowSun,
      no: noSun,
    },
    water: {
      rarely: oneDrop,
      regularly: twoDrops,
      daily: threeDrops,
    },
  };

  let filename = "";

  if (key === "toxicity") {
    filename = value ? assets.toxicity.yes : assets.toxicity.no;
  } else {
    filename = assets[key][value];
  }

  return `<img src="${filename}" />`;
}

function generateSuggestionCard(suggestion) {
  const classes = suggestion?.staff_favorite
    ? {
        containerClass:
          "content__sugestions__content__container-item--favourite",
        cardClass: "favourite",
        badge: '<div class="badge">✨ Staff favorite</div>',
      }
    : {
        containerClass: "",
        cardClass: "",
        badge: "",
      };

  const keys = ["toxicity", "water", "sun"];

  const icons = keys //
    .map((key) => generateIconElement(key, suggestion[key]))
    .join("");

  const element = /* jsx */ `
    <div class="content__sugestions__content__container-item column ${classes.containerClass}">
      <div class="card ${classes.cardClass}" style="flex-grow: 1">
        ${classes.badge}
        <img
          src="${suggestion.url}"
          alt="${suggestion.name}"
          class="image"
        />
        <div class="footer container">
          <h3 class="title column">${suggestion.name}</h3>
          <div class="details column">
            <span class="price">${suggestion.price}</span>
            <div class="icons">
              ${icons}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  return element;
}

/**
 * @param {Element} element DOM Element
 */
function smoothScroll(element) {
  const href = element.getAttribute("href");
  const offsetTop = document.querySelector(href).offsetTop;

  window.scroll({
    top: offsetTop,
    behavior: "smooth",
  });
}

export { generateSuggestionCard, smoothScroll };
