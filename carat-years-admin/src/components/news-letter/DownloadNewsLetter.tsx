import { Button } from "../ui/button";
import { Download } from "lucide-react";
import { downloadNewsletterSub } from "@/api/newsletterSub";

export default function DownloadNewsLetter() {
  return (
    <Button onClick={downloadNewsletterSub}>
      <Download /> Download
    </Button>
  );
}
