// JavaScript source code

// Unneccessary later.
var entries = document.getElementsByClassName('unsetTable'); 
var currentRowNumber = 1; // DO NOT DELETE THIS ONE

// Function should change all elements with check, an integer, in their class
// to an editable field
/*
function editContact(check) 
{
   // Keep track of current row number
    currentRowNumber = entries.length / 4;

    // Debugging stuff
    console.log("Edit Button Pressed");
    console.log("unsetTable = " + entries.length);
    console.log("entries.length is " + currentRowNumber);

    // Check to see if there are unset entries
    // This won't exist once the database table stuff is done.
    if (entries.length > 0) {
        console.log("Condition Met. entries = " + entries.length);
        tableSetter();
    } else {
        console.log("Condition Not Met. entries = " + entries.length);
    }
    // End of stuff to not exist later.

    // Turn all elements with class check into editable fields
    var editField = document.getElementsByClassName(check);
    console.log("This is the number of elements with " + check + ": " + editField.length);
    for (var i = 0; i < 4; i++) {
        editField[i].readOnly = false;
    }
    return;
}
*/

function showContacts()
{
    let userId = parseInt(document.getElementById("userID").innerText);
    let jsonPayload = JSON.stringify({userId: userId});
	//console.log(jsonPayload);

    let url = location.href.substring(0, location.href.lastIndexOf("/")+1) + 'PHP/returnContacts.php';

    let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	xhr.onreadystatechange = function()	
    {
		if (this.readyState == 4 && this.status == 200)
		{
      //console.log(xhr.respoonseText);
			let jsonObject = JSON.parse(xhr.responseText);
			//console.log(jsonObject);

			let contactTable = document.getElementById("tbody-d");
			document.getElementById('tbody-d').innerHTML = '';

			for (let i = 0; i < jsonObject.results.length; i++)
			{
				let splits = jsonObject.results[i].split(',');
				//console.log(splits);

				let row = contactTable.insertRow();

				let num = row.insertCell(0);
				num.innerHTML = i + 1;

				let firstName = row.insertCell(1);
				firstName.innerHTML = splits[1];

				let lastName = row.insertCell(2);
				lastName.innerHTML = splits[2];

				let email = row.insertCell(3);
				email.innerHTML = splits[3];

				let phoneNum = row.insertCell(4);
				phoneNum.innerHTML = splits[4];

				let dateCreated = row.insertCell(5);
				dateCreated.innerHTML = splits[5];

				let buttons = row.insertCell(6);
				buttons.innerHTML = '<td><button type="editButton" id = "' + splits[0] + '"class="btn btn-outline-primary" onclick = "editContact(this.parentNode.parentNode.rowIndex-1,this.id);">Edit</button> <button type="deleteButton" id = "' + splits[0] + '" class="btn btn-outline-danger" onclick = "deleteContact(this.parentNode.parentNode.rowIndex-1,this.id);">Delete</button><br></td>';

			}

			let v = document.getElementById("searchbar");
			console.log(v);
			v.addEventListener("keyup", search);
		}
    };

	xhr.send(jsonPayload); 

}

// addContact Function on main.html
function addContact(formName)
{
	// Placeholders for data fields
	let firstname = "";
	let lastname = "";
	let email = "";
	let phonenum = "";

	// Add Contact from Mobile Version
	if(formName == "mobileAdd")
	{
		// Check that all fields are present
		if(document.getElementById(formName).reportValidity() == false) { return; }

		// Get User Input
		firstname = document.getElementById("firstname-m").value;
		lastname = document.getElementById("lastname-m").value;
		email = document.getElementById("email-m").value;
		phonenum = document.getElementById("phonenum-m").value;
	}

	// Addd Contact from Desktop Version
	else
	{
		// Check that all fields are present
		if(document.getElementById(formName).reportValidity() == false) { return; }

		// Get User Input
		firstname = document.getElementById("firstname").value;
		lastname = document.getElementById("lastname").value;
		email = document.getElementById("email").value;
		phonenum = document.getElementById("phonenum").value;
	}

	// Get UserID
	let userId = parseInt(document.getElementById("userID").innerText);

	// Get Today's Date (MM/DD/YYYY)
	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0');
	var yyyy = today.getFullYear();
	today = mm + '/' + dd + '/' + yyyy;

	//console.log(email);

	// Check Email Address
	if (email == "" || email.trim().length == 0) { email = "-"; }
	else
	{
		// Regular Expression (String + @ + String + . + String) --> NO @ Signs
		var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		
        var res = regex.test(email);

		// Alert User of Proper Format
		if (res == false) 
		{
			alert(" Email Address must be in the format emailaddress@website.domain");
			return; 
		}
	}

	// Check Phone Number
	if (phonenum == "" || phonenum.trim().length == 0) { phonenum= "-"; }
	else
	{
		// Regular Expression (### + "-"" + ### + "-" + ####) --> ###-###-####
		var regex = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/
		
        var res = regex.test(phonenum);

		// Alert User of Proper Format
		if (res == false) 
		{
			alert(" Phone Number must be in the format ###-###-####");
			return; 
		}
	}

	// Stringify Input
	let jsonPayload = JSON.stringify({firstname: firstname, lastname: lastname, email: email, phonenum: phonenum, userId: userId, adddate: today});
	document.getElementById("desktopAdd").reset();

	// Get Proper URL
	let url = location.href.substring(0, location.href.lastIndexOf("/")+1) + 'PHP/addContact.php';

	// Open XML Request to SQL Database
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	
	try
	{
		// When we have recieved a response, do this
		xhr.onreadystatechange = function() 
		{
			// Get and Parse Response Text
			let jsonObject = JSON.parse(xhr.responseText);
			userId = jsonObject.id;

			// If Valid Server Response --- THIS STILL NEEDS REVIEW
			if (this.readyState == 4 && this.status == 200) 
			{
				// User already exists --> Return Error
				if(userId < 1)
				{		 
					// Blink Effect 
					setTimeout(function(){document.getElementById("loginResult").innerHTML = "Contact Not Added";},250);   
					document.getElementById("loginResult").innerHTML = " ";
					return;              
				}
				
				// User Does Not Exist --> Create User and Proceed
				else
				{
					showContacts();        
				}
			}
		};

		// Send JSON to MySQL database
		xhr.send(jsonPayload);
	}

	// We've encounted an error here
	catch(err) { document.getElementById("loginResult").innerHTML = err.message; }
}

