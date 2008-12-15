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

include_once('interface/mysql.php');
include_once('interface/version.php');

$dbv = GetDatabaseVersion();

if($dbv == APPVERSION)
	die('Database is up-to-date. No update needed. Have fun!');
	
if($dbv == "0.4") {
	$sql = "CREATE TABLE IF NOT EXISTS `appsettings` ( `key` varchar(50) NOT NULL, `value` varchar(255) NOT NULL, UNIQUE KEY `key` (`key`) );";
	if(!mysql_query($sql))
		die('Error while creating appsettings table. Your database is corrupt!');
	$sql = "ALTER TABLE konten ADD COLUMN `planval` float NOT NULL;";
	if(!mysql_query($sql))
		die('Error while creating column planval. Your database is corrupt!');
	$sql = "INSERT INTO appsettings VALUES ('version', '0.5')";
	if(!mysql_query($sql))
		die('Error while setting database version. Your database is corrupt!');
	header('Location: ?');
}

if($dbv == "0.5") {
	$sql = "UPDATE appsettings SET `value` = '0.6' WHERE `key` = 'version'";
	if(!mysql_query($sql))
		die('Error while setting database version. Your database is corrupt!');
	header('Location: ?');
}

echo "Something weird happened... You have a version of this application for which is no update defined and it is not the final version... Please ask the developer.";

?>