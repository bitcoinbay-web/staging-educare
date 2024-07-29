import { db } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });
    return user;
  } catch {
    return null;
  }
};

export const getUserByID = async (id: string) => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { id },
      include: {
        accessibilityFormData: true,
        academicFunctionFormData: true,
        assessmentHistoryFormData: true,
        bidirectionalConsentFormData: true,
        disabilityConfirmationFormData: true,
        IntakeFormData: true,
        introConsentSectionData: true,
        StudentOSAPFormData: true,
        studentDisabilitySectionData: true,
        personalInfoSectionData: true,
        AssessmentHistoryData: true,
        DisabilityConfirmationData: true,
        RecommendationFormData: true,
        OSAPDisabilityConfirmationData: true,
      },
    });
    if(existingUser) return removeEmptyArrays(existingUser);
    return null
  } catch {
    return null;
  }
};

export const getDoctorByEmail = async (email: string) => {
  try {
    const user = await db.doctor.findUnique({ where: { email } });
    return user;
  } catch {
    return null;
  }
};

export const getDoctorByID = async (id: string) => {
  try {
    const existingUser = await db.doctor.findUnique({ where: { id } });
    return existingUser;
  } catch {
    return null;
  }
};


const removeEmptyArrays = (data: any) => {
  const result = { ...data };

  Object.keys(result).forEach((key) => {
    if (Array.isArray(result[key])) {
      if (result[key].length === 0) {
        delete result[key];
      }
    } else if (typeof result[key] === 'object' && result[key] !== null) {
      result[key] = removeEmptyArrays(result[key]);
      if (Object.keys(result[key]).length === 0) {
        delete result[key]; 
      }
    }
  });

  return result;
};