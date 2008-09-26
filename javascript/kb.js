
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

// Function to initialize the components and fill the account lists
function initapp() {
	$('buchungform').disable();
	ShowCurrentCalendar('kalender', 'DataClick');
	loadkontoliste();
	loadgkontoliste();
	suggestDate();
	loadBDates();
}

// Sends a new accounting entry to the interface to store into the database
// Additional loads the lists of accounts, categories and accounting entries again
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

// Fills the current date into the form for the new accounting entry
function suggestDate(rel) {
	var heute = new Date();
	var jahr = heute.getYear() + 1900;
	if(heute.getYear() > 2000)
		jahr -= 1900;
	var monat = heute.getMonth()+1;
	var tag = heute.getDate();
	$('nb_datum').value = tag+'.'+monat+'.'+jahr;
}

// Let the form for new accounts appear
function shownewkto() {
	Effect.Appear('newktodiv');
}

// Sends the data for the new account to the interface and reloads the interface
function donewkto() {
	new Ajax.Request('interface/newkto.php?'+$('nkform').serialize(), {
		method: 'get',
		asynchronous: false
	});
	Effect.Fade('newktodiv');
	$('nkform').reset();
	initapp();
}

// Receives the months with accounting entries from the database
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

// Executes the accounting entry when pressing the enter-key
function checkKeyBook(event) {
	if(event.keyCode == 13)
		dobook();
	return false;
}

// Changes the date in the form for a new accounting entry when the user clicks into the calendar
function DataClick(year, month, day) {
	$('nb_datum').value = day+'.'+month+'.'+year;
	hideKalender();
	$('nb_bez').focus();
}

// Shows the calendar to pick a new date for the accounting entry
function dateClick() {
	$('kalender').style.display = 'block';
}

// Hides the calendar
function hideKalender() {
	$('kalender').style.display = 'none';
}