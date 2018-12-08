const express = require("express");
const router = express.Router();
const actionDB = require("../data/helpers/actionModel");
const projectDB = require("../data/helpers/projectModel.js");

router.get("/", (req, res) => {
  actionDB
    .get()
    .then(actions => {
      res.json(actions);
    })
    .catch(err => {
      res.status(400).json({ message: "actions not found" });
    });
});

router.get("/project/:id", (req, res) => {
  const { id } = req.params;
  projectDB
    .getProjectActions(id)
    .then(actions => {
      if (actions.length !== 0) {
        res.json(actions);
      } else {
        res.status(404).json({ message: "No projects with that ID." });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "could not find project actions" });
    });
});

router.post("/", (req, res) => {
  const action = req.body;
  actionDB
    .insert(action)
    .then(action => {
      res.status(201).json(action);
    })
    .catch(err => {
      res.status(500).json({ message: "Action not created" });
    });
});

router.put("/:id", (req, res) => {
  const action = req.body;
  const { id } = req.params;
  actionDB
    .update(id, action)
    .then(action => {
      if (action !== null) {
        res.json(action);
      } else {
        res.status(404).json({ message: "ID not found" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "action not updated" });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  actionDB
    .remove(id)
    .then(count => {
      res.json({ message: `successfully deleted ${count} record(s)` });
    })
    .catch(err => {
      res.status(404).json({ message: "id not found" });
    });
});

module.exports = router;
