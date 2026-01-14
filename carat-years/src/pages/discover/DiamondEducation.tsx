import Heading from "@/components/ui/Heading";
import { Link } from "react-router";

export default function DiamondEducation() {
  const topics = [
    {
      id: 1,
      title: "Diamond Carat",
      description:
        "Carat weight refers to the actual weight of the diamond. It’s one of the main factors that influence a diamond’s price — but remember, bigger isn’t always better. Cut and clarity also affect how large and brilliant a diamond appears.",
      image: "/craft/craft1.png",
      link: "#",
    },
    {
      id: 2,
      title: "Diamond Shapes",
      description:
        "The shape refers to the overall outline of the diamond — round, oval, pear, princess, cushion and more. Each shape reflects light differently and expresses a distinct style and personality.",
      image: "/craft/craft2.png",
      link: "#",
    },
    {
      id: 3,
      title: "Diamond Clarity",
      description:
        "Clarity measures the presence of inclusions or blemishes in the diamond. The fewer the imperfections, the more flawless the diamond appears — and the more valuable it is.",
      image: "/craft/craft3.png",
      link: "#",
    },
    {
      id: 4,
      title: "Diamond Colour",
      description:
        "Diamonds are graded on a colour scale from D (colourless) to Z (light yellow or brown). The closer to colourless a diamond is, the rarer and more valuable it becomes.",
      image: "/craft/craft4.png",
      link: "#",
    },
    {
      id: 5,
      title: "Diamond Cut",
      description:
        "The cut determines how well a diamond’s facets interact with light. It’s the key factor that influences brilliance, sparkle, and fire — making it the most important of the 4Cs.",
      image: "/craft/craft5.png",
      link: "#",
    },
    {
      id: 6,
      title: "Diamond Certificate",
      description:
        "Every diamond from Carat Years comes with a certified grading report from trusted gemological institutes, guaranteeing authenticity and full transparency.",
      image: "/craft/craft6.png",
      link: "#",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col items-center justify-start px-6 py-10">
      {/* --- Intro Section --- */}
      <div className="mb-12 max-w-4xl text-center">
        <Heading>Diamond Education</Heading>
        <p className="mt-5 text-lg leading-relaxed text-gray-600">
          Diamonds are famed for their incredible beauty and strength. As every
          gem is unique, it can be tricky to know exactly what to look for when
          buying diamonds. Understanding the 4 Cs — Carat, Cut, Clarity, and
          Colour — is key to selecting the perfect diamond.
        </p>
        <p className="mt-3 text-gray-500">
          At Carat Years, we’ve created a simple guide to help you make a
          confident and informed choice.
        </p>
      </div>

      {/* --- Diamond Topics Grid --- */}
      <div className="grid max-w-6xl grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {topics.map((topic) => (
          <div
            key={topic.id}
            className="group flex flex-col overflow-hidden rounded-2xl bg-linear-to-b from-yellow-50 via-amber-50 to-orange-100 shadow-md transition hover:shadow-xl"
          >
            <img
              src={topic.image}
              alt={topic.title}
              className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex flex-1 flex-col p-6">
              <h3 className="mb-2 text-xl font-semibold text-gray-800">
                {topic.title}
              </h3>
              <p className="mb-4 text-gray-600">{topic.description}</p>
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
          If you’d like to speak with an expert gemologist or a member of our
          friendly Customer Care Team about choosing the perfect diamond, we’re
          here to help. Reach out via Live Chat or give us a call at{" "}
          <span className="font-medium text-gray-800">+91 98765 43210</span>.
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
