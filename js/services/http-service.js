/**
 * Módulo que encapsula a lógica de requisições HTTP e centraliza as configurações
 * de chamada ao back-end
 * @author Vinicius Goulart Cardozo
 */
angular.module('app').service("HTTPService", function ($http) {
    let server = "http://192.168.15.95/server/servico.php";
    //let server = "http://us-cdbr-iron-east-03.cleardb.net/server/servico.php";

    this.doRequest = function (method, url, data, headers) {
        /*if (method.toUpperCase() == 'GET')
            return $http.get(`${server}/${url}`, { params : data, headers : headers });

        return $http.post(`${server}/${url}`, { data : data }, { headers : headers }); */
        let config = {
            method:method,
            url:`${server}/${url}`,
            headers:headers
        };
        method == 'POST' || method == 'PUT' ? config.data = { data : data } : config.params = { data : data };
        return $http(config);
    }
});