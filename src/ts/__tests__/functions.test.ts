import * as functions from "../functions";
import { getData } from "../services/movieservice";
import { testData } from "../services/__mocks__/movieservice";
import { IMovie } from "../models/Movie";
jest.mock("axios", () => ({
  get: async (url: string) => {
    return new Promise((resolve, reject) => {
      if (url.endsWith("error")) {
        reject([]);
      } else {
        resolve({ data: { Search: testData } });
      }
    });
  },
}));
describe("movieSort", () => {
  test("Ascending order sort", async () => {
    let movies = await getData("txt");
    functions.movieSort(movies, false);
    expect(movies).toStrictEqual([...movies].sort());
  });
  test("Descensing order sort", async () => {
    let movies = await getData("txt");
    functions.movieSort(movies, true);
    expect(movies).toStrictEqual(
      [...movies].sort((a: IMovie, b: IMovie) => {
        if (a.Title > b.Title) {
          console.log(a.Title + " > " + b.Title);
          return 1;
        }
        if (a.Title < b.Title) {
          return -1;
        }
        return 0;
      })
    );
  });
});
