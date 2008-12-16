
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

function processKontoListe(transport) {
	$('kontenliste').innerHTML = '';
	var txt = transport.responseText;
	var ul = new Element('ul');
	ul.id = "kontenUL";
	var konten = txt.split('\n');
	for(var i = 0; i < konten.length - 1; i++) {
		var konto = konten[i].split(';');
		var li = new Element('li');
		li.id = konto[0];
		li.update(konto[1]+'<br />('+number_format(konto[2], 2, ',', '.')+' &euro;)');
		if(konto[2] == '')
			li.update(konto[1]+'<br />(0,00 &euro;)');
		li.observe('click', function(evt) {
			loadbuchungen(Event.element(evt).id);
			var lis = $('kontenUL').descendants();
			for(var i = 0; i < lis.length; i++) {
				lis[i].style.background = '#fff';
			}
			Event.element(evt).style.background = '#eee';
		});
		li.addClassName('clickable');
		ul.appendChild(li);
	}
	$('kontenliste').appendChild(ul);
}

// Loads the left sidebar from the interface
function loadkontoliste() {
	new Ajax.Request('interface/kontenliste.php', {
		method: 'get',
		onSuccess: processKontoListe
	});
}
