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
            vm.errorMessage="";
            productsService
                .getCategories()
                .then(function successCallback(response) {

                    vm.categories = response.data.data.allCategory;
                    vm.categories.splice(0, 0, $scope.selectedItem);
                    console.log("categories", vm.categories);
                }, function errorCallback(response) {
                    console.log("Ops... Error :(");
                    vm.loading = false;
                    vm.errorMessage = "Ops... Error :(";
                });
        };

        function queryProducts(categoryId, search) {
            vm.errorMessage="";
            if(pocId){
                categoryId = (typeof categoryId !== 'undefined') ? categoryId : 0;
                search = (typeof search !== 'undefined')  ? search : "";
                vm.products = [];

                vm.loading = true;
                vm.emptyMessage = "";
                vm.errorMessage = "";
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
                            vm.products.push(element.productVariants[0]);
                        });

                        console.log("lenght:", products.length);
                        if(products.length == 0){
                            vm.emptyMessage = "Sorry, bro. We couldn't find anything";
                        }
                        vm.loading = false;
                    }, function errorCallback(response) {
                        vm.loading = false;
                        vm.errorMessage = "Ops... Error :(";
                        console.log("Ops... Error :(");
                    });
            }
            else {
                vm.errorMessage = "Sorry, no POCs found for this adress";
            }
        }


       var getLastPoc = function (pocSearch){
            //returns the last POC from pocSearch array that delivers in up to 1h
            var id = false;
            pocSearch.forEach(element => {
                console.log(element);
                var i = 0;
                for (i = 0; i < element.deliveryTypes.length; i++){
                    var typeId = element.deliveryTypes[i].deliveryTypeId;
                    console.log ("pocId", element.id);
                    console.log ("TypeId", typeId);
                    if(typeId == 166) {
                        id = element.id;
                        return id;
                        
                    }
                }
            });

            return id;
        };


        

        var getFirstPoc = function (pocSearch){
            //returns the first POC from pocSearch array that delivers in up to 1h
            var j = 0; 
            var id = false;
            for (j = 0; j < pocSearch.length; j++) {
                var element = pocSearch[j];
                var i = 0;
                for (i = 0; i < element.deliveryTypes.length; i++){
                    var typeId = element.deliveryTypes[i].deliveryTypeId;
                    if(typeId == 166) {
                        id = element.id;
                        return id;
                    }
                }
            }
        };

        var getPoc = function () {
            vm.errorMessage = "";
            
            productsService
                .getPoc(geolocation)
                .then(function successCallback(response) {
                    //console.log(response.data);
                    var pocSearch = response.data.data.pocSearch;

                    //If we use this routine below, POC will be 242
                    pocId = getLastPoc(pocSearch);

                    //If we use this routine below, POC will be 243
                    pocId = getFirstPoc(pocSearch);
               

                    //get the first POC means this below??
                    //pocId = pocs.data.pocSearch[0].id;
                    queryProducts();

                }, function errorCallback(response) {
                    vm.loading = false;
                    vm.errorMessage = "Ops... Error :(";
                });

        };

        getCategories();
        getPoc();

    }
})();