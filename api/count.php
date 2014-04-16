<?php
include "db.php";

$page = $_REQUEST["page"];
$sql = "SELECT tab, COUNT(*) FROM list WHERE page='$page' GROUP BY tab ";
$res = $db -> query($sql);
$msg = array();

while ($row = $res -> fetchArray()) {
	$msg[$row["tab"]] = $row[1];
}
echo json_encode($msg);

?>