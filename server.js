const express = require('express');
const mongoose = require('mongoose');
const Budget = require('./models/budget_schema');
const app = express();
const port = 3000;

app.use(express.json());
app.use('/', express.static('public'));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mongodb_demo', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

// GET endpoint to fetch all budget items
app.get('/budget', async (req, res) => {
    try {
        const items = await Budget.find({});
        res.json({ myBudget: items });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST endpoint to add a new budget item
app.post('/budget', async (req, res) => {
    try {
        const newItem = new Budget(req.body);
        await newItem.save();
        res.status(201).json(newItem);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