function editContact(rowNum,id)
{
	//console.log(rowNum);
	let table = document.getElementById("tbody-d");

	let firstname = table.rows[rowNum].cells[1].innerHTML;
	let lastname = table.rows[rowNum].cells[2].innerHTML;
	let email = table.rows[rowNum].cells[3].innerHTML;
	let phone = table.rows[rowNum].cells[4].innerHTML;

	//console.log(firstname, lastname, email, phone);

	let fnameCol = table.rows[rowNum].cells[1];
	fnameCol.innerHTML = '<input id = "fnameCol' + id + '" ' + 'type="firstname">';
	//fnameCol.innerHTML = '<div class="input-box"> <input type="firstname" id = "fnameCol' + id + '" ' + '></div>'
	document.getElementById("fnameCol" + id).value = firstname;

	let lnameCol = table.rows[rowNum].cells[2];
	lnameCol.innerHTML = '<input id = "lnameCol' + id + '" ' + 'type="lastname">';
	document.getElementById("lnameCol" + id).value = lastname;

	let emailCol = table.rows[rowNum].cells[3];
	emailCol.innerHTML = '<input id = "emailCol' + id + '" ' + 'type="email">'; 
	document.getElementById("emailCol" + id).value = email;

	let phoneCol = table.rows[rowNum].cells[4];
	phoneCol.innerHTML = '<input id = "phoneCol' + id + '" ' + 'type="phone">';
	document.getElementById("phoneCol" + id).value = phone;

	let buttonsCol = table.rows[rowNum].cells[6];
	
	// THIS NEEDS FIXING --> Pass String to this funciton?
	buttonsCol.innerHTML = '<td><button type="editButton" id = "' + id + '"class="btn btn-outline-success" onclick = "updateContact('+id+');">Save</button> <button type="deleteButton" id = "' + id + '" class="btn btn-outline-danger" onclick = "showContacts();">Cancel</button><br></td>';
	
	//buttons.innerHTML = '<td><button type="editButton" id = "' + splits[0] + '"class="btn btn-outline-primary" onclick = "editContact(this.parentNode.parentNode.rowIndex-1,this.id);">Edit</button> <button type="deleteButton" id = "' + splits[0] + '" class="btn btn-outline-danger" onclick = "deleteContact(this.parentNode.parentNode.rowIndex-1,this.id);">Delete</button><br></td>';
}

