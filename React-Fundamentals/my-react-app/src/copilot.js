// Express server on port 3000
const express = require("express");
const app = express();
const port = 3000;
// Return the current time
app.get("/", (req, res) => {
  res.send(`${new Date()}`);
});
// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

