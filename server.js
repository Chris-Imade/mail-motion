import express from "express";
import cors from "cors";
import userDataRouter from "./router/userData.js";

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "1mb" }));

// Enable cors for all routes
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Routes

app.use('/mail-motion', userDataRouter);

app.get("/", (req, res) => {
  res.send("App works fine ☺️");
});

// Middleware to catch errors during development
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});


const PORT = process.env.PORT || 4500;


app.listen(PORT, () => {
  console.log(`Server Running on PORT ${PORT}`);
});
