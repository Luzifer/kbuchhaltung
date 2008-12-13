
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

var KBDialog = Class.create({
	initialize: function(dialogId, title, width, height, callback) {
		this._title = title;
		this._width = width;
		this._height = height;
		this._dialogId = dialogId;
		this._callback = callback;
		this._AssembleDialog();
	},
	
	Show: function() {
		document.body.appendChild(this.mainDiv);
		new Effect.Appear(this.mainDiv, {duration: 0.4});
	},
	
	Hide: function() {
		new Effect.Fade(this.mainDiv, {duration: 0.4});
		document.body.removeChild(this.mainDiv);
	},
	
	AddElement: function(element) {
		this.contentArea.appendChild(element);
	},
	
	GetValues: function() {
		return this._form.serialize();
	},
	
	_AssembleDialog: function() {
		var div = new Element('div');
		div.id = this._dialogId;
		div.setStyle({
			'border': '1px solid #999',
			'width': this._width + 'px',
			'height': (this._height + 20) + 'px',
			'position': 'absolute',
			'z-index': 3000,
			'background': '#fff'
		});
		
		div.setStyle({
			'left': ((document.viewport.getWidth() - this._width) / 2) + 'px',
			'top': ((document.viewport.getHeight() - this._height - 20) / 2) + 'px'
		});
		
		title = new Element('div');
		title.setStyle({
			'width': '100%',
			'height': '20px',
			'background': '#ddd',
			'position': 'absolute',
			'left': '0px',
			'top': '0px',
			'textAlign': 'center'
		});
		title.innerHTML = this._title;
		div.appendChild(title);
		
		allform = new Element('form');
		allform.setAttribute('action', '#');
		div.appendChild(allform);
		this._form = allform;
		
		this.contentArea = new Element('div');
		this.contentArea.setStyle({
			'width': '100%',
			'height': this._height + 'px',
			'position': 'absolute',
			'left': '0px',
			'top': '20px',
			'background': '#fff'
		});
		allform.appendChild(this.contentArea);
		
		if(this._callback != null){
			okbtn = new Element('span');
			okbtn.setStyle({
				position: 'absolute',
				left: (this._width - 30) / 2 + 'px',
				bottom: '5px',
				background: '#ddd',
				width: '30px',
				textAlign: 'center',
				cursor: 'pointer'
			});
			okbtn.innerHTML = 'OK';
			okbtn.identify();
			
			new Event.observe(okbtn, 'click', this._callback);
			
			this.AddElement(okbtn);
		}
		
		cncl = new Element('img');
		cncl.setAttribute('src', 'img/cancel.png');
		cncl.setStyle({
			position: 'absolute',
			right: '2px',
			top: '2px',
			cursor: 'pointer'
		});
		new Element.observe(cncl, 'click', function() {new Effect.Fade(div, {duration: 0.4}); document.body.removeChild(div);});
		div.appendChild(cncl);
		
		this.mainDiv = div;
	}
});