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
