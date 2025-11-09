<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once __DIR__ . '/db_connect.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["status" => "error", "message" => "Not a POST request"]);
    exit;
}

// For debugging — print incoming data
file_put_contents('debug_log.txt', print_r($_POST, true), FILE_APPEND);

$firstName = $_POST['firstName'] ?? '';
$lastName = $_POST['lastName'] ?? '';
$email = $_POST['email'] ?? '';
$phone = $_POST['phone'] ?? '';
$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';
$role = $_POST['role'] ?? '';

if (empty($firstName) || empty($lastName) || empty($email) || empty($phone) || empty($username) || empty($password) || empty($role)) {
    echo json_encode(["status" => "error", "message" => "All fields are required.", "data" => $_POST]);
    exit;
}

$checkStmt = $conn->prepare("SELECT id FROM users WHERE username = ? OR email = ?");
$checkStmt->bind_param("ss", $username, $email);
$checkStmt->execute();
$checkResult = $checkStmt->get_result();

if ($checkResult->num_rows > 0) {
    echo json_encode(["status" => "error", "message" => "Username or email already exists."]);
    exit;
}

$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

$stmt = $conn->prepare("INSERT INTO users (username, email, password, role, firstName, lastName, phone) VALUES (?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("sssssss", $username, $email, $hashedPassword, $role, $firstName, $lastName, $phone);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Inserted!", "data" => $_POST]);
} else {
    echo json_encode(["status" => "error", "message" => "DB Insert Failed", "error" => $stmt->error]);
}
?>
