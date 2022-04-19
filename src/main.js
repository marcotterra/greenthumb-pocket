import fetcher from "./fetcher";

function createCard(suggestion) {
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

  const generateTag = (key = "", value = "") => {
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
  };

  const keys = ["toxicity", "water", "sun"];

  const icons = keys //
    .map((key) => generateTag(key, suggestion[key]))
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

function main() {
  const sunInput = document.querySelector("[name=sun]");
  const waterInput = document.querySelector("[name=water]");
  const petInput = document.querySelector("[name=pets]");
  const suggestionContainer = document.querySelector(".content__sugestions");
  const suggestionContainerContent = document.querySelector(
    ".content__sugestions__content__container"
  );
  const noContentContainer = document.querySelector(".content__nocontent");

  // fetch data
  async function handleFetchData(options) {
    const shouldFetch = Object.values(options).every((value) => !!value);

    if (!shouldFetch) return null;

    return fetcher(options);
  }

  // update view
  function handleUpdateView(data = []) {
    if (!data.length) {
      noContentContainer.classList.contains("hidden") &&
        noContentContainer.classList.toggle("hidden");

      !suggestionContainer.classList.contains("hidden") &&
        suggestionContainer.classList.toggle("hidden");
    } else {
      !noContentContainer.classList.contains("hidden") &&
        noContentContainer.classList.toggle("hidden");

      suggestionContainer.classList.contains("hidden") &&
        suggestionContainer.classList.toggle("hidden");
    }

    suggestionContainerContent.innerHTML = data
      .sort((item) => (item?.staff_favorite ? -1 : 1))
      .map((item) => createCard(item))
      .join("");
  }

  // form handler
  const options = {};
  const inputs = [sunInput, waterInput, petInput];

  inputs.forEach((element) => {
    options[element.name] = null;

    element.addEventListener("change", async ({ target }) => {
      options[element.name] = target.options[target.selectedIndex].value;

      const data = await handleFetchData(options);
      handleUpdateView(data ?? []);
    });
  });
}

window.addEventListener("DOMContentLoaded", main);
