<?php

    /**
    * Classe que realiza a conexão com a base de dados e disponibiliza 
    * um PDO que é invocado por um Singleton
    */
    class Connection {

        private static $conn;

        public static function connect() { 

            if(!self::$conn){
                $username = "b66774b33dcd49";
                $password = "ef3dfaba";
                $host = "us-cdbr-iron-east-03.cleardb.net";
                $database = "heroku_a7c65e9b9894ed6";
                self::$conn = new PDO("mysql:host=$host;dbname=$database", $username, $password);
            }

            return self::$conn;
        }

        public static function close(){
            $conn = null;
        }
    }
    
?>