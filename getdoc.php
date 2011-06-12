<?php
$path = "/api/1.0/download/" . $_GET["auth_token"] . "/" . $_GET["fileid"];
$host = "www.box.net";
$port = 80;
$headers    = "GET $path HTTP/1.0\r\n";
$headers    .= "Host: $host\r\n\r\n";
$xml = "";
$fp = fsockopen($host, $port, $errno, $errstr, 30);
if (!$fp) {
		$this->_error_msg   = $errstr;
		$this->_error_code  = $errno;
		return false;
} else {
		fwrite($fp, $headers);
		while (!feof($fp)) {
				$xml .= fgets($fp, 1024);
		}
		fclose($fp);


		$xml_start = strpos($xml, "\r\n\r\n");
		$xml = substr($xml, $xml_start+4, strlen($xml));
}

echo $xml;

?>
