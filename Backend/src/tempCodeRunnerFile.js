const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');

app.use(session({
    secret: 'your_secret_key', 
    resave: false,
    saveUninitialized: false
}));

require("./db/conn");
const Register = require("./models/signUp");
const Event = require("./models/event"); 
const GoogleFormResponse = require("./models/googleFormResponse"); 

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");
app.use(express.static(static_path));

const static_path1 = path.join(__dirname, "../public/sign" );
const static_path2 = path.join(__dirname, "../public/main");

app.use(express.json());
app.use(express.urlencoded({extended: false}));

const bcrypt = require('bcrypt');

app.get('/', (req, res) =>{
    res.sendFile(path.join(static_path2, "index.html"));
});

app.get('/register', (req, res) =>{
    res.sendFile(path.join(static_path1, "signIn.html"));
})

app.post('/signup', async (req, res)=>{
    try {
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;

        if(password === confirmPassword){
            const registerStudent = new Register({
                name: req.body.name,
                gender: req.body.gender,
                email: req.body.email,
                phone: req.body.phone,
                registrationNumber: req.body.registrationNumber,
                password: password ,
                confirmPassword: confirmPassword
            })
            const registered = await registerStudent.save();
            res.status(201).send(index);
        }else{
            res.send("password are not matching");
        }

    } catch (error) {
        res.status(400).send(error);
    }
})

app.post('/login', async (req, res) => {
    try {
        const { registrationNumber, password } = req.body;

        const user = await Register.findOne({ registrationNumber });

        if (user) {
            if (password === user.password) {
                res.sendFile(path.join(static_path2, "main.html"));
            } else {
                res.status(401).send("Invalid credentials");
            }
        } else {
            res.status(404).send("User not found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(static_path2, "index.html"));
});

app.post('/logout', (req, res) => {
    // Perform logout actions here, such as clearing session or cookies
    // For example, if you're using Express session, you can destroy the session:
    req.session.destroy((err) => {
        if (err) {
            console.error("Error destroying session:", err);
            res.status(500).send("Error logging out");
        } else {
            // Redirect the user to the login page after logout
            res.redirect('/login');
        }
    });
});

function generateOTP() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 6;
    let otp = '';
    for (let i = 0; i < length; i++) {
        otp += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return otp;
}
const otp = generateOTP();
console.log("Generated OTP:", otp); 

app.post('/addEvent', async (req, res) => {
    try {
        // Extract event data from request body
        const { eventName, eventOrganizer, eventDate, startTime, endTime, eventPlace, dutyLeaves, googleFormLink } = req.body;

        // Ensure all required fields are present in the request
        if (!eventName || !eventOrganizer || !eventDate || !startTime || !endTime || !eventPlace || !dutyLeaves || !googleFormLink) {
            console.log("Missing Required Fields");
            return res.status(400).json({ error: "Missing required fields" });
        }
        
        // Generate a random OTP
        const otp = generateOTP();
        
        // Create a new event object
        const newEvent = new Event({
            eventName,
            eventOrganizer,
            eventDate,
            startTime,
            endTime,
            eventPlace,
            dutyLeaves,
            googleFormLink,
            otp // Save OTP with event details
        });
        console.log("New Event:", newEvent);

        // Save the event to the database
        const savedEvent = await newEvent.save();

        console.log("Saved Event:", savedEvent);

        // Send response with the saved event data
        res.status(200).json({ savedEvent, otp  });

    } catch (error) {
        console.error("Error during event addition:", error);
        res.status(500).send("Internal server error");
    }
});


app.get('/fetchEvents', async (req, res) => {
    try {
        // Fetch all events from the database
        const events = await Event.find({});
        res.status(200).json(events);
    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).send("Internal server error");
    }
});




app.listen(port, ()=>{
    console.log(`server is running at port no ${port}`);
});  