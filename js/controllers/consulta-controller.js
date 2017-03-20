/**
 * Controller da tela de consulta
 * @author Vinicius Goulart Cardozo
 */
angular.module('app').controller('ConsultaController',function($scope, HTTPService, MoneyService){
    
    $scope.deals = [];
    $scope.ref = [];

    HTTPService
        .doRequest("GET","",{},{function:"selectAll"})
        .then(result => {
            $scope.deals = result.data.map(data => assignBDObject(data));
            $scope.ref = JSON.parse(JSON.stringify($scope.deals));
        })
        .catch(err => swal("Ooops!","Parece que algum erro aconteceu na consulta dos dados :("));

    const assignBDObject = data => {
            // Mapeamento para passar os valores float para o pattern monetário R$####,##
            data.price = toMoney(data.price);
            data.qtd = parseInt(data.qtd);
            data.edited = false;
            return data;
    };

    const toMoney = (value) => MoneyService.floatToMoney(value);

    $scope.delete = (obj) =>
        HTTPService
            .doRequest("POST","",JSON.stringify({id:obj.id}),{function:"delete"})
            .then(result => {
                if(JSON.parse(result.data) == true)
                    $scope.deals.splice($scope.deals.indexOf(obj),1);
                else reject();
            })
            .catch(err => swal("Ooops!","Parece que algum erro aconteceu na consulta dos dados :("));

    const compareObjects = model => {
        let ref = $scope.ref[$scope.deals.indexOf(model)];
        
        if(model.type != ref.type) return true;
        if(model.name != ref.name) return true;
        if(model.qtd != ref.qtd) return true;
        if(model.price != ref.price) return true;
        if(model.dealType != ref.dealType) return true;
        return false;
    };

    const validate = model => {
        if(model.type == "") return false;
        if(model.name == "") return false;
        if(model.qtd <= 0) return false;
        if(MoneyService.toFloat(model.price) <= 0) return false;
        if(model.dealType != "COMPRA" && model.dealType != "VENDA") return false;
        return true;
    }

    $scope.verifyChange = obj => {
        if(compareObjects(obj)){
            if(validate(obj)){
                obj.edited = true;
            } else {
                $scope.deals[$scope.deals.indexOf(obj)] =  JSON.parse(JSON.stringify($scope.ref[$scope.deals.indexOf(obj)]));
            }
        } else {
            obj.edited = false;
        }
    };

    $scope.edit = model => {
        let ref = JSON.parse(JSON.stringify(model));
        ref.price = MoneyService.toFloat(ref.price);
        HTTPService
            .doRequest("PUT","",JSON.stringify(ref),{function:"update"})
            .then(result => {
                if(!result.data == true) reject();
                return HTTPService
                    .doRequest("GET","",JSON.stringify({id:model.id}),{function:"select"});
            })
            .then(result =>{
                if(result.data.message) reject();
                //$scope.ref[$scope.deals.indexOf(model)] = JSON.parse(JSON.stringify(model));
                $scope.ref[$scope.deals.indexOf(model)] = assignBDObject(result.data);
                model.edited = false;
                swal("Ebaaa!","Os dados foram atualizados com sucesso. :)");
            })
            .catch(err => swal("Ooops!","Parece que deu algo errado na alteração do registro. :("));
    }
});