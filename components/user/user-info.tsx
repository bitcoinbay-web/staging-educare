import { ExtendedUser } from "@/next-auth";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { updateUser } from "@/lib/actions/updateUser";
import { useAccount } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";

interface UserInfoProps {
  user?: ExtendedUser;
  label: string;
}

export const UserInfo = ({ user, label }) => {
  const { open } = useWeb3Modal();
  const { address } = useAccount();

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      stdID: user?.stdID || "",
      walletID: user?.walletID || address || "",
    },
  });

  // Automatically set the wallet ID when the wallet is connected
  if (address) {
    setValue("walletID", address);
  }

  const onSubmit = async (data: { stdID: string; walletID: string }) => {
    const result = await updateUser({ ...data, userId: user?.id || "" });
    if (result.error) {
      setError(result.error);
    } else {
      setSuccess(result.success);
    }
  };

  return (
    <Card className="w-[600px] shadow-md">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">{label}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-row items-center justify-between rounded-lg p-3 shadow-sm">
          <p className="test-sm font-medium">ID</p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
            {user?.id}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg p-3 shadow-sm">
          <p className="test-sm font-medium">Name</p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
            {user?.name}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg p-3 shadow-sm">
          <p className="test-sm font-medium">Email</p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
            {user?.email}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg p-3 shadow-sm">
          <p className="test-sm font-medium">Role</p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
            {user?.role}
          </p>
        </div>

        {/* Conditionally Render Student ID */}
        {user?.stdID ? (
          <div className="flex flex-row items-center justify-between rounded-lg p-3 shadow-sm">
            <p className="test-sm font-medium">Student ID</p>
            <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
              {user.stdID}
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            <label className="font-medium">Student ID</label>
            <Input
              {...register("stdID")}
              placeholder="Enter Your Student ID"
              className="w-full"
            />
          </div>
        )}

        {/* Conditionally Render Wallet ID */}
        {user?.walletID ? (
          <div className="flex flex-row items-center justify-between rounded-lg p-3 shadow-sm">
            <p className="test-sm font-medium">Wallet Address</p>
            <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
              {user.walletID}
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            <label className="font-medium">Wallet Address</label>
            <div className="flex w-full items-center space-x-2">
              <Input
                {...register("walletID")}
                id="wallet-input"
                placeholder="Click on the button to connect to your wallet"
                value={address || ""}
                readOnly
              />
              <Button
                type="button"
                className="bg-[#7C1749]"
                id="connect-button"
                onClick={() => open()}
              >
                {address ? "CONNECTED" : "CONNECT"}
              </Button>
            </div>
          </div>
        )}

        {error && <div className="text-red-500">{error}</div>}
        {success && <div className="text-green-500">{success}</div>}

        {/* Submit Button for the form fields if editable */}
        {(!user?.stdID || !user?.walletID) && (
          <Button
            type="submit"
            className="w-full bg-[#3E84EC]"
            onClick={handleSubmit(onSubmit)}
          >
            Update Info
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
