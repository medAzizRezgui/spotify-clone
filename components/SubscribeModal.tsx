"use client";

import Modal from "@/components/Modal";
import { Price, ProductWithPrice } from "@/types";
import Button from "@/components/Button";
import { useState } from "react";
import { useUser } from "@/hooks/useUser";
import toast from "react-hot-toast";
import { postData } from "@/libs/helpers";
import { getStripe } from "@/libs/stripeClient";
import useSubscribeModal from "@/hooks/useSubscribeModal";

interface SubscribeModalProps {
  products: ProductWithPrice[];
}

const formatPrice = (price: Price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: price.currency,
    minimumFractionDigits: 0,
  }).format((price?.unit_amount || 0) / 100);
};
const SubscribeModal: React.FC<SubscribeModalProps> = ({ products }) => {
  const subscribeModal = useSubscribeModal();
  const { user, isLoading, subscription } = useUser();

  const onChange = (open: boolean) => {
    if (!open) {
      subscribeModal.onClose();
    }
  };

  const [priceIdLoading, setPriceIdLoading] = useState<string>();
  const handleCheckout = async (price: Price) => {
    setPriceIdLoading(price.id);

    if (!user) {
      setPriceIdLoading(undefined);
      return toast.error("Must be logged in");
    }
    if (subscription) {
      setPriceIdLoading(undefined);
      return toast("Already Subscribed");
    }

    try {
      const { sessionId } = await postData({
        url: "/api/create-checkout-session",
        data: { price },
      });

      const stripe = await getStripe();

      stripe?.redirectToCheckout({ sessionId });
    } catch (error: any) {
      toast.error((error as Error)?.message);
    } finally {
      setPriceIdLoading(undefined);
    }
  };

  let content = <div className={"text-center"}>No Products available</div>;
  if (products.length) {
    content = (
      <div>
        {products.map((product) => {
          if (!product.prices?.length) {
            return <div key={product.id}>No Prices Available</div>;
          }
          return product.prices.map((price) => (
            <Button
              onClick={() => handleCheckout(price)}
              disabled={isLoading || price.id === priceIdLoading}
              className={"mb-4"}
              key={price.id}
            >
              {`Subscribe for ${formatPrice(price)} a ${price.interval}`}
            </Button>
          ));
        })}
      </div>
    );
  }

  if (subscription) {
    content = <div className={"text-center"}>Already Subscribed</div>;
  }
  return (
    <Modal
      isOpen={subscribeModal.isOpen}
      onChange={onChange}
      title={"Only for premium users"}
      description={"Listen to music with spotify premium"}
    >
      {content}
    </Modal>
  );
};
export default SubscribeModal;
