"use client"; // This directive is used in Next.js to indicate that the file contains client-side code

import { useState, useEffect } from 'react'; // Import useState hook
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Import Tabs components
import AccessibilityForm from "@/components/forms/AccessibilityForm"; // Import AccessibilityForm component
import StudentOSAPForm from "@/components/forms/StudentOSAP"; // Import StudentOSAPForm component
import IntroConsentSection from "@/components/forms/IntroConsentSection"; // Import IntroConsentSection component
import StudentDisabilitySection from "@/components/forms/StudentDisabilitySection"; // Import StudentDisabilitySection component
import PersonalInfoSection from "@/components/forms/PersonalInfoSection"; // Import PersonalInfoSection component
import { Button } from "@/components/ui/button"; // Import Button component
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Import Card components

const UserProfilePage = () => {
  // State to track the current active tab
  const [currentTab, setCurrentTab] = useState('student');
  const [selectedSet, setSelectedSet] = useState<number | null>(null); // State to manage the selected form set

  const tabsSet1 = ['student'];
  const tabsSet2 = ['student OSAP'];
  const tabsSet3 = ['intake Form', 'student Disability', 'personal Info'];
  const allTabs = [...tabsSet1, ...tabsSet2, ...tabsSet3];

  // Function to calculate the progress based on the active tab and selected set
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

  // Recalculate progress whenever the current tab or selected set changes
  useEffect(() => {
    calculateProgress();
  }, [currentTab, selectedSet]);

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="w-full max-w-5xl p-4">
        <div className="w-full mb-6">
          {/* Card components to encapsulate the buttons for better UI */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Choose Form Set</CardTitle>
            </CardHeader>
            <CardContent className="flex space-x-4">
              <Button onClick={() => { setSelectedSet(1); setCurrentTab(tabsSet1[0]); }}>
                Fill Out Accessibility Form
              </Button>
              <Button onClick={() => { setSelectedSet(2); setCurrentTab(tabsSet2[0]); }}>
                Fill Out Student OSAP Form
              </Button>
              <Button onClick={() => { setSelectedSet(3); setCurrentTab(tabsSet3[0]); }}>
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

          {/* Conditionally render Tabs component based on the selected set */}
          {selectedSet && (
            <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
              <TabsList className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-6">
                {/* Render tab triggers based on the selected set */}
                {(selectedSet === 1 ? tabsSet1 : selectedSet === 2 ? tabsSet2 : tabsSet3).map(tab => (
                  <TabsTrigger key={tab} value={tab}>
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* Render tab content based on the selected set */}
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

export default UserProfilePage; // Export the UserProfilePage component as the default export
