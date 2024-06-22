import express, { request } from "express";
import MongoDB from "./Config/MongoDB.js";
import ProductModel from "./Api/Models/AddProduct.js";
import cors from "cors";
import multer from "multer";
import { movieStoreItems } from "./Config/DB.js";
import bcrypt from "bcrypt";
import UserModel from "./Api/Models/User.js";
import { uploadStream } from "./Api/Helpers/CloudineryUploader.js";

const app = express();
// The port number on which the server will listen for incoming requests.
const port = 6969;
app.use(express.json());
app.use(cors());
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/Films", (req, res) => {
  res.send(movieStoreItems);
  console.log(movieStoreItems);
});

app.post("/api/auth/signin", async (req, res) => {
  try {
    const user = req.body;

    // Check if the request body contains an email and password
    if (user.email && user.password) {
      // Query the database to find a user with the given email
      const data = await UserModel.findOne({ email: user.email });

      // If a user is found
      if (data) {
        // Check if the provided password matches the user's password
        const isMatch = await bcrypt.compare(user.password, data.password);

        // If the password is invalid
        if (!isMatch) {
          // Send a response indicating that the password is invalid
          res.status(401).send({ message: "Invalid Password" });
          return; // Exit the function
        } else {
          // If the password is valid
          // Send a response indicating that the password matched and include the user data
          res.send({ message: "Matched Password", data });
        }
      } else {
        // If no user is found with the given email
        // Send a response indicating that the email is invalid
        res.status(404).send({ message: "Invalid Email" });
      }
    } else {
      res.status(400).send({ message: "Email and Password are required" });
    }
  } catch (error) {
    console.log("An Error happpened While geting data From BE", error.message);
  }
});


app.post("/api/auth/signup", upload.single("image"), async (req, res) => {
  try {
    // Extract user information from request body
    const user = req.body;
    let imgURL = "";

    // If user uploaded an image, upload it to cloud storage service
    if (req.file) {
      const buffer = req.file.buffer;
      const uploadedImg = await uploadStream(buffer);
      imgURL = uploadedImg.url;
    }

    // Connect to MongoDB
    await MongoDB();

    // Generate password hash
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(user.password, salt);

    // Create user in the database
    const data = await UserModel.create({
      fristname: user.fristname,
      lastname: user.lastname,
      email: user.email,
      password: hashedPassword,
      image: imgURL,
      UserInfo: user.UserInfo,
    });

    // Send success response
    res.status(201).json({ message: "User created successfully", data });
  } catch (error) {
    // Log and send error response
    console.log("An Error happened While posting data", error.message);
    res.status(500).send(error.message);
  }
});
const startServer = async () => {
  await MongoDB();
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
};

startServer();
