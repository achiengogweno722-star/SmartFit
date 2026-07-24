import dotenv from 'dotenv';
dotenv.config();
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const run = async () => {
  const columns = await prisma.$queryRaw`
    SELECT column_name
    FROM information_schema.columns
    WHERE table_name = 'MemberProfile'
    ORDER BY ordinal_position;
  `;
  console.log('MemberProfile columns:', columns.map((c) => c.column_name));
  const qrCols = await prisma.$queryRaw`
    SELECT column_name
    FROM information_schema.columns
    WHERE table_name = 'QRCode'
    ORDER BY ordinal_position;
  `;
  console.log('QRCode columns:', qrCols.map((c) => c.column_name));
  const appointmentCols = await prisma.$queryRaw`
    SELECT column_name
    FROM information_schema.columns
    WHERE table_name = 'Appointment'
    ORDER BY ordinal_position;
  `;
  console.log('Appointment columns:', appointmentCols.map((c) => c.column_name));
  process.exit(0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});