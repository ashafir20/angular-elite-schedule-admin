(function(){
    'use strict';

    angular.module('eliteAdmin')
        .controller('GamesCtrl', GamesCtrl);

    GamesCtrl.$inject = ['$location', '$stateParams' ,'initialData'];

    function GamesCtrl($location, $stateParams, initialData) {

        var vm = this;
        vm.go = go;

        activate();

        function activate() {

        }


        function go(path){
            $location.path('leagues/' + $stateParams.id + '/' + path);
        }

    }

})();