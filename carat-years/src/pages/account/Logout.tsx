import { Button } from "@/components/ui/button";
import useUserStore from "@/store/userStore";

export default function Logout() {
  const { logout } = useUserStore();
  return (
    <div className="text-medium font-playfair p-6">
      <h2 className="mb-4 text-xl font-semibold text-black uppercase">
        You’re about to sign out of your account.
      </h2>
      <p className="mb-6 text-gray-700 uppercase">
        Logging out helps keep your account secure, especially on shared or
        public devices.
      </p>
      <br />
      <Button
        type="submit"
        className="mb-5 w-full cursor-pointer rounded-3xl bg-[#351043] px-4 py-3 font-medium text-white transition-colors hover:bg-purple-950 focus:ring-2 focus:ring-purple-700 focus:ring-offset-2 focus:outline-none"
        onClick={() => logout()}
      >
        Logout
      </Button>
    </div>
  );
}
