/*
  Warnings:

  - Added the required column `imageLink` to the `Shirt` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Shirt" ADD COLUMN     "imageLink" TEXT NOT NULL;
