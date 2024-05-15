import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
  })
);

// get data through "form"
app.use(express.json({ limit: "20kb" }));

// get data through "URL"
app.use(express.urlencoded({ extended: true, limit: "20kb" }));

// cookie-parser
app.use(cookieParser());

app.use("/ping", (_req, res) => {
  res.send("/pong");
});

import userRoutes from './routes/user.routes.js'
import courseRoutes from './routes/course.routes.js'
import paymentRouter from './routes/payment.routes.js'
import miscRoutes from './routes/miscellaneous.routes.js'
import { errorMiddleware } from "./middleware/error.middleware.js";

// user routes
app.use("/api/v1/users", userRoutes);

// course routes
app.use("/api/v1/courses", courseRoutes);

// payment routes
app.use("/api/v1/payments", paymentRouter);

app.use("/api/v1", miscRoutes);

app.all("*", (_req, res) => {
  res.status(404).send("OOPS!! 404 page not found");
});

app.use(errorMiddleware);

export { app };
