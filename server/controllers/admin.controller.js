export const adminDashboard = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome Admin!",
    user: {
      id: req.user.id,
      fullName: req.user.fullName,
      email: req.user.email,
      role: req.user.role,
    },
  });
};