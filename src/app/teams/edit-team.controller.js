/**
 * Created by aviv on 18-Jul-15.
 */
(function(){
    'use strict';

    angular.module('eliteAdmin')
        .controller('EditTeamCtrl', EditTeamCtrl);

    EditTeamCtrl.$inject = ['$modalInstance', 'data'];

    function EditTeamCtrl($modalInstance, data) {

        var vm = this;

        vm.save = save;
        vm.cancel = cancel;
        vm.editableItem = angular.copy(data.itemToEdit);
        vm.properties = data;
        vm.title = data.itemToEdit ? "Edit Team" : 'Add New Team';

        function cancel(){
            $modalInstance.dismiss();
        }

        function save(){
            $modalInstance.close(vm.editableItem);
        }


    }

})();