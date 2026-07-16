import { registerUser, loginUser } from "../services/auth.service.js";
import { registerSchema, loginSchema } from "../validations/auth.validation.js";
import { generateToken } from "../utils/generateToken.js";

// Register Controller
export const register = async (req, res) => {
  try {
    const validatedData = registerSchema.parse(req.body);

    const user = await registerUser(validatedData);

    const token = generateToken(user);

    res.status(201).json({
      success: true,
      message: "User registered successfully.",
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Login Controller
export const login = async (req, res) => {
  try {
    const validatedData = loginSchema.parse(req.body);

    const user = await loginUser(validatedData);

    const token = generateToken(user);

    res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Current User Controller
export const getCurrentUser = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user: {
        id: req.user.id,
        fullName: req.user.fullName,
        email: req.user.email,
        role: req.user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};