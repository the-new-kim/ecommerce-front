interface ICreateStripePriceProps {
  currency: string;
  unit_amount: number;
  product: string;
}

export const createStripePrice = async ({
  currency,
  unit_amount,
  product,
}: ICreateStripePriceProps) => {
  const result = await (
    await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/prices/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        unit_amount,
        currency,
        product,
      }),
    })
  ).json();

  return result;
};

export const updateStripePrice = async (id: string, active: boolean) => {
  const result = await (
    await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/prices/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        active,
      }),
    })
  ).json();

  return result;
};
