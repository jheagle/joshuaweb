<?php

$clinicName = $clinicWebsite = $serviceOther = $coManagement = '';

foreach ($_POST as $postKey => $postVal) {
    if (is_array($postVal)) {
        
    } else {
        switch ($postKey) {
            
        }
    }
}
$clinicName = !empty($_POST ['clinic-name']) ? $_POST ['clinic-name'] : 'No Name';

$clinicWebsite = !empty($_POST ['clinic-website']) ? $_POST ['clinic-website'] : 'No URL';

$locations = !empty($_POST ['location']) ? $_POST ['location'] : array();

$doctors = !empty($_POST ['doctor']) ? $_POST ['doctor'] : array();

$services = !empty($_POST ['services']) ? $_POST ['services'] : array();

$serviceOther = !empty($_POST ['other-service']) ? '<li>' . $_POST ['other-service'] . '</li>' : '';

$equipment = !empty($_POST ['equipment']) ? $_POST ['equipment'] : array();

$contactLens = !empty($_POST ['contact']) ? $_POST ['contact'] : array();

$lensCare = !empty($_POST ['care']) ? $_POST ['care'] : array();

$coManagment = !empty($_POST ['co-management']) ? '<li><dl><dt>Co-Managment Centre</dt><dd>' . $_POST ['co-management'] . '</dd></dl></li>' : '';

$other = !empty($_POST ['other']) ? $_POST ['other'] : array();

$news = !empty($_POST ['news']) ? $_POST ['news'] : array();

$newsOther = !empty($_POST ['other-news']) ? '<li>' . $_POST ['other-news'] . '</li>' : '';

$flash = !empty($_POST ['flash']) ? '<dt>Include</dt><dd>' . $_POST ['flash'] . '</dd>' : '';

$education = !empty($_POST ['education-topic']) ? '<li><dl><dt>Educational Topics</dt><dd>' . $_POST ['education-topic'] . '</dd></dl></li>' : '';

$products = !empty($_POST ['products-topic']) ? '<li><dl><dt>Product Topics</dt><dd>' . $_POST ['products-topic'] . '</dd></dl></li>' : '';

$funTopics = !empty($_POST ['fun-topic']) ? '<li><dl><dt>Fun Topics</dt><dd>' . $_POST ['fun-topic'] . '</dd></dl></li>' : '';

$newsTopics = !empty($_POST ['news-topic']) ? '<li><dl><dt>News Topics</dt><dd>' . $_POST ['news-topic'] . '</dd></dl></li>' : '';

$comments = !empty($_POST ['comments']) ? '<dt>Comments</dt><dd>' . $_POST ['comments'] . '</dd>' : '';

//$to = '<psalsberg@3conx.com>, <bharat@eyeconx.net>, <rocio@eyeconx.net>';

$subject = 'EyeStarTV Registration:' . $clinicName;

$headers = "From: register@eyestartv.com\r\nMIME-Version: 1.0\r\nContent-Type: text/html; charset=ISO-8859-1\r\n";

$message = "<html><body><h3>There was an EyeStarTV registration from $clinicName</h3><dl><dt>Clinic Name</dt><dd>$clinicName</dd><dt>Clinic Website</dt><dd>$clinicWebsite</dd><dt>Clinic Locations</dt><dd><ol>";

