import app from "./app.js";
import { PORT } from "./config.js";

// Server Port.
app.listen(PORT);
console.log("Server running on port", PORT);
