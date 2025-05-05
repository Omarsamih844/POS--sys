<?php
// Direct database access to fetch users
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

try {
    // Log access to this file
    file_put_contents('db-users-log.txt', date('Y-m-d H:i:s') . " - Direct DB access attempted\n", FILE_APPEND);
    
    // Get database config from Laravel's .env file
    require_once __DIR__ . '/../vendor/autoload.php';
    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/..');
    $dotenv->load();
    
    // Connect to database using PDO
    $host = $_ENV['DB_HOST'];
    $port = $_ENV['DB_PORT'];
    $database = $_ENV['DB_DATABASE'];
    $username = $_ENV['DB_USERNAME'];
    $password = $_ENV['DB_PASSWORD'];
    
    $dsn = "mysql:host=$host;port=$port;dbname=$database;charset=utf8mb4";
    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ];
    
    $pdo = new PDO($dsn, $username, $password, $options);
    
    // Query to get users
    $stmt = $pdo->prepare("SELECT id, first_name, last_name, email FROM users ORDER BY first_name");
    $stmt->execute();
    $users = $stmt->fetchAll();
    
    // Log success and return users
    file_put_contents('db-users-log.txt', date('Y-m-d H:i:s') . " - Successfully fetched " . count($users) . " users\n", FILE_APPEND);
    echo json_encode($users);
    
} catch (Exception $e) {
    // Log error
    file_put_contents('db-users-log.txt', date('Y-m-d H:i:s') . " - ERROR: " . $e->getMessage() . "\n", FILE_APPEND);
    
    // Return error message
    http_response_code(500);
    echo json_encode([
        'error' => true,
        'message' => $e->getMessage(),
        'trace' => $e->getTraceAsString()
    ]);
} 