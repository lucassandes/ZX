(function () {
    'use strict';

    angular
        .module('app', ['ngRoute'])
        .config(function ($routeProvider) {
            $routeProvider.when("/", {
                templateUrl: "./components/home/home.html",
                controller: "homeController"
            });
            $routeProvider.when("/products", {
                templateUrl: "components/products/products.html",
                controller: "productsController as vm"
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
        .factory('geolocationService', geolocationService);

    function geolocationService() {
        var service = {
            setGeolocation: setGeolocation,
            getGeolocation: getGeolocation
        };
        var savedData = {};

        return service;

        function setGeolocation(data) {
            console.log("Saving data ");  
            savedData = data;
        }

        function getGeolocation(){
            return savedData;
        }
    }
})();
(function () {
    'use strict';

    angular
        .module('app')
        .controller('homeController', homeController);

    function homeController($scope, homeService, $location, geolocationService) {
        /* jshint validthis:true */
        var vm = this;
        //vm.getGeo = getGeo;
        $scope.address = "Rua Américo Brasiliense, São Paulo";


        $scope.getGeo = function() {
            homeService
                .getData()
                .then(function successCallback(response) {
                    //$scope.geolocation.data = response.data.results[0].geometry.location;
                    geolocationService.setGeolocation(response.data.results[0].geometry.location);
                    $location.path("/products"); 
                }, function errorCallback(response) {
                    console.log("Ops... Error :(");
                });
        };
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
(function () {
    'use strict';

    angular
        .module('app')
        .controller('productsController', productsController);

    function productsController($scope, $location, geolocationService, productsService) {
        /* jshint validthis:true */
        var vm = this; 
        var geolocation = geolocationService.getGeolocation();

        if (angular.equals(geolocation, {})) {
            $location.path("/");
        }

        productsService
            .getProducts(geolocation)
            .then(function successCallback(response) {
                console.log(response);
            }, function errorCallback(response) {
                console.log("Ops... Error :(");
            });
        console.log("Products Controller", geolocation);

    }
})();
(function () {
    'use strict';

    angular
        .module('app')
        .factory('productsService', productsService);

    function productsService($http, $filter) {
        var service = {
            getProducts: getProducts
        };

        return service;

        function getProducts(geolocation) {
            var url = "https://803votn6w7.execute-api.us-west-2.amazonaws.com/dev/public/graphql";

            var date = new Date();
            var formattedDate = $filter('date')(date, "yyyy-MM-ddTHH:mm:ss.sssZ");
            // 2017-08-01T20:00:00.000Z
            console.log(geolocation);
            console.log(formattedDate);
            var parameters = {
                "algorithm": "NEAREST",
                "lat": geolocation.lat,
                "long": geolocation.lng,
                "now": formattedDate
            };

            //             "query pocSearchMethod($now: DateTime!, $algorithm: String!,
            // $lat: String!, $long: String!) {         pocSearch(now: $now, algorithm:
            // $algorithm, lat: $lat, long: $long) {     __typename     id     status
            // deliveryTypes {       __typename       pocDeliveryTypeId       deliveryTypeId
            //       price       subtitle       active     }   } } "

            parameters = {

                "query": `query pocSearchMethod($now: DateTime!, $algorithm: String!, $lat: String!, $long: String!) {
                            pocSearch(now: $now, algorithm: $algorithm, lat: $lat, long: $long) {
                                __typename
                                id
                                status
                                deliveryTypes {
                                __typename
                                pocDeliveryTypeId
                                deliveryTypeId
                                price
                                subtitle
                                active
                            }
                        }
                    }`,
                "variables": {
                    "algorithm": "NEAREST",
                    "lat": geolocation.lat,
                    "long": geolocation.lng,
                    "now": formattedDate
                }
            };
            return $http.post(url, parameters);

        }

    }
})();