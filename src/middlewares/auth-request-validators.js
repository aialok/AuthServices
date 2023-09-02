const validUserauth = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      success: false,
      data: {},
      message: "Email or password is missing",
      err: { error: "Email or password is missing" },
    });
  }

  next();
};

const validAdminReq = (req, res, next) => {
  if (!req.body.id) {
    return res.status(400).json({
      success: false,
      data: {},
      message: "UserId is missing",
      err: { error: "valid input is required" },
    });
  }
  next();
};

module.exports = {
  validUserauth,
  validAdminReq,
};
