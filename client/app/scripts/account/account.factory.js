(function() {
    'use strict';

    angular
        .module('ngBoilerplateApp.account')
        .factory('account', AccountFactory);

    AccountFactory.$inject = ['$window', '$q', '$http', 'SoundCloudLogin', '$resource'];

    function AccountFactory ($window, $q, $http, SoundCloudLogin, $resource) {
        var factory = {
            data: {
                user: null,
                soundCloudToken: getSoundCloudToken(),
                playlists: null
            },
            soundCloudLogin: soundCloudLogin

        };

        activate();

        return factory;

        function activate () {
            //factory.data.user = getUser();
            getPlaylists().then(function (data) {
                factory.data.playlists = data.data;  
            });
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
        
        function getPlaylists() {
            return $http.get('http://api.soundcloud.com/me/playlists?oauth_token=1-162114-103318666-1f38e78ba38df');
//            var Playlists = $resource(
//                'http://api.soundcloud.com/me/playlists?oauth_token=1-162114-103318666-1f38e78ba38df', 
//                {}, 
//                {
//                    get: {method:'GET', isArray:true}
//                }
//            );
//            console.log(Playlists.get());
//            console.log("Playlists:  " + Playlists);
//            var playlists = Playlists.get();
//            console.log(playlists);
//            console.log("playlists:  " + playlists);
        }
    }
})();
