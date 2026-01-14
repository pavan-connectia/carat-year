// import { Button } from "../ui/button";
import Heading from "../ui/Heading";

const CraftedByLook = () => {
  const hangingProducts = [
    { src: "/craft/craft1.png", position: "bottom" },
    { src: "/craft/craft2.png", position: "top" },
    { src: "/craft/craft3.png", position: "bottom" },
    { src: "/craft/craft4.png", position: "top" },
    { src: "/craft/craft5.png", position: "bottom" },
    { src: "/craft/craft6.png", position: "top" },
  ];

  const topSVGs = [200, 600, 1200];

  return (
    <div className="relative mt-10 overflow-x-hidden">
      {topSVGs.map((left, index) => (
        <svg
          key={index}
          className="absolute top-0 hidden h-40 w-14 sm:block"
          style={{ left: `${left}px` }}
          viewBox="0 0 56 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 199L31.3758 179.536C48.4459 164.687 42.8969 136.907 21.4322 129.756C-5.0345 120.938 -5.28058 83.5894 21.0677 74.4234L32.0781 70.5931C58.6575 61.3467 62.3968 25.2971 38.281 10.7924L22 1"
            stroke={`url(#paint0_linear_373_1011_${index})`}
            strokeWidth="2"
          />
          <defs>
            <linearGradient
              id={`paint0_linear_373_1011_${index}`}
              x1="19.5"
              y1="1"
              x2="19.5"
              y2="199"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FFE2A6" stopOpacity="0.2" />
              <stop offset="1" stopColor="#998864" />
            </linearGradient>
          </defs>
        </svg>
      ))}

      <div className="relative w-full text-center">
        <Heading>Crafted with Care. Loved by Thousands.</Heading>
        {/* Desktop Layout: Full width hanging products */}
        <div className="hidden w-screen overflow-hidden sm:flex">
          {hangingProducts.map((product, idx) => (
            <div
              key={idx}
              className="flex flex-shrink-0 flex-col items-center"
              style={{
                width: `${110 / hangingProducts.length}vw`,
                marginLeft: idx === 0 ? "-5vw" : 0,
                marginRight: idx === hangingProducts.length - 1 ? "-5vw" : 0,
                marginTop: product.position === "top" ? "-60px" : "80px",
              }}
            >
              <svg
                className="hidden h-40 w-14 sm:block"
                viewBox="0 0 56 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 199L31.3758 179.536C48.4459 164.687 42.8969 136.907 21.4322 129.756C-5.0345 120.938 -5.28058 83.5894 21.0677 74.4234L32.0781 70.5931C58.6575 61.3467 62.3968 25.2971 38.281 10.7924L22 1"
                  stroke="url(#paint0_linear_373_1011)"
                  strokeWidth="2"
                />
                <circle cx="40" cy="170" r="7" fill="white" stroke="#957127" />
                <circle cx="40" cy="170" r="4.5" fill="#A1906D" />
                <defs>
                  <linearGradient
                    id="paint0_linear_373_1011"
                    x1="19.5"
                    y1="1"
                    x2="19.5"
                    y2="199"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#FFE2A6" stopOpacity="0.2" />
                    <stop offset="1" stopColor="#998864" />
                  </linearGradient>
                </defs>
              </svg>

              <img
                src={product.src}
                alt={`Hanging product ${idx + 1}`}
                className="h-60 w-40 rounded-3xl object-cover"
              />
            </div>
          ))}
        </div>

        {/* Mobile Layout: Semi-Circle — Edge-Popping Style */}
        <div className="relative mt-10 flex w-full justify-center overflow-visible sm:hidden">
          <div className="relative h-[130px] w-[300px] overflow-visible">
            {hangingProducts.map((product, index) => {
              const baseRadius = 150;
              const angle = (index - (hangingProducts.length - 1) / 2) * 30;
              const x = baseRadius * Math.sin((angle * Math.PI) / 180);
              const y = baseRadius * (1 - Math.cos((angle * Math.PI) / 180));
              const imageSize = 80;
              const halfImage = imageSize / 2;

              return (
                <img
                  key={index}
                  src={
                    product.src ||
                    "/placeholder.svg?height=80&width=80&query=jewelry swatch"
                  }
                  alt={`Swatch ${index + 1}`}
                  className="absolute rounded-2xl border border-[#957127] object-cover shadow-md transition-transform duration-300 hover:scale-105"
                  style={{
                    width: `${imageSize}px`,
                    height: `${imageSize}px`,
                    left: `calc(50% + ${x}px - ${halfImage}px)`,
                    top: `${y}px`,
                    transform: `rotate(${angle / 4}deg)`,
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Description */}
        <p className="mx-auto mt-20 mb-8 max-w-2xl font-['Poppins'] text-base leading-relaxed text-black sm:mt-0 sm:text-lg md:text-xl">
          Discover the latest trends, must-have products, and behind-the-scenes
          favorites recommended by top influencers from around the world.
        </p>

        {/* Button */}
        <div className="my-10 flex justify-center">
          {/* <Button className="rounded-full border border-[#430045] bg-[#430045] px-8 py-3 font-['Raleway'] text-base font-medium text-white transition hover:bg-transparent hover:text-[#430045] sm:px-12 sm:py-4 sm:text-lg">
            Shop The Look
          </Button> */}
        </div>
        <div className="absolute bottom-[-39px] left-[-180px] hidden overflow-hidden sm:block md:h-[200px] md:w-[500px]">
          <img
            src="/home/left-image1.png"
            alt="Jewelry Model"
            className="h-full w-full object-cover"
          />
        </div>
        <div
          className="absolute right-[-200px] bottom-[-39px] hidden transform overflow-hidden sm:block md:h-[200px] md:w-[500px]"
          style={{ transform: "rotate(-180deg)" }}
        >
          <img
            src="/home/left-image1.png"
            alt="Jewelry Model"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default CraftedByLook;
