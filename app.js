const express = require("express");
const bodyParser = require("body-parser");

var app = express();
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/todo");
const trySchema = new mongoose.Schema({
    name: String
});

const Item = mongoose.model("task", trySchema);

const todo = new Item({
    name: "create some videos"
});

const todo2 = new Item({
    name: "Learn Dsa"
});

const todo3 = new Item({
    name: "Learn react"
});

const todo4 = new Item({
    name: "Learn node.js"
});

todo.save();
todo2.save();
todo3.save();
todo4.save()

app.get("/", async function (req, res) {
    try {
        const foundItems = await Item.find({});
        res.render("list", { dayej: foundItems });
    } catch (err) {
        console.log(err);
        res.status(500).send("An error occurred");
    }
});

app.post("/", function (req, res) {
    const itemName = req.body.ele1;
    const todo5 = new Item({
        name: itemName
    });
    todo5.save();
    res.redirect("/");
});

app.post("/delete", async function (req, res) {
    const checked = req.body.checkbox1;
    try {
        await Item.findOneAndRemove({ _id: checked });
        console.log("deleted");
        res.redirect("/");
    } catch (err) {
        console.log(err);
        res.status(500).send("An error occurred");
    }
});



app.listen(8000, function () {
    console.log("server is running");
});
