import { NextRequest, NextResponse } from 'next/server'; // Import necessary modules from Next.js server
import { PrismaClient } from '@prisma/client'; // Import PrismaClient from Prisma
import { z } from 'zod'; // Import zod for schema validation

// Initialize PrismaClient instance
const prisma = new PrismaClient();

// Define the schema for the form using zod
const formSchema = z.object({
  impacts: z.object({
    listening: z.object({
      level: z.enum(['N/A', 'Mild', 'Mod', 'Serious', 'Severe']),
      comments: z.string().optional(),
    }),
    reading: z.object({
      level: z.enum(['N/A', 'Mild', 'Mod', 'Serious', 'Severe']),
      comments: z.string().optional(),
    }),
    takingNotes: z.object({
      level: z.enum(['N/A', 'Mild', 'Mod', 'Serious', 'Severe']),
      comments: z.string().optional(),
    }),
    completingAssignments: z.object({
      level: z.enum(['N/A', 'Mild', 'Mod', 'Serious', 'Severe']),
      comments: z.string().optional(),
    }),
    writingTests: z.object({
      level: z.enum(['N/A', 'Mild', 'Mod', 'Serious', 'Severe']),
      comments: z.string().optional(),
    }),
    deliveringPresentations: z.object({
      level: z.enum(['N/A', 'Mild', 'Mod', 'Serious', 'Severe']),
      comments: z.string().optional(),
    }),
    meetingDeadlines: z.object({
      level: z.enum(['N/A', 'Mild', 'Mod', 'Serious', 'Severe']),
      comments: z.string().optional(),
    }),
    participatingInGroup: z.object({
      level: z.enum(['N/A', 'Mild', 'Mod', 'Serious', 'Severe']),
      comments: z.string().optional(),
    }),
  }),
  cognitiveSkills: z.object({
    attentionConcentration: z.object({
      level: z.enum(['N/A', 'Mild', 'Mod', 'Serious', 'Severe']),
      comments: z.string().optional(),
    }),
    informationProcessing: z.object({
      level: z.enum(['N/A', 'Mild', 'Mod', 'Serious', 'Severe']),
      comments: z.string().optional(),
    }),
    shortTermMemory: z.object({
      level: z.enum(['N/A', 'Mild', 'Mod', 'Serious', 'Severe']),
      comments: z.string().optional(),
    }),
    longTermMemory: z.object({
      level: z.enum(['N/A', 'Mild', 'Mod', 'Serious', 'Severe']),
      comments: z.string().optional(),
    }),
  }),
  socioEmotional: z.object({
    fatigue: z.object({
      level: z.enum(['N/A', 'Mild', 'Mod', 'Serious', 'Severe']),
      comments: z.string().optional(),
    }),
    managingCourseLoad: z.object({
      level: z.enum(['N/A', 'Mild', 'Mod', 'Serious', 'Severe']),
      comments: z.string().optional(),
    }),
    managingStress: z.object({
      level: z.enum(['N/A', 'Mild', 'Mod', 'Serious', 'Severe']),
      comments: z.string().optional(),
    }),
    mood: z.object({
      level: z.enum(['N/A', 'Mild', 'Mod', 'Serious', 'Severe']),
      comments: z.string().optional(),
    }),
    socialInteractions: z.object({
      level: z.enum(['N/A', 'Mild', 'Mod', 'Serious', 'Severe']),
      comments: z.string().optional(),
    }),
    attendingClass: z.object({
      level: z.enum(['N/A', 'Mild', 'Mod', 'Serious', 'Severe']),
      comments: z.string().optional(),
    }),
  }),
  physicalActivity: z.object({
    lifting: z.object({
      level: z.enum(['N/A', 'Mild', 'Mod', 'Serious', 'Severe']),
      comments: z.string().optional(),
    }),
    grossMotorReaching: z.object({
      level: z.enum(['N/A', 'Mild', 'Mod', 'Serious', 'Severe']),
      comments: z.string().optional(),
    }),
    bending: z.object({
      level: z.enum(['N/A', 'Mild', 'Mod', 'Serious', 'Severe']),
      comments: z.string().optional(),
    }),
    writing: z.object({
      level: z.enum(['N/A', 'Mild', 'Mod', 'Serious', 'Severe']),
      comments: z.string().optional(),
    }),
    typing: z.object({
      level: z.enum(['N/A', 'Mild', 'Mod', 'Serious', 'Severe']),
      comments: z.string().optional(),
    }),
    otherPhysical: z.object({
      level: z.enum(['N/A', 'Mild', 'Mod', 'Serious', 'Severe']),
      comments: z.string().optional(),
    }),
    walking: z.object({
      level: z.enum(['N/A', 'Mild', 'Mod', 'Serious', 'Severe']),
      comments: z.string().optional(),
    }),
    stairClimbing: z.object({
      level: z.enum(['N/A', 'Mild', 'Mod', 'Serious', 'Severe']),
      comments: z.string().optional(),
    }),
    sittingForPeriods: z.object({
      level: z.enum(['N/A', 'Mild', 'Mod', 'Serious', 'Severe']),
      comments: z.string().optional(),
    }),
    standingForPeriods: z.object({
      level: z.enum(['N/A', 'Mild', 'Mod', 'Serious', 'Severe']),
      comments: z.string().optional(),
    }),
    otherActivity: z.object({
      level: z.enum(['N/A', 'Mild', 'Mod', 'Serious', 'Severe']),
      comments: z.string().optional(),
    }),
  }),
  sensory: z.object({
    visionRightEye: z.object({
      level: z.enum(['N/A', 'Mild', 'Mod', 'Serious', 'Severe']),
      comments: z.string().optional(),
    }),
    visionLeftEye: z.object({
      level: z.enum(['N/A', 'Mild', 'Mod', 'Serious', 'Severe']),
      comments: z.string().optional(),
    }),
    visionBilateral: z.object({
      level: z.enum(['N/A', 'Mild', 'Mod', 'Serious', 'Severe']),
      comments: z.string().optional(),
    }),
    hearingRightEar: z.object({
      level: z.enum(['N/A', 'Mild', 'Mod', 'Serious', 'Severe']),
      comments: z.string().optional(),
    }),
    hearingLeftEar: z.object({
      level: z.enum(['N/A', 'Mild', 'Mod', 'Serious', 'Severe']),
      comments: z.string().optional(),
    }),
    hearingBilateral: z.object({
      level: z.enum(['N/A', 'Mild', 'Mod', 'Serious', 'Severe']),
      comments: z.string().optional(),
    }),
    speech: z.object({
      level: z.enum(['N/A', 'Mild', 'Mod', 'Serious', 'Severe']),
      comments: z.string().optional(),
    }),
  }),
  medicationImpact: z.object({
    takesMedication: z.enum(['yes', 'no']),
    medicationDetails: z.string().optional(),
  }),
  additionalInfo: z.string().optional(),
  userId: z.string(),
  account: z.string(),
  signedMessage: z.string(),
});

