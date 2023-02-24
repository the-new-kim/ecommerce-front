import { useState } from "react";
import { useRecoilValue } from "recoil";
import Button from "../../components/elements/Button";
import Heading from "../../components/elements/typos/Heading";
import ShippingInformationForm from "../../components/forms/ShippingInformationForm";
import Modal from "../../components/Modal";
import { userAtom } from "../../libs/atoms";
import { motion } from "framer-motion";

export default function MeAddresses() {
  const [showModal, setShowModal] = useState(false);
  const me = useRecoilValue(userAtom);

  return (
    <div className="w-full">
      <Heading tagName="h3" className="mb-5">
        Address book
      </Heading>
      <motion.div
        layoutId="address"
        className="border-[1px] border-black p-3 flex flex-col"
      >
        {me?.shipping ? (
          <>
            <div>{me?.shipping?.name}</div>
            <div>{me?.email}</div>
            <div>{me?.shipping?.phone}</div>
            <div>
              {me?.shipping?.address.line1}, {me?.shipping?.address.line2}
            </div>
            <div>
              {me?.shipping?.address.postal_code}, {me?.shipping?.address.city}
            </div>
            <div>
              {me?.shipping?.address.state}, {me?.shipping?.address.country}
            </div>
            <Button className="mt-5" onClick={() => setShowModal(true)}>
              Edit
            </Button>
          </>
        ) : (
          <>
            <div className="text-center">No data</div>
            <Button className="mt-5" onClick={() => setShowModal(true)}>
              Add
            </Button>
          </>
        )}
      </motion.div>

      <Modal setShowing={setShowModal} showing={showModal} layoutId="address">
        <ShippingInformationForm onValidAction={() => setShowModal(false)} />
      </Modal>
    </div>
  );
}
