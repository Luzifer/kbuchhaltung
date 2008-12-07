<?

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

header('Content-Type: text/javascript');

// -------------------------------------------------------------------------------------
$EnableGZipEncoding = true;
// -------------------------------------------------------------------------------------
// Helper function to detect if GZip is supported by client!
// If not supported the tricks are pointless
function acceptsGZip(){
    $accept = str_replace(" ","",
        strtolower($_SERVER['HTTP_ACCEPT_ENCODING'])
    );
    $accept = explode(",",$accept);
    return in_array("gzip",$accept);
}
// -------------------------------------------------------------------------------------
function obOutputHandler($OutputHtml){
    global $EnableGZipEncoding;
    //-- If GZIP not supported compression is pointless.
    // If headers were sent we can not signal GZIP encoding as
    // we will mess it all up so better drop it here!
    // If you disable GZip encoding to use plain output buffering we stop here too!
    if(!acceptsGZip() || headers_sent() || !$EnableGZipEncoding) return $OutputHtml;
    //-- We signal GZIP compression and dump encoded data
    header("Content-Encoding: gzip");
    return gzencode($OutputHtml);
}
// This code has to be before any output from your site!
// If output exists uncompressed HTML will be delivered!
ob_start("obOutputHandler");
// -------------------------------------------------------------------------------------

$dir = opendir('../javascript');
while($file = readdir($dir)) {
	if(strpos($file, '.js')) {
		echo file_get_contents('../javascript/'.$file);
	}
}

?>