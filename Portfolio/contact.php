<?php 
$servername = "localhost";
$username = "root";
$password = "";
$database = "formDetails";
$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed " . $conn->connect_error);
}

$name = $_POST['Name'];
$email = $_POST['Email'];
$sql = "INSERT INTO
    customerData (Name, Email)
    VALUES ('$name', '$email')";

if ($conn->query($sql) === TRUE) {
    echo "Record inserted successfully\n";
}
    $conn->close();
?>