CREATE TABLE IF NOT EXISTS `buchungen` (
  `id` bigint(20) NOT NULL auto_increment,
  `bez` varchar(255) NOT NULL,
  `betrag` float NOT NULL,
  `konto` int(11) NOT NULL,
  `gkonto` int(11) NOT NULL,
  `datum` date NOT NULL,
  PRIMARY KEY  (`id`)
);

CREATE TABLE IF NOT EXISTS `konten` (
  `id` int(11) NOT NULL auto_increment,
  `bez` varchar(50) NOT NULL,
  `typ` enum('g','a','e') NOT NULL,
  PRIMARY KEY  (`id`),
  UNIQUE KEY `bez` (`bez`)
);

CREATE TABLE IF NOT EXISTS `appsettings` (
	`key` varchar(50) NOT NULL,
	`value` varchar(255) NOT NULL,
	UNIQUE KEY `key` (`key`)
);