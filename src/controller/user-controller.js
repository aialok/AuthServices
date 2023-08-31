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
    const response = await userServices.delete({
      id: req.params.id,
    });

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

module.exports = {
  create,
  destroy,
};