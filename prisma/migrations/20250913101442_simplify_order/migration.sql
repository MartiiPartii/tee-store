/*
  Warnings:

  - You are about to drop the `_OrderItems` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `itemId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."_OrderItems" DROP CONSTRAINT "_OrderItems_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_OrderItems" DROP CONSTRAINT "_OrderItems_B_fkey";

-- AlterTable
ALTER TABLE "public"."Order" ADD COLUMN     "itemId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "public"."_OrderItems";

-- AddForeignKey
ALTER TABLE "public"."Order" ADD CONSTRAINT "Order_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "public"."Shirt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
