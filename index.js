// Declare necessary middleware
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

// Set the HTTP port
const port = process.env.PORT || 3000

// Declare the Express app
var app = express();

app.use(cors());   // allow Cross-origin resource sharing
app.use(bodyParser.json()); // parse application/json

// Create the ToDo list as an in-memory array
var todos = [];

let id = 0;

// Create a new ToDo item
var makeNewTodo = (title, description) => {
    var todo = {
        id: ++id,
        title,
        description
        //dueDate
        //status
    };
    todos.push(todo);
    return todo;
}


// Get all the ToDo items
app.get('/todos', (req, res) => {
    res.status(200);
    res.json(todos);
});

// // Remove todo
// app.post('/removeTodo', (req, res) => {
//     console.log(req.body);
//     console.log(todos);
//     idToRemove = req.id;
//     todos = todos.filter(function(item) {
//         return item.id != idToRemove;
//     });
// });

// Add a new ToDo item
app.post('/todos', (req, res) => {
    if (!req.headers["content-type"] || req.headers["content-type"] !== "application/json") {
        res.status(400);
        res.json({
            error: "Unsupported content type. Only application/json is supported."
        });
        return;
    }

    if (!req.body || !req.body.title || !req.body.description) {
        res.status(400);
        res.json({
            error: "Invalid Todo. Todo requires a title and a description."
        });
        return;
    }
    var todo = makeNewTodo(req.body.title, req.body.description);
    res.status(201);
    res.json(todo);
});

// Get a single ToDo item
app.post('/todos/{id}', (req, res) => {
    var idParam = req.params.id;
    let id;
    try {
        id = parseInt(id, 10);
        if (!Number.isFinite(id) || !Number.isSafeInteger(id)) {
            id = undefined;
        }
    } catch (e) {
        console.log(e);
    }

    if (!id) {
        res.status(400);
        res.json({
            error: "Invalid id"
        });
        return;
    }
    var todo = todos.find((todo) => {
        todo.id === idParam
    });
    if (!todo) {
        res.status(404);
        res.json({
            error: "Todo not found"
        });
        return;
    }
    res.status(200);
    res.json(todo);
})
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
