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

include_once('mysql.php');

header("Expires: Sat, 26 Jul 1997 05:00:00 GMT");

$datum = $_GET['nb_datum'];

if(strpos($datum, '.') !== false) {
	$dp = explode('.', $datum);
	$datum = $dp[2]."-".$dp[1]."-".$dp[0];
}

$bez = $_GET['nb_bez'];
$gkonto = $_GET['nb_gkonto'];
$betrag = urldecode(str_replace(',', '.', $_GET['nb_betrag']));
$konto = $_GET['nb_kto'];

$sql = "INSERT INTO buchungen VALUES (NULL, '$bez', $betrag, $konto, $gkonto, '$datum')";
file_put_contents('sql.txt', $sql);
mysql_query($sql);

?>
