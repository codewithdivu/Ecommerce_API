import jwt from "jsonwebtoken";

const isAuthenticatedMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({
      success: false,
      msg: "Unauthorized: No token provided",
    });
  }

  try {
    const decoded = jwt.verify(
      token.split(" ")[1],
      process.env.ACCESS_TOKEN_PRIVATE_KEY
    );

    req.user = decoded?.userId;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        msg: "Unauthorized: Token has expired",
      });
    }
    return res.status(401).json({
      success: false,
      msg: "Unauthorized: Invalid token",
    });
  }
};

export default isAuthenticatedMiddleware;
