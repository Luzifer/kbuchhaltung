
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
	if(checkValidDate($('nb_datum').value)) {
		new Ajax.Request('interface/book.php?'+$('buchungform').serialize(), {
			method: 'get',
			asynchronous: false
		});
		reloadSideData();
		loadBDates();
	} else {
		alert("Attention: The Date you've entered is invalid.\nThe entry was not submitted!");
	}
}

function reloadSideData() {
	$('buchungform').reset();
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
			
			// Removed because not working code
			//for(var i = 0; i < $('datechs').options.length; i++) {
			//	$('datechs').options[i] = null;
			//}
			$('datechs').options.length = 0;
			
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

function number_format (number, decimals, dec_point, thousands_sep)
{
  var exponent = "";
  var numberstr = number.toString ();
  var eindex = numberstr.indexOf ("e");
  if (eindex > -1)
  {
    exponent = numberstr.substring (eindex);
    number = parseFloat (numberstr.substring (0, eindex));
  }
  
  if (decimals != null)
  {
    var temp = Math.pow (10, decimals);
    number = Math.round (number * temp) / temp;
  }
  var sign = number < 0 ? "-" : "";
  var integer = (number > 0 ? 
      Math.floor (number) : Math.abs (Math.ceil (number))).toString ();
  
  var fractional = number.toString ().substring (integer.length + sign.length);
  dec_point = dec_point != null ? dec_point : ".";
  fractional = decimals != null && decimals > 0 || fractional.length > 1 ? 
               (dec_point + fractional.substring (1)) : "";
  if (decimals != null && decimals > 0)
  {
    for (i = fractional.length - 1, z = decimals; i < z; ++i)
      fractional += "0";
  }
  
  thousands_sep = (thousands_sep != dec_point || fractional.length == 0) ? 
                  thousands_sep : null;
  if (thousands_sep != null && thousands_sep != "")
  {
	for (i = integer.length - 3; i > 0; i -= 3)
      integer = integer.substring (0 , i) + thousands_sep + integer.substring (i);
  }
  
  return sign + integer + fractional + exponent;
}

function checkValidDate(date) {
	
	var dteDate;
	var day;
	var month;
	var year;
	
	if(date.indexOf('.') > -1) {
		var tmp = date.split('.');
		day = tmp[0];
		month = tmp[1];
		year = tmp[2];
	} else if(date.indexOf('-') > -1) {
		var tmp = date.split('-');
		day = tmp[2];
		month = tmp[1];
		year = tmp[0];
	} else return false;
	
	month = parseInt(month) - 1; // Javascript has month 0-11 instead of 1-12... 
	
	dteDate = new Date(year, month, day);

	return ((day==dteDate.getDate()) && (month==dteDate.getMonth()) && (year==dteDate.getFullYear()));
}