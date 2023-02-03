import { IMovie } from "../../models/Movie";

export let testData: IMovie[] = [
  {
    Title: "Kung Pow: Enter the Fist",
    imdbID: "tt0240468",
    Type: "Action, Comedy",
    Poster: "...",
    Year: "2002",
  },
  {
    Title: "Kung Pow 2: Electric boogalo",
    imdbID: "tt0240469",
    Type: "Action, Comedy",
    Poster: "...",
    Year: "2004",
  },
  {
    Title: "Kung Pow 3: Pow Kung",
    imdbID: "tt0240470",
    Type: "Action, Comedy",
    Poster: "...",
    Year: "2007",
  },
];

export const getData = async (searchText: string): Promise<IMovie[]> => {
  return new Promise((resolve, reject) => {
    if (searchText !== "error") {
      resolve(testData.filter((testData) => testData.Title.includes(searchText)));
    } else {
      reject([]);
    }
  });
};
