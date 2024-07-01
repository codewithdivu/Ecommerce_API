import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  const token = jwt.sign(
    { userId: user._id },
    process.env.ACCESS_TOKEN_PRIVATE_KEY,
    {
      expiresIn: "12h",
    }
  );
  return token;
};

export const generateRefreshToken = (user) => {
  const refreshToken = jwt.sign(
    { userId: user._id },
    process.env.ACCESS_TOKEN_PRIVATE_KEY,
    { expiresIn: "30d" }
  );
  return refreshToken;
};
