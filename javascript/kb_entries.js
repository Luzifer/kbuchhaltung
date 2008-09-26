
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

function processEntryData(transport) {
	var txt = transport.responseText;
	
	$('buchungen').innerHTML = '';
	var table = new Element('table');
	table.style.width = '100%';
	
	var htr = new Element('tr');
	var htd1 = new Element('td').update('Datum');
	htd1.style.width = '120px';
	htd1.addClassName('bold');
	var htd2 = new Element('td').update('Bezeichnung');
	htd2.style.width = '354px';
	htd2.addClassName('bold');
	var htd3 = new Element('td').update('Gegenkonto');
	htd3.style.width = '170px';
	htd3.addClassName('bold');
	var htd4 = new Element('td').update('Betrag');
	htd4.style.width = '80px';
	htd4.addClassName('bold');
	htr.appendChild(htd1);
	htr.appendChild(htd2);
	htr.appendChild(htd3);
	htr.appendChild(htd4);
	table.appendChild(htr);
	
	var buchungen = txt.split('\n');
	for(var i = 0; i < buchungen.length; i++) {
		if(buchungen[i] == "")
			continue;
		var fields = buchungen[i].split(';');
		
		// Create row element
		var tr = new Element('tr');
		
		// Create date column
		var td1 = new Element('td');
		var td1s = new Element('span').update(fields[0]);
		td1.appendChild(td1s);
		new Ajax.InPlaceEditor(td1s, 'interface/editbooking.php', { 
			callback: function(form, value) { return 'bid=' + fields[4] + '&date='+escape(value); },
			okControl: false,
			cancelControl: false,
			submitOnBlur: true
		});
		tr.appendChild(td1);
		
		// Create description column
		var td2 = new Element('td');
		var td2s = new Element('span').update(fields[1]);
		td2.appendChild(td2s);
		new Ajax.InPlaceEditor(td2s, 'interface/editbooking.php', { 
			callback: function(form, value) { return 'bid=' + fields[4] + '&desc='+encodeURIComponent(value); },
			okControl: false,
			cancelControl: false,
			submitOnBlur: true
		});
		tr.appendChild(td2);
		
		// Create gegenkonto column
		var td3 = new Element('td').update(fields[2]);
		tr.appendChild(td3);
		
		// Create ammount column
		var td4 = new Element('td');
		var td4s = new Element('span').update(fields[3]);
		td4.appendChild(td4s);
		new Ajax.InPlaceEditor(td4s, 'interface/editbooking.php', { 
			callback: function(form, value) { return 'bid=' + fields[4] + '&amount='+escape(value); },
			okControl: false,
			cancelControl: false,
			submitOnBlur: true
		});
		if(fields[3].indexOf('-') != -1) 
			td4.addClassName('ausgabe');
		else
			td4.addClassName('einnahme');
		td4.addClassName('ktosumme');
		tr.appendChild(td4);
		
		// Add row to table
		table.appendChild(tr);
	}
	$('buchungen').appendChild(table);
}

// Function to load the accounting entries of the given account
function loadbuchungen(ktoid) {
	if(ktoid == '')
		return;
	$('nb_kto').value = ktoid;
	$('buchungform').enable();
	new Ajax.Request('interface/buchungsliste.php?kto='+ktoid+'&date='+$('datechs').value, {
		method: 'get',
		onSuccess: processEntryData,
		onException: function(a, b) { alert(b); }
	});
	
	$('nb_bez').focus();
}