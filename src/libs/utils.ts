import { IAddress } from "../firebase/types";

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
  return `$ ${cent * 0.01}`;
};

export const addressToText = (address: IAddress) => {
  return `${address.line1}, ${address.line2}, ${address.postal_code}, ${address.city}, ${address.state}, ${address.country}`;
};
