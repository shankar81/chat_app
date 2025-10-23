import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "cloudinary";

export const getAllUsers = async (req, res) => {
  try {
    const loggedInUser = req?.user._id;

    const filteredUser = await User.find({ _id: { $ne: loggedInUser } }).select(
      "-password"
    );



    res.status(200).json(filteredUser);
  } catch (error) {
    console.log("error in Get all users controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getmessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("error in Messages controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const sendMessage = async (req,res) => {
  try {
    const { text, image } = req?.body || {};
    const { id: receiverId } = req?.params;
    const senderId = req?.user._id;


    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    console.log(imageUrl)


    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    // socker io code for real time data

    res.status(201).json(newMessage)
  } catch (error) {
    console.log("error in Send Message controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
