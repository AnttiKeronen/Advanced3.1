document.getElementById("userForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  const res = await fetch("/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email })
  });

  const data = await res.json();
  alert(data.msg);
  e.target.reset();
});

document.getElementById("getUsers").addEventListener("click", async () => {
  const res = await fetch("/users");
  const users = await res.json();
  const ul = document.getElementById("userList");
  ul.innerHTML = "";

  users.forEach(u => {
    const li = document.createElement("li");
    li.textContent = `${u.name} - ${u.email}`;
    ul.appendChild(li);
  });
});
