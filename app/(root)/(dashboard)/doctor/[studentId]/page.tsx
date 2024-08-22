"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import PractitionerForm from "@/components/forms/PractitionerForm";
import AssessmentHistory from "@/components/forms/AssessmentHistory";
import DisabilityConfirmation from "@/components/forms/DisabilityConfirmation";
import AcademicFunctionForm from "@/components/forms/AcademicFunctionForm";
import RecommendationForm from "@/components/forms/RecommendationForm";
import OSAPDisabilityConfirmation from "@/components/forms/OSAPDisabilityConfirmation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DoctorDashboard: React.FC = () => {
  const { studentId } = useParams();

  const [currentTab, setCurrentTab] = useState("practitioner");
  const [selectedSet, setSelectedSet] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    PractitionerFormData: false,
    accessibilityFormData: false,
    AssessmentHistoryData: false,
    DisabilityConfirmationData: false,
    academicFunctionFormData: false,
    StudentOSAPFormData: false,
    OSAPDisabilityConfirmationData: false,
    RecommendationFormData: false,
  });

  const tabsSet1 = [
    { key: "practitioner", label: "Practitioner", formField: "PractitionerFormData" },
    { key: "history", label: "History", formField: "AssessmentHistoryData" },
    { key: "confirmation", label: "Confirmation", formField: "DisabilityConfirmationData" },
    { key: "academic", label: "Academic", formField: "academicFunctionFormData" },
    { key: "recommendation", label: "Recommendation", formField: "RecommendationFormData" },
  ];

  const tabsSet2 = [
    { key: "OSAP Disability", label: "OSAP Disability", formField: "OSAPDisabilityConfirmationData" },
  ];

  const calculateProgress = () => {
    if (selectedSet === 1) {
      const filledTabs = tabsSet1.filter((tab) => formData[tab.formField]).length;
      return (filledTabs / tabsSet1.length) * 100;
    } else if (selectedSet === 2) {
      const filledTabs = tabsSet2.filter((tab) => formData[tab.formField]).length;
      return (filledTabs / tabsSet2.length) * 100;
    }
    return 0;
  };

  useEffect(() => {
    if (studentId) {
      fetch(`/api/userCondititions?userId=${studentId}`)
        .then((response) => response.json())
        .then((data) => {
          setFormData(data);
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, [studentId]);

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="w-full max-w-5xl p-4">
        <div className="w-full">
          <h1 className="text-2xl font-bold mb-6">Welcome!</h1>

          <div className="flex space-x-4">
            <Card className="mb-6 flex-1">
              <CardHeader>
                <CardTitle>Disability Assessment Form</CardTitle>
              </CardHeader>
              <CardContent className="flex space-x-4">
                <Button
                  onClick={() => {
                    setSelectedSet(1);
                    setCurrentTab(tabsSet1[0].key);
                  }}
                >
                  Disability Assessment Form
                </Button>
              </CardContent>
            </Card>
            <Card className="mb-6 flex-1">
              <CardHeader>
                <CardTitle>OSAP Disability Verification Form</CardTitle>
              </CardHeader>
              <CardContent className="flex space-x-4">
                <Button
                  onClick={() => {
                    setSelectedSet(2);
                    setCurrentTab(tabsSet2[0].key);
                  }}
                  disabled={!formData.StudentOSAPFormData}
                >
                  OSAP Disability Verification Form
                </Button>
              </CardContent>
            </Card>
          </div>

          <progress className="w-full mb-6" value={calculateProgress()} max={100}>
            {calculateProgress()}%
          </progress>

          {selectedSet && (
            <Tabs
              value={currentTab}
              onValueChange={setCurrentTab}
              className="w-full"
            >
              <TabsList className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2 mb-6">
                {(selectedSet === 1 ? tabsSet1 : tabsSet2).map((tab) => (
                  <TabsTrigger key={tab.key} value={tab.key}>
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {selectedSet === 1 && (
                <>
                  <TabsContent value="practitioner">
                    {formData.PractitionerFormData ? (
                      <div className="w-full">
                        <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg mt-8">
                          <h2 className="text-2xl font-bold mb-4">
                            Practitioner Form
                          </h2>
                          <div className="space-y-2">
                            {Object.entries(formData.PractitionerFormData).map(([key, value]) => (
                              key !== "id" && (
                                <div key={key}>
                                  <label className="block font-medium">{key}:</label>
                                  <p className="text-gray-700 text-wrap">{String(value)}</p>
                                </div>
                              )
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <PractitionerForm studentId={studentId as string} />
                    )}
                  </TabsContent>

                  <TabsContent value="history">
                    {formData.AssessmentHistoryData ? (
                      <div className="w-full">
                        <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg mt-8">
                          <h2 className="text-2xl font-bold mb-4">
                            Assessment History Form
                          </h2>
                          <div className="space-y-2">
                            {Object.entries(formData.AssessmentHistoryData).map(([key, value]) => (
                              key !== "id" && (
                                <div key={key}>
                                  <label className="block font-medium">{key}:</label>
                                  <p className="text-gray-700 text-wrap">{String(value)}</p>
                                </div>
                              )
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <AssessmentHistory studentId={studentId as string} />
                    )}
                  </TabsContent>

                  <TabsContent value="confirmation">
                    {formData.DisabilityConfirmationData ? (
                      <div className="w-full">
                        <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg mt-8">
                          <h2 className="text-2xl font-bold mb-4">
                            Disability Confirmation Form
                          </h2>
                          <div className="space-y-2">
                            {Object.entries(formData.DisabilityConfirmationData).map(([key, value]) => (
                              key !== "id" && (
                                <div key={key}>
                                  <label className="block font-medium">{key}:</label>
                                  <p className="text-gray-700 text-wrap">{String(value)}</p>
                                </div>
                              )
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <DisabilityConfirmation studentId={studentId as string} />
                    )}
                  </TabsContent>

                  <TabsContent value="academic">
                    {formData.academicFunctionFormData ? (
                      <div className="w-full">
                        <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg mt-8">
                          <h2 className="text-2xl font-bold mb-4">
                            Academic Function Form
                          </h2>
                          <div className="space-y-2">
                            {Object.entries(formData.academicFunctionFormData).map(([key, value]) => (
                              key !== "id" && (
                                <div key={key}>
                                  <label className="block font-medium">{key}:</label>
                                  <p className="text-gray-700 text-wrap">{String(value)}</p>
                                </div>
                              )
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <AcademicFunctionForm studentId={studentId as string} />
                    )}
                  </TabsContent>

                  <TabsContent value="recommendation">
                    {formData.RecommendationFormData ? (
                      <div className="w-full">
                        <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg mt-8">
                          <h2 className="text-2xl font-bold mb-4">
                            Recommendation Form
                          </h2>
                          <div className="space-y-2">
                            {Object.entries(formData.RecommendationFormData).map(([key, value]) => (
                              key !== "id" && (
                                <div key={key}>
                                  <label className="block font-medium">{key}:</label>
                                  <p className="text-gray-700 text-wrap">{String(value)}</p>
                                </div>
                              )
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <RecommendationForm studentId={studentId as string} />
                    )}
                  </TabsContent>
                </>
              )}

              {selectedSet === 2 && (
                <TabsContent value="OSAP Disability">
                  {formData.OSAPDisabilityConfirmationData ? (
                    <div className="w-full">
                      <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg mt-8">
                        <h2 className="text-2xl font-bold mb-4">
                          OSAP Disability Confirmation Form
                        </h2>
                        <div className="space-y-2">
                          {Object.entries(formData.OSAPDisabilityConfirmationData).map(([key, value]) => (
                            key !== "id" && (
                              <div key={key}>
                                <label className="block font-medium">{key}:</label>
                                <p className="text-gray-700 text-wrap">{String(value)}</p>
                              </div>
                            )
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <OSAPDisabilityConfirmation studentId={studentId as string} />
                  )}
                </TabsContent>
              )}
            </Tabs>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
