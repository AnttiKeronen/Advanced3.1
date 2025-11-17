import express from "express";
import path from "path";
import { fileURLToPath } from "url";
const app = express();
const PORT = 3000;
// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));
const users = [];
// Routes
app.get("/hello", (_req, res) => {
    res.json({ msg: "Hello world!" });
});
app.get("/echo/:id", (req, res) => {
    res.json({ id: req.params.id });
});
app.post("/sum", (req, res) => {
    const numbers = req.body.numbers;
    if (!Array.isArray(numbers)) {
        return res.status(400).json({ error: "numbers must be an array" });
    }
    const sum = numbers.reduce((acc, n) => acc + n, 0);
    res.json({ sum });
});
app.post("/users", (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: "name and email are required" });
    }
    const newUser = { name, email };
    users.push(newUser);
    res.json({ msg: "User successfully added" });
});
app.get("/users", (_req, res) => {
    res.status(201).json(users);
});
// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
