const express = require("express");
const cors = require("cors");
const winston = require("winston");

const app = express();
app.use(cors());

require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();
require("./startup/prod")(app);

console.log(process.env);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}....`));
