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

$date = $_GET['date'];

$result = mysql_query("SELECT k.bez,k.typ,REPLACE(REPLACE(REPLACE(FORMAT((SELECT sum(b.betrag) * -1 FROM buchungen b WHERE b.gkonto = k.id AND b.datum LIKE '$date%'),2),'.', 'ß'), ',', '.'), 'ß', ',') AS \"summe\", k.id FROM konten k WHERE k.typ <> 'g' ORDER BY k.typ DESC, k.bez");


header('Content-Type: text/plain');
EchoResult2CSV($result);

?>