import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const StudentRequest = () => {
  return (
    <>
      <div className="pt-10 pl-20 ml-64 h-full">
        <h1 className="text-2xl font-semibold">Student Request #12334</h1>
        <Card className="w-[90%] mt-14">
          <div className="flex justify-between items-start">
            <CardHeader>
              <CardTitle>Accessibility Form</CardTitle>
              <CardDescription>
                This form needs to be approved by the admin to ensure
                Accessibility requirements are met
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-8">
              <button className="mr-2 bg-green-500 text-white px-4 py-2 rounded-sm">
                Approve
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded-sm">
                Reject
              </button>
            </CardContent>
          </div>
        </Card>
        <Card className="w-[90%] mt-4">
          <div className="flex justify-between items-start">
            <CardHeader>
              <CardTitle>OSAP Disability Form</CardTitle>
              <CardDescription>
                Verification form for OSAP disability benefits, pending admin
                approval.
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-8">
              <button className="mr-2 bg-green-500 text-white px-4 py-2 rounded-sm">
                Approve
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded-sm">
                Reject
              </button>
            </CardContent>
          </div>
        </Card>
        <Card className="w-[90%] mt-4">
          <div className="flex justify-between items-start">
            <CardHeader>
              <CardTitle>Intake Form</CardTitle>
              <CardDescription>
                Initial intake form that requires admin approval for further
                processing.
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-8">
              <button className="mr-2 bg-green-500 text-white px-4 py-2 rounded-sm">
                Approve
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded-sm">
                Reject
              </button>
            </CardContent>
          </div>
        </Card>
      </div>
    </>
  );
};

export default StudentRequest;
