import { testData } from "../services/__mocks__/movieservice";
import { getData } from "../services/movieservice";
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

test("should get data correctly", async () => {
  let response = await getData("txt");
  expect(response.length).toBe(3);
});

test("should not get data", async () => {
  try {
    let response = await getData("error");
  } catch (error: any) {
    expect(error.length).toBe(0);
  }
});
