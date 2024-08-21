"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

const StudentForm = () => {
  const searchParams = useSearchParams();
  const data = JSON.parse(searchParams.get("data"));

  return (
    <>
      <div className="min-h-screen flex flex-col items-center">
        <div className="w-full max-w-5xl p-4">
          <div className="w-full">
            <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg mt-8">
              <h2 className="text-2xl font-bold mb-4">
                Form Type: {data.formType}
              </h2>
              <h2 className="text-2xl font-bold mb-4">
              </h2>
              <div className="space-y-2">
                {Object.entries(data.formData).map(([key, value]) => {
                  if (key == "id") return (<></>);
                  else{
                    return (
                      <div key={key}>
                        <label className="block font-medium">{key}:</label>
                        <p className="text-gray-700 text-wrap">{String(value)}</p>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentForm;
