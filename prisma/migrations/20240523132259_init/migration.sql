-- CreateTable
CREATE TABLE "Materials" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Materials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Person" (
    "dni" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT[],
    "email" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("dni")
);

-- CreateTable
CREATE TABLE "Distributor" (
    "id" TEXT NOT NULL,
    "dni" TEXT NOT NULL,
    "nit" TEXT NOT NULL,

    CONSTRAINT "Distributor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" TEXT NOT NULL,
    "dni" TEXT NOT NULL,
    "bornDate" TIMESTAMP(3) NOT NULL,
    "salary" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transportist" (
    "id" TEXT NOT NULL,
    "dni" TEXT NOT NULL,
    "license" TEXT NOT NULL,

    CONSTRAINT "transportist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "dni" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Register" (
    "id" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Register_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Distributor_dni_key" ON "Distributor"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_dni_key" ON "Employee"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "transportist_dni_key" ON "transportist"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_dni_key" ON "Admin"("dni");

-- AddForeignKey
ALTER TABLE "Distributor" ADD CONSTRAINT "Distributor_dni_fkey" FOREIGN KEY ("dni") REFERENCES "Person"("dni") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_dni_fkey" FOREIGN KEY ("dni") REFERENCES "Person"("dni") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transportist" ADD CONSTRAINT "transportist_dni_fkey" FOREIGN KEY ("dni") REFERENCES "Person"("dni") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_dni_fkey" FOREIGN KEY ("dni") REFERENCES "Person"("dni") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Register" ADD CONSTRAINT "Register_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
