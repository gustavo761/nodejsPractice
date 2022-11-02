const mongoose = require("mongoose")

const dbConnect = () => {
  const DB_URI = process.env.DB_URI;
  mongoose.connect(
    DB_URI, 
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err, res) => {
      if(!err) {
        console.log('CONEXIÓN CON BASE DE DATOS CORRECTA');
      } else {
        console.log('OCURRIÓ UN ERROR EN LA CONEXIÓN CON LA BASE DE DATOS');
      }
    }
  )
}

module.exports = dbConnect