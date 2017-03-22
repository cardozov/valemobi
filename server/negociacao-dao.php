<?php

    include_once("conexao-bd.php");
    include_once("NegociacaoFactory.php");

    /**
    * Classe que interfaceia o acesso aos dados do banco
    * @author Vinicius Goulart Cardozo <vinicius.gcardozo@gmail.com>
    * @access public
    */
    class NegociacaoDAO {

        /**
        * Método responsável por inserir um novo registro na base de dados
        * @author Vinicius Goulart Cardozo <vinicius.gcardozo@gmail.com>
        * @access public
        * @return Boolean || Error
        */
        public static function insert(){
            $postdata = file_get_contents("php://input");
            $data = json_decode($postdata,true);
            $obj = json_decode($data["data"],true);
            try{
                $stmt = Connection::connect()->prepare("INSERT INTO negociacoes(nome, preco, quantidade, tipo, tipo_negociacao) VALUES(:nome, :preco, :quantidade, :tipo, :tipo_negociacao)");
                $stmt->bindValue(":nome", $obj["name"], PDO::PARAM_STR);
                $stmt->bindValue(":preco", $obj["price"], PDO::PARAM_STR);
                $stmt->bindValue(":quantidade", $obj["qtd"], PDO::PARAM_INT);
                $stmt->bindValue(":tipo", $obj["type"], PDO::PARAM_STR);
                $stmt->bindValue(":tipo_negociacao", $obj["dealType"], PDO::PARAM_STR);
                if($stmt->execute())
                    return (object) array('message' => true);
                else {
                    return (object) array('message' => 'Não foi possível inserir os dados requisitados no banco');
                }
            } catch(PDOException $ex){
                return (object) array('message' => $ex->message());
            }
        }

        /**
        * Método responsável por excluir um registro da base de dados
        * @author Vinicius Goulart Cardozo <vinicius.gcardozo@gmail.com>
        * @access public
        * @return Boolean || Error
        */
        public static function delete(){
            $postdata = file_get_contents("php://input");
            $data = json_decode($postdata,true);
            $obj = json_decode($data["data"],true);
            try {
                $stmt = Connection::connect()->prepare('DELETE FROM negociacoes WHERE codigo = :id');
                $stmt->bindValue(':id', $obj["id"], PDO::PARAM_INT); 
                if($stmt->execute())
                    return true;
                else
                    return (object) array('message' => $stmt->errorInfo());
            } catch(PDOException $e) {
                return (object) array('message' => $e->getMessage());
            }
        }

        /**
        * Método responsável por atualizar um registro da base de dados
        * @author Vinicius Goulart Cardozo <vinicius.gcardozo@gmail.com>
        * @access public
        * @return Boolean || Error
        */
        public static function update(){
            $postdata = file_get_contents("php://input");
            $data = json_decode($postdata,true);
            $obj = json_decode($data["data"],true);
            try{
                $stmt = Connection::connect()->prepare("UPDATE negociacoes SET nome = :nome, preco = :preco, quantidade = :quantidade, tipo = :tipo, tipo_negociacao = :tipo_negociacao WHERE codigo = :id");
                $stmt->bindValue(":nome", $obj["name"], PDO::PARAM_STR);
                $stmt->bindValue(":preco", $obj["price"], PDO::PARAM_STR);
                $stmt->bindValue(":quantidade", $obj["qtd"], PDO::PARAM_INT);
                $stmt->bindValue(":tipo", $obj["type"], PDO::PARAM_STR);
                $stmt->bindValue(":tipo_negociacao", $obj["dealType"], PDO::PARAM_STR);
                $stmt->bindValue(":id", $obj["id"], PDO::PARAM_INT);
                if($stmt->execute())
                    return (object) array('message' => true);
                else {
                    return (object) array('message' => 'Não foi possível inserir os dados requisitados no banco');
                }
            } catch(PDOException $ex){
                return (object) array('message' => $ex->message());
            }
        }


        /**
        * Método responsável por buscar um registro da base de dados pelo codigo
        * @author Vinicius Goulart Cardozo <vinicius.gcardozo@gmail.com>
        * @access public
        * @return Negociacao[] || Error
        */
        public static function select(){
            //$obj = json_decode($_GET["data"],true);
            $obj = array("id"=>"37");
            try{
                $stmt = Connection::connect()->prepare("SELECT * FROM negociacoes where codigo = :id ");
                $stmt->bindValue(':id', (int)$obj["id"], PDO::PARAM_INT);
                if($stmt->execute())
                    return NegociacaoFactory::createByDBObject($stmt->fetch(PDO::FETCH_ASSOC));
                else
                    return (object) array('message' => 'Não foi possível buscar o registro na base de dados');
            } catch(PDOException $ex){
                return (object) array('message' => $ex->message());
            }
        }

        /**
        * Método responsável por buscar todos os registros da base de dados
        * @author Vinicius Goulart Cardozo <vinicius.gcardozo@gmail.com>
        * @access public
        * @return Negociacao[] || Error
        */
        public static function selectAll(){
            try{
                if(!$rs = Connection::connect()->query("SELECT * FROM negociacoes")) {
                    return (object) array('message' => Connection::connect()->errorinfo(), TRUE);
                }
                $list = array();
                while($row = $rs->fetch(PDO::FETCH_OBJ)){
                    array_push($list, NegociacaoFactory::createByDBObject($row));
                }

                if($list)
                    return $list;
                else
                    return (object) array('message' => 'Não foi possível buscar os valores no banco de dados');
            } catch(PDOException $ex){
                return (object) array('message' => $ex->message());
            }
        }

        public static function createTable() {
            try {
                $stmt = Connection::connect()->prepare("
                    CREATE TABLE negociacoes (
                        codigo int(11) NOT NULL,
                        tipo varchar(50) NOT NULL,
                        nome varchar(100) NOT NULL,
                        quantidade int(10) NOT NULL,
                        preco float(18,2) NOT NULL,
                        tipo_negociacao varchar(10) NOT NULL
                    ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
                ");
                if($stmt->execute())
                    return (object) array('message' => true);
                else
                    return (object) array('message' => $stmt->errorInfo());
            } catch(Exception $ex) {
                return (object) array('message' => 'Falha ao executar o script de criação da tabela');
            }
        }
    }
?>