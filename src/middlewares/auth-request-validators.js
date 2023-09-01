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

module.exports = {
  validUserauth,
};
