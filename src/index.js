process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
import cors from "cors";
import AuthRouter from "./routes/authRoutes.js";
import { connectDB } from "./db/connection.js";
import notFound from "./middlewares/notFound.js";
import UserRouter from "./routes/userRoutes.js";
import ProductRouter from "./routes/productRoutes.js";

import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import cartRouter from "./routes/cartRoutes.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

// -------------swagger---------------------
const swaggerOption = {
  swaggerDefinition: (swaggerJSDoc.Options = {
    info: {
      version: "3.0.0",
      title: "MyApi",
      description: "API documentation",
      contact: {
        name: "Divyesh",
      },
      servers: ["http://localhost:8888/"],
    },
  }),
  apis: ["index.js", "./routes/*.js"],
};
const swaggerDocs = swaggerJSDoc(swaggerOption);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get("/", (req, res) => {
  res.send("<h1>MyApp-API</h1>");
});

app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/user", UserRouter);
app.use("/api/v1/product", ProductRouter);
app.use("/api/v1/cart", cartRouter);

// middlewares

app.use(notFound);

const port = process.env.PORT || 8888;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is listening at port ${port}...`);
    });
  } catch (error) {
    console.log("error", error);
  }
};

start();
