import fetcher from "./fetcher";

function main() {
  const sunInput = document.querySelector("[name=sun]");
  const waterInput = document.querySelector("[name=water]");
  const petInput = document.querySelector("[name=pets]");
  const suggestionContainer = document.querySelector(
    "main.content .suggestions-container"
  );
  const suggestionContainerContent = document.querySelector(
    "main.content .suggestions-container .suggestion-content"
  );
  const noContentContainer = document.querySelector(
    "main.content .nocontent-container"
  );

  // fetch data
  async function handleFetchData(options) {
    const shouldFetch = Object.values(options).every((value) => !!value);

    if (!shouldFetch) return null;

    return fetcher(options);
  }

  function createCard(suggestion) {
    const isFavorite = suggestion?.staff_favorite
      ? '<div class="badge">✨ Staff favorite</div>'
      : "";

    const element = `
      <div class="card">
        ${isFavorite}
        <img
          src="${suggestion.url}"
          alt="${suggestion.name}"
          class="image"
        />
        <div class="footer">
          <span class="title">${suggestion.name}</span>
          <span class="price">${suggestion.price}</span>
          <div class="icons">
            <img src="./src/images/icons/pet.svg" alt="Pet" />
          </div>
        </div>
      </div>
    `;

    return element;
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
      .map((item) => createCard(item));
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
