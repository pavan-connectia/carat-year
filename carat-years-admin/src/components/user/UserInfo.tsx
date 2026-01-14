import { TUser } from "@/types/api";
import InputLabel from "../shared/InputLabel";

export default function UserInfo({ data }: { data: TUser }) {
  return (
    <div className="grid w-full grid-cols-1 gap-5 lg:grid-cols-2">
      <InputLabel id="name" label="Name" value={data?.name} readOnly />
      <InputLabel id="email" label="Email" value={data?.email} readOnly />
      <InputLabel id="mobile" label="Mobile" value={data?.mobile} readOnly />
    </div>
  );
}