// Define the POST request handler
export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const body = await req.json();
    // Validate the request body against the schema
    const validatedData = formSchema.parse(body);

    const {
      impacts,
      cognitiveSkills,
      socioEmotional,
      physicalActivity,
      sensory,
      medicationImpact,
      additionalInfo,
      userId,
      account,
      signedMessage,
    } = validatedData;

    // Create a new entry in the database with the validated data
    const createdForm = await prisma.academicFunctionFormData.create({
      data: {
        impacts: JSON.stringify(impacts),
        cognitiveSkills: JSON.stringify(cognitiveSkills),
        socioEmotional: JSON.stringify(socioEmotional),
        physicalActivity: JSON.stringify(physicalActivity),
        sensory: JSON.stringify(sensory),
        medicationImpact: JSON.stringify(medicationImpact),
        additionalInfo,
        userId,
        account,
        signedMessage,
      },
    });

    // Return a successful response with the created form data
    return NextResponse.json(createdForm, { status: 201 });
  } catch (error) {
    console.error('Error creating form data:', error);
    // Return an error response if the form data could not be saved
    return NextResponse.json({ error: 'Failed to save form data' }, { status: 500 });
  }
}

// Define the GET request handler to return a 405 Method Not Allowed response
export function GET() {
  return NextResponse.json({ error: 'Method GET Not Allowed' }, { status: 405 });
}
