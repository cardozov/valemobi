<?php

    /**
    * Classe que realiza a conexão com a base de dados e disponibiliza 
    * um PDO que é invocado por um Singleton
    */
    class Connection {

        private static $conn;

        public static function connect() { 

            if(!self::$conn){
                $username = "root";
                $password = "";
                $host = "localhost";
                $database = "valemobi";
                self::$conn = new PDO("mysql:host=$host;dbname=$database", $username, $password);
            }

            return self::$conn;
        }

        public static function close(){
            $conn = null;
        }
    }
    
?>