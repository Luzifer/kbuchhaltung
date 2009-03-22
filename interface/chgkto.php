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
header("Expires: Sat, 26 Jul 1997 05:00:00 GMT");

$planwert = urldecode($_GET['planwert']);
$planwert = str_replace(',', '.', $planwert);

$name = mysql_real_escape_string(urldecode($_GET['name']));

$kid = urldecode($_GET['kid']);

include_once("mysql.php");

$sql = "UPDATE konten SET bez = '$name', planval = $planwert WHERE id = $kid";

if($_GET['ktodel'] == "on")
	$sql = "DELETE FROM konten WHERE id = $kid";

mysql_query($sql);

?>
