
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

function SetNewIFPositions() {
	var vp_height = window.document.viewport.getHeight() - 2;
	var vp_width = window.document.viewport.getWidth() - 2;
	
	$('maindiv').setStyle({
		'height': 	vp_height + 'px',
		'width': 	vp_width + 'px',
		'position': 'absolute',
		'left': 	'0px',
		'top': 		'0px'
	});
	
	$('topheader').setStyle({
		'width': 	vp_width + 'px'
	});
	
	$('datechooser').setStyle({
		'right': 	'0px',
		'top': 		$('topheader').getHeight() + 'px'
	}); 
	
	$('appmenu').setStyle({
		left: 		'0px',
		top: 		$('topheader').getHeight() + 'px',
		width: 		vp_width - $('datechooser').getWidth() + 'px',
		height: 	$('datechooser').getHeight() - 1 + 'px'
	});
	
	$('kontenliste').setStyle({
		height: 	(vp_height - $('topheader').getHeight() - $('appmenu').getHeight() ) + 'px',
		top: 		$('topheader').getHeight() + $('appmenu').getHeight() + 'px'
	});
	
	$('gkontenliste').setStyle({
		height: 	(vp_height - $('appmenu').getHeight() - $('topheader').getHeight()) + 'px',
		top: 		$('topheader').getHeight() + $('appmenu').getHeight() + 'px'
	});
	
	$('buchungneu').setStyle({
		width: 		(vp_width - $('gkontenliste').getWidth() - $('kontenliste').getWidth()) + 'px'
	});
	
	$('buchungen').setStyle({
		width: 		(vp_width - $('gkontenliste').getWidth() - $('kontenliste').getWidth()) + 'px',
		height: 	(vp_height - $('topheader').getHeight() - $('appmenu').getHeight() - $('buchungneu').getHeight()) + 'px',
		top: 		$('topheader').getHeight() + $('appmenu').getHeight() + 'px'
	});
	
	
}