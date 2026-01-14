interface Props {
  items: number;
  price: number;
  discount: number;
  total: number;
  onContinue: () => void;
}

export default function OrderSummaryBox({
  items,
  price,
  discount,
  total,
  onContinue,
}: Props) {
  return (
    <div className="w-full rounded-md border bg-[#fff7f2] p-4 shadow-sm lg:w-72">
      <h3 className="mb-3 text-lg font-semibold">Order Summary</h3>
      <div className="space-y-1 text-sm">
        <p className="flex justify-between">
          <span>Total Items</span> <span>{items} Items</span>
        </p>
        <p className="flex justify-between">
          <span>Price</span> <span>₹ {price.toLocaleString()}</span>
        </p>
        <p className="flex justify-between">
          <span>Discount</span> <span>₹ {discount?.toLocaleString()}</span>
        </p>
        {/* <p className="flex justify-between">
          <span>GST</span> <span>₹ {gst.toLocaleString()}</span>
        </p>
        <p className="flex justify-between">
          <span>Shipping Charges</span>{" "}
          <span>₹ {shipping.toLocaleString()}</span>
        </p> */}
      </div>
      <hr className="my-3" />
      <p className="flex justify-between text-lg font-semibold">
        <span>TOTAL</span> <span>₹ {total.toLocaleString()}</span>
      </p>
      <button
        onClick={onContinue}
        className="mt-4 w-full rounded-md bg-purple-900 py-2 font-medium text-white transition hover:bg-purple-800"
      >
        Continue
      </button>
      <p className="text-xs p-2">Lifetime Exchange & Buy-Back available. No returns.</p>
    </div>
  );
}
