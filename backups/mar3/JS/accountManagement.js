// Login Function()
function doLogin()
{
	userId = 0;
	firstName = "";
	lastName = "";
	
	let user = document.getElementById("username").value;
	let pass = document.getElementById("password").value;

	// Make Sure Input Fields are Valid (Not Empty) Return if missing input
   	var form = document.getElementById('loginForm');
   	if(form.reportValidity() == false) { return; }

	// Hash Password
	var hash = md5(pass);
	hash = hash.substr(0, 25); // Only Grab 1st 25 Characters

	//let jsonPayload = JSON.stringify({ username: user, password: pass });
	let jsonPayload = JSON.stringify({username:user,password:hash});
	
	let url = location.href.substring(0, location.href.lastIndexOf("/")+1) + 'PHP/login.php';
 

	let xhr = new XMLHttpRequest();
  	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
 
	try
	{
		xhr.onreadystatechange = function() 
		{
			let jsonObject = JSON.parse(xhr.responseText);
			userId = jsonObject.id;

			if (this.readyState == 4 && this.status == 200) 
			{
				if( userId < 1 )
				{		                    
          			// Blink Effect 
 			    	setTimeout(function(){document.getElementById("loginResult1").innerHTML = "Username/Password Combination Incorrect";},250);   
					document.getElementById("loginResult1").innerHTML = " ";
					return;
				}
		
				firstName = jsonObject.firstName;
				lastName = jsonObject.lastName;

        		saveCookie();
				window.location.href = "main.html";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("loginResult1").innerHTML = err.message;
	}

}

// Sign Out Function
function doLogout()
{
    // Reset Cookie Details
	userId = 0;
	firstName = "";
	lastName = "";

	// Clear ALL Cookies
	document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });

	// Then throw in this as a filler 
	document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";

    // Go pack to login page (index.html)
	window.location.href = "index.html";
}

// Signup Function()
function doSignup()
{
	userId = 0;
	firstName = "";
	lastName = "";

	// Grab User Input
	let fName = document.getElementById("firstnameCreate").value;
	let lName = document.getElementById("lastnameCreate").value;
	let user = document.getElementById("usernameCreate").value;
	let pass = document.getElementById("passwordCreate").value;
	let passCheck = document.getElementById("passwordcheckCreate").value;

	// Make Sure Input Fields are Valid (Not Empty)
	var form = document.getElementById('signupForm');
	if(form.reportValidity() == false) { return; }

	// Make Sure Passwords Match
	if(pass != passCheck)
	{
		alert("Passwords Must Match")
		return;
	}

	// Hash Password
	var hash = md5( pass );
  	hash = hash.substr(0, 25);

	// Stringify Input
	//let jsonPayload = JSON.stringify({ username: user, password: pass, firstName: fName, lastName: lName });
	let jsonPayload = JSON.stringify({ username: user, password: hash, firstName: fName, lastName: lName });
	console.log(jsonPayload);

 
	// Get Proper URL
	let url = location.href.substring(0, location.href.lastIndexOf("/")+1) + 'PHP/signup.php';
 
	let xhr = new XMLHttpRequest();
  	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
 
	try
	{
		xhr.onreadystatechange = function() 
		{
			let jsonObject = JSON.parse(xhr.responseText);
			userId = jsonObject.id;

			if (this.readyState == 4 && this.status == 200) 
			{
				// User already exists --> Return Error
				if(userId < 1)
				{		 
         		 	// Blink Effect 
					  setTimeout(function(){document.getElementById("loginResult2").innerHTML = "Username Already Taken";},250);   
					  document.getElementById("loginResult2").innerHTML = " ";
					  return;              
				}
				
				// User Does Not Exist --> Create User
				else
				{
					firstName = jsonObject.firstName;
					lastName = jsonObject.lastName;
	
					saveCookie();
					window.location.href = "main.html";        
				}
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("loginResult2").innerHTML = err.message;
	}

}

// Show Password Field on Login/Sign Up Page(s)
function showPass() 
{
	
    var x = document.getElementById("password");
	console.log(x);
    if (x.type === "password") { x.type = "text"; } 
	else { x.type = "password"; }

    x = document.getElementById("passwordcheck");

    if (x.type === "password") { x.type = "text"; }
	else { x.type = "password"; }
}

// Save User Profile as a cookie for 30 minutes
function saveCookie()
{
	let minutes = 30;
	let date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	
	document.cookie = "firstName=" + firstName + ";" + "expires=" + date.toGMTString();
	document.cookie = "lastName=" + lastName + ";" + "expires=" + date.toGMTString();
	document.cookie = "userId=" + userId + ";" + "expires=" + date.toGMTString();
  	//console.log(document.cookie);
}

// Read in Cookie Details
function readCookie()
{
	let data = document.cookie;
	let splits = data.split(";");

	for(var i = 0; i < splits.length; i++) 
	{
		let thisOne = splits[i].trim();
		let tokens = thisOne.split("=");

		if( tokens[0] == "firstName" )
		{
			firstName = tokens[1];
		}
		else if( tokens[0] == "lastName" )
		{
			lastName = tokens[1];
		}
		else if( tokens[0] == "userId" )
		{
			userId = parseInt( tokens[1].trim() );
		}
	}

    // If there is no cookie AKA no user is signed in --> go to login page (index.html)
	//if( userId < 0 ) { window.location.href = "index.html";}
	if (document.cookie.indexOf('userId') == -1 ) { window.location.href = "index.html"; }

    // If there IS a saved user cookie --> go to home page (main.html)
    else 
	{ 
		document.getElementById("helloBanner1").innerText = "Hello,  " + firstName + " " + lastName;
		document.getElementById("helloBanner2").innerText = "Hello,  " + firstName + " " + lastName; 
		document.getElementById("userid-m").innerText = userId;
		console.log(document.getElementById("userid-m").innerText);
	}
}