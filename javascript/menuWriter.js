
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

// JavaScript Document

function WriteMenu() {
	var buchhaltung = new KBMenu('Buchhaltung');
	
	buchhaltung.AddEntry('Konto hinzufügen', function() { shownewkto(); });
	buchhaltung.AddEntry('Neu starten', function() { window.history.go(0); });
	
	buchhaltung.WriteTo('appmenu', 0);
	
	
	var auswertung = new KBMenu('Auswertung');
	
	auswertung.AddEntry('GuV-Rechnung', function() { doGuVrg(); });
	
	auswertung.WriteTo('appmenu', 1);
}