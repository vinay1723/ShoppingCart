// Write your script here
const email = document.getElementById("email");
const password = document.getElementById("password");
const changeEmail = document.getElementById("changeEmail");

const oldPassword = document.getElementById("oldPassword");
const newPassword = document.getElementById("newPassword");
const confirmPassword = document.getElementById("confirmNewpassword");
const logout = document.getElementById("logout");
const errMsg = document.getElementById("error");

window.onload = () => {
  let currUser = JSON.parse(localStorage.getItem("currUser") || "[]");

  email.value = currUser.email;
  password.value = currUser.password;
};

logout.addEventListener("click", () => {
  localStorage.removeItem("currUser");
  window.location.href = "/login";
});

const changePassword = document.getElementById("changePassword");

changePassword.addEventListener("click", handleChangePassword);

function handleChangePassword(e) {
  e.preventDefault();
  let currUser = JSON.parse(localStorage.getItem("currUser") || "[]");
  if (oldPassword.value !== currUser.password) {
    errMsg.textContent = "Old password was not matching";
    errMsg.style.color = "red";
    return;
  }
  if (newPassword.value !== confirmPassword.value) {
    errMsg.textContent = "new Password does not match";
    errMsg.style.color = "red";
    return;
  }

  let users = JSON.parse(localStorage.getItem("users") || "[]");
  let user = users.find((user) => user.password === oldPassword.value.trim());
  user.password = newPassword.value;
  currUser.password = newPassword.value;
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("currUser", JSON.stringify(user));
  oldPassword.value = "";
  newPassword.value = "";
  confirmPassword.value = "";
}

changeEmail.addEventListener("click", handleEmailChange);

function handleEmailChange(e) {
  e.preventDefault();
  let currUser = JSON.parse(localStorage.getItem("currUser") || "[]");
  let users = JSON.parse(localStorage.getItem("users") || "[]");
  let user = users.find((user) => user.email === currUser.email);
  user.email = email.value;
  currUser.email = email.value;
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("currUser", JSON.stringify(currUser));
}
