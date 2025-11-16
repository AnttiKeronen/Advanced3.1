import express, { Request, Response } from "express";
import path from "path";
const app = express();
const PORT = 3000;
// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));
// ----------------------
// 1. Hello world route
// ----------------------
app.get("/hello", (req, res) => {
    res.json({ msg: "Hello world!" });
});
// ----------------------
// 2. ID echoing route
// ----------------------
app.get("/echo/:id", (req, res) => {
    res.json({ id: req.params.id });
});
// ----------------------
// 3. POST sum route
// ----------------------
app.post("/sum", (req, res) => {
    const { numbers } = req.body;
    if (!Array.isArray(numbers))
        return res.status(400).json({ error: "numbers must be an array" });
    const sum = numbers.reduce((a, b) => a + b, 0);
    res.json({ sum });
});
const users = []; // in-memory storage
app.post("/users", (req, res) => {
    const { name, email } = req.body;
    users.push({ name, email });
    res.json({ msg: "User successfully added" });
});
// ----------------------
// 5. Get all users
// ----------------------
app.get("/users", (req, res) => {
    res.status(201).json(users);
});
// Default route for CG
app.get("/", (req, res) => {
    res.send("Server running");
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
//# sourceMappingURL=app.js.map