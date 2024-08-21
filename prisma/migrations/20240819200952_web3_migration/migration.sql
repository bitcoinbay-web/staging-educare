-- CreateEnum
CREATE TYPE "OnboardingStatus" AS ENUM ('PENDING', 'REGISTERED', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "onboarding" "OnboardingStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "tokenURI" TEXT;
