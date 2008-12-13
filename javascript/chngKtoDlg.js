
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

function CreateChangeAccountDialog(konto) {
	
	var kto = null;
	new Ajax.Request('interface/getKonto.php?id=' + konto, {
		asynchronous: false,
		onSuccess: function(transport) {
			kto = transport.responseText.split(';');
		}
	});
	
	var dia = new KBDialog('chgKtoDlg', 'Konto &auml;ndern', 350, 185, dochgkto);
	
	// Kontoname
	var kid = new Element('input');
	kid.setAttribute('type', 'hidden');
	kid.setAttribute('name', 'kid');
	kid.setAttribute('value', konto);
	dia.AddElement(kid);
	
	var ktonamelbl = new Element('span').update('Kontoname:');
	ktonamelbl.setStyle({
		left: '5px',
		top: '5px',
		position: 'absolute'
	});
	dia.AddElement(ktonamelbl);
	
	var ktonameedit = new Element('input');
	ktonameedit.name = 'name';
	ktonameedit.value = kto[1];
	ktonameedit.setStyle({
		left: '105px',
		top: '5px',
		position: 'absolute', 
		width: '225px'
	});
	dia.AddElement(ktonameedit);
	
	// Planwert
	var ktoplanlbl = new Element('span').update('Planwert:');
	ktoplanlbl.setStyle({
		left: '5px',
		top: '25px',
		position: 'absolute'
	});
	dia.AddElement(ktoplanlbl);
	
	var ktoplanedit = new Element('input');
	ktoplanedit.name = 'planwert';
	ktoplanedit.value = number_format(kto[3], 2, ',', '');
	ktoplanedit.setStyle({
		left: '105px',
		top: '25px',
		position: 'absolute', 
		width: '225px'
	});
	dia.AddElement(ktoplanedit);
	
	// Konto löschen
	var ktodellbl = new Element('span').update('Konto l&ouml;schen:');
	ktodellbl.setStyle({
		left: '5px',
		top: '45px',
		position: 'absolute'
	});
	dia.AddElement(ktodellbl);
	
	var ktodeledit = new Element('input');
	ktodeledit.name = 'planwert';
	ktodeledit.type = 'checkbox';
	ktodeledit.setStyle({
		left: '105px',
		top: '45px',
		position: 'absolute'
	});
	dia.AddElement(ktodeledit);
	
	// Hinweis
	var txt = new Element('p');
	txt.update('<b>Achtung:</b> Wenn die Checkbox aktiviert ist wird das Konto endg&uuml;ltig gel&ouml;scht.'+
	' Alle Buchungen bleiben ohne Gegenkonto bestehen und sind f&uuml;r die Auswertung DEFEKT!'+
	' <em>Es sollten daher nur Konten ohne Buchungen gel&ouml;scht werden!</em>');
	txt.setStyle({
		left: '5px',
		top: '65px', 
		position: 'absolute', 
		width: '340px'
	});
	dia.AddElement(txt);
	
	return dia;
}