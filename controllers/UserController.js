const models = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const tokenServices = require ('../services/token')

exports.signin = async (req, res, next) => {
  try {
    const user = await models.user.findOne({
      where: { email: req.body.email },
    });
    if (user) {
      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (passwordIsValid) {
        const token = await tokenServices.encode(user);

        res.status(200).send({ auth: true, accessToken: token
             //user: user 
            });
      } else {
        res.status(401).json({
          error: "Error en usuario o contraseña",
        });
      }
    } else {
      res.status(404).json({
        error: "Error en usuario o contraseña",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error!!",
    });
    next(error);
  }    
};
