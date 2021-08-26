const container = document.querySelector("#container");

const modalBtn = document.querySelector("#modalBtn");
const closeBtn = document.getElementsByClassName("closeBtn")[0];
const signUpButton = document.querySelector("#signUp");
const signInButton = document.querySelector("#signIn");
const togglePassword1 = document.querySelector("#togglePassword1");
const togglePassword2 = document.querySelector("#togglePassword2");
const password1 = document.querySelector("#password1");
const password2 = document.querySelector("#password2");

togglePassword1.addEventListener("click", function (e) {
  // toggle the type attribute
  const type =
    password1.getAttribute("type") === "password" ? "text" : "password";
  password1.setAttribute("type", type);
  // toggle the eye slash icon
  this.classList.toggle("fa-eye-slash");
});
togglePassword2.addEventListener("click", function (e) {
  // toggle the type attribute
  const type =
    password2.getAttribute("type") === "password" ? "text" : "password";
  password2.setAttribute("type", type);
  // toggle the eye slash icon
  this.classList.toggle("fa-eye-slash");
});
window.addEventListener("click", clickOutside);
// open click
modalBtn.addEventListener("click", openModal);
// close click

closeBtn.addEventListener("click", closeModal);

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});
signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

function closeModal() {
  container.style.display = "none";
}
function openModal() {
  container.style.display = "block";
}
function clickOutside(e) {
  if (e.target === container) {
    container.style.display = "none";
  }
}
