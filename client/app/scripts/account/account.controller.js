(function () {
    'use strict';

    angular
        .module('ngBoilerplateApp.account')
        .controller('AccountController', AccountController);

    AccountController.$inject = ['account'];

    function AccountController (account) {
        var vm = this;
        vm.account = account.data;
        vm.soundCloudLogin = account.soundCloudLogin;
    }
})();
