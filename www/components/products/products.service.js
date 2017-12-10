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