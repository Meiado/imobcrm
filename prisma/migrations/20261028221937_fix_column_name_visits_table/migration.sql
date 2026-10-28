/*
  Warnings:

  - You are about to drop the column `oportunityId` on the `Visit` table. All the data in the column will be lost.
  - Added the required column `opportunityId` to the `Visit` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Visit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "leadId" TEXT NOT NULL,
    "brokerId" TEXT NOT NULL,
    "opportunityId" TEXT NOT NULL,
    "scheduledAt" DATETIME NOT NULL,
    "durationMin" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "feedback" TEXT,
    CONSTRAINT "Visit_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Visit_brokerId_fkey" FOREIGN KEY ("brokerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Visit_opportunityId_fkey" FOREIGN KEY ("opportunityId") REFERENCES "Opportunity" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Visit" ("brokerId", "durationMin", "feedback", "id", "leadId", "scheduledAt", "status") SELECT "brokerId", "durationMin", "feedback", "id", "leadId", "scheduledAt", "status" FROM "Visit";
DROP TABLE "Visit";
ALTER TABLE "new_Visit" RENAME TO "Visit";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
