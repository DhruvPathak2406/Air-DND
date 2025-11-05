<?php
include 'db_connect.php';

$tenant_id = $_POST['tenant_id'];
$name_t = $_POST['name_t'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$occupation = $_POST['occupation'];
$address = $_POST['address'];

$sql = "INSERT INTO tenant (tenant_id, name_t, email, phone, occupation, address)
        VALUES ('$tenant_id', '$name_t', '$email', '$phone', '$occupation', '$address')";

if ($conn->query($sql) === TRUE) {
    echo "Tenant added successfully!";
} else {
    echo "Error: " . $conn->error;
}

$conn->close();
?>
