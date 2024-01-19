<?php
// Connect to the database
$conn = new mysqli ("localhost", "PHP_Script", "ucf2024","cm_database");

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get all users
$sql = "SELECT username, password FROM user";
$result = $conn->query($sql);

// If there are users
if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        echo "username: " . $row["username"]. " - password: " . $row["password"]. "<br>";
    }
} else {
    echo "0 results";
}
$conn->close();
?>