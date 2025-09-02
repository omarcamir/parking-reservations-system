import { SubscriptionProps } from "@/app/types/SubscriptionProps";
import Button from "../../atoms/Button";
import Loader from "../../atoms/Loader";

type SubscriptionInfoProps = {
  subscription: SubscriptionProps;
  isFetchingSubscription: boolean;
  handleCheckout: (forceConvert: boolean) => void;
  isCheckingOut: boolean;
};

const SubscriptionInfo = ({
  subscription,
  isFetchingSubscription,
  handleCheckout,
  isCheckingOut,
}: SubscriptionInfoProps) => {
  return (
    <div className="border rounded-lg p-4 mb-4 shadow bg-yellow-50">
      <h3 className="font-semibold">🔑 Subscriber Vehicles</h3>
      {isFetchingSubscription ? (
        <p className="text-sm"><Loader size={20}/>Loading subscription...</p>
      ) : subscription ? (
        <>
          <ul className="list-disc pl-5">
            {subscription.cars.map((c) => (
              <li key={c.plate}>
                {c.plate} {c.brand ? `— ${c.brand}` : ""}
              </li>
            ))}
          </ul>
          <p className="text-sm mt-2">
            Compare plates visually. If the plate does not match the
            subscription, use Convert-to-Visitor.
          </p>

          <div className="mt-3 flex gap-2">
            <Button
              onClick={() => handleCheckout(true)}
              className="bg-red-600 text-white px-4 py-2 rounded-lg shadow disabled:opacity-60"
              disabled={isCheckingOut}
              isLoading={isCheckingOut}
              text="Convert to Visitor & Checkout"
            />
          </div>
        </>
      ) : (
        <p className="text-sm text-red-700">Subscription not found.</p>
      )}
    </div>
  );
};

export default SubscriptionInfo;
