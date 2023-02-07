import { IStripeUploadResult } from "./api";

export function cls(...classnames: string[]) {
  return classnames.join(" ");
}

export const extractStripeImages = (
  stripeUploadResult: IStripeUploadResult | undefined
): string[] => {
  if (stripeUploadResult?.data) {
    return [stripeUploadResult.data.url];
  } else {
    return [];
  }
};

export const fixPrice = (price: number | string) => {
  if (Number.isNaN(price)) return "0.00";
  if (typeof price === "string") {
    return (price = Number(price)).toFixed(2);
  }
  return price.toFixed(2);
};
