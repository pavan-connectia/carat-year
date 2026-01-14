import { Button } from "@/components/ui/button";
import {
  usePostNewsletterSub,
  useUnsubscribeNewsletterSub,
} from "@/hooks/useNewsletterSub";
import useUserStore from "@/store/userStore";

export default function Newsletter() {
  const { email, name } = useUserStore();
  const { mutate: sub, isPending: subPending } = usePostNewsletterSub();
  const { mutate: unsub, isPending: unsubPending } =
    useUnsubscribeNewsletterSub();

  const handleSubscribe = async () => {
    if (!email || !name) return;
    sub({ email: email, name: name });
  };

  const handleUnsubscribe = () => {
    if (!email) return;
    unsub(email);
  };

  return (
    <div className="font-playfair mt-16 p-6 text-2xl">
      <h2 className="mb-5 text-3xl font-semibold text-black">
        Subcription Preferences
      </h2>
      <p className="mb-6 text-gray-700">Subscribe for Everyday newsletters</p>

      <Button
        type="submit"
        onClick={handleSubscribe}
        disabled={subPending}
        className="mb-5 w-full cursor-pointer rounded-3xl bg-[#351043] px-4 py-3 font-medium text-white transition-colors hover:bg-purple-950 focus:ring-2 focus:ring-purple-700 focus:ring-offset-2 focus:outline-none"
      >
        {subPending ? "Subscribing..." : "Subscribe Now"}
      </Button>
      <Button
        type="submit"
        onClick={handleUnsubscribe}
        disabled={unsubPending}
        className="w-full cursor-pointer rounded-3xl border border-[#351043] bg-white px-4 py-3 font-medium text-[#351043] transition-colors hover:bg-purple-100 focus:ring-2 focus:ring-purple-700 focus:ring-offset-2 focus:outline-none"
      >
        {subPending ? "UnSubscribing..." : "UnSubscribe"}
      </Button>
    </div>
  );
}
