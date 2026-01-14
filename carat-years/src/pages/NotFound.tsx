import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/Heading";
export default function NotFound() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-linear-to-r from-amber-50 to-orange-100 px-6 py-10 text-center">
      <div className="w-full max-w-xl rounded-2xl p-10">
        <Heading>404 Error</Heading>
        <p className="mt-4 text-lg text-gray-700">
          Is it me you are looking for? Because I wonder — that it’s not.
        </p>

        <p className="mt-6 leading-relaxed text-gray-600">
          You can try to find what you’re looking for using our search bar, or{" "}
          <span
            onClick={handleGoHome}
            className="cursor-pointer font-medium text-purple-900 hover:underline"
          >
            click here
          </span>{" "}
          to go back to our homepage.
        </p>

        <p className="mt-6 text-gray-500">
          Need further assistance? Contact our customer service:
        </p>

        <div className="mt-2 text-gray-700">
          <p>
            📧{" "}
            <a
              href="mailto:service@carat-years.com"
              className="text-purple-900 hover:underline"
            >
              service@carat-years.com
            </a>
          </p>
          <p>📞 999999 99999</p>
        </div>

        <Button
          onClick={handleGoHome}
          variant="outline"
          className="mt-8 w-full rounded-full border border-purple-900 bg-[#430045] px-8 py-3 text-base font-medium text-white transition hover:bg-transparent hover:text-purple-900 sm:px-10 sm:py-4 sm:text-lg"
        >
          Go Back Home
        </Button>
      </div>
    </div>
  );
}
