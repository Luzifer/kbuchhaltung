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

include_once('config.inc.php');
include_once('DatabaseFactory.class.php');

$dbFactory = new DatabaseFactory();
$connector = $dbFactory->GetDatabaseConnector($CONFIG);

define("MD5_INITIAL", "784d29eb419ce1351237793e3e1abb21");
define("MD5_STRUCT", "7c5936c222f49c78baccad3b9f578f17");

// Check validity of SQL files to prevent changes on this files without
// some knowledge of the scripts used to access the database
if(MD5_INITIAL != md5(file_get_contents('sql/initialdata.sql')))
	die("Attention: Initial data file seems to be corupt. Please download the latest version of this application.");
if(MD5_STRUCT != md5(file_get_contents('sql/structure.sql')))
	die("Attention: Structure file seems to be corupt. Please download the latest version of this application.");

// Check whether the database is available with the provided credentials
// and database name
if(!$connector->Connect($CONFIG);)
	die("Can't connect to MySQL server. Please enter your credentials into the file 'config.inc.php' in the interface directory.");
	
// If there are already tables named like the ones we will create later
// we stop everything because we don't know anything about this tables
if($connector->Query('SELECT COUNT(1) FROM buchungen') || $connector->Query('SELECT COUNT(1) FROM konten'))
	die("The tables already exists! This script will NOT overwrite any data!");

// Try to fill the structure into the database. If this fails the user
// has to do the work manually until there is a better installer
foreach(explode(';', file_get_contents('sql/structure.sql')) as $command) {
	if(trim($command) == "")
		continue;
	if(!$connector->Query($command))
		die("An error occured while creating the database structure. Please create the tables manually:<br />".mysql_error());
}

// We have now a structure which can be used so we pass some data into
// the tables so the user can start using the application.
foreach(explode(';', file_get_contents('sql/initialdata.sql')) as $command) {
	if(trim($command) == "")
		continue;
	if(!$connector->Query($command))
		die("An error occured while inserting the initial data. Please research the problem manually:<br />".mysql_error());
}

// Set the version just installed into the database
$connector->Query("INSERT INTO appsettings VALUES ('version', '".APPVERSION."')");

$connector->Disconnect();

// If we get here we are happy and pass back to the interface which
// should stop sending the user to the set-up again because there
// is a working backend. :)
header('Location: index.html');

?>