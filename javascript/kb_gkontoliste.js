
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

function processGKontoListe(transport) {
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
		td1.id = 'gkt' + konto[3];
		tr1.appendChild(td1);
		td1.observe('dblclick', editKto);
		
		var tr2 = new Element('tr');
		var td2 = new Element('td').update(konto[2]+' &euro;');
		if(konto[2] == '') 
			td2.update('0,00 &euro;');
			
		if((parseFloat(konto[4]) > 0.00) && ($('datechs').selectedIndex == $('datechs').options.length - 1)) {
			td2.update(td2.innerHTML + ' / ' + number_format(konto[4], 2, ',', '') + ' &euro;');
			if(parseFloat(konto[4]) < parseFloat(konto[2]))
				td2.addClassName('rot');
			else
				td2.addClassName('gruen');
		}
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

// Loads the list of categories on the right sidebar
function loadgkontoliste() {
	new Ajax.Request('interface/gkontoliste.php?date='+$('datechs').value, {
		method: 'get',
		asynchronous: false,
		onSuccess: processGKontoListe
	});
}