import prisma from "../config/prisma.js";

export const scheduleAppointment = async (userId, data) => {
  const member = await prisma.memberProfile.findUnique({ where: { userId } });

  if (!member) {
    throw new Error("Member profile not found.");
  }

  const trainer = await prisma.trainerProfile.findUnique({
    where: { id: data.trainerId },
  });

  if (!trainer) {
    throw new Error("Trainer profile not found.");
  }

  return await prisma.appointment.create({
    data: {
      memberId: member.id,
      trainerId: data.trainerId,
      scheduledAt: new Date(data.scheduledAt),
      notes: data.notes,
    },
  });
};

export const fetchMemberAppointments = async (userId) => {
  const member = await prisma.memberProfile.findUnique({ where: { userId } });

  if (!member) {
    throw new Error("Member profile not found.");
  }

  return await prisma.appointment.findMany({
    where: { memberId: member.id },
    include: {
      trainer: {
        include: {
          user: {
            select: { id: true, fullName: true, email: true },
          },
        },
      },
    },
    orderBy: { scheduledAt: "asc" },
  });
};

export const fetchTrainerAppointments = async (userId) => {
  const trainer = await prisma.trainerProfile.findUnique({ where: { userId } });

  if (!trainer) {
    throw new Error("Trainer profile not found.");
  }

  return await prisma.appointment.findMany({
    where: { trainerId: trainer.id },
    include: {
      member: {
        include: {
          user: {
            select: { id: true, fullName: true, email: true },
          },
        },
      },
    },
    orderBy: { scheduledAt: "asc" },
  });
};

export const changeAppointmentStatus = async (appointmentId, status) => {
  const appointment = await prisma.appointment.findUnique({
    where: { id: appointmentId },
  });

  if (!appointment) {
    throw new Error("Appointment not found.");
  }

  return await prisma.appointment.update({
    where: { id: appointmentId },
    data: { status },
  });
};
