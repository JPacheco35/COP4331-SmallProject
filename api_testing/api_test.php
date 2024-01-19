<?php

	$inData = getRequestInfo();

    $name = $inData["name"];

    // Return "Hello, $name"
    returnWithInfo($name);
    
    function returnWithInfo($message)
    {
        $greeting_joined = array("Hello, ", $message);
        $retValue = '{"greeting":"' . join($greeting_joined) . '"}';
        
        // Send the JSON back to the client
        sendResultInfoAsJson($retValue);
    }

    function sendResultInfoAsJson($obj)
    {
        header('Content-type: application/json');
        echo $obj;
    }

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}
?>