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
include_once('version.php');

mysql_connect($CONFIG['dbhost'], $CONFIG['dbuser'], $CONFIG['dbpass']) == true ? define("DBG_MYSQL_CONN", true) : define("DBG_MYSQL_CONN", false);
mysql_select_db($CONFIG['database']) == true ? define("DBG_MYSQL_DBSEL", true) : define("DBG_MYSQL_DBSEL", false);

function EchoResult2CSV($result) {
	while($row = @mysql_fetch_row($result)) {
		for($i = 0; $i < count($row); $i++) {
			echo $row[$i];
			if($i < count($row) - 1)
				echo ";";
		}
		echo "\n";
	}
}

function GetDatabaseVersion() {
	if(!DBG_MYSQL_DBSEL) return null;
	
	$res = @mysql_query("SELECT value FROM appsettings WHERE `key` = 'version'");
	
	if(@mysql_num_rows($res) < 1) return "0.4";
	
	$r = mysql_fetch_assoc($res);
	return $r['value'];
}

?>
