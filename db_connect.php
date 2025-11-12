<?php
$DB_USER = 'root';
$DB_PASS = ''; 
$DB_NAME = 'airdnd';

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

// ✅ define hosts AND ports
$hosts = ['127.0.0.1', 'localhost'];
$ports = [3306, 3307];

$conn = null;
$lastError = '';

foreach ($hosts as $h) {
    foreach ($ports as $p) {
        try {
            $tmp = new mysqli($h, $DB_USER, $DB_PASS, $DB_NAME, $p);
            $tmp->set_charset('utf8mb4');
            $conn = $tmp;
            break 2; // success, stop trying
        } catch (mysqli_sql_exception $e) {
            $lastError = $e->getMessage();
        }
    }
}

if (!$conn) {
    http_response_code(500);
    error_log('DB connection failed: ' . $lastError);
    echo 'db_error';
    exit;
}
?>


