


function doLogin()
{
  const urlBase = 'http://COP4331-5.com/LAMPAPI';
  const extension = 'php';
	userId = 0;
	firstName = "";
	lastName = "";
	
	let login = document.getElementById("Username").value;
	let password = document.getElementById("Password").value;
 
	var paragraph = document.getElementById("test");
  paragraph.innerHTML = "testtest";

	let tmp = {login:login,password:password};
 
	let jsonPayload = JSON.stringify( tmp );
	
	let url = urlBase + '/Login.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				let jsonObject = JSON.parse( xhr.responseText );
				userId = jsonObject.id;
		
				if( userId < 1 )
				{		
					document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
					return;
				}
		
				firstName = jsonObject.firstName;
				lastName = jsonObject.lastName;

				saveCookie();
	
				window.location.href = "color.html";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}

}


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