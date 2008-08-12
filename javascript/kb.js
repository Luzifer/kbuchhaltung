
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

function initapp() {
	$('buchungform').disable();
	ShowCurrentCalendar('kalender', 'DataClick');
	loadkontoliste();
	loadgkontoliste();
	suggestDate();
	loadBDates();
}

function loadkontoliste() {
	new Ajax.Request('interface/kontenliste.php', {
		method: 'get',
		onSuccess: function(transport) {
			$('kontenliste').innerHTML = '';
			var txt = transport.responseText;
			var ul = new Element('ul');
			var konten = txt.split('\n');
			for(var i = 0; i < konten.length - 1; i++) {
				var konto = konten[i].split(';');
				var li = new Element('li');
				li.id = konto[0];
				li.update(konto[1]+'<br />('+konto[2]+' &euro;)');
				if(konto[2] == '')
					li.update(konto[1]+'<br />(0,00 &euro;)');
				li.observe('click', function(evt) {
					loadbuchungen(Event.element(evt).id);
				});
				li.addClassName('clickable');
				ul.appendChild(li);
			}
			$('kontenliste').appendChild(ul);
		}
	});
}

function loadbuchungen(ktoid) {
	if(ktoid == '')
		return;
	$('nb_kto').value = ktoid;
	$('buchungform').enable();
	new Ajax.Request('interface/buchungsliste.php?kto='+ktoid+'&date='+$('datechs').value, {
		method: 'get',
		onSuccess: function(transport) {
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
				var fields = buchungen[i].split(';');
				var tr = new Element('tr');
				var td1 = new Element('td').update(fields[0]);
				var td2 = new Element('td').update(fields[1]);
				var td3 = new Element('td').update(fields[2]);
				var td4 = new Element('td').update(fields[3]);
				if(td4.innerHTML.indexOf('-') != -1) 
					td4.addClassName('ausgabe');
				else
					td4.addClassName('einnahme');
				td4.addClassName('ktosumme');
				tr.appendChild(td1);
				tr.appendChild(td2);
				tr.appendChild(td3);
				tr.appendChild(td4);
				table.appendChild(tr);
			}
			$('buchungen').appendChild(table);
		}
	});
	
	$('nb_bez').focus();
}

function loadgkontoliste() {
	new Ajax.Request('interface/gkontoliste.php?date='+$('datechs').value, {
		method: 'get',
		onSuccess: function(transport) {
			$('gkontenliste').innerHTML = '';
					
			var laenge = $('nb_gkonto').length;
			for (i=0; i <laenge; i++){
				$('nb_gkonto').options[$('nb_gkonto').length-1] = null;
			}
			
			var txt = transport.responseText;
			var table = new Element('table');
			var konten = txt.split('\n');
			
			for(var i = 0; i < konten.length - 1; i++) {	
				
				var konto = konten[i].split(';');
				var tr1 = new Element('tr');
				var td1 = new Element('td').update(konto[0]);
				if(konto[1] == 'e')
					td1.addClassName('einnahme');
				else
					td1.addClassName('ausgabe');
				td1.addClassName('ktoname');
				tr1.appendChild(td1);
				
				var tr2 = new Element('tr');
				var td2 = new Element('td').update(konto[2]+' &euro;');
				if(konto[2] == '') 
					td2.update('0,00 &euro;');
				td2.addClassName('ktosumme');
				tr2.appendChild(td2);
				
				var tr3 = new Element('tr');
				var td3 = new Element('td').update('<img src="img/spacer.gif" style="width:100%;height:5px;" />');
				tr3.appendChild(td3);
				
				table.appendChild(tr1);
				table.appendChild(tr2);
				table.appendChild(tr3);
				
				var opt = new Element('option').update(konto[1].toUpperCase()+': '+konto[0]);
				opt.value = konto[3];
				$('nb_gkonto').appendChild(opt);
			}
			
			$('gkontenliste').appendChild(table);
		}
	});
}

function dobook() {
	new Ajax.Request('interface/book.php?'+$('buchungform').serialize(), {
		method: 'get',
		asynchronous: false
	});
	$('buchungform').reset();
	loadbuchungen($('nb_kto').value);
	loadkontoliste();
	loadgkontoliste();
	suggestDate();
	$('nb_bez').focus();
}

function suggestDate(rel) {
	var heute = new Date();
	var jahr = heute.getYear() + 1900;
	if(heute.getYear() > 2000)
		jahr -= 1900;
	var monat = heute.getMonth()+1;
	var tag = heute.getDate();
	$('nb_datum').value = tag+'.'+monat+'.'+jahr;
}

function shownewkto() {
	Effect.Appear('newktodiv');
}

function donewkto() {
	new Ajax.Request('interface/newkto.php?'+$('nkform').serialize(), {
		method: 'get',
		asynchronous: false
	});
	Effect.Fade('newktodiv');
	$('nkform').reset();
	initapp();
}

function loadBDates() {
	new Ajax.Request('interface/buchungsdaten.php', {
		method: 'get',
		asynchronous: false,
		onSuccess: function(transport) {
			
			for(var i = 0; i < $('datechs').options.length; i++) {
				$('datechs').options[i] = null;
			}
			
			var txt = transport.responseText;
			var lines = txt.split('\n');
			var alloptions = new Element('option').update('Alle');
			alloptions.value = '';
			$('datechs').appendChild(alloptions);
			for(var i = 0; i < lines.length - 1; i++) {
				var option = new Element('option').update(lines[i]);
				option.value = lines[i];
				$('datechs').appendChild(option);
			}
			
			$('datechs').selectedIndex = $('datechs').options.length - 1;
			reselectPage();
		}
	});
}

function reselectPage() {
	loadgkontoliste();
	loadbuchungen($('nb_kto').value);
}

function checkKeyBook(event) {
	if(event.keyCode == 13)
		dobook();
	return false;
}

function DataClick(year, month, day) {
	$('nb_datum').value = day+'.'+month+'.'+year;
	hideKalender();
	$('nb_bez').focus();
}

function dateClick() {
	$('kalender').style.display = 'block';
}

function hideKalender() {
	$('kalender').style.display = 'none';
}