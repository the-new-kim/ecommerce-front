interface ICreateStrpieProductProps {
  name: string;
  id: string;
  active: boolean;
}

export const createStripeProduct = async ({
  name,
  id,
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
