import Heading from "@/components/ui/Heading";
import { Link } from "react-router";

export default function JewelleryCareGuide() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-start px-6 py-10">
      {/* --- Hero Section --- */}
      <div className="mb-12 max-w-4xl text-center">
        <Heading>Jewellery Care Guide</Heading>
        <p className="mt-4 text-lg leading-relaxed text-gray-500">
          To ensure your jewellery continues to shine and stand the test of
          time, proper care and maintenance are essential. At Carat Years, we
          want you to enjoy your jewellery forever — so we’ve created this
          simple guide filled with expert care tips to keep your diamonds and
          gold looking as radiant as the day you received them.
        </p>
        <p className="mt-2 text-sm text-gray-400">
          Carat Years Education • October 2025
        </p>
        <img
          src="/education/jewellery-care-hero.png"
          alt="Jewellery Care Guide"
          className="mx-auto my-10 h-96 w-full max-w-3xl rounded-2xl object-cover shadow-md"
        />
      </div>

      {/* --- Main Content --- */}
      <div className="max-w-5xl space-y-16 leading-relaxed text-gray-700">
        {/* Diamond Care */}
        <section>
          <h2 className="mb-6 text-2xl font-semibold text-gray-800">
            Diamond Care
          </h2>
          <p className="mb-4">
            Diamonds may be forever, but regular cleaning helps them maintain
            their sparkle. Over time, dirt, oils, and product build-up can dull
            your diamond’s brilliance. Here are some key tips to keep your
            diamond jewellery looking flawless:
          </p>

          <ul className="space-y-6">
            <li>
              <h3 className="font-medium text-gray-800">
                💧 Remove diamond jewellery before showering
              </h3>
              <p>
                Soap residue can create a film over diamonds, dulling their
                shine. It’s also a great opportunity to let your skin breathe —
                or let your jewellery soak gently in a mild cleaning solution
                while you wash.
              </p>
            </li>

            <li>
              <h3 className="font-medium text-gray-800">
                🪥 Use a soft toothbrush for cleaning
              </h3>
              <p>
                A soft-bristled toothbrush with warm water helps remove dirt
                from the prongs and restore shine to the stone. Be gentle to
                avoid loosening the setting.
              </p>
            </li>

            <li>
              <h3 className="font-medium text-gray-800">
                💄 Remove jewellery when applying creams
              </h3>
              <p>
                Creams, sunscreen, and perfume can build up behind stones and
                between prongs. Always apply these products before putting on
                your jewellery to prevent tarnish or residue on the metal.
              </p>
            </li>

            <li>
              <h3 className="font-medium text-gray-800">
                ⚠️ Be cautious with ultrasonic cleaners
              </h3>
              <p>
                While ultrasonic cleaners are effective, the vibrations can
                loosen diamonds from their settings. Use them sparingly and have
                your jewellery checked periodically by a professional.
              </p>
            </li>
          </ul>
        </section>

        {/* Gold Care */}
        <section>
          <h2 className="mb-6 text-2xl font-semibold text-gray-800">
            Gold Care
          </h2>
          <p className="mb-4">
            Gold jewellery is stunning but can be delicate, especially in higher
            carats. Everyday wear exposes gold to dirt, scratches, and
            chemicals, so here are some essential care tips:
          </p>

          <ul className="space-y-6">
            <li>
              <h3 className="font-medium text-gray-800">
                🏊‍♀️ Remove jewellery before swimming or using a hot tub
              </h3>
              <p>
                Chlorine and other pool chemicals can damage or discolor gold.
                If you swim often, store your jewellery in a soft cloth or its
                original box while in the pool.
              </p>
            </li>

            <li>
              <h3 className="font-medium text-gray-800">
                🦷 Avoid using toothpaste for cleaning
              </h3>
              <p>
                Although often recommended, toothpaste is abrasive and can
                scratch soft gold metals like 18ct gold. Use gentle cleaning
                solutions instead.
              </p>
            </li>

            <li>
              <h3 className="font-medium text-gray-800">
                🧽 Remove gold jewellery when cleaning
              </h3>
              <p>
                Cleaning agents like bleach and sprays can tarnish or erode
                gold. Remove jewellery before household cleaning and wash your
                hands before putting it back on.
              </p>
            </li>
          </ul>
        </section>

        {/* Cleaning Methods */}
        <section>
          <h2 className="mb-6 text-2xl font-semibold text-gray-800">
            How to Clean Different Jewellery Types
          </h2>

          <div className="space-y-10">
            <div>
              <h3 className="mb-2 font-medium text-gray-800">
                💍 How to Clean a Ring
              </h3>
              <p>
                Mix a small amount of mild washing-up liquid with warm water and
                let your ring soak for 15–30 minutes. Gently scrub prongs and
                crevices with a soft toothbrush before drying with a clean, soft
                cloth.
              </p>
            </div>

            <div>
              <h3 className="mb-2 font-medium text-gray-800">
                📿 How to Clean a Necklace
              </h3>
              <p>
                Remove any pendant before soaking the chain. If the pendant
                contains glued stones, wipe gently with a damp cloth instead.
                Soak the chain in warm, soapy water, then dry carefully with a
                soft cloth.
              </p>
            </div>

            <div>
              <h3 className="mb-2 font-medium text-gray-800">
                ✨ How to Clean Earrings
              </h3>
              <p>
                Clean earring hooks and posts with an alcohol swab between wears
                for hygiene. For the earrings themselves, gently brush diamonds
                or prongs with warm water and a soft toothbrush, then pat dry.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-16 text-center">
          <p className="mb-10 text-gray-600">
            Regular maintenance not only preserves the shine of your jewellery
            but also protects its sentimental and lasting value. For deeper
            cleaning or repairs, visit your nearest Carat Years boutique or
            contact our care team.
          </p>
          <Link
            to="/education/lifetime-guarantee"
            className="mt-10 rounded-full border border-[#533D0E] bg-[#533D0E] px-8 py-3 text-base font-medium text-white transition hover:bg-transparent hover:text-[#533D0E] sm:px-10 sm:py-4 sm:text-lg"
          >
            Learn About Our Lifetime Guarantee
          </Link>
        </section>
      </div>
    </div>
  );
}
