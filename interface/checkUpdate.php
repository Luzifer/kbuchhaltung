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

include('version.php');

$official_version = trim(file_get_contents('http://www.kbuchhaltung.de/appstate/version.txt'));

if(APPVERSION == $official_version)
	die("NOUPD");
	
if(strpos(APPVERSION, 'pre')) {
	die("<b>Du benutzt eine Entwicklerversion.</b><br /><br />Bitte halte dich selber auf einem aktuellen Stand!");
}
	
echo "<b>Version $official_version verf&uuml;gbar.</b><br /><br />";
echo file_get_contents('http://www.kbuchhaltung.de/appstate/changelog.txt');

?>