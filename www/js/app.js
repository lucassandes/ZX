(function () {
    'use strict';

    angular
        .module('app', ['ngRoute'])
        .config(function ($routeProvider) {
            $routeProvider.when("/", {
                templateUrl: "./components/home/home.html",
                controller: "homeController as vm"
            });
            $routeProvider.when("/products", {
                templateUrl: "components/products/products.html",
                controller: "homeController"
            });

            $routeProvider.otherwise({redirectTo: "/"});
        })
        .config([
            '$locationProvider',
            function ($locationProvider) {
                $locationProvider.hashPrefix('');
            }
        ]);

}());

(function () {
    'use strict';

    angular
        .module('app')
        .controller('homeController', homeController);

    function homeController($scope, homeService, $location) {
        /* jshint validthis:true */
        var vm = this;
        vm.getGeo = getGeo;
        vm.address = "Rua Américo Brasiliense, São Paulo";

        function getGeo() {
            homeService
                .getData()
                .then(function successCallback(response) {
                    $scope.location = response.data.results[0].geometry.location;
                    $location.path("/products");
                }, function errorCallback(response) {
                    console.log("Ops... Error :(");
                });
        }
    }
})();
(function () {
    'use strict';

    angular
        .module('app')
        .factory('homeService', homeService);

    function homeService($http) {
        var service = {
            getData: getData
        };

        return service;

        function getData() {

            var url = "https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyA_zY0dIwMZ2LDtkKIc7EJRsJjCW4awvbc";
            
            url = "https://maps.googleapis.com/maps/api/geocode/json?address=Rua+Américo+Brasiliense,+Sao+Paulo,+SP&key=AIzaSyA_zY0dIwMZ2LDtkKIc7EJRsJjCW4awvbc";
        
            return $http.get(url);
        }
    }
})();