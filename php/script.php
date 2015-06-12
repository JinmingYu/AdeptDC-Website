<?php

//-------------------------------------------
// Contact form submission and email script
//-------------------------------------------

//Initialize form and new variables
$isEmailSent = false;
$contactStatusMessage = "";
$contactName = "";
$contactEmail = "";
$contactMessage = "";

// Process the form variables
if(isset($_POST['contactSubmit']) && $_POST['contactSubmit']=="Submit"){
	// Preprocess user submitted data to remove any scripts and prevent hacks
	$contactName = ucwords(htmlspecialchars(strip_tags(stripslashes(trim($_POST['contactName'])))));
	$contactEmail = htmlspecialchars(strip_tags(stripslashes(trim($_POST['contactEmail']))));
	$contactMessage = htmlspecialchars(strip_tags(stripslashes(trim($_POST['contactMessage']))));

	// Check processed variables against null values
	if(empty($contactName) || empty($contactEmail) || empty ($contactMessage)) {
		$contactStatusMessage = "Please complete the form before submitting";
	}else{
	// if no null values found, form is complete, proceed to prepare email
		$myEmailAddress = 'rajat.ghosh@adeptdc.com, rajat.ghosh11@gmail.com';
		$emailSubject = "AdeptDC - Message Received from $contactName";
		$emailMessage = $contactMessage;
		$emailHeaders = "MIME-Version: 1.0" . PHP_EOL;
		$emailHeaders .= "Content-type:text/html;charset=UTF-8" . PHP_EOL;
		$emailHeaders .= 'From: ' . $contactName . ' <' . $contactEmail . '>' . PHP_EOL;
    	$emailHeaders .= 'Reply-To: ' . $contactName . ' <' . $contactEmail . '>' . PHP_EOL;
    	$emailHeaders .= 'X-Mailer: PHP/' . phpversion();
    	// Email has been prepared, now send the email
    	$isEmailSent = mail($myEmailAddress, $emailSubject, $emailMessage, $emailHeaders);
		if($isEmailSent){
			$contactStatusMessage = "Your message has been sent successfully";
		}else{
			$contactStatusMessage = "There was an error sending your message at this time. Please try again later";
		}
	}
}

//-------------------------------------------

?>