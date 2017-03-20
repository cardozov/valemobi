<?php
    /**
    * Este script é responsável por rotear a chamada do método de acesso da classe NegociacaoDAO
    * por meio da variável de controle HTTP_FUNCTION que vem no cabeçalho da requisição
    */
    
    include_once("negociacao-dao.php");
    
    try{
        if(!$_SERVER["HTTP_FUNCTION"])
            throw new Exception("O método do serviço não foi definido");
        $returned = NegociacaoDAO::{$_SERVER["HTTP_FUNCTION"]}();
    } catch(Exception $ex){
        $returned = $ex->message();
    }

    echo json_encode($returned);
?>