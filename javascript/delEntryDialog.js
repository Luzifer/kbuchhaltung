function CreateDelEntryDialog(entry) {
	var dia = new KBDialog('delEntryDlg', 'Buchung l&ouml;schen', 350, 120, dodelentry);
	
	var eid = new Element('input');
	eid.setAttribute('type', 'hidden');
	eid.setAttribute('name', 'eid');
	eid.setAttribute('value', entry);
	dia.AddElement(eid);
	
	var txt = new Element('p');
	txt.update('Soll diese Buchung wirklich gel&ouml;scht werden? Wenn Ja, best&auml;tigen Sie diesen Dialog bitte mit "OK", ansonsten schlie&szlig;en Sie ihn mit dem roten Kreuz rechts oben.');
	txt.setStyle({
		textAlign: 'center'
	});
	dia.AddElement(txt);
	
	return dia;
}