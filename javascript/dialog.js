// SLangenberg
// Erstellt ein Windows ähnliches PopUp-Fenster mit Text Inhalt. 

var PopUp = Class.create({
	initialize: function(popUpId, titel){
		this._ElementCollection = new Array();
		this.PopUpId = popUpId;
		this.Titel = titel;
	},
	
	// Erstellt das Popup mit seinen Elementen.
	Create: function(){
		// Einzelne Elemente initialisieren.
		var popUpDiv = this._CreateMainDiv(this.PopUpId);	
		this.mainDiv = popUpDiv;							
		var panelImg = this._CreatePanelImage();	
		var labelImg = this._CreateHeaderLabelImg();
		var label = this._CreateHeaderLabel(this.Titel);					
		popUpDiv.appendChild(panelImg);	
		popUpDiv.appendChild(labelImg);		
		popUpDiv.appendChild(label);			
		var closeImg = this._CreateCloseImage();
		popUpDiv.appendChild(closeImg);				
		var innerDiv = this._CreateInnerDiv(this.PopUpId);
		
		// Elemente des Benutzers hinzufügen
		this._DrawObjects(innerDiv);	

		popUpDiv.appendChild(innerDiv);	
		this.mainDiv = popUpDiv;
		document.body.appendChild(popUpDiv);
		new Draggable(this.PopUpId, {handle: 'panelImg'});
		new Draggable(this.PopUpId, {handle: 'popUpLabel'});
	},
	
	// Fügt alle Elemente der Liste an das entsprechende Div an.
	_DrawObjects: function(div){
		for (var i=0; i<this._ElementCollection.length; i++){
			var obj = this._ElementCollection[i];
			if (obj != null){
				div.appendChild(obj);
			}
		}
	},
	
	// Fügt ein Objekt in die Queue welche die Elemente enthält, die in den Dialog kommen.
	AddElement: function(obj){
		if (obj != null){
			this._ElementCollection.push(obj);
		}
	},	
	
	// Aktualisiert ein vorhanden Objekt (Ersetzt ein altes, durch ein neues).
	UpdateElement: function(elementId, newElementObj){
		if (elementId != null && newElementObj != null){
			var innerDivId = this.PopUpId + "_innerDiv";
			var innerDiv = $(innerDivId);
			if (innerDiv != null){
				var oldElement = $(elementId);
				if (oldElement != null){
					innerDiv.removeChild(oldElement);
					innerDiv.appendChild(newElementObj);
				}
			}
		}
	},
	
	// ** EXPERIMENTAL: NOT IMPLEMENTED **
	RemoveElement: function(key){
		if (key != null){
			this._ElementCollection[key] = null;
		}
	},
	
	// ** EXPERIMENTAL: NOT IMPLEMENTED **
	GetElement: function(key){
		if (key != null){
			return this._ElementCollection[key];
		}
	},	
	
	// Erstellt das Hauptdiv mit den entsprechenden Styles.
	_CreateMainDiv: function(popUpId){
		var newDiv = document.createElement("div");	
		newDiv.id = popUpId;			
		newDiv.style.width = "356px";
		newDiv.style.height = "150px";
		newDiv.style.position = "absolute";
		newDiv.style.top = "40%";
		newDiv.style.left = "40%";
		newDiv.style.zIndex = "9998";
		newDiv.style.backgroundColor = "#D1E8FF";
		newDiv.style.border = "1px #99CCFF solid"; 
		newDiv.style.display = "none";
		return newDiv;
	},
	
	// Erstellt das PanelImg zum verschieben des PopUp-Fensters.
	_CreatePanelImage: function(){
		var panelImg = document.createElement("img");
		panelImg.id = "panelImg";
		panelImg.src = "img/PopUpPanel4.gif";		
		panelImg.style.cursor = "hand";
		return panelImg;		
	},
	
	// Erzeugt ein kleines Icon links oben in der Menüleiste.
	_CreateHeaderLabelImg: function(){
		var labelImg = document.createElement("img");
		labelImg.src = "img/icons/mini_cx.gif";
		labelImg.style.position = "absolute";
		labelImg.style.left = "0px";
		labelImg.style.Top = "0px";
		return labelImg;
	},
	
	// Bindet das Label in der Menuleiste ein.
	_CreateHeaderLabel: function(labelText){
		var label = document.createElement("span");
		label.id = "popUpLabel";
		label.innerHTML = labelText;
		label.style.position = "absolute";
		label.style.left = "18px";
		label.style.top = "2px";
		label.style.cursor = "hand";
		label.style.color = "White";
		return label;
	},
	
	_CreateCloseImage: function(){
		var closeImg = document.createElement("img");
		closeImg.id = "closeImg";
		closeImg.src = "img/closeIcon.gif";
		closeImg.style.position = "absolute";
		closeImg.style.right = "0px";
		closeImg.style.cursor = "hand";
		var mainDiv = this.mainDiv;
		closeImg.onclick = function(){new Effect.Fade(mainDiv, { duration: 0.5 });};
		return closeImg;
	},
	
	_CreateInnerDiv: function(popUpId){
		var innerDiv = document.createElement("div");
		innerDiv.id = popUpId + "_innerDiv";
		innerDiv.style.margin = "5px";
		innerDiv.style.textAlign = "center";	
		innerDiv.style.width = "100%";
		innerDiv.style.height = "100%";
		return innerDiv;		
	},
	
	PopUp: function(){
		this.mainDiv.style.top = "40%";
		this.mainDiv.style.left = "40%";
		new Effect.Appear(this.mainDiv, {duration: 0.4});
		
	},
	
	HidePopUp: function(){
		new Effect.Fade(this.mainDiv, { duration: 0.4});
	},
	
	SetScreenCenter: function(){
		
	}
});