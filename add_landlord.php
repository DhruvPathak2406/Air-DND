<?php
include 'db_connect.php';

$landlord_id = $_POST['landlord_id'];
$name = $_POST['name_landlord'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$bank_acc = $_POST['bank_acc'];

$sql = "INSERT INTO landlord (landlord_id, name_landlord, email, phone, bank_acc)
        VALUES ('$landlord_id', '$name', '$email', '$phone', '$bank_acc')";

if ($conn->query($sql) === TRUE) {
    echo "Landlord added successfully!";
} else {
    echo "Error: " . $conn->error;
}

$conn->close();
?>
