import { Button } from "../ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import { User } from "lucide-react";

export default function GoogleLogin() {
  const login = useGoogleLogin({
    onSuccess: (tokenResponse: any) => {
      console.log("Google login successful:", tokenResponse);
    },
    onError: (error: any) => {
      console.error("Google Login Error:", error);
    },
    flow: "implicit", // or "auth-code" if you're using a backend flow
  });

  return (
    <Button
      variant="outline"
      className="w-full"
      onClick={() => login()}
      type="button"
    >
      <User className="mr-2" />
      Login with Google
    </Button>
  );
}
