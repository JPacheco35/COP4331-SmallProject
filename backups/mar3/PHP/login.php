
<?php

	$inData = getRequestInfo();
 	$firstName = "";
	$lastName = "";
  $id = 0;
	
	// Connect to SQL database
	$conn = new mysqli ("localhost", "PHP_Script", "ucf2024","cm_database"); 	
	
	// Case: Connection Failed
	if( $conn->connect_error )
	{
		//returnWithError("Connection failed: " . $conn->connect_error );
		die("Connection failed: " . mysqli_connect_error());
	}
	// Case: Connection Succeeded 
	else
	{		
		$stmt = $conn->prepare("SELECT ID,firstName,lastName FROM user WHERE username=? AND password =?");
		$stmt->bind_param("ss", $inData["username"], $inData["password"]);
		$stmt->execute();
		$result = $stmt->get_result();

		// If Login
		if( $row = $result->fetch_assoc()  )
		{
			returnWithInfo( $row['firstName'], $row['lastName'], $row['ID'] );
		}
		else
		{
			returnWithError("No Records Found");
		}

		$stmt->close();
		$conn->close();
	}
  
	
	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"id":0,"firstName":" ","lastName":" ","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo( $firstName, $lastName, $id )
	{
		$retValue = '{"id":' . $id . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>
