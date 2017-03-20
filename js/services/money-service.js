/**
 * Módulo que encapsula as tratativas de conversão que envolvem
 * valores monetários
 * @author Vinicius Goulart Cardozo
 */
angular.module('app').service("MoneyService", function ($http) {
    
    this.floatToMoney = (value) => {
        value = `R$${value.toString().replace(".",",")}`;

        if(value.indexOf(",") == -1)
            return value + ",00";

        const op = value.length - value.indexOf(",");

        if(op > 3)  return value.substr(0,value.indexOf(',')+3)
        if(op == 2) return value + "0";
        if(op == 1) return value + "00";

        return value;    
    }

    this.toFloat = (str) => {
        if(!str) return 0;
        try{
            return parseFloat(str.replace("R$","").replace(",","."));
        } catch(ex) {
            return -1;
        }
    };
});