<?php

	$inData = getRequestInfo();
	
	// Get User Input
	$firstName = $inData["firstname"];
	$lastName = $inData["lastname"];
	$email = $inData["email"];
	$phoneNum = $inData["phonenum"];

	// Get Cookie Data
	$userId = $inData["id"];

	// Connect to MySQL Server
	$conn = new mysqli ("localhost", "PHP_Script", "ucf2024","cm_database"); 

	// Case: Connection Failed
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 

	// Case: Connection Success
	else
	{
		// Add Contact to Database
		$stmt = $conn->prepare("UPDATE contact SET firstname = ?, lastname = ?, email = ?, phone = ? WHERE id = ?;");
		$stmt->bind_param("sssss", $firstName, $lastName, $email, $phoneNum, $userId);
		$stmt->execute();
		$stmt->close();
		$conn->close();
		returnWithError("");
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
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
?>