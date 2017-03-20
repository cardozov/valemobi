/**
 * Controller da tela de cadastro
 * @author Vinicius Goulart Cardozo
 */
angular.module('app').controller('CadastroController',function($scope, HTTPService, MoneyService){
    
    /**
     * Função que faz a lógica de cadastro de um registro no banco.
     * Normaliza o objeto, manda para o back-end e limpa o formulário
     * @author Vinicius Goulart Cardozo
     */
    $scope.submit = function(obj = $scope.deal){
        obj.dealType = obj.dealType ? "COMPRA" : "VENDA";
        if(!validate(obj)) swal("Ooops!","O formato dos dados parece estar errado. :(");
        HTTPService
            .doRequest("POST","",JSON.stringify(obj),{
                'function':'insert',
                'Content-Type': 'application/x-www-form-urlencoded'
            })
            .then(result => {
                const msg = result.data.message;
                if(msg != true)
                    swal("Oooops!", "Parece que houve um probleminha com a inserção dos dados :(");
                else
                    swal("Ebaaa!", "O item foi inserido no banco com sucesso :)");
            })
            .catch(err => console.log(err));

        cleanFormObject();
    }

    const validate = model => {
        if(model.type == "") return false;
        if(model.name == "") return false;
        if(model.qtd <= 0) return false;
        if(MoneyService.toFloat(model.price) < 0) return false;
        if(model.dealType != "COMPRA" && model.dealType != "VENDA") return false;
        return true;
    }

    const cleanFormObject = () => {
        $scope.deal = {
            dealType : true,
            price : 0.00
        };
        $("#price").val("");    
    };

    const applyFloatMask = (value) => {
        if(value.length<3) return applyFloatMask("0" + value);
        
        const ret = parseFloat(value.slice(0,-2)+'.'+value.slice(-2)).toFixed(2);
        return ret >= 0 ? ret : 0.00;
    };

    $(document).ready(function(){
        $("#qtd").on("keypress",function(evt){
            if(['E','e','.','-','+'].indexOf(evt.key) != -1)
                return false;
            if($(this).val() == 0.00 && evt.key == 0) {
                $(this).val("");
                return false;
            }
        });

        $("#price").on("keyup",function(evt){
            evt.preventDefault();
            if(!evt.key) return true;
            if(['E','e','.','-','+','*'].indexOf(evt.key) != -1)
                return false;

            let value;
            if(evt.key == 'ArrowUp'){
                value = $(this).val().replace(",","").replace(".","");
                value = parseFloat(applyFloatMask(value)) + 0.99; 
                value = parseFloat(value) * 100;
                value = Math.floor(value) / 100;    
                //return value;
            }

            if(evt.key == 'ArrowDown'){
                value = $(this).val().replace(",","").replace(".","");
                value = parseFloat(applyFloatMask(value));
                value >= 1.01 ? value = (value - 0.99).toString() : value = 0;
                value = parseFloat(value) * 100;
                value = (Math.floor(value) / 100).toFixed(2);
            }

            if(['0','1','2','3','4','5','6','7','8','9','ArrowDown','ArrowUp'].indexOf(evt.key) == -1)
                return false;

            if(parseFloat($(this).val().replace(",",".")) <= 0.00 && evt.key == 0) {
                $(this).val("");
                return false;
            } 

            if(!value){
                console.log(value);
                value = applyFloatMask($(this).val().replace(",","").replace(".",""));
            }

            $(this).val(value);
            $scope.deal.price = value;
            return false;
        });
    })

    //Função chamada depois de renderizar o HTML para deixar os campos em init state
    cleanFormObject();
});