const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");

dotenv.config();

const app = express();

const userRoutes = require("./routes/User");
const categoryRoutes = require("./routes/Category");
const listingRoutes = require("./routes/Listing");
const reviewRoutes = require("./routes/Review");

require("./config/database").dbConnect();
require("./config/cloudinary").cloudinaryConnect();

const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

app.use("/api/v2/auth", userRoutes);
app.use("/api/v2/category", categoryRoutes);
app.use("/api/v2/listing", listingRoutes);
app.use("/api/v2/review", reviewRoutes);

app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Server is active and running ....",
  });
});

app.get("/test", (req, res) => {
  res.send("Test route is working ...");
});

app.listen(port, () => {
  console.log(`Server is running at port ${port} ...`);
});
