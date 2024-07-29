import Image from "next/image";
import ProfileNav from "@/components/user/profile-nav";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WagmiReadContractComponent from "@/components/WagmiReadContractComponent"; // Import WagmiReadContractComponent
import UserProfilePage from "@/components/user/user-card";

import { useSession } from "next-auth/react";

const DoctorProfile = () => {
  const { data: session } = useSession();
  return (
    <>
      <div className=" ml-64 z-0">
        <div className="absolute w-[80%] h-[30%] ml-4 mt-[-80px]">
          <Image
            src="/profile-background.png"
            alt="Background"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      </div>
      <div className="relative min-h-screen ml-64 mt-[8rem] flex flex-col items-center z-10">
        <div className="w-[95%] h-[10%]">{/* <ProfileNav /> */}</div>

        <div className="w-full max-w-5xl">
          <div>
            <Tabs defaultValue="account" className="w-full text-center mt-10">
              <TabsList className="grid grid-cols-2 sm:grid-cols-2 gap-4 mb-1">
                <TabsTrigger value="account">Account</TabsTrigger>
              </TabsList>
              <TabsContent value="account">
                {/* <UserProfilePage /> */}
              </TabsContent>
            </Tabs>

            <WagmiReadContractComponent />

            {/* <div className="flex space-x-2 w-[80%]">
              <Card className="flex-1 w-[350px]">
                <CardHeader>
                  <CardTitle>Accessibility Form</CardTitle>
                  <CardDescription>
                    Upload your filled out Accessibility Form
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <FileUpload userId={session.user.id} />
                </CardFooter>
              </Card>
              <Card className="flex-1 w-[350px]">
                <CardHeader>
                  <CardTitle>Student OSAP Form</CardTitle>
                  <CardDescription>
                    Upload your filled out Student OSAP Form
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <FileUpload userId={session.user.id} />
                </CardFooter>
              </Card>
              <Card className="flex-1 w-[350px]">
                <CardHeader>
                  <CardTitle>
                    Express Registration Option (ERO) Intake Form
                  </CardTitle>
                  <CardDescription>
                    Upload your filled out ERO Intake Form
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <FileUpload userId={session.user.id} />
                </CardFooter>
              </Card>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorProfile;
