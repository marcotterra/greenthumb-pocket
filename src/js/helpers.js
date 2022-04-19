function generateIconElement(key = "", value = "") {
  const assets = {
    toxicity: {
      yes: "toxic.svg",
      no: "pet.svg",
    },
    sun: {
      high: "low-sun.svg",
      low: "low-sun.svg",
      no: "no-sun.svg",
    },
    water: {
      rarely: "1-drop.svg",
      regularly: "2-drops.svg",
      daily: "3-drops.svg",
    },
  };

  let filename = "";

  if (key === "toxicity") {
    filename = value ? assets.toxicity.yes : assets.toxicity.no;
  } else {
    filename = assets[key][value];
  }

  return `<img src="${"./src/images/icons/" + filename}" />`;
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

  const element = `
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
