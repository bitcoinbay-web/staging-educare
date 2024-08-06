/*
  Warnings:

  - You are about to drop the `HealthPractitionerFormData` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `account` to the `practitioners` table without a default value. This is not possible if the table is not empty.
  - Added the required column `signedMessage` to the `practitioners` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "HealthPractitionerFormData" DROP CONSTRAINT "HealthPractitionerFormData_user_id_fkey";

-- AlterTable
ALTER TABLE "AccessibilityFormData" ADD COLUMN     "status" TEXT DEFAULT 'pending';

-- AlterTable
ALTER TABLE "BidirectionalConsentFormData" ADD COLUMN     "status" TEXT DEFAULT 'pending';

-- AlterTable
ALTER TABLE "IntakeFormData" ADD COLUMN     "status" TEXT DEFAULT 'pending';

-- AlterTable
ALTER TABLE "IntroConsentSectionData" ADD COLUMN     "status" TEXT DEFAULT 'pending';

-- AlterTable
ALTER TABLE "OSAPDisabilityConfirmationData" ALTER COLUMN "assessmentDate" SET DATA TYPE TEXT,
ALTER COLUMN "signatureDate" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "PersonalInfoSectionData" ADD COLUMN     "status" TEXT DEFAULT 'pending';

-- AlterTable
ALTER TABLE "StudentDisabilitySectionData" ADD COLUMN     "status" TEXT DEFAULT 'pending';

-- AlterTable
ALTER TABLE "StudentOSAPFormData" ADD COLUMN     "status" TEXT DEFAULT 'pending';

-- AlterTable
ALTER TABLE "doctors" ADD COLUMN     "available" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "stars" TEXT NOT NULL DEFAULT '4',
ADD COLUMN     "title" TEXT;

-- AlterTable
ALTER TABLE "practitioners" ADD COLUMN     "account" TEXT NOT NULL,
ADD COLUMN     "signedMessage" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "doctorId" TEXT;

-- DropTable
DROP TABLE "HealthPractitionerFormData";

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE SET NULL ON UPDATE CASCADE;
