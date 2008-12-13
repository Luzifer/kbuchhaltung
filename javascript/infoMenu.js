
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

function checkUpdates() {
	var txt = new Element('div');
	
	new Ajax.Updater(txt, 'interface/checkUpdate.php', {
		asynchronous: false
	});
	
	var dia = null;
	if(txt.innerHTML == 'NOUPD') {
		dia = new KBDialog('aboutAppDlg', 'Updates', 200, 50);
		txt.innerHTML = "Keine Updates verf&uuml;gbar!";
	} else {
		dia = new KBDialog('aboutAppDlg', 'Updates', 450, 500);
	}
	
	dia.AddElement(txt);
	dia.Show();
	
}

function aboutBox() {
	var dia = new KBDialog('aboutAppDlg', '&Uuml;ber KBuchhaltung', 450, 120);
	
	var txt = new Element('p');
	txt.update('KBuchhaltung wurde ver&ouml;ffentlicht unter GPL.<br /><br />'+
	'Projekthomepage: <a href="http://http://github.com/Luzifer/kbuchhaltung/" target="_blank">http://github.com/Luzifer/kbuchhaltung/</a>');
	dia.AddElement(txt);
	
	dia.Show();
}