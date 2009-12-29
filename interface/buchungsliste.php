<?php

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

$kto = $_GET['kto'];
$date = $_GET['date'];

$result = mysql_query("SELECT DATE_FORMAT(b.datum, '%d.%m.%Y'), b.bez, gk.bez, b.betrag, b.id FROM buchungen b INNER JOIN konten gk ON gk.id = b.gkonto WHERE b.konto = $kto AND b.datum LIKE '$date%' ORDER BY b.datum DESC, b.id DESC");

header('Content-Type: text/plain');
header("Expires: Sat, 26 Jul 1997 05:00:00 GMT");
EchoResult2CSV($result);

?>
