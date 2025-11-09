<?php
require_once __DIR__ . '/db_connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $usernameOrEmail = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';
    $role = $_POST['role'] ?? '';

    if (empty($usernameOrEmail) || empty($password) || empty($role)) {
        echo json_encode(["status" => "error", "message" => "Please fill in all fields"]);
        exit;
    }

    $stmt = $conn->prepare("SELECT * FROM users WHERE (email = ? OR username = ?) AND role = ?");
    $stmt->bind_param("sss", $usernameOrEmail, $usernameOrEmail, $role);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $user = $result->fetch_assoc();

        if ($user['password'] === md5($password)) {
            echo json_encode([
                "status" => "success",
                "role" => $user['role'],
                "username" => $user['username']
            ]);
        } else {
            echo json_encode(["status" => "error", "message" => "Invalid password"]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "User not found or role mismatch"]);
    }
}
?>
