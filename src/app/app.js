(function () {
    'use strict';
    var app = angular.module('eliteAdmin', [
        // Angular modules
        //'ngRoute',

        // 3rd Party Modules
        'ui.bootstrap',
        "ui.router"
    ]);

    //app.config(['$routeProvider', configRoutes]);

    app.config(['$stateProvider', '$urlRouterProvider' ,configRoutes]);

    function configRoutes($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'app/home/home.html',
                controller: 'HomeCtrl',
                controllerAs: 'vm'
            })
            .state('leagues', {
                url: '/leagues',
                templateUrl: 'app/leagues/leagues.html',
                controller: 'LeaguesCtrl',
                controllerAs: 'vm',
                resolve: {
                    initialData: ['eliteApi', function(eliteApi) {
                        return eliteApi.getLeagues();
                    }]
                }
            })
            .state('league-teams', {
                url: '/leagues/:id/teams',
                templateUrl: 'app/teams/teams.html',
                controller: 'TeamsCtrl',
                controllerAs: 'vm',
                resolve: {
                    initialData: ['$stateParams', 'eliteApi', function($stateParams, eliteApi){
                        return eliteApi.getTeams($stateParams.id);
                    }]
                }
            })
            .state('league-games', {
                url: '/leagues/:id/games',
                templateUrl: 'app/games/games.html',
                controller: 'GamesCtrl',
                controllerAs: 'vm',
                resolve: {
                    initialData: ['$stateParams', 'eliteApi', function($stateParams, eliteApi){
                        return eliteApi.getGames($stateParams.id);
                    }]
                }
            })
            .state('league-home', {
                url: '/leagues/:id/league-home',
                templateUrl: 'app/league-home/league-home.html',
                controller: 'LeagueHomeCtrl',
                controllerAs: 'vm',
                resolve: {
                    initialData: ['$stateParams', 'eliteApi', function($stateParams, eliteApi){
                        return eliteApi.getLeague($stateParams.id);
                    }]
                }
            });


        $urlRouterProvider.otherwise('/');
    }

    app.run(['$state', function ($state) {
        // Include $route to kick start the router.
    }]);
})();
