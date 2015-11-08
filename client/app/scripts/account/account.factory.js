(function() {
    'use strict';

    angular
        .module('ngBoilerplateApp.account')
        .factory('account', AccountFactory);

    AccountFactory.$inject = ['$window', '$q', '$http', 'SoundCloudLogin'];

    function AccountFactory ($window, $q, $http, SoundCloudLogin) {
        var factory = {
            data: {
                user: null,
                soundCloudToken: getSoundCloudToken()
            },
            soundCloudLogin: soundCloudLogin

        };

        //activate();

        return factory;

        function activate () {
            factory.data.user = getUser();
        }

        function getUser () {
            return $http.get('http://localhost:3000/users/me').then(function (data) {
                console.log(data);
            });
        }

        function getSoundCloudToken () {
            return $window.localStorage.oAuthToken;
        }

        function soundCloudLogin () {
            if (!$window.localStorage.oAuthToken) {
                return SoundCloudLogin.connect().then(function(oAuthToken) {
                    // Connected!
                    $window.localStorage.setItem('oAuthToken', oAuthToken);
                    factory.data.soundCloudToken = oAuthToken;
                    return oAuthToken;
                });
            }

            var promise = $q.defer();
            promise.resolve($window.localStorage.oAuthToken);
            return promise;
        }
    }
})();
