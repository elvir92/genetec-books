export interface IBook {
  id: string;
  title: string;
  author: string;
  year: number;
  genre: string;
  description: string;
  coverUrl: string;
  rating?: number; // 1-5 stars rating
}
