(function () {
    'use strict';
    angular
        .module('ngBoilerplateApp.account')
        .config(AccountConfig);

    AccountConfig.$inject = ['$stateProvider'];

    function AccountConfig ($stateProvider) {
        $stateProvider
            .state('app.account', {
                url: '/account',
                templateUrl: 'views/account/account.html',
                controller: 'AccountController as vm'
            });
    }
})();
