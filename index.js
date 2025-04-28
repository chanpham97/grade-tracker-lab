const mongoose = require("mongoose");
const express = require("express");

const app = express();

app.use(express.static(__dirname + "/public"));

app.use(express.json());

app.set("view engine", "ejs");

app.use((req, res, next) => {
    console.log(`${req.method}: ${req.path}`);
    next();
});

const studentSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        image: { type: String, default: "https://media4.giphy.com/media/VbnUQpnihPSIgIXuZv/giphy_s.gif?cid=6c09b952i68b0nho6sz7d7ate2gpuittg1r68ttl5z59ef70&ep=v1_gifs_search&rid=giphy_s.gif&ct=g" },
        grade: { type: Number, default: 0 },
    }
);

const Student = mongoose.model("Student", studentSchema, "Students");

app.get("/", async (req, res) => {
    const students = await Student.find({});
    res.render("alma.ejs", { students });
});

// Task 1: Write the DELETE route to delete by ID
// Complete tasks 2 & 3 in alma.ejs and script.js


// Task 4: Write the PATCH route to update by ID 



async function prepopulateDb() {
    try {
        // Feel free to change the names you want to populate
        await Student.insertMany([
            { name: "Laila Springer" },
            { name: "Angel Felix Martinez" },
            { name: "Christian Rojas" },
            { name: "Sophia Rivera" },
        ]);

        console.log('Students added successfully!');
    } catch (err) {
        console.error('Error prepopulating database:', err);
    }
}

async function startServer() {
    // Add your SRV string, make sure that the database is called SE12
    await mongoose.connect("...");

    // Uncomment this and run ONCE to add some students for editing and deleting
    // prepopulateDb()

    app.listen(3000, () => {
        console.log(`Server running.`);
    });
}

startServer();