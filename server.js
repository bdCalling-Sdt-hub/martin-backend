const port = process.env.PORT || 5000;
const dbConnection = require("./config/db");
const app = require("./app");
require("dotenv").config();

dbConnection(process.env.DB_URL);
const server = app.listen(port, "192.168.10.45", () => {
  console.log("Application running on port", port);
});
