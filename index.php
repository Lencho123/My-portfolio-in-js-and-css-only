<?php
// Set headers to allow cross-origin requests
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Check if it's a POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the raw POST data
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    // Validate the data
    if (isset($data['name']) && isset($data['email']) && isset($data['message'])) {
        // Sanitize the input
        $name = filter_var($data['name'], FILTER_SANITIZE_STRING);
        $email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
        $message = filter_var($data['message'], FILTER_SANITIZE_STRING);

        // Create the email content
        $to = "lencho.lachisa@astu.edu.et"; 
        $subject = "New Contact Form Submission";
        $email_content = "Name: $name\n";
        $email_content .= "Email: $email\n\n";
        $email_content .= "Message:\n$message\n";

        // Set email headers
        $headers = "From: $name <$email>\r\n";
        $headers .= "Reply-To: $email\r\n";
        $headers .= "X-Mailer: PHP/" . phpversion();

        // Send the email
        if (mail($to, $subject, $email_content, $headers)) {
            // Success response
            echo json_encode([
                'result' => 'success',
                'message' => 'Message sent successfully!'
            ]);
        } else {
            // Error response
            http_response_code(500);
            echo json_encode([
                'result' => 'error',
                'message' => 'Failed to send message. Please try again.'
            ]);
        }
    } else {
        // Invalid data response
        http_response_code(400);
        echo json_encode([
            'result' => 'error',
            'message' => 'Invalid form data'
        ]);
    }
} else {
    // Method not allowed response
    http_response_code(405);
    echo json_encode([
        'result' => 'error',
        'message' => 'Method not allowed'
    ]);
}
?>