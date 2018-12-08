const express = require("express");
const router = express.Router();
const projectDB = require("../data/helpers/projectModel");

router.get("/", (req, res) => {
  projectDB
    .get()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(400).json({ message: "projects not found" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  projectDB
    .get(id)
    .then(project => {
      res.json(project);
    })
    .catch(err => {
      res
        .status(404)
        .json({ message: "A project with that ID does not exist." });
    });
});

router.post("/", (req, res) => {
  const project = req.body;
  projectDB
    .insert(project)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(err => {
      res.status(500).json({ message: "Post not created" });
    });
});

router.put("/:id", (req, res) => {
  const project = req.body;
  const { id } = req.params;
  projectDB
    .update(id, project)
    .then(project => {
      if (project !== null) {
        res.json(project);
      } else {
        res.status(404).json({ message: "ID not found" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "project not updated" });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  projectDB
    .remove(id)
    .then(count => {
      res.json({ message: `successfully deleted ${count} record(s)` });
    })
    .catch(err => {
      res.status(404).json({ message: "id not found" });
    });
});

module.exports = router;
