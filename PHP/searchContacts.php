<?php

	$inData = getRequestInfo();
	
	$searchResults = "";
	$searchCount = 0;

	// Connect to MySQL Server
	$conn = new mysqli ("localhost", "PHP_Script", "ucf2024","cm_database"); 

	if ($conn->connect_error) { returnWithError( $conn->connect_error ); } 
	else
	{
 
    $stmt = $conn->prepare("SELECT id, firstname, lastname, email, phone, datecreated FROM contact WHERE firstname LIKE ? AND user = ?");
		$search = "%" . $inData["input"] . "%";
		$stmt->bind_param("ss", $search, $inData["id"]);

		$stmt->execute();
		
		$result = $stmt->get_result();

		while($row = $result->fetch_assoc())
		{
			if( $searchCount > 0 ) { $searchResults .= ","; }
			$searchCount++;
			$searchResults .= '"' . $row["id"] . ','. $row["firstname"] . ',' . $row["lastname"] . ',' . $row["email"] . ',' . $row["phone"] . ',' . $row["datecreated"] . '"';
		}

		if( $searchCount == 0 )
		{
			returnWithError( "No Records Found" );
		}
		else
		{
			returnWithInfo( $searchResults );
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
	
	function returnWithInfo( $searchResults )
	{
		$retValue = '{"results":[' . $searchResults . '],"error":""}';
		sendResultInfoAsJson( $retValue );
	}
?>