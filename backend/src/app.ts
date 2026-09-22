import express from "express";
import colorRoutes from "./routes/color.routes.js";
import cors from "cors";

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));

app.use(express.json());

app.use("/api/color", colorRoutes);

app.get("/", (req, res) => {
  res.send("Backend funktioniert!");
});

export default app;