
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

function CreateFilterDialog() {
	
	var filterdialog = new KBDialog('filterDlg', 'Buchungsfilter', 350, 135, dofltrentries);
	
	// Textfilter
	var txtlbl = new Element('span').update('Beschreibungsfilter: (% ist Wildcard)');
	txtlbl.setStyle({
		left: '5px',
		top: '5px',
		position: 'absolute'
	});
	filterdialog.AddElement(txtlbl);
	
	var txtbox = new Element('input');
	txtbox.name = 'filtertext';
	txtbox.type = 'text';
	txtbox.value = '%';
	txtbox.setStyle({
		left: '10px',
		top: '25px',
		width: '330px',
		position: 'absolute'
	});
	filterdialog.AddElement(txtbox);
	
	// Gegenkontofilter
	var ktolbl = new Element('span').update('Gegenkonto:');
	ktolbl.setStyle({
		left: '5px',
		top: '45px',
		position: 'absolute'
	});
	filterdialog.AddElement(ktolbl);
	
	var ktoselect = new Element('select');
	ktoselect.name = 'konto';
	ktoselect.setStyle({
		left: '10px',
		top: '65px',
		width: '335px',
		position: 'absolute'
	});
	
	var opt = new Element('option').update('Alle');
	opt.value = '0';
	ktoselect.appendChild(opt);
	
	new Ajax.Request('interface/gkontoliste.php?date=', {
		method: 'get',
		asynchronous: false,
		onSuccess: function(transport) {
			var txt = transport.responseText;
			var konten = txt.split('\n');
			for(var i = 0; i < konten.length - 1; i++) {
				var konto = konten[i].split(';');
				var opt = new Element('option').update(konto[1].toUpperCase()+': '+konto[0]);
				opt.value = konto[3];
				ktoselect.appendChild(opt);
			}
		},
		onException: function(a,b) {
			alert(b);
		}
	});
	
	filterdialog.AddElement(ktoselect);
	
	var date = new Element('input');
	date.type = 'hidden';
	date.name = 'date';
	date.value = $('datechs').value;
	filterdialog.AddElement(date);
	
	return filterdialog;
	
}