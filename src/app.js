import express from "express";
import indexRoutes from "./routes/index.routes.js";
import employeesRoutes from "./routes/employees.routes.js";

// Initialize Express App.
const app = express();

// JSON compatibility.
app.use(express.json());

// Funtiona Routes.
app.use(indexRoutes);
app.use("/api", employeesRoutes);

// Not Found Route.
app.use((req, res, next) => {
  res.status(404).json({ message: "endpoint not found" });
});

export default app;
