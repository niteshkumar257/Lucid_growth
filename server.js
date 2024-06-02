import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/user_routes.js";
import blogRouter from "./routes/blog_routes.js";
import errorHandler from "./Utils/error_middleware.js";
import CustomeError from "./Utils/cutsom_error.js";




dotenv.config();
// dotenv

const app = express();
const port = process.env.PORT || 8000;

// cors origin
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
  // all origins are allowed
);

app.use(express.json({ limit: "16kb" })); // json body
app.use(express.urlencoded({ extended: true })); // to decode the url special character





// routes
app.get("/",(req,res)=>{
    res.status(200).json("Home Route")
})
app.use("/api/v1/user", userRouter);
app.use("/api/v1/blog", blogRouter);



// error handling
app.use(errorHandler);

app.listen(port,()=>{
   console.log(`server started on ${port}`);
})
