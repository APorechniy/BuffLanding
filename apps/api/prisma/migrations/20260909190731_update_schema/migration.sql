-- CreateTable
CREATE TABLE "User" (
    "userId" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "subId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'new',
    "expiresAt" DATETIME,
    "trialUsed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Payment" (
    "orderId" TEXT NOT NULL PRIMARY KEY,
    "userId" BIGINT NOT NULL,
    "amount" REAL NOT NULL,
    "tariffId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_subId_key" ON "User"("subId");
