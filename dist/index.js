import express from "express";
import path from "path";
import { fileURLToPath } from "url";
const app = express();
const PORT = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));
app.get("/hello", (req, res) => {
    res.json({ msg: "Hello world!" });
});
app.get("/echo/:id", (req, res) => {
    res.json({ id: req.params.id });
});
app.post("/sum", (req, res) => {
    const { numbers } = req.body;
    if (!Array.isArray(numbers))
        return res.status(400).json({ error: "numbers must be an aray" });
    const sum = numbers.reduce((a, b) => a + b, 0);
    res.json({ sum });
});
const users = [];
app.post("/users", (req, res) => {
    const { name, email } = req.body;
    users.push({ name, email });
    res.json({ msg: "User successfully added" });
});
app.get("/users", (req, res) => {
    res.status(201).json(users);
});
app.get("/", (req, res) => {
    res.send("Server running");
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
