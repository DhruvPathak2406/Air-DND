<?php
header("Content-Type: application/json");

// DB connect
$host = "localhost";
$user = "root";
$pass = "";
$db   = "airdnd";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "DB connection failed"]);
    exit;
}

$role     = $_POST["role"] ?? '';
$input    = $_POST["username"] ?? ''; // username or email
$password = $_POST["password"] ?? '';

if (!$role || !$input || !$password) {
    echo json_encode(["status" => "error", "message" => "Enter all fields"]);
    exit;
}

// Check user by username OR email AND role
$stmt = $conn->prepare("
    SELECT id, username, email, password, role 
    FROM users 
    WHERE (username = ? OR email = ?) AND role = ?
");
$stmt->bind_param("sss", $input, $input, $role);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(["status" => "error", "message" => "User not found"]);
    exit;
}

$user = $result->fetch_assoc();

// Verify password
if (!password_verify($password, $user["password"])) {
    echo json_encode(["status" => "error", "message" => "Incorrect password"]);
    exit;
}

// Login success
echo json_encode([
    "status"   => "success",
    "message"  => "Login successful",
    "role"     => $user["role"],
    "username" => $user["username"]
]);

$stmt->close();
$conn->close();
?>
