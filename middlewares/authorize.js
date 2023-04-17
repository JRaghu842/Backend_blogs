let authorize = (permittedRoles) => {
  return (req, res, next) => {
    let user_role = req.body.Role;
    if (permittedRoles.includes(user_role)) {
      next();
    } else {
      res.send({ msg: "Unauthorized to acess" });
    }
  };
};

module.exports = {
  authorize,
};
