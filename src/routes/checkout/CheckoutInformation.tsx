import ShippingInformationForm from "../../components/forms/ShippingInformationForm";

export default function CheckoutInformation() {
  return (
    <div>
      <ShippingInformationForm
        actionUrl="/checkout/payment"
        submitValue="Continue to payment"
      />
    </div>
  );
}
