const UserServices = require("../services/user-services");

const userServices = new UserServices();

const create = async (req, res) => {
  try {
    const response = await userServices.create({
      email: req.body.email,
      password: req.body.password,
    });

    return res.status(201).json({
      data: response,
      success: true,
      message: "successfully created a new user",
      err: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: {},
      message: "error in creating a user",
      err: { error },
    });
  }
};

const destroy = async (req, res) => {
  try {
    const response = await userServices.destroy(req.body.id);

    return res.status(200).json({
      data: response,
      success: true,
      message: "successfully deleted the new user",
      err: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: {},
      message: "error in deleting a user",
      err: { error },
    });
  }
};

const signIn = async (req, res) => {
  try {
    const response = await userServices.signIn(
      req.body.email,
      req.body.password
    );
    return res.status(200).json({
      data: response,
      message: "Successfully login",
      success: true,
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      message: "login failed",
      success: false,
      err: { error },
    });
  }
};

const isAuthenticated = async (req, res) => {
  try {
    const token = await req.headers["x-access-token"];

    const response = await userServices.isAuthenticated(token);

    return res.status(200).json({
      data: response,
      message: "User get authenticated",
      success: true,
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      message: "login failed",
      success: false,
      err: { error },
    });
  }
};

const isAdmin = async (req, res) => {
  try {
    const response = await userServices.isAdmin(req.body.id);
    return res.status(200).json({
      data: response,
      message: "Successfully fetched isAdmin",
      success: true,
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      message: "Error in checking isAdmin",
      success: false,
      err: { error },
    });
  }
};

module.exports = {
  create,
  destroy,
  signIn,
  isAuthenticated,
  isAdmin,
};
