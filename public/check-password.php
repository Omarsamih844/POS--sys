<?php
// Direct password verification script
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Only allow POST requests for security
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => true, 'message' => 'Method not allowed']);
    exit;
}

// Get JSON data from request
$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (!$data || !isset($data['email']) || !isset($data['password'])) {
    http_response_code(400);
    echo json_encode(['error' => true, 'message' => 'Email and password are required']);
    exit;
}

// Log access to this file (without passwords)
file_put_contents('password-check-log.txt', date('Y-m-d H:i:s') . " - Password check attempt for email: " . $data['email'] . "\n", FILE_APPEND);

try {
    // Initialize Laravel environment to use its password hashing
    require_once __DIR__ . '/../vendor/autoload.php';
    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/..');
    $dotenv->load();
    
    // Connect to database
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
    
    // Get user by email
    $stmt = $pdo->prepare("SELECT id, first_name, last_name, email, password FROM users WHERE email = :email LIMIT 1");
    $stmt->execute(['email' => $data['email']]);
    $user = $stmt->fetch();
    
    if (!$user) {
        file_put_contents('password-check-log.txt', date('Y-m-d H:i:s') . " - User not found for email: " . $data['email'] . "\n", FILE_APPEND);
        http_response_code(404);
        echo json_encode(['error' => true, 'message' => 'User not found']);
        exit;
    }
    
    // Verify password using Laravel's Hash facade
    $passwordMatches = password_verify($data['password'], $user['password']);
    
    if ($passwordMatches) {
        // Remove password from response
        unset($user['password']);
        
        file_put_contents('password-check-log.txt', date('Y-m-d H:i:s') . " - Password verified successfully for: " . $data['email'] . "\n", FILE_APPEND);
        
        // Return success with user data
        echo json_encode([
            'success' => true,
            'message' => 'Login successful',
            'user' => $user
        ]);
    } else {
        file_put_contents('password-check-log.txt', date('Y-m-d H:i:s') . " - Invalid password for: " . $data['email'] . "\n", FILE_APPEND);
        
        // Return error for invalid password
        http_response_code(401);
        echo json_encode([
            'error' => true,
            'message' => 'Invalid password'
        ]);
    }
    
} catch (Exception $e) {
    // Log error
    file_put_contents('password-check-log.txt', date('Y-m-d H:i:s') . " - ERROR: " . $e->getMessage() . "\n", FILE_APPEND);
    
    // Return error message
    http_response_code(500);
    echo json_encode([
        'error' => true,
        'message' => $e->getMessage()
    ]);
} 