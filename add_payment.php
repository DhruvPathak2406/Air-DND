<?php
include 'db_connect.php';

$pay_id = $_POST['pay_id'];
$lease_id = $_POST['lease_id'];
$tenant_id = $_POST['tenant_id'];
$pay_date = $_POST['pay_date'];
$pay_method = $_POST['pay_method'];
$amt = $_POST['amt'];

$sql = "INSERT INTO payment (pay_id, lease_id, tenant_id, pay_date, pay_method, amt)
        VALUES ('$pay_id', '$lease_id', '$tenant_id', '$pay_date', '$pay_method', '$amt')";

if ($conn->query($sql) === TRUE) {
    echo "Payment added successfully!";
} else {
    echo "Error: " . $conn->error;
}

$conn->close();
?>
