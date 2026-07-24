import prisma from "../config/prisma.js";
import crypto from "crypto";

export const createQRCode = async (userId) => {
  const member = await prisma.memberProfile.findUnique({ where: { userId } });

  if (!member) {
    throw new Error("Member profile not found.");
  }

  const code = crypto.randomBytes(12).toString("hex");
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

  return await prisma.qRCode.create({
    data: {
      memberId: member.id,
      code,
      expiresAt,
    },
  });
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
