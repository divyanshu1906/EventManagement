const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://divyanshusinha19:divyanshu@cluster0.mhpje5x.mongodb.net/")
.then(() => {
    console.log("Connection successful");
}).catch((e) => {
    console.error("Error connecting to MongoDB:", e.message);
});
