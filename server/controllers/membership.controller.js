import {
  subscribeToMembership,
  getMembershipByMember,
  getAllMemberships as getAllMembershipsService,
} from "../services/membership.service.js";
import { membershipSchema } from "../validations/membership.validation.js";

export const subscribeMembership = async (req, res) => {
  try {
    const validatedData = membershipSchema.parse(req.body);
    const result = await subscribeToMembership(req.user.id, validatedData);

    res.status(201).json({
      success: true,
      message: "Membership subscribed successfully.",
      membership: result.profile,
      payment: result.payment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyMembership = async (req, res) => {
  try {
    const membership = await getMembershipByMember(req.user.id);

    res.status(200).json({
      success: true,
      membership,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllMemberships = async (req, res) => {
  try {
    const memberships = await getAllMembershipsService();

    res.status(200).json({
      success: true,
      count: memberships.length,
      memberships,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
