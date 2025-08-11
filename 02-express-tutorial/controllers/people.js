const { people } = require("../data");

// GET all people
const getPeople = (req, res) => {
  res.status(200).json({ success: true, data: people });
};

// POST for new person
const addPerson = (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide a name" });
  }
  const newPerson = { id: people.length + 1, name };
  people.push(newPerson);
  res.status(201).json({ success: true, data: newPerson });
};

module.exports = { getPeople, addPerson };
