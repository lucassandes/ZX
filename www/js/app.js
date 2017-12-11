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

    angular.module('app')
        .constant('GOOGLE_MAPS', (function () {
            return {
                API_URL: "https://maps.googleapis.com/maps/api/geocode/json?address=",
                KEY: "AIzaSyA_zY0dIwMZ2LDtkKIc7EJRsJjCW4awvbc"
            };
        })())

        .constant('API_URL', (function () {
            return {
                UNAUTHORIZED: "unauthorized"
            };
        })());

})();

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
            console.log("Saving data geolocation data...");  
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

    function homeController( homeService, $location, geolocationService) {
        /* jshint validthis:true */
        var vm = this;
        vm.address = "Rua Américo Brasiliense, São Paulo";

        vm.getGeo = function(adress) {
            homeService
                .getAdressData(adress)
                .then(function successCallback(response) {
                    //console.log(response.data);
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

    function homeService($http, GOOGLE_MAPS) {
        var service = {
            getAdressData: getAdressData
        };

        return service;

        function getAdressData(adress) {
            var formattedAdress = adress.replace(/ /g,"+");

            var endpoint = GOOGLE_MAPS.API_URL + formattedAdress + "&key=" + GOOGLE_MAPS.KEY;
          
            return $http.get(endpoint);
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
        vm.products = [];
        vm.check = 0;
        vm.removeProduct = removeProduct;
        vm.addProduct = addProduct;
        vm.queryProducts = queryProducts;
        vm.loading = true;
        var geolocation = geolocationService.getGeolocation();
        var pocId;

        $scope.selectedItem = {
            "id": 0,
            "title": "Todos"
        };

       
        if (angular.equals(geolocation, {})) {
            $location.path("/");
        }

        function removeProduct(index) {
            if (vm.products[index].quantity > 0) {
                vm.products[index].quantity--;
                vm.check -= vm.products[index].price;
            }
        }

        function addProduct(index) {
            vm.products[index].quantity++;
            vm.check += vm.products[index].price;
        }

        var getCategories = function () {
            var todos = {
                "id": 0,
                "title": "Todos"
            };
            productsService
                .getCategories()
                .then(function successCallback(response) {

                    vm.categories = response.data.data.allCategory;
                    vm.categories.splice(0, 0, $scope.selectedItem);
                    console.log("categories", vm.categories);
                }, function errorCallback(response) {
                    console.log("Ops... Error :(");
                });
        };

        function queryProducts(categoryId, search) {

            categoryId = (typeof categoryId !== 'undefined') ? categoryId : 0;
            search = (typeof search !== 'undefined')  ? search : "";
            vm.products = [];

            vm.loading = true;
            console.log("Query Products...");
            console.log("pocId:", pocId);
            console.log("categoryId:", categoryId);
            console.log("search:", search);

            productsService
                .getProducts(pocId, categoryId, search)
                .then(function successCallback(response) {
                    console.log(response.data);
                    var products = response.data.data.poc.products;
                    products.forEach(element => {
                        element.productVariants[0].quantity = "";
                        vm
                            .products
                            .push(element.productVariants[0]);
                    });

                    vm.loading = false;
                }, function errorCallback(response) {
                    vm.loading = false;
                    console.log("Ops... Error :(");
                });
        }

        var getPoc = function () {
            productsService
                .getPoc(geolocation)
                .then(function successCallback(response) {
                    console.log(response.data);
                    var pocs = response.data;
                    //console.log(pocs); console.log(pocs.data.pocSearch); ID 243;
                    pocs
                        .data
                        .pocSearch
                        .forEach(element => {
                            console.log(element);
                        });
                    pocId = pocs.data.pocSearch[0].id;
                    queryProducts();

                }, function errorCallback(response) {
                    console.log("Ops... Error :(");
                });

        };

        getCategories();
        getPoc();

    }
})();
(function () {
    'use strict';

    angular
        .module('app')
        .factory('productsService', productsService);

    function productsService($http, $filter) {
        var service = {
            getPoc: getPoc,
            getProducts: getProducts,
            getCategories: getCategories
        };

        var url = "https://803votn6w7.execute-api.us-west-2.amazonaws.com/dev/public/graphql";

        return service;

   
        function getProducts(pocId, categoryId, search) {
            var parameters;

            parameters = {
                //ES6 for sake of simplicity
                "query": `query pocCategorySearch($id: ID!, $search: String!, $categoryId: Int!) {
                            poc(id: $id) {
                                products(categoryId: $categoryId, search: $search) {
                                    productVariants{
                                      title
                                      description
                                      imageUrl
                                      price
                                    }
                                  }
                            }
                        }`,
                "variables": {
                    "id": pocId,
                    "search": search,
                    "categoryId": categoryId
                }
            };
            return $http.post(url, parameters);
        }

        function getCategories() {
            var parameters;
            parameters = {
                "query": `query allCategoriesSearch {
                                allCategory{
                                    title
                                    id
                                }
                            }`,
                "variables": {
                    "id": "166",
                    "search": "",
                    "categoryId": 0
                }
            };

            return $http.post(url, parameters);
        }


        function getPoc(geolocation) {

            var date = new Date();
            var formattedDate = $filter('date')(date, "yyyy-MM-ddTHH:mm:ss.sssZ");

            var parameters;

            parameters = {
                //ES6 for sake of simplicity
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