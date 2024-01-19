
function doLogin()
{
	userId = 0;
	firstName = "";
	lastName = "";
	
	let username = document.getElementById("username").value;
	let password = document.getElementById("password").value;

	let tmp = {username:username,password:password};
	let jsonPayload = JSON.stringify( tmp );

	let xhr = new XMLHttpRequest();  

	xhr.open("POST", 'https://www.contactmanager2023.online/login.php', true);
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