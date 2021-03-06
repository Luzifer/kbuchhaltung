
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

function CreateDelEntryDialog(entry) {
	var dia = new KBDialog('delEntryDlg', 'Buchung l&ouml;schen', 350, 120, dodelentry);
	
	var eid = new Element('input');
	eid.setAttribute('type', 'hidden');
	eid.setAttribute('name', 'eid');
	eid.setAttribute('value', entry);
	dia.AddElement(eid);
	
	var txt = new Element('p');
	txt.update('Soll diese Buchung wirklich gel&ouml;scht werden? Wenn Ja, best&auml;tigen Sie diesen Dialog bitte mit "OK", ansonsten schlie&szlig;en Sie ihn mit dem roten Kreuz rechts oben.');
	txt.setStyle({
		textAlign: 'center'
	});
	dia.AddElement(txt);
	
	return dia;
}