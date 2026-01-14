import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import type { TAddress } from "@/types/api";
import {
  useAddresss,
  useDeleteAddress,
  useUpdateAddress,
} from "@/hooks/useAddress";
import AddressModal from "@/components/account/AddressModal";

export default function AddressBook() {
  const { data } = useAddresss();
  const [selectedAddress, setSelectedAddress] = useState<TAddress | null>(null);
  const [open, setOpen] = useState<"none" | "new" | "view">("none");
  const { mutate: deleteAddress } = useDeleteAddress();
  const { mutate: updateAddress } = useUpdateAddress();

  const handleDelete = (id: string) => {
    deleteAddress(id);
  };

  const handleSetDefault = (id: string) => {
    updateAddress({ formData: { isDefault: true }, id });
  };

  return (
    <div className="font-poppins flex items-center justify-center bg-transparent">
      <div className="w-full max-w-4xl space-y-6 p-6">
        {data?.data?.map((a: TAddress) => (
          <div
            key={a?._id}
            className={`relative rounded-lg border border-[#6767674D] ${a.isDefault ? "bg-[#FFFAF0]" : "bg-white"}`}
          >
            <div className="mb-2 flex w-full items-center justify-between border-b border-[#6767674D] p-4 pb-1 text-xs text-gray-600">
              <span> {a?.isDefault && "Default Address"}</span>
              {!a?.isDefault && (
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-full border-[#B0B0B0]"
                  onClick={() => handleSetDefault(a._id ?? "")}
                >
                  Set as Default
                </Button>
              )}
            </div>

            <div className="p-4">
              <p className="text-lg font-semibold">{a?.name}</p>
              <p className="text-sm">{a?.phone}</p>
              <p className="text-sm">{a?.email}</p>

              <p className="mt-1 text-sm whitespace-pre-line">
                {a?.addressLine1}
                {a?.addressLine2 ? `, ${a.addressLine2}` : ""}
                {a?.landmark ? `, Landmark: ${a.landmark}` : ""}, {a?.city},{" "}
                {a?.state} - {a?.pincode}
              </p>
            </div>

            <div className="flex items-center gap-2 px-4 py-2">
              <Button
                className="max-w-xs flex-1 rounded-full bg-black text-white hover:bg-gray-900"
                onClick={() => {
                  setSelectedAddress(a);
                  setOpen("view");
                }}
              >
                Edit
              </Button>
              <Button
                variant="outline"
                onClick={() => handleDelete(a._id ?? "")}
                className="h-10 w-10 rounded-full border-red-500 text-red-500 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}

        {/* Add new address */}
        <Button
          type="button"
          className="w-full cursor-pointer rounded-3xl bg-[#351043] px-4 py-3 font-medium text-white transition-colors hover:bg-purple-950 focus:ring-2 focus:ring-purple-700 focus:ring-offset-2 focus:outline-none"
          onClick={() => {
            setSelectedAddress(null);
            setOpen("new");
          }}
        >
          Add New Address
        </Button>
      </div>

      <AddressModal
        open={open === "new" || open === "view"}
        onClose={() => setOpen("none")}
        address={selectedAddress}
      />
    </div>
  );
}
