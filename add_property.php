<?php
include 'db_connect.php';

$prop_id = $_POST['prop_id'];
$landlord_id = $_POST['landlord_id'];
$address = $_POST['address'];
$type_prop = $_POST['type_prop'];
$status_prop = $_POST['status_prop'];
$rent_amt = $_POST['rent_amt'];

$sql = "INSERT INTO property (prop_id, landlord_id, address, type_prop, status_prop, rent_amt)
        VALUES ('$prop_id', '$landlord_id', '$address', '$type_prop', '$status_prop', '$rent_amt')";

if ($conn->query($sql) === TRUE) {
    echo "Property added successfully!";
} else {
    echo "Error: " . $conn->error;
}

$conn->close();
?>
