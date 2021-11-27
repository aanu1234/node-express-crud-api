const express = require('express');
const routes = express.Router();

const json_data = [
    {id: "1", name: "James Brown", gender: "Male"},
    {id: "2", name: "John Dow", gender: "Female"},
    {id: "3", name: "Katherin Boyles", gender: "Female"},
    {id: "4", name: "Toluwani Johnson", gender: "Female"}
]

routes.route('/:id')
.get((req, res) => {
    res.json(json_data[req.params.id])
})
.put((req, res) => {
    if (!json_data[req.params.id]) {
        res.status(404).json({"status":"Error", "error":"Data not found"})
    } else {
        // success = json_data.map(obj => req.body.find(o => o.id === obj.id) || obj)
        var i = json_data.findIndex(o => o.id === req.body.id);
        if(json_data[i]) { json_data[i] = req.body } else { json_data.push(req.body) }
        res.json({"status":"Success", "success":json_data})
    }
})
.delete((req, res) => {
    let index = json_data.findIndex((obj) => {
        if ( obj.id === req.params.id ) {
            return true;
        }
    })
    if ( index != -1 ) {
        json_data.splice(index, 1);
        res.json({"status":"Success", "success":json_data})
    } else {
        res.status(404).json({"status":"Error", "error":"Data not found"})
    }
})

routes.route('/')
.get((req, res) =>  {
    res.json({"status":"Success", "success":json_data})
})
.post((req, res) => {
    json_data.push(req.body);
    res.json({"status":"Success", "success":"Data added"})
})

module.exports = routes