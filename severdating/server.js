const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bodyparse = require("body-parser");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const User = require("./model/user.model");
const Chat = require("./model/chat.model");

const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(cors());
const port = 3000;
app.use(bodyparse.urlencoded({ extended: false }));
app.use(bodyparse.json());

const mongodb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://ubmishra200:datingapp@cluster0.wwmhbis.mongodb.net/"
    );
    console.log("mongodb is start");
  } catch (error) {
    console.log(error);
  }
};
mongodb();
app.listen(port, () => {
  console.log("server start");
});

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userexist = await User.findOne({ email });
    if (userexist) {
      return res.json({ message: "User already exist" });
    }
    const newuser = new User({ name, email, password });
    newuser.verificationtoken = await crypto.randomBytes(20).toString("hex");

    await newuser.save();
    sendVerificationEmail(newuser.email, newuser.verificationtoken);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "some thing error", error });
  }
});
const sendVerificationEmail = async (email, verificationToken) => {
  const transpoter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mvsgroup200@gmail.com",
      pass: "kbfk cpki ywfg dkhf",
    },
  });
  const mailOption = {
    from: "mvsgroup200@gmail.com",
    to: email,
    subject: "Verify Email dating App",
    text: `The click on following link to verifed email: http://localhost:3000/verify/${verificationToken}`,
  };
  try {
    await transpoter.sendMail(mailOption);
  } catch (error) {
    console.log(error, "email verification errror");
  }
};

app.get("/verify/:token", async (req, res) => {
  try {
    const token = req.params.token;

    const user = await User.findOne({ verificationtoken: token });

    if (!user) {
      res.json({ message: "user Not Exist Register Now" });
    }
    user.varifed = true;
    user.verificationtoken = undefined;
    await user.save();
    res.json({ message: "Login sucessfully" });
  } catch (error) {
    console.log(error, "email verifed failed");
    res.json({
      error,
      message: "Email Verifiction filed",
    });
  }
});
const generateSecretKey = async () => {
  const secret = crypto.randomBytes(32).toString("hex");
  return secret;
};
const secretKey = generateSecretKey();

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.json({
        message: "user Id or password is wrong",
      });
    }
    const token = jwt.sign({ userId: user._id }, "secretKey");

    res.json({ token });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Login Error Try To Next Time" });
  }
});
app.put("/users/:userId/gender", async (req, res) => {
  try {
    const { userId } = req.params;
    const { gender } = req.body;
    const user = await User.findByIdAndUpdate(
      userId,
      { gender: gender },
      { new: true }
    );
    if (!user) {
      return res.json({ message: "Network Error Gender Updation" });
    }
    return res.status(200).json({ message: "gender Update" });
  } catch (error) {
    console.log("gender update error", error);
    res.json({ message: "error something network" });
  }
});
//endpoint to update the user description
app.put("/users/:userId/description", async (req, res) => {
  try {
    const { userId } = req.params;
    const { description } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      {
        description: description,
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(200)
      .json({ message: "User description updated succesfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating user description" });
  }
});

//fetch users data
app.get("/users/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(500).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error fetching the user details" });
  }
});

//end point to add a turnon for a user in the backend
app.put("/users/:userId/turn-ons/add", async (req, res) => {
  try {
    const { userId } = req.params;
    const { turnOn } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { turnOns: turnOn } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(200)
      .json({ message: "Turn on updated succesfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error adding the turn on" });
  }
});

//endpoint to remove a particular turn on for the user
app.put("/users/:userId/turn-ons/remove", async (req, res) => {
  try {
    const { userId } = req.params;

    const { turnOn } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { turnOns: turnOn } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(200)
      .json({ message: "Turn on removed succesfully", user });
  } catch (error) {
    return res.status(500).json({ message: "Error removing turn on" });
  }
});

//end point to add a lookingFor  for a user in the backend
app.put("/users/:userId/looking-for", async (req, res) => {
  try {
    const { userId } = req.params;
    const { lookingFor } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      {
        $addToSet: { lookingFor: lookingFor },
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "No user" });
    }

    return res
      .status(200)
      .json({ message: "Looking for updated succesfully".user });
  } catch (error) {
    res.status(500).json({ message: "Error updating looking for", error });
  }
});

//endpoint to remove looking for in the backend
app.put("/users/:userId/looking-for/remove", async (req, res) => {
  try {
    const { userId } = req.params;
    const { lookingFor } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { lookingFor: lookingFor },
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "No user" });
    }

    return res
      .status(200)
      .json({ message: "Looking for updated succesfully".user });
  } catch (error) {
    res.status(500).json({ message: "Error removing looking for", error });
  }
});

