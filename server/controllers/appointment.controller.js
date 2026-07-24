import {
  scheduleAppointment,
  fetchMemberAppointments,
  fetchTrainerAppointments,
  changeAppointmentStatus,
} from "../services/appointment.service.js";
import { appointmentSchema, appointmentStatusSchema } from "../validations/appointment.validation.js";

export const createAppointment = async (req, res) => {
  try {
    const validatedData = appointmentSchema.parse(req.body);
    const appointment = await scheduleAppointment(req.user.id, validatedData);

    res.status(201).json({
      success: true,
      appointment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMemberAppointments = async (req, res) => {
  try {
    const appointments = await fetchMemberAppointments(req.user.id);

    res.status(200).json({
      success: true,
      count: appointments.length,
      appointments,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getTrainerAppointments = async (req, res) => {
  try {
    const appointments = await fetchTrainerAppointments(req.user.id);

    res.status(200).json({
      success: true,
      count: appointments.length,
      appointments,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateAppointmentStatus = async (req, res) => {
  try {
    const validatedData = appointmentStatusSchema.parse(req.body);
    const appointment = await changeAppointmentStatus(
      Number(req.params.appointmentId),
      validatedData.status
    );

    res.status(200).json({
      success: true,
      appointment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
