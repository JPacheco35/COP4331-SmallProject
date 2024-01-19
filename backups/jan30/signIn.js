function showPass() 
{
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }

    x = document.getElementById("passwordCheck");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
}

function signupCheck()
{
  // Get Username and Passwords
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var passwordCheck = document.getElementById("passwordCheck").value;

  // Check if username is already taken

  // Check if passwords match

  // Check if password is 8+ characters long
}