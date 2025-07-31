const email = document.getElementById("email");
const password = document.getElementById("password");

const errMsg = document.getElementById("error");
errMsg.style.color = "red";

function generateToken() {
  return Math.random(0, 100000);
}

document.getElementById("login").addEventListener("click", (e) => {
  e.preventDefault();
  if (email.value === "" || password.value === "") {
    errMsg.textContent = "all fields are required";
  } else {
    let users = JSON.parse(localStorage.getItem("users") ?? "[]");

    if (users.length > 0) {
      let user = users.filter((user) => user.email === email.value);

      if (user.length > 0) {
        let obj = user[0];

        if (obj.password === password.value) {
          localStorage.setItem(
            "currUser",
            JSON.stringify({
              email: email.value,
              password: password.value,
              token: generateToken(),
            })
          );
          window.location.href = "/shop";
        }
      } else {
        errMsg.textContent = "Email Not Found or invalid password";
      }
    }
  }
});
