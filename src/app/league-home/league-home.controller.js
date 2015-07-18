(function(){
    'use strict';

    angular.module('eliteAdmin')
        .controller('LeagueHomeCtrl', LeagueHomeCtrl);

    LeagueHomeCtrl.$inject = ['$location', '$routeParams' ,'initialData'];

    function LeagueHomeCtrl($location, $routeParams, initialData) {

        var vm = this;
        vm.go = go;

        activate();

        function activate() {

        }


        function go(path){
            $location.path('leagues/' + $routeParams.id + '/' + path);
        }

    }

})();