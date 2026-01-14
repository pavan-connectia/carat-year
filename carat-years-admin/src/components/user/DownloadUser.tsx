import { Button } from "../ui/button";
import { Download } from "lucide-react";
import { downloadUser } from "@/api/user";

export default function DownloadUser() {
  return (
    <Button onClick={downloadUser}>
      <Download /> Download
    </Button>
  );
}
