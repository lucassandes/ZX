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

        var geolocation = geolocationService.getGeolocation();
        var pocId;
        if (angular.equals(geolocation, {})) {
            $location.path("/"); 
        }

        console.log("Products Controller", geolocation);
        function removeProduct(index){
            if(vm.products[index].quantity > 0) {
                vm.products[index].quantity--;
                vm.check -= vm.products[index].price;
            }
        } 

        function addProduct(index){
            vm.products[index].quantity++;
            vm.check += vm.products[index].price;
        }
        //mock
        vm.products = [{"title":"Skol 300ml | Apenas o Líquido.","description":null,"imageUrl":"https://s3-us-west-2.amazonaws.com/ze-delivery/upload/images/583de5188c0e8.jpg","price":20.28},{"title":"Stella Artois 275ml - Unidade","description":null,"imageUrl":"https://s3-us-west-2.amazonaws.com/ze-delivery/upload/images/592de3ed8977d.jpg","price":3.69},{"title":"Budweiser 343ml - Pack com 6 Unidades","description":null,"imageUrl":"https://s3-us-west-2.amazonaws.com/ze-delivery/upload/images/56ebfc992623b.jpg","price":20.34},{"title":"Skol 350ml - Unidade","description":null,"imageUrl":"https://s3-us-west-2.amazonaws.com/ze-delivery/upload/images/5662f9a0bfd2e.jpg","price":2.99},{"title":"Skol 350ml - Pack com 12 Unidades","description":null,"imageUrl":"https://s3-us-west-2.amazonaws.com/ze-delivery/upload/images/591379909d61b.jpg","price":35.88},{"title":"Brahma 350ml - Unidade","description":null,"imageUrl":"https://s3-us-west-2.amazonaws.com/ze-delivery/upload/images/566b52ef302cf.jpg","price":2.89},{"title":"Brahma 350ml - Pack com 12 Unidades","description":null,"imageUrl":"https://s3-us-west-2.amazonaws.com/ze-delivery/upload/images/591379f7cd2e4.jpg","price":34.68},{"title":"Corona Extra 355ml - Unidade","description":null,"imageUrl":"https://s3-us-west-2.amazonaws.com/ze-delivery/upload/images/5662fc6ebebe8.jpg","price":5.99},{"title":"Corona Extra 355ml - Pack com 6 unidades","description":null,"imageUrl":"https://s3-us-west-2.amazonaws.com/ze-delivery/upload/images/5662fc93e5079.jpg","price":35.94},{"title":"Original 600ml | Vasilhame Incluso","description":null,"imageUrl":"https://s3-us-west-2.amazonaws.com/ze-delivery/upload/images/5825b59ff3f3a.jpg","price":6.49},{"title":"Original 600ml | Vasilhame Incluso.","description":null,"imageUrl":"https://s3-us-west-2.amazonaws.com/ze-delivery/upload/images/59137a5f5e251.jpg","price":77.88},{"title":"Skol Beats Senses 313ml - Pack com 6 Unidades","description":null,"imageUrl":"https://s3-us-west-2.amazonaws.com/ze-delivery/upload/images/573349f08f942.jpg","price":29.94},{"title":"Skol 1L | Vasilhame Incluso","description":null,"imageUrl":"https://s3-us-west-2.amazonaws.com/ze-delivery/upload/images/5825b75a5062e.jpg","price":71.88},{"title":"Skol 1L | Vasilhame Incluso.","description":null,"imageUrl":"https://s3-us-west-2.amazonaws.com/ze-delivery/upload/images/58267e769faf2.jpg","price":70},{"title":"Original 600ml | Apenas o Líquido.","description":null,"imageUrl":"https://s3-us-west-2.amazonaws.com/ze-delivery/upload/images/59137c2b383c1.jpg","price":65.88},{"title":"Skol 1L | Apenas o Líquido","description":null,"imageUrl":"https://s3-us-west-2.amazonaws.com/ze-delivery/upload/images/59137c61c3538.jpg","price":70},{"title":"Brahma 1L | Apenas o Líquido.","description":null,"imageUrl":"https://s3-us-west-2.amazonaws.com/ze-delivery/upload/images/583de5cc18df9.jpg","price":65.88},{"title":"Brahma 600ml | Apenas o Líquido.","description":null,"imageUrl":"https://s3-us-west-2.amazonaws.com/ze-delivery/upload/images/583de5f8cdb0a.jpg","price":57.48},{"title":"Skol 600ml | Apenas o Líquido.","description":null,"imageUrl":"https://s3-us-west-2.amazonaws.com/ze-delivery/upload/images/59137cad92603.jpg","price":63.48},{"title":"Brahma 300ml | Apenas o líquido.","description":null,"imageUrl":"https://s3-us-west-2.amazonaws.com/ze-delivery/upload/images/583de68ed6271.jpg","price":20.28},{"title":"Serramalte 600ml | Apenas o Líquido.","description":null,"imageUrl":"https://s3-us-west-2.amazonaws.com/ze-delivery/upload/images/583de6ca779d4.jpg","price":71.88},{"title":"Kit Variant Cerveja e Copo","description":null,"imageUrl":"https://s3-us-west-2.amazonaws.com/ze-delivery/upload/images/583de5cc18df9.jpg","price":30},{"title":"Oi","description":"","imageUrl":"https://s3-us-west-2.amazonaws.com/courier-images-dev/product/00001551_5caf4b6d-f4eb-4a4b-9ca5-f97ef82a8917.jpg","price":10},{"title":"Testee","description":"","imageUrl":"https://s3-us-west-2.amazonaws.com/courier-images-dev/product/00001550_ed540189-169e-40ef-876f-d0695a298ca7.jpg","price":null},{"title":"Dieguinho","description":"Dieguinho","imageUrl":"https://s3-us-west-2.amazonaws.com/courier-images-dev/product/00001546_6bd5491d-abcf-4245-9668-789e27964827.jpg","price":null},{"title":"Chelsea","description":"Chelsea","imageUrl":"https://s3-us-west-2.amazonaws.com/courier-images-dev/product/00001549_668d4366-f34a-40c9-8ba0-62a3b5da56d8.jpg","price":null},{"title":"Dieguinho","description":"teste","imageUrl":"https://s3-us-west-2.amazonaws.com/courier-images-dev/product/00001545_22e9df99-9e2e-49a6-af9a-4dd187dde8f4.jpg","price":null},{"title":"Allan","description":"ddds","imageUrl":"https://s3-us-west-2.amazonaws.com/courier-images-dev/product/00001559_b07b573d-ba54-4945-93c9-e01118ef9c1e.jpg","price":15}];
        
        vm.products.forEach(element => {
            element.quantity = "";
        });
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
                
                productsService
                    .getProducts(pocId)
                    .then(function successCallback(response) {
                        console.log(response.data);
                        var products  = response.data.data.poc.products;
                        products.forEach(element => {
                            vm.products.push(element.productVariants[0]);
                        });

                        console.log(vm.products);
                    }, function errorCallback(response) {
                        console.log("Ops... Error :(");
                    });

            }, function errorCallback(response) {
                console.log("Ops... Error :(");
            });
        

    }
})();