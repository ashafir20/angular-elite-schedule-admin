(function(){
    'use strict';

    angular.module('eliteAdmin').controller('ConfirmModalCtrl', ConfirmModalCtrl);

    ConfirmModalCtrl.$inject = ['$modalInstance', 'data'];

    function ConfirmModalCtrl($modalInstance, data) {

        var vm = this;

        vm.cancel = cancel;
        vm.ok = ok;
        vm.properties = data;

        function cancel() {
            $modalInstance.dismiss();
        }

        function ok(){
            $modalInstance.close();
        }
    }

})();