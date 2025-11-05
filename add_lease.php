<?php
include 'db_connect.php';

$lease_id = $_POST['lease_id'];
$prop_id = $_POST['prop_id'];
$tenant_id = $_POST['tenant_id'];
$monthly_rent = $_POST['monthly_rent'];
$deposit = $_POST['deposit'];
$start_date = $_POST['start_date'];
$end_date = $_POST['end_date'];

$sql = "INSERT INTO lease (lease_id, prop_id, tenant_id, monthly_rent, deposit, start_date, end_date)
        VALUES ('$lease_id', '$prop_id', '$tenant_id', '$monthly_rent', '$deposit', '$start_date', '$end_date')";

if ($conn->query($sql) === TRUE) {
    echo "Lease added successfully!";
} else {
    echo "Error: " . $conn->error;
}

$conn->close();
?>
