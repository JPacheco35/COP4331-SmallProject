<?php

	$inData = getRequestInfo();
	
	$id = 0;
	$firstName = "";
	$lastName = "";

	$conn = new mysqli ("localhost", "PHP_Script", "ucf2024","cm_database"); 	

	if( $conn->connect_error )
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		// Check if the user already exists
		
		$stmt = $conn->prepare("SELECT ID,firstName,lastName FROM user WHERE username=?");
		$stmt->bind_param("s", $inData["username"]);
		$stmt->execute();
		$result = $stmt->get_result();
		
		// Random echo
		// echo "Hello World";

		// Return an error if the user already exists
		if( $row = $result->fetch_assoc()  ) { returnWithError("User already exists"); }
		
		// Otherwise, create the user
		else
		{
			$stmt = $conn->prepare("INSERT INTO user (username, password, firstName, lastName) VALUES(?,?,?,?)");
			$stmt->bind_param("ssss", $inData["username"], $inData["password"], $inData["firstName"], $inData["lastName"]);
			$stmt->execute();
			$id = $conn->insert_id;
			$firstName = $inData["firstName"];
			$lastName = $inData["lastName"];
			returnWithInfo($firstName, $lastName, $id);
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
		$retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo( $firstName, $lastName, $id )
	{
		$retValue = '{"id":' . $id . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>
