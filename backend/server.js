const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const cors = require('cors');
const connectDB = require("./config/db");

//dotenv conig
dotenv.config();

//mongodb connection
connectDB();

//rest obejct
const app = express();
app.use(cors({
  origin: 'http://localhost:3000'
}));

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//routes
app.use("/user", require("./routes/userRoutes"));


app.use('/uploads', express.static('uploads'));
//port
const port = process.env.PORT || 8080;
//listen port
app.listen(port, () => {
  console.log(
    `Server Running on port ${process.env.PORT}`
      .bgCyan.white
  );
});
