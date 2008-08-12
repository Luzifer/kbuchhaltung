-- phpMyAdmin SQL Dump
-- version 2.11.4
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Erstellungszeit: 12. August 2008 um 17:43
-- Server Version: 5.0.60
-- PHP-Version: 5.2.6-pl2-gentoo

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

--
-- Datenbank: `kbuchhaltung`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `buchungen`
--

CREATE TABLE IF NOT EXISTS `buchungen` (
  `id` bigint(20) NOT NULL auto_increment,
  `bez` varchar(255) NOT NULL,
  `betrag` float NOT NULL,
  `konto` int(11) NOT NULL,
  `gkonto` int(11) NOT NULL,
  `datum` date NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `konten`
--

CREATE TABLE IF NOT EXISTS `konten` (
  `id` int(11) NOT NULL auto_increment,
  `bez` varchar(50) NOT NULL,
  `typ` enum('g','a','e') NOT NULL,
  PRIMARY KEY  (`id`),
  UNIQUE KEY `bez` (`bez`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8;
