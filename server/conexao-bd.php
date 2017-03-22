<?php

    /**
    * Classe que realiza a conexão com a base de dados e disponibiliza 
    * um PDO que é invocado por um Singleton
    */
    class Connection {

        private static $conn;

        public static function connect() { 

            if(!self::$conn){
                $url = parse_url(getenv("CLEARDB_DATABASE_URL"));

                $host = $url["host"];
                $username = $url["user"];
                $password = $url["pass"];
                $database = substr($url["path"], 1);
            
                /*
                $username = "b79c54c24df952";
                $password = "f05e15c8";
                $host = "us-cdbr-iron-east-03.cleardb.net";
                $database = "heroku_dd7bbc457a60954";
                */
            
                self::$conn = new PDO("mysql:host=$host;dbname=$database", $username, $password);
            }

            return self::$conn;
        }

        public static function close(){
            $conn = null;
        }
    }
    
?>