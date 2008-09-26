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

include_once("mysql.php");

$bid = $_POST['bid'];

if($_POST['date']) {
	
	$val = urldecode($_POST['date']);
	
	if(strpos($val, '.') !== false) {
		$dp = explode('.', $val);
		$val = $dp[2]."-".$dp[1]."-".$dp[0];
	}
	
	$sql = "UPDATE buchungen SET datum = '$val' WHERE id = $bid";
	$sql2 = "SELECT DATE_FORMAT(datum, '%d.%m.%Y') FROM buchungen WHERE id = $bid";
	
} else if ($_POST['desc']) {
	
	$val = urldecode($_POST['desc']);
	$sql = "UPDATE buchungen SET bez = '$val' WHERE id = $bid";
	$sql2 = "SELECT bez FROM buchungen WHERE id = $bid";
	
} else if ($_POST['amount']) {
	
	$val = urldecode($_POST['amount']);
	$val = str_replace(',', '.', $val);
	$sql = "UPDATE buchungen SET betrag = '$val' WHERE id = $bid";
	$sql2 = "SELECT REPLACE(REPLACE(REPLACE(FORMAT(betrag,2),'.', 'ß'), ',', '.'), 'ß', ',') FROM buchungen WHERE id = $bid";
	
}

if(!mysql_query($sql))
	die('ERROR');
	
$res = mysql_fetch_row(mysql_query($sql2));
echo $res[0];

?>