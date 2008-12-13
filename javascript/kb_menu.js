
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

var KBMenu = Class.create({
	
	initialize: function(title) {
		var entries = new Element('div');
		this._entries = entries;
		this._menu = new Element('div');
		this._title = new Element('span');
		this._title.innerHTML = title;
		
		this._menu.identify();
		this._entries.identify();
		
		this._menu.appendChild(this._title);
		this._menu.appendChild(this._entries);
		
		this._menu.setStyle({
			background: '#eee',
			width: '150px',
			'float': 'left',
			position: 'absolute',
			cursor: 'pointer'
		});
		
		this._entries.setStyle({
			width: '148px',
			position: 'absolute',
			left: '0px',
			background: '#eee',
			border: '1px solid #999',
			zIndex: 500
		});
		
		this._menu.observe('click', function() { new Effect.toggle(entries, 'blind', {duration: 0.1}); });
		
	},
	
	AddEntry: function(name, jsfunction) {
		var elem = new Element('div');
		var entries = this._entries;
		elem.innerHTML = "&middot; " + name;
		elem.observe('click', function() { new Effect.toggle(entries, 'blind', {duration: 0.1}); jsfunction(); });
		this._entries.appendChild(elem);
	},
	
	WriteTo: function(element, position) {
		$(element).appendChild(this._menu);
		
		var entries = this._entries;
		
		this._menu.setStyle({
			height: $(element).getHeight() - 5 + 'px',
			top: '2px',
			left: 2 + position * 152 + 'px'
		}); 
		
		this._title.setStyle({
			top: (this._menu.getHeight() - this._title.getHeight()) / 2 + 'px',
			left: (150 - this._title.getWidth()) / 2 + 'px',
			position: 'absolute'
		});
		
		this._entries.setStyle({
			top: this._menu.getHeight() + 3 + 'px'
		});
		
		new Effect.toggle(entries, 'blind', {duration: 0.1});
	}
	
});