
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

function showGuV(transport) {
	$('buchungen').innerHTML = '';
	
	var txt = transport.responseText;
	var table = new Element('table');
	var konten = txt.split('\n');
	
	var einn = 0.0;
	var ausg = 0.0;
	
	// Einnahmen schreiben
	var tr = new Element('tr');
	var td = new Element('td').update('Einnahmen');
	td.writeAttribute('colspan', '3');
	td.addClassName('guv_ueberschrift');
	tr.appendChild(td);
	table.appendChild(tr);
	
	//Andere Einnahmen;e;-80,00;7
	for(var i = 0; i < konten.length; i++) {
		var fields = konten[i].split(';');
		if(fields[1] == 'e' && fields[2] != '') {
			var tr = new Element('tr');
			var col1 = new Element('td').update(fields[0]);
			tr.appendChild(col1);
			
			var sum = parseFloat(fields[2].replace('.', '').replace(',', '.')) * -1;
			einn += sum;
			
			var col2 = new Element('td').update(number_format (sum, 2, ',', '.')+' &euro;');
			col2.addClassName('ktosumme');
			tr.appendChild(col2);
			
			var col3 = new Element('td');
			tr.appendChild(col3);
			
			table.appendChild(tr);
		}
	}
	
	// Ausgaben schreiben
	var tr = new Element('tr');
	var td = new Element('td').update('Ausgaben');
	td.writeAttribute('colspan', '3');
	td.addClassName('guv_ueberschrift');
	tr.appendChild(td);
	table.appendChild(tr);
	
	for(var i = 0; i < konten.length; i++) {
		var fields = konten[i].split(';');
		if(fields[1] == 'a' && fields[2] != '') {
			var tr = new Element('tr');
			var col1 = new Element('td').update(fields[0]);
			tr.appendChild(col1);
			
			var sum = parseFloat(fields[2].replace('.', '').replace(',', '.'));
			ausg += sum;
			
			var col2 = new Element('td');
			tr.appendChild(col2);
			
			var col3 = new Element('td').update(number_format (sum, 2, ',', '.')+' &euro;');
			col3.addClassName('ktosumme');
			tr.appendChild(col3);
			
			table.appendChild(tr);
		}
	}
	
	var tr = new Element('tr');
	var td = new Element('td');
	td.addClassName('guv_sumline');
	tr.appendChild(td);
	var td = new Element('td').update(number_format (einn, 2, ',', '.')+' &euro;');
	td.addClassName('ktosumme');
	td.addClassName('guv_sumline');
	tr.appendChild(td);
	var td = new Element('td').update(number_format (ausg, 2, ',', '.')+' &euro;');
	td.addClassName('ktosumme');
	td.addClassName('guv_sumline');
	tr.appendChild(td);
	table.appendChild(tr);
	
	$('buchungen').appendChild(table);
}

function doGuVrg() {
	new Ajax.Request('interface/gkontoliste.php?date='+$('datechs').value, {
		method: 'get',
		onSuccess: showGuV,
		onException: function(a, b) { alert(b); }
	});
}