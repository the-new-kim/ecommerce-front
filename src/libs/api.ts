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
  default_price_data: object;
  active: boolean;
}

export const createStripeProduct = async ({
  name,
  id,
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
        url: `${window.location.origin}/products/${id}`,
        default_price_data,
        active,
      }),
    })
  ).json();

  return result;
};

interface IUpdateStrpieProductProps {
  name: string;
  id: string;
  active: boolean;
  default_price: string;
}

export const updateStripeProduct = async ({
  name,
  id,
  default_price,
  active,
}: IUpdateStrpieProductProps) => {
  const result = await (
    await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/products/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        active,
        default_price,
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
      `${process.env.REACT_APP_BACKEND_BASE_URL}/payment-intents/create`,
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
