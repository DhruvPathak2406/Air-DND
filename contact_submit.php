<?php
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["status" => "error", "message" => "Invalid request"]);
    exit;
}

$name = $_POST["name"] ?? "";
$email = $_POST["email"] ?? "";
$subject = $_POST["subject"] ?? "";
$message = $_POST["message"] ?? "";

if (!$name || !$email || !$subject || !$message) {
    echo json_encode(["status" => "error", "message" => "Missing required fields"]);
    exit;
}

$conn = new mysqli("localhost", "root", "", "airdnd");

if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "DB connection failed"]);
    exit;
}

$stmt = $conn->prepare("INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $name, $email, $subject, $message);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Message stored"]);
} else {
    echo json_encode(["status" => "error", "message" => "DB insert failed"]);
}

$stmt->close();
$conn->close();
?>
