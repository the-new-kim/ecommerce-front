export const createStripeCustomer = async (body: { [key: string]: any }) => {
  const result = await (
    await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/customers/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...body,
      }),
    })
  ).json();

  return result;
};
