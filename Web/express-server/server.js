const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000; // Use the specified port or default to 3000

const classroomScan = require("./routes/classroomRoute");

app.use(express.json());
app.use("/api/classroomScan", classroomScan);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
