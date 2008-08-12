-- phpMyAdmin SQL Dump
-- version 2.11.4
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Erstellungszeit: 12. August 2008 um 17:44
-- Server Version: 5.0.60
-- PHP-Version: 5.2.6-pl2-gentoo

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

--
-- Datenbank: `kbuchhaltung`
--

--
-- Daten für Tabelle `konten`
--

INSERT INTO `konten` (`id`, `bez`, `typ`) VALUES
(1, 'Girokonto', 'g'),
(2, 'Barkasse', 'g'),
(3, 'Andere Einnahmen', 'e'),
(4, 'Andere Ausgaben', 'a');
