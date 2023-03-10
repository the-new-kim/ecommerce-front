import { IAddress, IReviewWithId } from "../firebase/types";

export function cls(...classnames: string[]) {
  return classnames.join(" ");
}

export const fixPrice = (price: number | string) => {
  if (Number.isNaN(price)) return "0.00";
  if (typeof price === "string") {
    return (price = parseFloat(price)).toFixed(2);
  }
  return price.toFixed(2);
};

export const centToDollor = (cent: number) => {
  return `$${(cent * 0.01).toFixed(2)}`;
};

export const addressToText = (address: IAddress) => {
  return `${address.line1}, ${address.line2}, ${address.postal_code}, ${address.city}, ${address.state}, ${address.country}`;
};

export const getKeyByValue = (object: { [key: string]: any }, value: any) => {
  return Object.keys(object).find((key) => object[key] === value);
};

export const getKeyIndex = (object: { [key: string]: any }, key?: string) => {
  if (!key) return 0;
  return Object.keys(object).indexOf(key);
};

export const makeFirstLetterBig = (text: string) => {
  const firstLetter = text.charAt(0).toUpperCase();
  const rest = text.slice(1).toLocaleLowerCase();

  return firstLetter + rest;
};

export const anyToNumber = (value: any) => {
  const parsed = parseInt(value);
  if (isNaN(parsed)) return 0;
  return parsed;
};

export const calculateReviewsAverageRating = (
  reviews: IReviewWithId[] | undefined
) => {
  if (!reviews || !reviews.length) return;

  const ratings = reviews.map((review) => review.rating);

  const total = ratings.reduce(
    (accumulator, currentValue) => accumulator + currentValue
  );
  return total / reviews.length;
};
