<?php

$ip=$_SERVER['REMOTE_ADDR'];

if (starts_with($ip, "183")) {
	$place="workplace";
} elseif (starts_with($ip, "222") || starts_with($ip, "60")){
	$place="institute";
} elseif (starts_with($ip, "58") || starts_with($ip, "218")){
	$place="home";
} else{
	$place="travel";
}

echo $place;

function starts_with($haystack, $needle)
{
	$length = strlen($needle);
	return (substr($haystack, 0, $length) === $needle);
}
?>