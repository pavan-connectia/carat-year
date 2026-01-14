import { useEffect, useState } from "react";
import { Link } from "react-router";

type CookieConsentProps = {
  variant?: "center" | "bar";
};

export default function CookieConsent({
  variant = "center",
}: CookieConsentProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleReject = () => {
    localStorage.setItem("cookie-consent", "rejected");
    setVisible(false);
  };

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className={`fixed z-50 flex w-full items-center justify-center ${
        variant === "center" ? "inset-0 bg-black/40" : "bottom-4 left-0 px-4"
      }`}
    >
      <div
        className={`w-full max-w-md space-y-5 rounded-lg bg-white px-6 py-8 shadow-lg ${
          variant === "bar"
            ? "flex items-center justify-between p-4"
            : "text-center"
        }`}
      >
        {variant === "center" && (
          <div className="flex flex-col items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1047/1047711.png"
              alt="cookie"
              className="mb-4 h-16 w-16"
            />
          </div>
        )}

        <p className="text-[#2A3E5B] md:text-lg">
          This website uses cookies to improve your experience. By clicking
          &quot;Accept&quot; you agree to our{" "}
          <Link to="/" className="text-[#007DFC] underline">
            Cookie Policy
          </Link>
          .
        </p>

        <div
          className={`mt-4 flex gap-3 ${
            variant === "bar" ? "mt-0" : "justify-center"
          }`}
        >
          <button
            onClick={handleReject}
            className="rounded-full border border-[#2A3E5B] px-5 py-2 text-[#2A3E5B] transition hover:bg-gray-100"
          >
            Reject All
          </button>
          <button
            onClick={handleAccept}
            className="rounded-full bg-[#430045] px-5 py-2 text-white transition hover:bg-[#430045]/90"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
