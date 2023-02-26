const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const dbConfig = require("./config/db.config.js");


mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Successfully connected to MongoDB.");
})
.catch(err => {
    console.error("Connection error", err);
    process.exit();
});



const port = 2001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// use router from routes folder index.js
app.use("/", require("./routes/index.js"));

app.get("/", (req, res) => {
    res.send("Hello World!");
}
);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
}
);
