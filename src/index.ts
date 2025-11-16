import express, { Request, Response } from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));
app.get("/hello", (req: Request, res: Response) => {
  res.json({ msg: "Hello world!" });
});
app.get("/echo/:id", (req: Request, res: Response) => {
  res.json({ id: req.params.id });
});
app.post("/sum", (req: Request, res: Response) => {
  const { numbers } = req.body;
  if (!Array.isArray(numbers))
    return res.status(400).json({ error: "numbers must be an aray" });
  const sum = numbers.reduce((a: number, b: number) => a + b, 0);
  res.json({ sum });
});
type TUser = {
  name: string;
  email: string;
};
const users: TUser[] = [];
app.post("/users", (req: Request, res: Response) => {
  const { name, email } = req.body;
  users.push({ name, email });
  res.json({ msg: "User successfully added" });
});
app.get("/users", (req: Request, res: Response) => {
  res.status(201).json(users);
});
app.get("/", (req: Request, res: Response) => {
  res.send("Server running");
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
