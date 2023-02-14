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
