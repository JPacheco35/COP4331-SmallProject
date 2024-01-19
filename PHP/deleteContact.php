<?php

	$inData = getRequestInfo();

	// Connect to MySQL Server
	$conn = new mysqli ("localhost", "PHP_Script", "ucf2024","cm_database"); 

	// Case: Connection Failed
	if ($conn->connect_error) { returnWithError( $conn->connect_error ); } 

	// Case: Connection Success
	else
	{
		$stmt = $conn->prepare("DELETE FROM contact WHERE id = ?");
		$stmt->bind_param("s", $inData["id"]);
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