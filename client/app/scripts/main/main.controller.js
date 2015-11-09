(function() {
    'use strict';

    /**
     * @ngdoc function
     * @name ngBoilerplateApp.main.controller:MainController
     * @description
     * # MainController
     * Controller of the ngBoilerplateApp
     */
    angular
        .module('ngBoilerplateApp.main')
        .controller('MainController', MainController);

    MainController.$inject = ['$scope', 'account'];

    function MainController ($scope, account) {
        $scope.accountData = account.data;
        $scope.awesomeThings = [
          'HTML5 Boilerplate',
          'AngularJS',
          'Karma'
        ];
    }
})();
