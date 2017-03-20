<?php

    include_once("Negociacao.php");

    class NegociacaoFactory {
        
        public static function createByDBObject($model){
            $model = (object)$model;
            return NegociacaoFactory::createByParam($model->codigo, $model->tipo, $model->nome, $model->quantidade, $model->preco, $model->tipo_negociacao);
        }
        
        public static function createByParam($id, $type ,$name, $qtd, $price, $deal_type){
            return new Negociacao($id, $type ,$name, $qtd, $price, $deal_type);
        }
    }
?>