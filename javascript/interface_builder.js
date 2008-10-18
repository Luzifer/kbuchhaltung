
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
	
	$('maindiv').style.height = vp_height + 'px';
	$('maindiv').style.width = vp_width + 'px';
	$('maindiv').style.position = 'absolute';
	$('maindiv').style.left = '0px';
	$('maindiv').style.top = '0px';
	
	$('topheader').style.width = (vp_width - $('datechooser').getWidth()) + 'px' ;
	
	$('kontenliste').style.height = (vp_height - $('topheader').getHeight() - $('actionbox').getHeight()) + 'px';
	
	$('gkontenliste').style.height = (vp_height - $('topheader').getHeight()) + 'px';
	
	$('buchungneu').style.width = (vp_width - $('gkontenliste').getWidth() - $('kontenliste').getWidth()) + 'px';
	
	$('buchungen').style.width = (vp_width - $('gkontenliste').getWidth() - $('kontenliste').getWidth()) + 'px';
	$('buchungen').style.height = (vp_height - $('topheader').getHeight() - $('buchungneu').getHeight()) + 'px';
}