import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";

const app = express();

// Use Helmet to set security-related HTTP headers
app.use(helmet());

// Set referrer policy
app.use(helmet.referrerPolicy({ policy: 'strict-origin-when-cross-origin' }));


// app.use(cors({
//     origin: [process.env.FRONTEND_URL],
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD'],
//   })
// );

// http://localhost:5174,
console.log(process.env.FRONTEND_URL2);
app.use(cors({
  origin: process.env.FRONTEND_URL2,
  credentials: true
}))

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

app.use(errorMiddleware);

export { app };
