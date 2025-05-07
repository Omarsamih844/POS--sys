<?php
// Simple test API endpoint that bypasses Laravel routing
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

// Create dummy users in the same format expected by the LoginModal
$users = [
    [
        'id' => 1,
        'first_name' => 'Test',
        'last_name' => 'User',
        'email' => 'test@example.com'
    ],
    [
        'id' => 2,
        'first_name' => 'Another',
        'last_name' => 'User',
        'email' => 'another@example.com'
    ]
];

// For debugging purposes, log that this file was accessed
file_put_contents('test-api-log.txt', date('Y-m-d H:i:s') . " - API accessed\n", FILE_APPEND);

// Return the response in the expected format
echo json_encode($users); 