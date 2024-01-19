// Login Function()
function doLogin()
{
	userId = 0;
	firstName = "";
	lastName = "";
	
	let user = document.getElementById("username").value;
	let pass = document.getElementById("password").value;

	let jsonPayload = JSON.stringify({ username: user, password: pass });
 
 
 
	let url = 'http://142.93.53.159/login.php';

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
 
	try
	{
		xhr.onreadystatechange = function() 
		{
			let jsonObject = JSON.parse(xhr.responseText);
      console.log(jsonObject);
			userId = jsonObject.id;

			if (this.readyState == 4 && this.status == 200) 
			{
				if( userId < 1 )
				{		
					document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
					return;
				}
		
				firstName = jsonObject.firstName;
				lastName = jsonObject.lastName;

	
				window.location.href = "main.html";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}

}

// Show Password Field on Login/Sign Up Page(s)
function showPass() 
{
    var x = document.getElementById("password");
	
    if (x.type === "password") { x.type = "text"; } 
	else { x.type = "password"; }

    x = document.getElementById("passwordCheck");

    if (x.type === "password") { x.type = "text"; }
	else { x.type = "password"; }
}


// Performs a validation of new username and password
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