// Update Contact Funciton in main.html
function updateContact(id)
{
	// Get the input fields 
	let firstname = document.getElementById("fnameCol"+id).value;
	let lastname = document.getElementById("lnameCol"+id).value;
	let email = document.getElementById("emailCol"+id).value;
	let phonenum = document.getElementById("phoneCol"+id).value;

	// Check Email Address
	if (email == "" || email.trim().length == 0) { email = "-"; }
	else if (email == "-") {}
	else
	{
		// Regular Expression (String + @ + String + . + String) --> NO @ Signs
		var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		
		var res = regex.test(email);

		// Alert User of Proper Format
		if (res == false) 
		{
			alert(" Email Address must be in the format emailaddress@website.domain");
			return; 
		}
	}

	// Check Phone Number
	if (phonenum == "" || phonenum.trim().length == 0) { phonenum= "-"; }
	else if (phonenum == "-") {}
	else
	{
		// Regular Expression (### + "-"" + ### + "-" + ####) --> ###-###-####
		var regex = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/
		
		var res = regex.test(phonenum);

		// Alert User of Proper Format
		if (res == false) 
		{
			alert(" Phone Number must be in the format ###-###-####");
			return; 
		}
	}

	let jsonPayload = JSON.stringify({id: id, firstname: firstname, lastname: lastname, email: email, phonenum: phonenum});
	//console.log(jsonPayload);

	// Get Proper URL
	let url = location.href.substring(0, location.href.lastIndexOf("/")+1) + 'PHP/editContact.php';

	// Open XML Request to SQL Database
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	
	try
	{
		// When we have recieved a response, do this
		xhr.onreadystatechange = function() 
		{
			// Get and Parse Response Text
			let jsonObject = JSON.parse(xhr.responseText);
			userId = jsonObject.id;

			// If Valid Server Response --- THIS STILL NEEDS REVIEW
			if (this.readyState == 4 && this.status == 200) 
			{
				// User already exists --> Return Error
				if(userId < 1)
				{		 
					// Blink Effect 
					setTimeout(function(){document.getElementById("loginResult").innerHTML = "Contact Not Added";},250);   
					document.getElementById("loginResult").innerHTML = " ";
					return;              
				}
				
				// User Does Not Exist --> Create User and Proceed
				else
				{
					//showContacts();        
				}
			}
		};

		// Send JSON to MySQL database
		xhr.send(jsonPayload);
	}

	// We've encounted an error here
	catch(err) { document.getElementById("loginResult").innerHTML = err.message; }


	// Refresh the Contact Table
	showContacts();
	showContacts();
}

// deleteContact Function on main.html
function deleteContact(rowNum,id)
{
	console.log(rowNum);
	let table = document.getElementById("tbody-d");

	// THIS NEEDS WORK
	let check = confirm("Are you sure you want to remove contact: " + table.rows[rowNum].cells[1].innerHTML + " " + table.rows[rowNum].cells[2].innerHTML + "?");

	// If User cancels, return
    if (check === false) { return; } 
	
	let jsonPayload = JSON.stringify({id: id});
	console.log(jsonPayload);

	let url = location.href.substring(0, location.href.lastIndexOf("/")+1) + 'PHP/deleteContact.php';

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try 
	{
		xhr.onreadystatechange = function () 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				// reload Contacts
				showContacts();
			}
		};
		xhr.send(jsonPayload);
	} 
	
	catch (err) { console.log(err.message); }
}

// Function gives all class 'unsetTable' elements a number based on their row
function tableSetter() {
    currentRow = currentRowNumber;
    //console.log("tabelSetter entered");

    for (var i = entries.length - 1; i > -1; i--) {
        entries[i].classList.add(currentRow);
        entries[i].classList.remove("unsetTable");

        if (i % 4 == 0 && i > 0) {
            currentRow--;
            console.log("Iterating");
        }

        //console.log("i is " + i);

        //console.log("Looped");
    }

    //console.log("Complete");
}

//Search Function for search bar on main.html
function search()
{
	// Get Input
	let id = parseInt(document.getElementById("userID").innerText);
	let input = document.getElementById("searchbar").value;
 
  if(input == '')
  {
    showContacts();
    return;
  }
    
	// console.log(input);

	let jsonPayload = JSON.stringify({input:input,id:id});
	//console.log(jsonPayload);

	let url = location.href.substring(0, location.href.lastIndexOf("/")+1) + 'PHP/searchContacts.php';

    let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	xhr.onreadystatechange = function()	
    {
		if (this.readyState == 4 && this.status == 200)
		{
		  //console.log(xhr.responseText);
			let jsonObject = JSON.parse(xhr.responseText);
			//console.log(jsonObject);

			let contactTable = document.getElementById("tbody-d");
			document.getElementById('tbody-d').innerHTML = '';

			for (let i = 0; i < jsonObject.results.length; i++)
			{
				let splits = jsonObject.results[i].split(',');
				//console.log(splits);

				let row = contactTable.insertRow();

				let num = row.insertCell(0);
				num.innerHTML = i + 1;

				let firstName = row.insertCell(1);
				firstName.innerHTML = splits[1];

				let lastName = row.insertCell(2);
				lastName.innerHTML = splits[2];

				let email = row.insertCell(3);
				email.innerHTML = splits[3];

				let phoneNum = row.insertCell(4);
				phoneNum.innerHTML = splits[4];

				let dateCreated = row.insertCell(5);
				dateCreated.innerHTML = splits[5];

				let buttons = row.insertCell(6);
				buttons.innerHTML = '<td><button type="editButton" id = "' + splits[0] + '"class="btn btn-outline-primary" onclick = "editContact(this.parentNode.parentNode.rowIndex-1,this.id);">Edit</button> <button type="deleteButton" id = "' + splits[0] + '" class="btn btn-outline-danger" onclick = "deleteContact(this.parentNode.parentNode.rowIndex-1,this.id);">Delete</button><br></td>';

			}

			//let v = document.getElementById("searchbar");
			//console.log(v);
			//v.addEventListener("keyup", search);
		}
    };

	xhr.send(jsonPayload); 
}