<?php
include 'db_connect.php';

$req_id = $_POST['req_id'];
$tenant_id = $_POST['tenant_id'];
$prop_id = $_POST['prop_id'];
$status_m = $_POST['status_m'];
$date_req = $_POST['date_req'];
$description_m = $_POST['description_m'];

$sql = "INSERT INTO maintenance (req_id, tenant_id, prop_id, status_m, date_req, description_m)
        VALUES ('$req_id', '$tenant_id', '$prop_id', '$status_m', '$date_req', '$description_m')";

if ($conn->query($sql) === TRUE) {
    echo "Maintenance request added successfully!";
} else {
    echo "Error: " . $conn->error;
}

$conn->close();
?>
