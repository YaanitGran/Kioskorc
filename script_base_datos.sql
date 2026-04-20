-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: kiosco_informativo
-- ------------------------------------------------------
-- Server version	8.0.45

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `administradores`
--

DROP TABLE IF EXISTS `administradores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `administradores` (
  `id_administrador` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `ap_paterno` varchar(100) NOT NULL,
  `ap_materno` varchar(100) DEFAULT NULL,
  `contrasena` varchar(255) NOT NULL,
  PRIMARY KEY (`id_administrador`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administradores`
--

LOCK TABLES `administradores` WRITE;
/*!40000 ALTER TABLE `administradores` DISABLE KEYS */;
/*!40000 ALTER TABLE `administradores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `avisos_emergentes`
--

DROP TABLE IF EXISTS `avisos_emergentes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `avisos_emergentes` (
  `id_aviso` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(150) NOT NULL,
  `mensaje` text NOT NULL,
  `fecha_expiracion` datetime NOT NULL,
  PRIMARY KEY (`id_aviso`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `avisos_emergentes`
--

LOCK TABLES `avisos_emergentes` WRITE;
/*!40000 ALTER TABLE `avisos_emergentes` DISABLE KEYS */;
/*!40000 ALTER TABLE `avisos_emergentes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kioscos`
--

DROP TABLE IF EXISTS `kioscos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kioscos` (
  `id_kiosco` int NOT NULL AUTO_INCREMENT,
  `numero_serie` varchar(50) NOT NULL,
  `ubicacion_fisica` text NOT NULL,
  `estado` enum('activo','mantenimiento','inactivo') DEFAULT 'activo',
  PRIMARY KEY (`id_kiosco`),
  UNIQUE KEY `numero_serie` (`numero_serie`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kioscos`
--

LOCK TABLES `kioscos` WRITE;
/*!40000 ALTER TABLE `kioscos` DISABLE KEYS */;
/*!40000 ALTER TABLE `kioscos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `preguntas_frecuentes`
--

DROP TABLE IF EXISTS `preguntas_frecuentes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `preguntas_frecuentes` (
  `id_faq` int NOT NULL AUTO_INCREMENT,
  `pregunta` text NOT NULL,
  `respuesta` text NOT NULL,
  `categoria` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_faq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `preguntas_frecuentes`
--

LOCK TABLES `preguntas_frecuentes` WRITE;
/*!40000 ALTER TABLE `preguntas_frecuentes` DISABLE KEYS */;
/*!40000 ALTER TABLE `preguntas_frecuentes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `requisitos`
--

DROP TABLE IF EXISTS `requisitos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `requisitos` (
  `id_requisito` int NOT NULL AUTO_INCREMENT,
  `id_tramite` int NOT NULL,
  `descripcion` text NOT NULL,
  `obligatorio` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id_requisito`),
  KEY `id_tramite` (`id_tramite`),
  CONSTRAINT `requisitos_ibfk_1` FOREIGN KEY (`id_tramite`) REFERENCES `tramites` (`id_tramite`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `requisitos`
--

LOCK TABLES `requisitos` WRITE;
/*!40000 ALTER TABLE `requisitos` DISABLE KEYS */;
/*!40000 ALTER TABLE `requisitos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tramites`
--

DROP TABLE IF EXISTS `tramites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tramites` (
  `id_tramite` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) NOT NULL,
  `descripcion` text NOT NULL,
  `costo_actual` decimal(10,2) NOT NULL,
  `url_qr` text,
  PRIMARY KEY (`id_tramite`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tramites`
--

LOCK TABLES `tramites` WRITE;
/*!40000 ALTER TABLE `tramites` DISABLE KEYS */;
/*!40000 ALTER TABLE `tramites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ubi_juzgados`
--

DROP TABLE IF EXISTS `ubi_juzgados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ubi_juzgados` (
  `id_ubi_juzgado` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `direccion` text NOT NULL,
  `horario_atencion` varchar(200) DEFAULT NULL,
  `estado` enum('activo','remodelacion','cerrado') DEFAULT 'activo',
  PRIMARY KEY (`id_ubi_juzgado`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ubi_juzgados`
--

LOCK TABLES `ubi_juzgados` WRITE;
/*!40000 ALTER TABLE `ubi_juzgados` DISABLE KEYS */;
/*!40000 ALTER TABLE `ubi_juzgados` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-19 19:43:18
