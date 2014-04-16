<?php
include "db.php";

$page = $_REQUEST["page"];
$tab = $_REQUEST["tab"];

$res = $db->query("SELECT rowid, * FROM list WHERE page='$page' AND tab='$tab' ORDER BY rowid DESC");

$msg = array();
while ($row = $res->fetchArray()) {
	$item = array();
	$item["id"]= $row["rowid"];
	$item["task"] = $row["content"];
	array_push($msg, $item);
}
echo json_encode($msg);
?>