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

$sql = "SELECT DATE_FORMAT(datum, '%Y-%m') FROM buchungen b GROUP BY DATE_FORMAT(datum, '%Y-%m') ORDER BY DATE_FORMAT(datum, '%Y-%m')";

include_once('config.inc.php');
include_once('DatabaseFactory.class.php');

$dbFactory = new DatabaseFactory();
$connector = $dbFactory->GetDatabaseConnector($CONFIG);

$connector->Connect($CONFIG);
$connector->Query($sql);
$csv = $connector->SerializeResultToCSV();
$connector->Disconnect();

header('Content-Type: text/plain');
echo $csv;

?>