foreach ($locations as $location) {
    $message .= '<li><dl><dt>Address</dt><dd>'
            . (!empty($location ['address-street']) ? $location ['address-street'] . ', ' : 'No Street ')
            . (!empty($location ['address-city']) ? $location ['address-city'] . ', ' : 'No City ')
            . (!empty($location ['address-province']) ? $location ['address-province'] . ' ' : 'No Province ')
            . (!empty($location ['address-postal']) ? $location ['address-postal'] : 'No Postal')
            . '</dd><dt>Phone</dt><dd>' . (!empty($location ['clinic-phone']) ? $location ['clinic-phone'] : 'No Phone')
            . '</dd><dt>Email</dt><dd>' . (!empty($location ['clinic-email']) ? $location ['clinic-email'] : 'No Email')
            . (!empty($location['clinic-fax']) ? "</dd><dt>Fax</dt><dd>{$location['clinic-fax']}" : '')
            . (!empty($location['clinic-social']) ? "</dd><dt>Social</dt><dd>{$location['clinic-social']}" : '') . '</dd>'
            . (isset($location['monday-closed']) ? '<dt>Monday</dt><dd>' . (!empty($location['monday-open']) ? "{$location['monday-open']} - " : 'Not Open') . (!empty($location['monday-close']) ? $location['monday-close'] : '') . (!empty($location['monday-note']) ? ' *' . $location ['monday-note'] : '') . '</dd>' : '')
            . (isset($location['tuesday-closed']) ? '<dt>Tuesday</dt><dd>' . (!empty($location ['tuesday-open']) ? $location ['tuesday-open'] . ' - ' : 'Not Open ') . (!empty($location['tuesday-close']) ? $location ['tuesday-close'] : '') . (!empty($location ['tuesday-note']) ? ' *' . $location ['tuesday-note'] : '') . '</dd>' : '')
            . (isset($location['wednesday-closed']) ? '<dt>Wednesday</dt><dd>' . (!empty($location ['wednesday-open']) ? $location ['wednesday-open'] . ' - ' : 'Not Open ') . (!empty($location ['wednesday-close']) ? $location ['wednesday-close'] : '') . (!empty($location ['wednesday-note']) ? ' *' . $location ['wednesday-note'] : '') . '</dd>' : '')
            . (isset($location['thursday-closed']) ? '<dt>Thursday</dt><dd>' . (!empty($location ['thursday-open']) ? $location ['thursday-open'] . ' - ' : 'Not Open ') . (!empty($location ['thursday-close']) ? $location ['thursday-close'] : '') . (!empty($location ['thursday-note']) ? ' *' . $location ['thursday-note'] : '') . '</dd>' : '')
            . (isset($location['friday-closed']) ? '<dt>Friday</dt><dd>' . (!empty($location ['friday-open']) ? $location ['friday-open'] . ' - ' : 'Not Open ') . (!empty($location ['friday-close']) ? $location ['friday-close'] : '') . (!empty($location [0] ['friday-note']) ? ' *' . $location ['friday-note'] : '') . '</dd>' : '')
            . (isset($location['saturday-closed']) ? '<dt>Saturday</dt><dd>' . (!empty($location ['saturday-open']) ? $location ['saturday-open'] . ' - ' : 'Not Open ') . (!empty($location ['saturday-close']) ? $location ['saturday-close'] : '') . (!empty($location ['saturday-note']) ? ' *' . $location ['saturday-note'] : '') . '</dd>' : '')
            . (isset($location['sunday-closed']) ? '<dt>Sunday</dt><dd>' . (!empty($location ['sunday-open']) ? $location ['sunday-open'] . ' - ' : 'Not Open ') . (!empty($location ['sunday-close']) ? $location ['sunday-close'] : '') . (!empty($location ['sunday-note']) ? ' *' . $location ['sunday-note'] : '') . '</dd>' : '') . '</dl></li>';
}

$message .= "</ol></dd><dt>Doctors &amp; Staff</dt><dd><ul>";

foreach ($doctors as $doctor) {
    $message .= '<li><dl><dt>Name</dt><dd>' . (!empty($doctor['fname']) ? "{$doctor['fname']} " : 'No First Name ') . (!empty($doctor['lname']) ? $doctor['lname'] : 'No Last Name') . '</dd>'
            . '<dt>Biography</dt><dd>' . (!empty($doctor['biography']) ? $doctor['biography'] : 'No Biography') . '</dd>'
            . '<dt>Clinics</dt><dd><ul>';
    $clinics = !empty($doctor ['doc-locs']) ? $doctor['doc-locs'] : array();
    foreach ($clinics as $clinic) {
        $message .= (!empty($clinic) ? "<li>{$clinic}</li>" : '');
    }
    $message .= '</ul></dd></dl></li>';
}

$message .= "</ul></dd><dt>Services Offered</dt><dd><ul>";

foreach ($services as $service) {
    $message .= "<li>{$service}</li>";
}

$message .= "{$serviceOther}</ul></dd><dt>Equipment</dt><dd><ul>";

foreach ($equipment as $e) {
    $message .= "<li>{$e}</li>";
}

$message .= "</ul></dd><dt>Contact Lenses</dt><dd><ol>";

foreach ($contactLens as $cl) {
    $message .= "<li><dl><dt>Manufacturer</dt><dd>{$cl['manu']}</dd><dt>Brand</dt><dd>{$cl['brand']}</dd></dl></li>";
}

$message .= "</ol></dd><dt>Lens Care</dt><dd><ol>";

foreach ($lensCare as $care) {
    $message .= "<li><dl><dt>Manufacturer</dt><dd>{$care['manu']}</dd><dt>Brand</dt><dd>{$care['brand']}</dd></dl></li>";
}

$message .= "{$coManagment}</ol></dd><dt>Other Products</dt><dd><ol>";

foreach ($other as $o) {
    $message .= "<li><dl><dt>Manufacturer</dt><dd>{$o['manu']}</dd><dt>Brand</dt><dd>{$o['brand']}</dd></dl></li>";
}

$message .= "</ol></dd><dt>News</dt><dd><ul>";

foreach ($news as $n) {
    $message .= "<li>{$n}</li>";
}

$message .= "{$newsOther}</ul></dd>{$flash}<dt>Importance of:</dt><dd><ul>{$education}{$products}{$funTopics}{$newsTopics}<ul></dd>{$comments}</dl></body></html>";

//mail($to, $subject, $message, $headers);

echo "<html><body style='text-align: center; padding: 50px;'><h1>Thank you for Registering for EyeStarTV</h1></body></html>";
