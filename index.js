import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
let tasks = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.render("index.ejs", { tasks: tasks });
});

app.post("/", (req, res) => {

    var task_name = req.body.task_name;
    var task_category = req.body.task_category;
    var task_urgency = req.body.task_urgency;

    tasks.push({
        name: task_name,
        category: task_category,
        urgency: task_urgency
    });

    res.redirect('/');
})

app.post("/delete-task", (req, res) => {
    const taskIndex = req.body.taskIndex;


    if (taskIndex > -1 && taskIndex < tasks.length) {
        tasks.splice(taskIndex, 1);
    }


    res.redirect('/');
});

app.post("/complete-task", (req, res) => {
    const taskIndex = req.body.taskIndex;

    if (taskIndex !== undefined && taskIndex < tasks.length) {
        tasks[taskIndex].completed = true;
    }
    res.redirect('/');
})


app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
})


