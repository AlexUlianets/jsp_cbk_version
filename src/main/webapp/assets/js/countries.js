var app = angular.module('main', ['ui.router', 'oc.lazyLoad']);

// Enter page

app.controller('countriesCtrl',['$scope','$rootScope', '$http', function($scope, $rootScope,$http) {

    $scope.initCountriesList = function () {
        var req = {
            method: 'GET',
            url: '/get_countries',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        };

        $http(req).success(function (data) {
            $scope.countriesList = data;
            console.log(data);
        })

    };

    $scope.initSelectedCountry = function () {

        console.log(location.pathname.split("/"));
        var req = {
            method: 'GET',
            url: '/get_country_info/' + location.pathname.split("/")[location.pathname.split("/").length-1],
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        };

        $http(req).success(function (data) {
         $rootScope.selectedCountry = data;
        })

    };

}]);