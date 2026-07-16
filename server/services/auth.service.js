import bcrypt from "bcrypt";
import prisma from "../config/prisma.js";

export const registerUser = async (data) => {
  const { fullName, email, password, role } = data;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("Email is already registered.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      fullName,
      email,
      password: hashedPassword,
      role: role || "MEMBER",
    },
  });

  return user;
};

export const loginUser = async (data) => {
  const { email, password } = data;

  // Find user by email
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Invalid email or password.");
  }

  // Compare passwords
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid email or password.");
  }

  return user;
};