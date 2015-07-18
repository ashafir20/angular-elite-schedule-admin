(function(){
    'use strict';

    angular.module('eliteAdmin')
        .controller('TeamsCtrl', TeamsCtrl);

    TeamsCtrl.$inject = ['$state',
        '$stateParams' ,'initialData',
        'eliteApi', 'dialogService', '$modal'];

    function TeamsCtrl($state, $stateParams, initialData,
                       eliteApi, dialogs, $modal) {

        var vm = this;
        vm.go = go;

        vm.teams = initialData;
        vm.toggleExpand = toggleExpand;
        vm.accordionExpanded = true;
        vm.deleteItem = deleteItem;
        vm.editItem = editItem;

        activate();

        function activate() {
            initializeGroups();
        }

        function deleteItem(id) {
            dialogs.confirm("Are you sure?", 'Delete?', ['OK', 'Cancel'])
                .then(function(){
                    eliteApi.deleteTeam(id).then(function(data){
                        _.remove(vm.teams, { 'id': id});
                        initializeGroups();
                    });
                });
        }

        function editItem(team) {
           var modaInstance = $modal.open({
               templateUrl: 'app/teams/edit-team.html',
               controller: 'EditTeamCtrl',
               controllerAs: 'vm',
               resolve: {
                   data: function(){
                       return {
                           divisions: _.chain(vm.teams)
                               .uniq('divisionName')
                               .map(function(item){
                                   return item.divisionName;
                               })
                               .value(),
                           itemToEdit: team
                       }
                   }
               }
           });

            modaInstance.result.then(function(result){
                result.leagueId = $stateParams.id;
                eliteApi.saveTeam(result).then(function(data){
                    if(team){
                        _.assign(team, data);
                    } else {
                        vm.teams.push(data)
                    }

                    initializeGroups();
                })
            })
        }

        function initializeGroups(){
            vm.groups = _.chain(vm.teams)
                .sortBy('name')
                .groupBy('divisionName')
                .pairs()
                .map(function(item){
                    return { divisionName: item[0], teams: item[1], isOpen: true };
                })
                .sortBy('divisionName')
                .value();
        }

        function toggleExpand(expand){
            _.forEach(vm.groups, function(group){
               group.isOpen = expand;
            });
        }

        function go(path){
            //$location.path('leagues/' + $routeParams.id + '/' + path);
            $state.go('league-games', { id : $stateParams.id });
        }

    }

})();