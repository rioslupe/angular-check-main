import {Category} from "./category";

export type Todo = {
  id: number;
  text: string;
  completed: boolean;
  category?: Category
};
