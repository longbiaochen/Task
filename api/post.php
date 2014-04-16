<?php
include "db.php";

$page=$_REQUEST["page"];
$tab=$_REQUEST["tab"];
$content=$_REQUEST["content"];

$sql="INSERT INTO list VALUES('$page', '$tab', '$content')";
$ok=$db->exec($sql);
if(!$ok) {
	die("Cannot execute statement.");
} else {
	echo $db->lastInsertRowID();
}

?>