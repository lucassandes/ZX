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