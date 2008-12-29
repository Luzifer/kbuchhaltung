<?
include_once('interface/version.php');
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<link href="style.css" type="text/css" rel="stylesheet" />
<link href="kalender.css" type="text/css" rel="stylesheet" />
<title>KBuchhaltung</title>
<script language="JavaScript" src="javascript/libraries/prototype.js" type="text/javascript"></script>
<script language="JavaScript" src="javascript/libraries/scriptaculous.js?load=effects,controls,dragdrop" type="text/javascript"></script>
<script language="javascript" src="interface/jscompressor.php" type="text/javascript"></script>
</head>

<body>
    <div id="maindiv">
      <div id="topheader">KBuchhaltung</div>
      <div id="appmenu"></div>
      <div id="kontenliste" onclick="hideKalender();"></div>
      <div id="gkontenliste" onclick="hideKalender();"></div>
      <div id="buchungen" onclick="hideKalender();"></div>
      <img src="img/ajax-loader.gif" id="loadbar" />
      <div id="buchungneu">
      	
        <form id="buchungform">
        Neue Buchung:<br />
      	<table width="100%" cellspacing="2">
        	<tr>
            	<td style="width:120px;"><input type="text" style="width:100%; border: 1px solid black;" name="nb_datum" id="nb_datum" onclick="dateClick();" /></td>
                <td><input type="text" style="width:100%; border: 1px solid black;" name="nb_bez" id="nb_bez" onfocus="hideKalender();" /></td>
                <td style="width:170px;"><select style="width:100%; border: 1px solid black;" id="nb_gkonto" name="nb_gkonto" onfocus="hideKalender();"></select></td>
                <td style="width:80px;"><input type="text" style="width:100%; border: 1px solid black;" name="nb_betrag" id="nb_betrag" onfocus="hideKalender();" onkeyup="checkKeyBook(event);" /></td>
            </tr>
        </table>
        <span style="position:absolute;right:5px;bottom:5px;" class="clickable" onclick="dobook();">Eintragen</span>
        <input type="hidden" name="nb_kto" id="nb_kto" />
        </form>
      </div>
      <div id="datechooser">
      	<select id="datechs" onChange="reselectPage();">
			<option value="">Alle</option>
		</select>
      </div>
      <div id="kalender" class="kalender"></div>
    </div>
    <script language="javascript" type="text/javascript">
		initapp();
	</script>
</body>
</html>
