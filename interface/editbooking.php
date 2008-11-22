<?

/*
 * KBuchhaltung is a script for the personal finance management
 * Copyright (C) 2008 Knut Ahlers
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

$bidtmp = split(';', urldecode($_POST['editorId']));
$bidtmp = split('_', $bidtmp[0]);
$bid = $bidtmp[1];

if(strpos($_POST['editorId'], 'field_date') !== false) {
	
	$val = urldecode($_POST['value']);
	
	if(strpos($val, '.') !== false) {
		$dp = explode('.', $val);
		$val = $dp[2]."-".$dp[1]."-".$dp[0];
	}
	
	$sql = "UPDATE buchungen SET datum = '$val' WHERE id = $bid";
	$sql2 = "SELECT DATE_FORMAT(datum, '%d.%m.%Y') FROM buchungen WHERE id = $bid";
	
} else if (strpos($_POST['editorId'], 'field_desc') !== false) {
	
	$val = urldecode($_POST['value']);
	$sql = "UPDATE buchungen SET bez = '$val' WHERE id = $bid";
	$sql2 = "SELECT bez FROM buchungen WHERE id = $bid";
	
} else if (strpos($_POST['editorId'], 'field_amount') !== false) {
	
	$val = urldecode($_POST['value']);
	$val = str_replace(',', '.', $val);
	$sql = "UPDATE buchungen SET betrag = '$val' WHERE id = $bid";
	$sql2 = "SELECT REPLACE(REPLACE(REPLACE(FORMAT(betrag,2),'.', 'ß'), ',', '.'), 'ß', ',') FROM buchungen WHERE id = $bid";
	
}

include_once('config.inc.php');
include_once('DatabaseFactory.class.php');

$dbFactory = new DatabaseFactory();
$connector = $dbFactory->GetDatabaseConnector($CONFIG);

$connector->Connect($CONFIG);
$firstres = $connector->Query($sql);
if($firstres) {
	$connector->Query($sql2);
	$secondres = $connector->FetchRow();
}
$connector->Disconnect();

if(!$firstres)
	die('ERROR');
echo $secondres[0];

?>