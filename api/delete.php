<?php
include "db.php";

$rowid = $_REQUEST["rowid"];
$sql = "DELETE FROM list WHERE rowid='$rowid'";
$ok = $db -> exec($sql);
if (!$ok) {
	die("Cannot execute statement.");
} else {
	echo "OK";
}
?>