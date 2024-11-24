/*
  Warnings:

  - You are about to drop the column `streetcity` on the `Purchase` table. All the data in the column will be lost.
  - Added the required column `city` to the `Purchase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `Purchase` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Purchase" (
    "purchase_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "customer_id" INTEGER NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "credit_card" TEXT NOT NULL,
    "credit_expire" TEXT NOT NULL,
    "credit_cvv" TEXT NOT NULL,
    "invoice_amt" TEXT NOT NULL,
    "invoice_tax" TEXT NOT NULL,
    "invoice_total" TEXT NOT NULL,
    "order_date" DATETIME NOT NULL
);
INSERT INTO "new_Purchase" ("country", "credit_card", "credit_cvv", "credit_expire", "customer_id", "invoice_amt", "invoice_tax", "invoice_total", "order_date", "postal_code", "province", "purchase_id") SELECT "country", "credit_card", "credit_cvv", "credit_expire", "customer_id", "invoice_amt", "invoice_tax", "invoice_total", "order_date", "postal_code", "province", "purchase_id" FROM "Purchase";
DROP TABLE "Purchase";
ALTER TABLE "new_Purchase" RENAME TO "Purchase";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
