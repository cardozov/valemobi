<?php 
    class Negociacao{

        public function __construct($id, $type, $name, $qtd, $price, $deal_type) {
            $this->id = $id;
            $this->type = $type;
            $this->name = $name;
            $this->qtd = $qtd;
            $this->price = $price;
            $this->dealType = $deal_type;
        }
    }
?>