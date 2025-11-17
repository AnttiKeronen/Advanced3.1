import express from "express";
import path from "path";
import { fileURLToPath } from "url";
// Create Express app
const app = express();
const PORT = 3000;
// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // optional for form data
app.use(express.static(path.join(__dirname, "../public"))); // serve static front-end
const users = [];
// Routes
// 1. Hello world
app.get("/hello", (_req, res) => {
    res.json({ msg: "Hello world!" });
});
// 2. Echo route
app.get("/echo/:id", (req, res) => {
    res.json({ id: req.params.id });
});
// 3. Sum route
app.post("/sum", (req, res) => {
    const numbers = req.body.numbers;
    if (!Array.isArray(numbers) || !numbers.every((n) => typeof n === "number")) {
        return res.status(400).json({ error: "numbers must be an array of numbers" });
    }
    const sum = numbers.reduce((acc, n) => acc + n, 0);
    res.json({ sum });
});
// 4. Add user
app.post("/users", (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: "name and email are required" });
    }
    const newUser = { name, email };
    users.push(newUser);
    res.json({ msg: "User successfully added" });
});
// 5. Get all users
app.get("/users", (_req, res) => {
    res.status(200).json(users);
});
// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
