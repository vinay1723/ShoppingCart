const fname = document.getElementById("firstname");
const lname = document.getElementById("lastname");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmpassword");
const signupBtn = document.getElementById("signup");
const errMsg = document.getElementById("error");
const sucessMsg = document.getElementById("success");

signupBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    fname.value === "" ||
    lname.value === "" ||
    email.value === "" ||
    password.value === "" ||
    confirmPassword.value === ""
  ) {
    errMsg.textContent = "Please enter all required fields!";
  } else if (password.value == confirmPassword.value) {
    let users = JSON.parse(localStorage.getItem("users") ?? "[]");
    let filteredUsers = users.filter((user) => user.email === email.value);

    if (filteredUsers.length > 0) {
      errMsg.textContent = "user already exists";
    } else {
      users.push({
        email: email.value,
        password: password.value,
        fname: fname.value,
        lname: lname.value,
        createdAt: new Date(),
      });
      localStorage.setItem("users", JSON.stringify(users));
      errMsg.textContent = "";
      email.value = "";
      password.value = "";
      fname.value = "";
      lname.value = "";
      window.location.href = "/shop";
    }
  } else {
    errMsg.textContent =
      "please make sure password and confirm password matches";
  }
});
