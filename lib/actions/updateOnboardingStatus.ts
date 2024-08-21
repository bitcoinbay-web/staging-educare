// lib/updateOnboardingStatus.ts

export async function updateOnboardingStatus(
  userId: string,
  onboardingStatus: string
) {
  try {
    const response = await fetch(`/api/mintStatus?id=${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ onboardingStatus }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to update onboarding status");
    }

    return data;
  } catch (error) {
    console.error("Error occurred while updating onboarding status:", error);
    throw error; // Re-throw the error to handle it in the component
  }
}
