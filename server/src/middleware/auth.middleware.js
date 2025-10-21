import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const isAuthenticate = async (req, res, next) => {
  try {
    const token = req.cookies.getCookie;

    if (!token)
      return res
        .status(400)
        .json({ message: "Unauthorized: No Token Provided" });

    const decodeData = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodeData)
      return res.status(400).json({ message: "Unauthorized: Invalid token" });

    req.user = await User.findById(decodeData.id);

    next();
  } catch (error) {}
};
