/**
 * @jest-environment jsdom
 */
import { init, handleSubmit } from "../movieApp";
import * as movieApp from "../movieApp";
beforeEach(() => {
  document.body.innerHTML = "";

  document.body.innerHTML = `<form id="searchForm">
      <input type="text" id="searchText" placeholder="Skriv titel här" />
      <button type="submit" id="search">Sök</button>
    </form>
    <div id="movie-container"></div>`;
});

describe("init", () => {
  test("should add a submit event listener to the search form", () => {
    const form = document.getElementById("searchForm") as HTMLFormElement;
    const spy = jest.spyOn(form, "addEventListener");

    init();

    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
  test("Tests for preventDefault", () => {
    const form = document.getElementById("searchForm") as HTMLFormElement;
    const preventDefault = jest.fn();
    const submitEvent = new Event("submit", { cancelable: true });

    (submitEvent as Event).preventDefault = preventDefault;

    init();
    form.dispatchEvent(submitEvent);
    expect(preventDefault).toHaveBeenCalled();
  });
  test("Tests for handleSubmit", () => {
    document.body.innerHTML = `<form id="searchForm">
      <input type="text" id="searchText" placeholder="Skriv titel här" />
      <button type="submit" id="search">Sök</button>
    </form>
    <div id="movie-container"></div>`;
    const handleSubmitSpy = jest.spyOn(movieApp, "handleSubmit").mockReturnValue(
      new Promise<void>((resolve) => {
        resolve();
      })
    );
    movieApp.init();
    const form = document.querySelector("form") as HTMLFormElement;
    form.submit();
    expect(handleSubmitSpy).toHaveBeenCalled();
    handleSubmitSpy.mockRestore();
  });
});
