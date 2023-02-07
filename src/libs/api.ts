export interface IStripeUploadResult {
  ok: boolean;
  data?: any;
  error?: any;
}

export const uploadStripeFile = async (
  formElement: HTMLFormElement
): Promise<IStripeUploadResult> => {
  const formData = new FormData(formElement);

  const result = await (
    await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/files/upload`, {
      method: "POST",
      body: formData,
    })
  ).json();

  return result;
};

interface ICreateStrpieProductProps {
  name: string;
  id: string;
  images: string[];
  default_price_data: object;
  active: boolean;
}

export const createStripeProduct = async ({
  name,
  id,
  images,
  default_price_data,
  active,
}: ICreateStrpieProductProps) => {
  const result = await (
    await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/products/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        id,
        url: `${process.env.REACT_APP_ROOT_PATH}/products/${id}`,
        images,
        default_price_data,
        active,
      }),
    })
  ).json();

  return result;
};

export const removeStripeProduct = async (id: string) => {
  const result = await (
    await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/products/${id}`, {
      method: "DELETE",
    })
  ).json();

  return result;
};

export const getStripeProductDetail = async (id: string) => {
  const result = await (
    await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/products/${id}`, {
      method: "GET",
    })
  ).json();

  return result;
};

export const createStripePrice = async (price: number, product: string) => {
  const result = await fetch(
    `${process.env.REACT_APP_BACKEND_BASE_URL}/prices/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        unit_amount: price,
        currency: "usd",
        recurring: { interval: "month" },
        product,
      }),
    }
  );

  return result;
};

interface ICreateStripePaymentIntentProps {
  amount: number;
  currency: string;
  automatic_payment_methods: object;
}

export const createStripePaymentIntent = async ({
  amount,
  currency,
  automatic_payment_methods,
}: ICreateStripePaymentIntentProps) => {
  const result = await (
    await fetch(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/payment_intents/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          currency,
          automatic_payment_methods,
        }),
      }
    )
  ).json();

  return result;
};
