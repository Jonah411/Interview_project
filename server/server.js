const express = require("express");
const app = express();
const errorHandler = require("./middleware/errorHandler");
require("dotenv").config();
const cors = require("cors");
const corOptions = require("./config/corOptions");
const connectDB = require("./config/dbConnection");

app.use(errorHandler);
app.use(express.json());
const port = process.env.PORT || 5000;
connectDB();
app.use(cors(corOptions));

app.use("/api", require("./routes/userRoutes"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
