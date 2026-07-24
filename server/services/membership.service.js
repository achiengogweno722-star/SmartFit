import prisma from "../config/prisma.js";

// Subscribe or renew member membership
export const subscribeToMembership = async (userId, data) => {
  const member = await prisma.memberProfile.findUnique({
    where: { userId },
  });

  if (!member) {
    throw new Error("Member profile not found.");
  }

  const now = new Date();
  const durationDays = data.durationDays || 30;
  const expiresAt = new Date(now.getTime() + durationDays * 24 * 60 * 60 * 1000);

  const payment = await prisma.payment.create({
    data: {
      memberId: member.id,
      amount: data.amount,
      currency: data.currency || "USD",
      description: data.description,
      status: "COMPLETED",
      transactionId: data.transactionId || `TX-${Date.now()}`,
    },
  });

  const profile = await prisma.memberProfile.update({
    where: {
      id: member.id,
    },
    data: {
      membershipStatus: "ACTIVE",
      membershipStarted: now,
      membershipExpires: expiresAt,
    },
  });

  return { profile, payment };
};

export const getMembershipByMember = async (userId) => {
  const member = await prisma.memberProfile.findUnique({
    where: { userId },
    include: {
      user: true,
    },
  });

  if (!member) {
    throw new Error("Member profile not found.");
  }

  return member;
};

export const getAllMemberships = async () => {
  return await prisma.memberProfile.findMany({
    include: {
      user: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
};
