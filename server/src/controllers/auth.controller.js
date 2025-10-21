import User from "../models/user.model.js";
import sendToken from "../utils/jwtToken.js";

export const Register = async (req, res) => {
  const { fullName, email, password } = req?.body || {};

  try {
    if (!fullName || !email || !password)
      return res.status(400).json({ message: "Required all fields" });

    if (password.length < 6)
      return res
        .status(400)
        .json({ message: "Password must be atleast 6 characters" });

    const user = await User.findOne({ email });

    if (user) return res.status(400).json({ message: "Email already exist" });

    const newUser = new User({ fullName, email, password });

    if (newUser) {
      const token = newUser.getJwtToken();
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullname: newUser.fullName,
        email: newUser.email,
        profilepic: newUser.profilePic,
        token,
      });
    } else return res.status(400).json({ message: "invalid user data" });
  } catch (error) {
    console.log("eror in register controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const Login = async (req, res) => {
  const { email, password } = req?.body || {};
  try {
    if (!email || !password)
      return res.status(400).json({ message: "Required all fields" });

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isPasswordMatch = user.comparePassword(password);

    if (!isPasswordMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    sendToken(user, 200, res);
  } catch (error) {
    console.log("eror in login controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const Logout = (req, res) => {
  try {
    res.cookie("getCookie", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "Logout Successfull",
    });
  } catch (error) {
    console.log("eror in logout controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
