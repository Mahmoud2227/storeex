import {Types} from "mongoose";

interface IReview {
  name: string;
  rating: number;
  comment: string;
}

interface IProduct {
  user: Types.ObjectId;
  name: string;
  image: string;
  brand: string;
  category: string;
  description: string;
  reviews: IReview[];
  rating: number;
  numReviews: number;
  price: number;
  countInStock: number;
}

export default IProduct;