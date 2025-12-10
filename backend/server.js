const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 5000;

const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/mydb";

mongoose.connect(mongoURI)
  .then(() => console.log("mongodb is connected"))
  .catch((err) => console.log(err));


const notesRouter = require("./routes/notesRoutes")
app.use("/notes",notesRouter)

app.listen(port, () => {
  console.log(`listining at http://localhost:${port}`);
});
