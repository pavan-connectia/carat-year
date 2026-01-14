const promises = [
  {
    icon: "/icons/custom-designs.png",
    title: "Designed for Your Story",
    text: "Personalised jewellery crafted exclusively for you.",
  },
  {
    icon: "/icons/lifetime-warranty.png",
    title: "Lifetime Craftsmanship Assurance",
    text: "Lifetime support on manufacturing quality.",
  },
  {
    icon: "/icons/certified-purity.png",
    title: "Internationally Certified Diamonds",
    text: "IGI-certified lab-grown diamonds for complete transparency.",
  },
  {
    icon: "/icons/ethical-sourcing.png",
    title: "Responsibly Created Diamonds",
    text: "Conflict-free, traceable, and consciously made.",
  },
  {
    icon: "/icons/exchange.png",
    title: "Hassle-Free Exchange Promise",
    text: "Complete peace of mind if you change your mind.",
  },
];

export default function CaratPromise() {
  return (
    <section className="bg-[#F8F2E7] py-12">
      <div className="container mx-auto px-4 text-center">
        {/* Section Title */}
        <h2 className="font-montserrat mb-2 text-xl font-semibold">
          The Carat Years Promise
        </h2>

        {/* Sub-line */}
        <p className="font-montserrat mx-auto mb-10 max-w-xl text-sm text-gray-600">
          A promise that protects your purchase – today and for years to come.
        </p>

        {/* Promise Icons */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {promises.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center"
            >
              <img
                src={item.icon}
                alt={item.title}
                className="mb-4 h-10 w-10 object-contain"
              />

              <h3 className="font-montserrat mb-1 text-sm font-semibold">
                {item.title}
              </h3>

              <p className="font-montserrat text-xs text-gray-600">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        {/* Micro-line */}
        <p className="font-montserrat mx-auto mt-10 max-w-2xl text-xs text-gray-500">
          Luxury should feel effortless — from the moment you choose, to every
          year you wear it.
        </p>
      </div>
    </section>
  );
}
