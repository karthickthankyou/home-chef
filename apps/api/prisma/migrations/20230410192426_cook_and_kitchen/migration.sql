-- CreateTable
CREATE TABLE "Cook" (
    "uid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cook_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "Kitchen" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT,
    "image" TEXT,
    "about" TEXT,
    "open" BOOLEAN NOT NULL DEFAULT false,
    "cookId" TEXT,

    CONSTRAINT "Kitchen_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Kitchen_cookId_key" ON "Kitchen"("cookId");

-- AddForeignKey
ALTER TABLE "Kitchen" ADD CONSTRAINT "Kitchen_cookId_fkey" FOREIGN KEY ("cookId") REFERENCES "Cook"("uid") ON DELETE SET NULL ON UPDATE CASCADE;
