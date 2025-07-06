const mongoose = require('mongoose');
const db = async () => {
    await mongoose.connect(process.env.MONGO_URL)
    .then(()=>console.log("mongodb is connected"))
    .catch((e)=>console.log("mongodb not connected"));
}
module.exports = db;