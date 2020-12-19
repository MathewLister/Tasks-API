var express = require('express');
var router = express.Router();

// Remove todo
router.post('/removeTodo', (req, res) => {
    console.log(req.body);
    console.log(todos);
    idToRemove = req.id;
    todos = todos.filter(function(item) {
        return item.id != idToRemove;
    });
});

module.exports = router;
