"use client";
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccessibilityForm from "@/components/forms/AccessibilityForm";
import StudentOSAPForm from "@/components/forms/StudentOSAP";
import IntroConsentSection from "@/components/forms/IntroConsentSection";
import StudentDisabilitySection from "@/components/forms/StudentDisabilitySection";
import PersonalInfoSection from "@/components/forms/PersonalInfoSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSession } from "next-auth/react";

const UserProfilePage = () => {
  const [currentTab, setCurrentTab] = useState("student");
  const [selectedSet, setSelectedSet] = useState<number | null>();
  const { data: session } = useSession();

  const tabsSet1 = ["student"];
  const tabsSet2 = ["student OSAP"];
  const tabsSet3 = ["intake Form", "student Disability", "personal Info"];
  const allTabs = [...tabsSet1, ...tabsSet2, ...tabsSet3];

  const calculateProgress = () => {
    let filledTabs = 0;
    if (selectedSet === 1) {
      filledTabs = tabsSet1.indexOf(currentTab) + 1;
      return (filledTabs / tabsSet1.length) * 100;
    } else if (selectedSet === 2) {
      filledTabs = tabsSet2.indexOf(currentTab) + 1;
      return (filledTabs / tabsSet2.length) * 100;
    } else if (selectedSet === 3) {
      filledTabs = tabsSet3.indexOf(currentTab) + 1;
      return (filledTabs / tabsSet3.length) * 100;
    }
    return 0;
  };

  const isAccessible = session?.user?.form1;

  useEffect(() => {
    if (session) {
      const isAccessible = session?.user?.form1;
      setSelectedSet(isAccessible ? null : 1);
    }
  }, [session]);

  useEffect(() => {
    calculateProgress();
  }, [currentTab, selectedSet]);

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="w-full max-w-5xl p-4">
        <div className="w-full mb-6">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Choose Form Set</CardTitle>
            </CardHeader>
            <CardContent className="flex space-x-4">
              <Button
                onClick={() => {
                  setSelectedSet(1);
                  setCurrentTab(tabsSet1[0]);
                }}
              >
                Fill Out Accessibility Form
              </Button>
              <Button
                onClick={() => {
                  setSelectedSet(2);
                  setCurrentTab(tabsSet2[0]);
                }}
              >
                Fill Out Student OSAP Form
              </Button>
              <Button
                onClick={() => {
                  setSelectedSet(3);
                  setCurrentTab(tabsSet3[0]);
                }}
              >
                Fill Out Other Forms
              </Button>
            </CardContent>
          </Card>

          <progress
            className="w-full mb-6"
            value={calculateProgress()}
            max={100}
          >
            {calculateProgress()}%
          </progress>

          {selectedSet && (
            <Tabs
              value={currentTab}
              onValueChange={setCurrentTab}
              className="w-full"
            >
              <TabsList className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-6">
                {(selectedSet === 1
                  ? tabsSet1
                  : selectedSet === 2
                  ? tabsSet2
                  : tabsSet3
                ).map((tab) => (
                  <TabsTrigger key={tab} value={tab}>
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </TabsTrigger>
                ))}
              </TabsList>

              {selectedSet === 1 && (
                <TabsContent value="student">
                  <AccessibilityForm />
                </TabsContent>
              )}
              {selectedSet === 2 && (
                <TabsContent value="student OSAP">
                  <StudentOSAPForm />
                </TabsContent>
              )}
              {selectedSet === 3 && (
                <>
                  <TabsContent value="intake Form">
                    <IntroConsentSection />
                  </TabsContent>
                  <TabsContent value="student Disability">
                    <StudentDisabilitySection />
                  </TabsContent>
                  <TabsContent value="personal Info">
                    <PersonalInfoSection />
                  </TabsContent>
                </>
              )}
            </Tabs>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
