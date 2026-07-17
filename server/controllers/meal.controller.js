import {
  createMealPlan,
  getMealPlans,
  getMealPlan,
  updateMealPlan,
  deleteMealPlan,
  getMealPlansByGoal,
} from "../services/meal.service.js";

import {
  mealPlanSchema,
  updateMealPlanSchema,
} from "../validations/meal.validation.js";

// Create Meal Plan
export const createMealPlanHandler = async (req, res) => {
  try {
    const validatedData = mealPlanSchema.parse(req.body);

    const mealPlan = await createMealPlan(validatedData);

    res.status(201).json({
      success: true,
      message: "Meal plan created successfully.",
      mealPlan,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Meal Plans
export const getAllMealPlans = async (req, res) => {
  try {
    const mealPlans = await getMealPlans();

    res.status(200).json({
      success: true,
      count: mealPlans.length,
      mealPlans,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Meal Plan By ID
export const getMealPlanById = async (req, res) => {
  try {
    const mealPlan = await getMealPlan(Number(req.params.id));

    res.status(200).json({
      success: true,
      mealPlan,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Meal Plans By Goal
export const getMealPlansForGoal = async (req, res) => {
  try {
    const mealPlans = await getMealPlansByGoal(req.params.goal);

    res.status(200).json({
      success: true,
      count: mealPlans.length,
      mealPlans,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Meal Plan
export const updateMealPlanHandler = async (req, res) => {
  try {
    const validatedData = updateMealPlanSchema.parse(req.body);

    const mealPlan = await updateMealPlan(
      Number(req.params.id),
      validatedData
    );

    res.status(200).json({
      success: true,
      message: "Meal plan updated successfully.",
      mealPlan,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Meal Plan
export const deleteMealPlanHandler = async (req, res) => {
  try {
    const result = await deleteMealPlan(Number(req.params.id));

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};