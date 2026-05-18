function signup(){

let name = document.getElementById("name").value;
let email = document.getElementById("email").value;
let password = document.getElementById("password").value;

if(name === "" || email === "" || password === ""){

 alert("Please Fill All Fields");
 return;
}

let users = JSON.parse(localStorage.getItem("users")) || [];

users.push({
  name,
  email,
  password
});

localStorage.setItem("users", JSON.stringify(users));

alert("Signup Successful");

window.location.href = "login.html";
}
function login(){
let email = document.getElementById("email").value;
let password = document.getElementById("password").value;

let users = JSON.parse(localStorage.getItem("users")) || [];

let validUser = users.find(user =>
 user.email === email && user.password === password
);

if(validUser){

 localStorage.setItem("loggedInUser", JSON.stringify(validUser));

 alert("Login Successful");

 window.location.href = "index.html";

}else{

 alert("Invalid Credentials");
}
}