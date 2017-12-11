(function () {
    'use strict';

    angular
        .module('app')
        .factory('productsService', productsService);

    function productsService($http, $filter, API_URL) {
        var service = {
            getPoc: getPoc,
            getProducts: getProducts,
            getCategories: getCategories
        };

        var endpoint = API_URL;

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
            return $http.post(endpoint, parameters);
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

            return $http.post(endpoint, parameters);
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
            return $http.post(endpoint, parameters);

        }

    }
})();