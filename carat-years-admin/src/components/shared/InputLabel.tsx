import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

type InputLabelProps = {
  id?: string;
  type?: string;
  value?: string | number;
  label: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  className?: String;
};

const InputLabel = ({
  id,
  type = "text",
  value,
  label,
  placeholder,
  onChange,
  readOnly = false,
  className,
}: InputLabelProps) => {
  return (
    <div className={cn("w-full space-y-1.5", className)}>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        className="w-full"
        onChange={onChange}
        readOnly={readOnly}
      />
    </div>
  );
};

export default InputLabel;
