<?php
header('Content-Type: text/plain');

include 'db_connect.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo 'error';
    exit;
}

$property = isset($_POST['property']) ? trim($_POST['property']) : '';
$description = isset($_POST['description']) ? trim($_POST['description']) : '';
$priority = isset($_POST['priority']) ? trim($_POST['priority']) : '';

if ($property === '' || $description === '' || $priority === '') {
    echo 'missing_fields';
    exit;
}

try {
    $stmt = $conn->prepare('INSERT INTO maintenance (property, description, priority) VALUES (?, ?, ?)');
    $stmt->bind_param('sss', $property, $description, $priority);
    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        echo 'success';
    } else {
        echo 'error';
    }

    $stmt->close();
    $conn->close();
} catch (mysqli_sql_exception $e) {
    error_log('DB insert failed: ' . $e->getMessage());
    http_response_code(500);
    echo 'error';
}
?>
