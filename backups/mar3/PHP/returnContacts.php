<?php

   $inData = getRequestInfo();

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
		$stmt = $conn->prepare("SELECT DISTINCT firstName, lastName, email, phone, datecreated FROM contact WHERE user=15");
		//$stmt->bind_param("s", $inData["userId"]);
		$stmt->execute();
    $result = $stmt->get_result();
    mysqli_stmt_store_result($stmt);
   
    printf("%d\n",$stmt->num_rows());
    echo $stmt->get_result();
   
  
   
   
     

		// If Login
		if( $row = $result->fetch_assoc()  )
		{
			returnWithInfo( $row['firstName'], $row['lastName'], $row['email'], $row['phone'] , $row['datecreated'] );
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
	
	function returnWithInfo( $firstName, $lastName, $email, $phone, $datecreated)
	{
		$retValue = '{"firstName":"' . $firstName . '","lastName":"' . $lastName . '","email":"' . $email . '",
                        "phone":"' . $phone . '","datecreated":"' . $datecreated . '","error":""}';
		sendResultInfoAsJson( $retValue );
	}

?>