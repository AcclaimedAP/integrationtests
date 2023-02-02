/**
 * @jest-environment jsdom
 */
import { IMovie } from "../models/Movie";
import { init } from "../movieApp";
import * as movieApp from "../movieApp";
import * as movieservice from "../services/movieservice";
jest.mock("../services/movieservice");
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

  test("Tests if handleSubmit gets called", () => {
    const handleSubmitSpy = jest.spyOn(movieApp, "handleSubmit").mockReturnValue(
      new Promise<void>((resolve) => {
        resolve();
      })
    );
    movieApp.init();
    const form = document.querySelector("form") as HTMLFormElement;
    form.dispatchEvent(new Event("submit"));
    expect(handleSubmitSpy).toBeCalled();
    handleSubmitSpy.mockRestore();
  });
});

describe("handleSubmit", () => {
  test("should call getData", async () => {
    let searchInput = document.getElementById("searchText") as HTMLInputElement;
    const searchData = "Kung Pow";
    const getDataSpy = jest.spyOn(movieservice, "getData").mockReturnValue(Promise.resolve([]));
    searchInput.value = searchData;
    await movieApp.handleSubmit();
    expect(getDataSpy).toBeCalled();
    getDataSpy.mockRestore();
  });
});
