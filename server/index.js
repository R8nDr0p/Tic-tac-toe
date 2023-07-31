// Import necessary libraries and modules
import express from "express"; // Express framework for creating server
import cors from "cors"; // CORS middleware for handling cross-origin requests
import { StreamChat } from "stream-chat"; // Stream Chat SDK for chat functionality
import { v4 as uuidv4 } from "uuid"; // Generate unique identifiers
import bcrypt from "bcrypt"; // Library for password hashing

const app = express(); // Create an instance of the Express app

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Enable JSON request parsing

// Stream Chat credentials
const api_key = "cyekmqcm8a4e";
const api_secret =
  "auur4dzx3yj5hxb6vphajsebyd9ajbjvx9qxef5wqqybqrth2zcs636kc5mb8e7t";
const serverClient = StreamChat.getInstance(api_key, api_secret);

// Route for user signup
app.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, username, password } = req.body;
    const userId = uuidv4(); // Generate a unique user ID
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the user's password
    const token = serverClient.createToken(userId); // Generate a Stream Chat token for the user
    res.json({ token, userId, firstName, lastName, username, hashedPassword });
  } catch (error) {
    res.json(error);
  }
});

// Route for user login
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const { users } = await serverClient.queryUsers({ name: username });
    if (users.length === 0) return res.json({ message: "User not Found" });

    const token = serverClient.createToken(users[0].id); // Generate a Stream Chat token for the user
    const passwordMatch = await bcrypt.compare(
      password,
      users[0].hashedPassword
    ); // Check if the provided password matches the hashed password
    if (passwordMatch) {
      res.json({
        token,
        firstName: users[0].firstName,
        lastName: users[0].lastName,
        username,
        userId: users[0].id,
      });
    }
  } catch (error) {
    res.json(error);
  }
});

// Start the server and listen on port 3001
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
