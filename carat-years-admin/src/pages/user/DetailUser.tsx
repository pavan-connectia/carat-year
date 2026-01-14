import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { IdCard, LucideArrowLeft, Package, Users } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import UserInfo from "@/components/user/UserInfo";
import { useUserById } from "@/hooks/useUser";

const tabs = [
  { value: "personal", label: "Personal Information", icon: IdCard },
  { value: "orders", label: "Orders", icon: Package },
];

export default function UserForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useUserById(id ?? "");
  const [seletedTab, setseletedTab] = useState("personal");

  const userData = data?.data;

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-5">
        <Button variant="outline" onClick={() => navigate(-1)}>
          <LucideArrowLeft />
        </Button>

        <h2 className="text-xl font-semibold capitalize lg:text-2xl">
          {userData?.name}
        </h2>
      </div>

      <div className="flex flex-col gap-5 md:flex-row">
        <Card className="w-full max-w-sm space-y-1 p-5 text-center">
          <div className="bg-background/50 mx-auto w-fit rounded-full p-5">
            <Users size={40} />
          </div>

          <h3 className="text-lg font-semibold"> {userData?.name}</h3>
          <p className="text-muted-foreground"> {userData?.email}</p>
          <p> {userData?.mobile}</p>

          <div className="mt-5 w-full space-y-3">
            {tabs.map((t) => (
              <Button
                variant={t.value === seletedTab ? "default" : "outline"}
                className="w-full cursor-pointer text-right"
                onClick={() => setseletedTab(t.value)}
              >
                <t.icon />
                {t.label}
              </Button>
            ))}
          </div>
        </Card>

        <Card className="w-full p-5">
          {seletedTab === "personal" && <UserInfo data={userData} />}
        </Card>
      </div>
    </div>
  );
}
