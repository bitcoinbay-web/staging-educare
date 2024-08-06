"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useParams, useRouter } from "next/navigation";

interface FormData {
  [key: string]: any;
}

interface AssociatedForms {
  [key: string]: FormData;
}

const OSAP = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>("formData");
  const [formData, setFormData] = useState<FormData | null>(null);
  const [associatedForms, setAssociatedForms] = useState<AssociatedForms>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);
  const { studentID } = useParams();
  const searchParams = useSearchParams();
  const formType = searchParams.get("formType");

  useEffect(() => {
    if (studentID && formType) {
      fetch(`/api/adminCheck?studentId=${studentID}&formType=${formType}`)
        .then((response) => response.json())
        .then((data) => {
          const [form] = data;
          setFormData(form.formData);
          setAssociatedForms(form.associatedForms || {});
          setIsLoading(false);
          setIsDataLoaded(true);
        })
        .catch((error) => {
          console.error("Error fetching form data:", error);
          setIsLoading(false);
          setIsDataLoaded(false);
        });
    }
  }, [studentID, formType]);

  const handleAction = (action: string) => {
    fetch(`/api/decision`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action, studentID, formType }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Action response:", data);
        router.push("/admin/dashboard");
      })
      .catch((error) => {
        console.error("Error submitting action:", error);
      });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pt-10 pl-20 ml-64 h-full">
      <h1 className="text-2xl font-semibold">Student Request #{studentID}</h1>
      <p className="text-md text-muted-foreground">OSAP Disability Form</p>
      <div className="w-[400px] mt-5">
        <Tabs value={activeTab} onChange={setActiveTab}>
          <TabsList>
            <TabsTrigger
              value="formData"
              isActive={activeTab === "formData"}
              onClick={() => setActiveTab("formData")}
            >
              Main Form
            </TabsTrigger>
            {Object.keys(associatedForms).map((formKey, index) => (
              <TabsTrigger
                key={index}
                value={`associated-${index}`}
                isActive={activeTab === `associated-${index}`}
                onClick={() => setActiveTab(`associated-${index}`)}
              >
                {formKey}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="formData" isActive={activeTab === "formData"}>
            {formData && (
              <div>
                {Object.entries(formData).map(([key, value]) => (
                  <div key={key} className="mb-2">
                    <strong>{key} :</strong> {typeof value === "object" ? JSON.stringify(value, null, 2) : value}
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
          {Object.entries(associatedForms).map(([formKey, form], index) => (
            <TabsContent key={index} value={`associated-${index}`} isActive={activeTab === `associated-${index}`}>
              {Object.entries(form).map(([key, value]) => (
                <div key={key} className="mb-2">
                  <strong>{key} :</strong> {typeof value === "object" ? JSON.stringify(value, null, 2) : value}
                </div>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </div>
      {isDataLoaded && (
        <div className="flex mt-4">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mr-2"
            onClick={() => handleAction("approve")}
          >
            Approve
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={() => handleAction("reject")}
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );
};

const Tabs = ({ value, onChange, children }: { value: string; onChange: (value: string) => void; children: React.ReactNode }) => (
  <div>{children}</div>
);

const TabsList = ({ children }: { children: React.ReactNode }) => (
  <div className="flex">{children}</div>
);

const TabsTrigger = ({ value, isActive, onClick, children }: { value: string; isActive: boolean; onClick: () => void; children: React.ReactNode }) => (
  <button
    className={`px-4 py-2 ${isActive ? "bg-blue-500 text-white" : "bg-gray-200"}`}
    onClick={onClick}
  >
    {children}
  </button>
);

const TabsContent = ({ value, isActive, children }: { value: string; isActive: boolean; children: React.ReactNode }) => (
  <div className={`p-4 ${isActive ? "block" : "hidden"}`}>{children}</div>
);

export default OSAP;
