function CreateNewKtoDialog() {
	var dia = new KBDialog('newKtoDiv', 'Neues Konto anlegen', 350, 120, donewkto);
	
	ktolbl = new Element('span');
	ktolbl.innerHTML = 'Kontoname:';
	ktolbl.setStyle({
		position: 'absolute',
		left: '5px',
		top: '5px'	
	});
	dia.AddElement(ktolbl);
	
	ktoin = new Element('input');
	ktoin.setAttribute('type', 'text');
	ktoin.setAttribute('name', 'nk_kto');
	ktoin.setStyle({
		position: 'absolute',
		left: '5px',
		top: '25px',
		width: '335px'
	});
	dia.AddElement(ktoin);
	
	typelbl = new Element('span');
	typelbl.innerHTML = 'Kontotyp:';
	typelbl.setStyle({
		position: 'absolute',
		left: '5px',
		top: '50px'	
	});
	dia.AddElement(typelbl);
	
	typein1 = new Element('input');
	typein1.setAttribute('type', 'radio');
	typein1.setAttribute('name', 'nk_typ');
	typein1.setAttribute('value', 'g');
	typein1.setStyle({
		position: 'absolute',
		left: '5px',
		top: '70px'
	});
	dia.AddElement(typein1);
	
	typein1lbl = new Element('span');
	typein1lbl.innerHTML = 'Guthaben';
	typein1lbl.setStyle({
		position: 'absolute',
		left: '30px',
		top: '70px'	
	});
	dia.AddElement(typein1lbl);
	
	typein2 = new Element('input');
	typein2.setAttribute('type', 'radio');
	typein2.setAttribute('name', 'nk_typ');
	typein2.setAttribute('value', 'a');
	typein2.setAttribute('checked', 'checked');
	typein2.setStyle({
		position: 'absolute',
		left: '100px',
		top: '70px'
	});
	dia.AddElement(typein2);
	
	typein2lbl = new Element('span');
	typein2lbl.innerHTML = 'Ausgaben';
	typein2lbl.setStyle({
		position: 'absolute',
		left: '125px',
		top: '70px'	
	});
	dia.AddElement(typein2lbl);
	
	typein3 = new Element('input');
	typein3.setAttribute('type', 'radio');
	typein3.setAttribute('name', 'nk_typ');
	typein3.setAttribute('value', 'e');
	typein3.setStyle({
		position: 'absolute',
		left: '200px',
		top: '70px'
	});
	dia.AddElement(typein3);
	
	typein3lbl = new Element('span');
	typein3lbl.innerHTML = 'Einnahmen';
	typein3lbl.setStyle({
		position: 'absolute',
		left: '225px',
		top: '70px'	
	});
	dia.AddElement(typein3lbl);
	
	return dia;
}