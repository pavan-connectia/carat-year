type FloatingWhatsappProps = {
  text?: string;
};

function FloatingWhatsapp({
  text = "Hello! I need more information.",
}: FloatingWhatsappProps) {
  const phone = "919870197167";
  const websiteUrl =
    typeof window !== "undefined" ? window.location.href : "";

  const message = `${text}\n\nWebsite: ${websiteUrl}`;
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-5 bottom-10 z-50"
    >
      <img src="/icons/whatsapp.png" className="size-10 object-contain" />
    </a>
  );
}

export default FloatingWhatsapp;
