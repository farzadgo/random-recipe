export type Diets = {
  isVegan: boolean,
  isGlutenFree: boolean
}

export type Data = {
  id: number,
  title: string,
  summary: string,
  cuisines: string[],
  diets: string[],
  image: string,
  occasions: string[],
  readyInMinutes: number,
  sourceName: string,
  sourceUrl: string,
}


// type Temperature = {
//   number: number;
//   unit: string;
// };

// type Equipment = {
//   id: number;
//   name: string;
//   localizedName: string;
//   image: string;
//   temperature?: Temperature;
// };

// type Length = {
//   number: number;
//   unit: string;
// };


type Ingredient = {
  id: number;
  name: string;
  localizedName: string;
  image: string;
};

export type Step = {
  number: number;
  step: string;
  ingredients: Ingredient[];
  // equipment: Equipment[];
  // length?: Length;
};
