<?php
header("Content-Type: text/plain");

// Only allow POST
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo "error";
    exit;
}

// Read fields
$property    = trim($_POST["property"] ?? "");
$description = trim($_POST["description"] ?? "");
$priority    = trim($_POST["priority"] ?? "");

// Validate
if ($property === "" || $description === "" || $priority === "") {
    echo "missing_fields";
    exit;
}

// Convert priority into status
$status = "Pending";
if ($priority === "high") {
    $status = "Urgent";
} elseif ($priority === "medium") {
    $status = "Open";
}

// Database credentials
$host     = "127.0.0.1";
$username = "root";
$password = "";
$database = "airdnd";

// Connect
$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    echo "db_error";
    exit;
}

// For your table: maintenance (Req_ID, Req_Date, Description, Status, Prop_ID, Tenant_ID)
// We will store:
// - Req_Date = NOW()
// - Description = description from form
// - Status = based on priority
// - Prop_ID = store NULL (because user enters address, not ID)
// - Tenant_ID = store NULL for now

$propId   = null;
$tenantId = null;

$stmt = $conn->prepare("
    INSERT INTO maintenance (Req_Date, Description, Status, Prop_ID, Tenant_ID)
    VALUES (NOW(), ?, ?, ?, ?)
");

$stmt->bind_param("ssii", $description, $status, $propId, $tenantId);

if ($stmt->execute()) {
    echo "success";
} else {
    echo "error";
}

$stmt->close();
$conn->close();
?>
