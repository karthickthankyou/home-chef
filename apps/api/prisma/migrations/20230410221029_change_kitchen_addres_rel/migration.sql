/*
  Warnings:

  - You are about to drop the column `addressId` on the `Kitchen` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[kitchenId]` on the table `Address` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Kitchen" DROP CONSTRAINT "Kitchen_addressId_fkey";

-- DropIndex
DROP INDEX "Kitchen_addressId_key";

-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "kitchenId" INTEGER;

-- AlterTable
ALTER TABLE "Kitchen" DROP COLUMN "addressId";

-- CreateIndex
CREATE UNIQUE INDEX "Address_kitchenId_key" ON "Address"("kitchenId");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_kitchenId_fkey" FOREIGN KEY ("kitchenId") REFERENCES "Kitchen"("id") ON DELETE SET NULL ON UPDATE CASCADE;
