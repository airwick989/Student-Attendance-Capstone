const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000; // Use the specified port or default to 3000

const studentRoutes = require("./routes/studentRoutes");

app.use(express.json());
app.use("/api/studentScan", studentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
