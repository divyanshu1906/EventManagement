const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/EventMangementUsers")
.then(() => {
    console.log("Connection successful");
}).catch((e) => {
    console.error("Error connecting to MongoDB:", e.message);
});