app.post("/users/:userId/profile-images", async (req, res) => {
  try {
    const { userId } = req.params;
    const { imageUrl } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.profileImages.push(imageUrl);

    await user.save();

    return res.status(200).json({ message: "Image has been added", user });
  } catch (error) {
    res.status(500).json({ message: "Error addding the profile images" });
  }
});
//endpoint to fetch all the profiles for a particular user
app.get("/profiles", async (req, res) => {
  const { userId, gender, turnOns, lookingFor } = req.query;

  try {
    let filter = { gender: gender === "male" ? "female" : "male" }; // For gender filtering

    // Add filtering based on turnOns and lookingFor arrays
    if (turnOns) {
      filter.turnOns = { $in: turnOns };
    }

    if (lookingFor) {
      filter.lookingFor = { $in: lookingFor };
    }

    const currentUser = await User.findById(userId)
      .populate("matches", "_id")
      .populate("crushes", "_id");

    // Extract IDs of friends
    const friendIds = await currentUser.matches.map((friend) => friend._id);

    // Extract IDs of crushes
    const crushIds = await currentUser.crushes.map((crush) => crush._id);

    const profiles = await User.find(filter)
      .where("_id")
      .nin([userId, ...friendIds, ...crushIds]);

    return res.status(200).json({ profiles });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching profiles", error });
  }
});
// Api for profiles creations

//send-like api filessss
app.post("/send-like", async (req, res) => {
  const { currentUserId, selectedUserId } = req.body;

  try {
    //update the recepient's friendRequestsArray!
    await User.findByIdAndUpdate(selectedUserId, {
      $push: { recievedLikes: currentUserId },
    });
    //update the sender's sentFriendRequests array
    await User.findByIdAndUpdate(currentUserId, {
      $push: { crushes: selectedUserId },
    });

    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

//ednpoint to get the details of the received Likes
app.get("/received-likes/:userId/details", async (req, res) => {
  const { userId } = req.params;

  try {
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch details of users who liked the current user
    const receivedLikesDetails = [];
    for (const likedUserId of user.recievedLikes) {
      const likedUser = await User.findById(likedUserId);
      if (likedUser) {
        receivedLikesDetails.push(likedUser);
      }
    }

    res.status(200).json({ receivedLikesDetails });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching received likes details",
      error: error.message,
    });
  }
});

//endpoint to create a match betweeen two people
app.post("/create-match", async (req, res) => {
  try {
    const { currentUserId, selectedUserId } = req.body;

    //update the selected user's crushes array and the matches array
    await User.findByIdAndUpdate(selectedUserId, {
      $push: { matches: currentUserId },
      $pull: { crushes: currentUserId },
    });

    //update the current user's matches array recievedlikes array
    await User.findByIdAndUpdate(currentUserId, {
      $push: { matches: selectedUserId },
      $pull: { recievedLikes: selectedUserId },
    });

    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ message: "Error creating a match", error });
  }
});

//endpoint to get all the matches of the particular user
app.get("/users/:userId/matches", async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const matchIds = user.matches;

    const matches = await User.find({ _id: { $in: matchIds } });

    res.status(200).json({ matches });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving the matches", error });
  }
});
io.on("connection", (socket) => {
  console.log("a user is connected");

  socket.on("sendMessage", async (data) => {
    try {
      const { senderId, receiverId, message } = data;

      const newMessage = new Chat({ senderId, receiverId, message });
      await newMessage.save();

      //emit the message to the receiver
      io.to(receiverId).emit("receiveMessage", newMessage);
    } catch (error) {
      console.log("Error handling the messages");
    }
    socket.on("disconnet", () => {
      console.log("user disconnected");
    });
  });
});

http.listen(8000, () => {
  console.log("Socket.IO server running on port 8000");
});

app.get("/messages", async (req, res) => {
  try {
    const { senderId, receiverId } = req.query;

    const messages = await Chat.find({
      $or: [
        { senderId: senderId, receiverId: receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    }).populate("senderId", "_id name");

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error in getting messages", error });
  }
});

//endpoint to delete the messages;

app.post("/delete", async (req, res) => {
  try {
    const { messages } = req.body;

    if (!Array.isArray(messages) || messages.length == 0) {
      return res.status(400).json({ message: "Invalid request body" });
    }

    for (const messageId of messages) {
      await Chat.findByIdAndDelete(messageId);
    }

    res.status(200).json({ message: "Messages delted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});
