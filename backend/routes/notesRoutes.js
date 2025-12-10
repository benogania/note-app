const express = require("express");
const Notes = require("../models/Notes");
const router = express.Router();

router.post("/api", async (req, res) => {
  try {
    console.log("This is the note data", req.body);
    const note = await Notes.create(req.body);

    res.json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const notes = await Notes.find({});
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get('/search', async (req, res) => {
  const { q } = req.query;
  if (!q) return res.json([]);

  try {
    const results = await Notes.find({
      $or: [
        { title:  { $regex: q, $options: 'i' } },
        { content:{ $regex: q, $options: 'i' } }
      ]
    });
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: 'Search failed' });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedNote = await Notes.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.send(updatedNote);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Notes.findByIdAndDelete(req.params.id);
    res.json({ message: "Note Successfuly Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
