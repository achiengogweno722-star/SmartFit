import prisma from "../config/prisma.js";
import crypto from "crypto";
import QRCode from "qrcode";

export const createQRCode = async (userId) => {
  const member = await prisma.memberProfile.findUnique({ where: { userId } });

  if (!member) {
    throw new Error("Member profile not found.");
  }
await prisma.qRCode.deleteMany({
  where: {
    memberId: member.id,
  },
});

  const code = crypto.randomBytes(12).toString("hex");
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

  const qrImage = await QRCode.toDataURL(code);

 const qr = await prisma.qRCode.create({
  data: {
    memberId: member.id,
    code,
    expiresAt,
  },
});

return {
  ...qr,
  qrImage,
};
};

export const fetchMyQRCodes = async (userId) => {
  const member = await prisma.memberProfile.findUnique({ where: { userId } });

  if (!member) {
    throw new Error("Member profile not found.");
  }

  return await prisma.qRCode.findMany({
    where: { memberId: member.id },
    orderBy: { createdAt: "desc" },
  });
};
