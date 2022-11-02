const express = require("express");
const cors = require("cors");
const dbConnect = require("./config/mongo");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("storage"));

const port = process.env.PORT || 3000;

// INvocamos a las rutas 
// http://localhost/api/....
app.use("/api", require("./routes"));

app.listen(port, () => {
  console.log(`Aplicación disponible en http://localhost:${port}`);
})

dbConnect();