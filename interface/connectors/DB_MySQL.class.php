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

include_once('IDBConnector.interface.php');

class DB_MySQL implements IDBConnector {
	private $connection = null;
	private $error = false;
	private $errormsg = null;
	private $query = null;
	
	public function Connect($credentials) {
		$this->connection = mysql_connect($credentials['dbhost'], $credentials['dbuser'], $credentials['dbpass']);
		if($this->connection === FALSE) {
			$this->connection = null;
			$this->error = true;
			$this->errormsg = "Could not connect to database using provided credentíals.";
			return false;
		}
		if(mysql_select_db($credentials['dbname'], $this->connection)) {
			$this->error = false;
			return true;
		} else {
			$this->error = true;
			$this->errormsg = "Could not select provided database '" . $credentials['dbname'] . "'";
			return false;
		}
	}
	
	public function Disconnect() {
		if($this->connection === null) {
			return true;
		} else {
			mysql_close($this->connection);
			return true;
		}
	}
	
	public function Query($queryString) {
		$this->query = mysql_query($queryString, $this->connection);
		if($this->query !== false) {
			return true;
		} else {
			$this->error = true;
			$this->errormsg = "An exception occured while executing your query:\n" . mysql_error($this->connection);
			return false;
		}
	}
	
	public function FetchAssoc() {
		return mysql_fetch_assoc($this->query);
	}
	
	public function FetchRow() {
		return mysql_fetch_row($this->query);
	}
	
	public function SerializeResultToCSV() {
		$resultString = "";
		while($row = mysql_fetch_row($this->query)) {
			for($i = 0; $i < count($row); $i++) {
				$resultString .= $row[$i];
				if($i < count($row) - 1)
					$resultString .= ";";
			}
			$resultString .= "\n";
		}
		return $resultString;
	}
	
	public function IsConnected() {
		return $connection != null;
	}
	
	public function HasError() {
		return $error;
	}
	
	public function LastError() {
		return $errormsg;
	}
}

?>