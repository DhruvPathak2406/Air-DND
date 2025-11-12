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

// Collect POST data
$role       = $_POST['role'] ?? '';
$firstName  = $_POST['firstName'] ?? '';
$lastName   = $_POST['lastName'] ?? '';
$email      = $_POST['email'] ?? '';
$phone      = $_POST['phone'] ?? '';
$username   = $_POST['username'] ?? '';
$password   = $_POST['password'] ?? '';

if (!$role || !$firstName || !$lastName || !$email || !$phone || !$username || !$password) {
    echo json_encode(["status" => "error", "message" => "Missing required fields"]);
    exit;
}

// Password hashing
$hashed = password_hash($password, PASSWORD_DEFAULT);

// Check if email/username already exists
$check = $conn->prepare("SELECT id FROM users WHERE email = ? OR username = ?");
$check->bind_param("ss", $email, $username);
$check->execute();
$check->store_result();

if ($check->num_rows > 0) {
    echo json_encode(["status" => "error", "message" => "Email or username already exists"]);
    exit;
}

// Insert into users table
$stmt = $conn->prepare("
    INSERT INTO users (role, first_name, last_name, email, phone, username, password, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, NOW())
");

$stmt->bind_param("sssssss", $role, $firstName, $lastName, $email, $phone, $username, $hashed);

if (!$stmt->execute()) {
    echo json_encode(["status" => "error", "message" => "Insert into users failed"]);
    exit;
}

// ========== INSERT INTO LANDLORD OR TENANT TABLE AS WELL ==========
$fullName = $firstName . " " . $lastName;

if ($role === "landlord") {

    $stmt2 = $conn->prepare("
        INSERT INTO landlord (Name, Phone_Number, Email)
        VALUES (?, ?, ?)
    ");
    $stmt2->bind_param("sss", $fullName, $phone, $email);

    if (!$stmt2->execute()) {
        echo json_encode(["status" => "error", "message" => "Failed to insert into landlord table"]);
        exit;
    }

} elseif ($role === "tenant") {

    $stmt3 = $conn->prepare("
        INSERT INTO tenant (Name, Phone_Number, Email)
        VALUES (?, ?, ?)
    ");
    $stmt3->bind_param("sss", $fullName, $phone, $email);

    if (!$stmt3->execute()) {
        echo json_encode(["status" => "error", "message" => "Failed to insert into tenant table"]);
        exit;
    }
}

echo json_encode(["status" => "success", "message" => "Account created"]);

$stmt->close();
$conn->close();
?>
