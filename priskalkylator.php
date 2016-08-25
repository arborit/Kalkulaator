<?php

// configurable items
$subject = "Web form";
$from = "noreply@domeen";
$to_cc = "cc@domeen";

// end of configurable items

$items = array('materials', 'piece_l', 'piece_w', 
		'shape_square', 'shape_half_rounded', 'shape_rounded', 
		'radius1', 'radius2', 'sinkhole1', 
		'sinkhole2', 'sinkhole3', 'sinks',
		'cooker1', 'cooker2', 'watertap', 
		'measurment', 'transport', 'transport_price',
		'total_weight_input', 'total_price_input', 'client_name',
		'client_address', 'client_post', 'client_mobile',
		'questionary', 'calc_misc_input');

$rt = array(
	'materials' => 'Välj en granitsort',
	'piece_l' => 'Längd',
	'piece_w' => 'Bredd',
	'shape_square' => 'Rak',
	'shape_half_rounded' => 'Halvrundad',
	'shape_rounded' => 'Rundad',
	'radius1' => 'R < 100mm',
	'radius2' => 'R100 < 300mm',
	'sinkhole1' => 'Över monterad',
	'sinkhole2' => 'Flush-fit',
	'sinkhole3' => 'Under monterad',
	'sinks' => 'Diskbänkar',
	'cooker1' => 'Över monterad',
	'cooker2' => 'Flush-fit',
	'watertap' => 'Antal hål för kranar och kontakter',
	'measurment' => 'Uppmätning',
	'transport' => 'Transport och installering',
	'transport_price' => 'transport_price',
	'total_weight_input' => 'total_weight_input',
	'total_price_input' => 'total_price_input',
	'client_name' => 'Namn',
	'client_address' => 'Adress',
	'client_post' => 'Postnr',
	'client_mobile' => 'Telefon',
	'questionary' => 'Hur har du hört om GranitSet',
	'calc_misc_input' => 'Datum för måttagning, mer information'
	);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	$a = $_POST;
	if (filter_var($_POST['client_email'], FILTER_VALIDATE_EMAIL)) {
		$ma = array();
		foreach ($items as $i) {
			$ma[] = $rt[$i] . ": " . ( is_array($a[$i]) ? implode(",", $a[$i]) : $a[$i]);
		}
		echo(serialize($ma) ."\n\n" . serialize($a));
		// mail($_POST['client_email'], $subject, implode("\n", $ma), "From: ${from}\r\nCc: ${to_cc}");
	} else {
		echo("Use browser 'Back' button to return to the form");
	}
} else {
	require_once('priskalkylator-template.html');
}
?>