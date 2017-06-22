<?php
$stdout = fopen("php://stdout", "w");

$body = file_get_contents('php://input');
fwrite($stdout, "$body\n\n");

$sent = $_SERVER["HTTP_CRONOFY_HMAC_SHA256"];
fwrite($stdout, "Request HMAC:    $sent\n");

$calculated = base64_encode(hash_hmac("sha256", $body, $_ENV["CRONOFY_CLIENT_SECRET"], true));
fwrite($stdout, "Calculated HMAC: $calculated\n");

$match = $sent === $calculated;
fwrite($stdout, "Match: $match\n");
fwrite($stdout, "\n");

?>
