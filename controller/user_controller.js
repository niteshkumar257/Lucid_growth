import { User } from "../models/user_model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "No User exits" });
    }

    const isPasswordValid = bcrypt.compare(password,10);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Incorrect Password" });
    }

    const token = jwt.sign(
      { userId: user._id, isOwner: user.isOwner },
      process.env.JWT_SCERECT,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Authentication failed" });
  }
};

// Register User
const register = async (req, res) => {
  try {
    const { username, email, password, firstname, lastname } = req.body;
    if (!username || !email || !password || !firstname || !lastname) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExit = await User.findOne({ email });

    if (!userExit) {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User({
        email,
        password: hashedPassword,
        username,
        firstname,
        lastname,
      });
      await user.save();

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SCERECT, {
        expiresIn: "1h",
      });

      res.status(201).json({ token });
    } else {
      return res.status(400).json({ message: "User already exit" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Registration failed" });
  }
};
const edit_profile = async (req, res) => {
  try {
    const { firstname, lastname, bio } = req.body;
    const userId = req.user.id;

    if (!firstname && !lastname && !bio) {
      return res
        .status(400)
        .json({ message: "At least one field must be provided for update" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          ...(firstname && { firstname }),
          ...(lastname && { lastname }),
          ...(bio && { bio }),
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Profile update failed" });
  }
};
const edit_porfile_photo = (req, res) => {};
export { login, register, edit_profile };
