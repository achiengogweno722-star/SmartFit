import {
  createMemberProfile,
  getMemberProfile,
  updateMemberProfile,
  assignTrainer,
} from "../services/member.service.js";

import {
  memberProfileSchema,
  updateMemberProfileSchema,
} from "../validations/member.validation.js";

// Create Member Profile
export const createProfile = async (req, res) => {
  try {
    const validatedData = memberProfileSchema.parse(req.body);

    const profile = await createMemberProfile(req.user.id, validatedData);

    res.status(201).json({
      success: true,
      message: "Member profile created successfully.",
      profile,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Member Profile
export const getProfile = async (req, res) => {
  try {
    const profile = await getMemberProfile(req.user.id);

    res.status(200).json({
      success: true,
      profile,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Member Profile
export const updateProfile = async (req, res) => {
  try {
    const validatedData = updateMemberProfileSchema.parse(req.body);

    const profile = await updateMemberProfile(req.user.id, validatedData);

    res.status(200).json({
      success: true,
      message: "Member profile updated successfully.",
      profile,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Assign Trainer to Member
export const assignTrainerToMember = async (req, res) => {
  try {
    const { memberId, trainerId } = req.params;

    const member = await assignTrainer(
      Number(memberId),
      Number(trainerId)
    );

    res.status(200).json({
      success: true,
      message: "Trainer assigned successfully.",
      member,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};