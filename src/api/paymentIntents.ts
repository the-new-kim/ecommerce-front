interface IStripeResponse {
  ok: boolean;
  data?: any;
  error?: any;
}

interface IStripePaymentIntentData {
  id: string;
  // object: "payment_intent";
  amount: number;
  amount_capturable: number;
  // amount_details: {
  //   tip: {};
  // };
  amount_received: number;
  // application: null;
  // application_fee_amount: null;
  automatic_payment_methods: {
    enabled: true;
  };
  canceled_at: null;
  cancellation_reason: null;
  capture_method: "automatic" | "maunal";
  client_secret: string;
  confirmation_method: "automatic" | "maunal";
  created: number;
  currency: string;
  // customer: null;
  // description: null;
  // invoice: null;
  // last_payment_error: {
  //   charge: string;
  //   code: string;
  //   decline_code: string;
  //   doc_url: string;
  //   message: string;
  //   param: string;
  // };
  latest_charge: string;
  livemode: boolean;
  // metadata: {};
  // next_action: null;
  // on_behalf_of: null;
  payment_method: string;
  // payment_method_options: {
  //   card: {
  //     installments: null;
  //     mandate_options: null;
  //     network: null;
  //     request_three_d_secure: "automatic";
  //   };
  // };
  payment_method_types: string[];
  // processing: null;
  // receipt_email: null;
  // review: null;
  // setup_future_usage: null;
  // shipping: null;
  // statement_descriptor: null;
  // statement_descriptor_suffix: null;
  status:
    | "requires_payment_method"
    | "requires_confirmation"
    | "requires_action"
    | "processing"
    | "requires_capture"
    | "canceled"
    | "succeeded";
  // transfer_data: null;
  // transfer_group: null;
}

interface IStripePaymentIntentResponse extends IStripeResponse {
  data?: IStripePaymentIntentData;
}

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

  return result as IStripePaymentIntentResponse;
};

export const getStripePaymentIntentDetail = async (id: string) => {
  const result = await (
    await fetch(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/payment-intents/${id}`,
      {
        method: "GET",
      }
    )
  ).json();

  return result as IStripePaymentIntentResponse;
};

export const cancelPaymentIntent = async (id: string) => {
  const result = await (
    await fetch(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/payment-intents/${id}/cancel`,
      {
        method: "GET",
      }
    )
  ).json();

  return result as IStripePaymentIntentResponse;
};
