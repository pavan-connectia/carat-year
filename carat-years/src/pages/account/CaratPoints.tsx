import { useState } from "react";

export default function CaratPoints() {
  const [redeemed, setRedeemed] = useState<{ [key: number]: boolean }>({});

  const rewards = [
    {
      id: 1,
      label: "Entire Order",
      discount: "5% Off",
      points: "With 200 Point",
    },
    {
      id: 2,
      label: "Entire Order",
      discount: "10% Off",
      points: "With 200 Point",
    },
    {
      id: 3,
      label: "Entire Order",
      discount: "15% Off",
      points: "With 200 Point",
    },
  ];

  const handleRedeem = (id: number) => {
    setRedeemed((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="font-playfair p-6">
      <div className="mb-10 uppercase">
        <h2 className="mb-2 text-2xl font-bold">₹1250 Points</h2>
        <p className="text-[#957127]">Your current Carat Points</p>
      </div>

      <p className="mb-6 text-3xl font-bold text-gray-700 uppercase">
        Turn points into reward discounts.
      </p>

      <div className="flex flex-wrap gap-5">
        {rewards.map((reward) => (
          <div
            key={reward.id}
            className="flex w-60 flex-col rounded-2xl border border-[#EDC111] shadow transition hover:shadow-lg"
          >
            <div className="flex-1 p-4">
              <p className="text-gray-500">{reward.label}</p>
              <h3 className="mb-1 text-2xl font-medium">{reward.discount}</h3>
            </div>

            <div className="flex rounded-b-2xl bg-[#F6E8CB]">
              {redeemed[reward.id] ? (
                <button className="m-2 flex-1 cursor-not-allowed rounded-3xl border-none bg-gray-300 py-2 text-center text-white">
                  Redeemed
                </button>
              ) : (
                <button
                  onClick={() => handleRedeem(reward.id)}
                  className="m-2 flex-1 rounded-3xl border-none bg-[#351043] py-2 text-center text-white transition hover:bg-purple-950"
                >
                  Redeem
                </button>
              )}
              <span className="flex items-center px-3 py-2 text-gray-600">
                {reward.points}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
