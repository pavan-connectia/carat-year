import Heading from "@/components/ui/Heading";
import { Link } from "react-router";

export default function MetalGuide() {
  const metals = [
    {
      id: 1,
      title: "Gold Guide",
      description:
        "Carat measures the proportion of pure gold mixed with another metal alloy. The higher the carat, the more pure gold it contains — but lower carats can often be more durable for daily wear.",
      image: "/craft/craft1.png",
      link: "#",
    },
    {
      id: 2,
      title: "White Gold",
      description:
        "White gold is created by mixing pure gold with white metals like nickel, palladium, or silver. It’s finished with a rhodium plating to give it a stunning, platinum-like shine.",
      image: "/craft/craft2.png",
      link: "#",
    },
    {
      id: 3,
      title: "Yellow Gold",
      description:
        "The most traditional and timeless of golds, yellow gold is created by combining pure gold with alloy metals such as copper and zinc — giving it its warm, classic hue.",
      image: "/craft/craft3.png",
      link: "#",
    },
    {
      id: 4,
      title: "Rose Gold",
      description:
        "A romantic and contemporary option, rose gold’s signature blush tone is created by mixing pure gold with a copper alloy — resulting in a soft, feminine finish.",
      image: "/craft/craft4.png",
      link: "#",
    },
    {
      id: 5,
      title: "Platinum",
      description:
        "Platinum is a naturally white, strong, and hypoallergenic metal. It’s denser and more durable than gold, making it the ultimate choice for everyday wear and heirloom pieces.",
      image: "/craft/craft5.png",
      link: "#",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col items-center justify-start px-6 py-10">
      {/* --- Intro Section --- */}
      <div className="mb-12 max-w-4xl text-center">
        <Heading>Metal Guide</Heading>
        <p className="mt-5 text-lg leading-relaxed text-gray-600">
          When it comes to choosing the perfect metal for your jewellery, it can
          be difficult to know which is best suited for your needs. Whether
          you’re drawn to the warmth of yellow gold, the elegance of white gold,
          or the strength of platinum — each metal has its own story, beauty,
          and durability.
        </p>
        <p className="mt-3 text-gray-500">
          Explore our guide below to understand the unique properties of each
          and find the perfect match for your next piece.
        </p>
      </div>

      {/* --- Metal Types Grid --- */}
      <div className="grid max-w-6xl grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {metals.map((metal) => (
          <div
            key={metal.id}
            className="group flex flex-col overflow-hidden rounded-2xl bg-linear-to-b from-yellow-50 via-amber-50 to-orange-100 shadow-md transition hover:shadow-xl"
          >
            <img
              src={metal.image}
              alt={metal.title}
              className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex flex-1 flex-col p-6">
              <h3 className="mb-2 text-xl font-semibold text-gray-800">
                {metal.title}
              </h3>
              <p className="mb-4 text-gray-600">{metal.description}</p>
              <button className="mt-auto w-fit text-sm font-medium text-amber-700 hover:text-amber-900">
                Learn More →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* --- Contact Section --- */}
      <div className="mt-16 max-w-3xl text-center">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">
          Get in Touch
        </h2>
        <p className="leading-relaxed text-gray-600">
          Need further assistance choosing between platinum, white gold, or rose
          gold? Our expert Customer Care Team is here to help. Reach us on{" "}
          <span className="font-medium text-gray-800">+91 98765 43210</span> or
          via Live Chat to find the perfect metal for your jewellery.
        </p>
        <Link
          to="/contact"
          className="mt-6 inline-block rounded-full bg-black px-6 py-3 text-white shadow transition hover:bg-gray-800"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}
