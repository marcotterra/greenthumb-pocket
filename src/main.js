import fetcher from "./js/fetcher";
import { generateSuggestionCard, smoothScroll } from "./js/helpers";

function main() {
  // elements
  const sunInput = document.querySelector("[name=sun]");
  const waterInput = document.querySelector("[name=water]");
  const petInput = document.querySelector("[name=pets]");
  const scrollButton = document.querySelector("a.button");
  const noContentContainer = document.querySelector(".content__nocontent");
  const suggestionContainer = document.querySelector(".content__sugestions");
  const suggestionContainerContent = document.querySelector(
    ".content__sugestions__content__container"
  );

  const selectedValues = {};
  const inputElements = [sunInput, waterInput, petInput];

  // fetch data
  async function handleFetchData(options = {}) {
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
      .map((item) => generateSuggestionCard(item))
      .join("");
  }

  function handleInputOptionChange(selectedValuesRef = {}) {
    return async ({ target }) => {
      selectedValuesRef[target.name] =
        target.options[target.selectedIndex].value;

      const data = await handleFetchData(selectedValuesRef);
      handleUpdateView(data ?? []);
    };
  }

  function handleScrollClick(event) {
    event.preventDefault();

    smoothScroll(event.target);
  }

  // scroll to top button
  scrollButton.addEventListener("click", handleScrollClick);

  // form handler
  inputElements.forEach((element) => {
    selectedValues[element.name] = null;

    element.addEventListener("change", handleInputOptionChange(selectedValues));
  });
}

window.addEventListener("DOMContentLoaded", main);
