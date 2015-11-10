var express = require('express');
var router = express.Router();
var env = require('../env/config');
var mongoose = require('mongoose');
var userSchema = require('../model/user');
var relationshipSchema = require('../model/relationship');
var User = mongoose.model('User', userSchema);
var Relationship = mongoose.model('Relationship', relationshipSchema);
var _ = require('underscore');
var vasync = require('vasync');

/* GET users listing. */
router.get('/me', env.isAuthenticated, function(req, res, next) {
    // res.send('respond with a resource');
    res.send({
        username: req.user
    });

});


router.post('/soundcloud/add', env.isAuthenticated, function(req, res, next) {
    var queue = vasync.queue(function(task, callback) {
        task(callback);
    }, 1);
    var OAuthToken = req.body.oauth_token;
    var username = req.body.username || "";
    var userId = '563feb68f4256911007d1b51'; //test hack

    if (req.user) {
        userId = req.user._id;
    }
        // qu
    queue.push(function(callback) {
        User.findById({
            _id: userId
        }, function(err, user) {
            if (err) {
                res.send(err);
            }

            if (!user) {
                res.send('empty');
            } else {            
                var u = user.toJSON();
                var test = _.find(u.musicProfile, function(obj) {
                    return obj.accountName === 'soundcloud';
                });

                if (typeof test === 'undefined') {
                    user.musicProfile.push({
                        ExternalId: OAuthToken,
                        username: username,
                        accountName: 'soundcloud'                      
                    });
                }

                user.save(function(err) {
                    callback();
                });
            }
        });
    });

    queue.push(function(callback) {
        User.findById({
            _id: userId
        }, function(err, user) {
            if (err) {}

            if (user) {
                resstatus(201).send(user);
            } else {
                res.send('somethings up');
            }
        });
    });
});

router.post('/spotify/add', env.isAuthenticated, function(req, res, next) {
    var queue = vasync.queue(function(task, callback) {
        task(callback);
    }, 1);
    var OAuthToken = req.body.oauth_token;
    var username = req.body.username || "";
    var userId = '563feb68f4256911007d1b51'; //test hack

    if (req.user) {
        userId = req.user._id;
    }
        // qu
    queue.push(function(callback) {
        User.findById({
            _id: userId
        }, function(err, user) {
            if (err) {
                res.send(err);
            }

            if (!user) {
                res.send('empty');
            } else {            
                var u = user.toJSON();
                var test = _.find(u.musicProfile, function(obj) {
                    return obj.accountName === 'spotify';
                });

                if (typeof test === 'undefined') {
                    user.musicProfile.push({
                        ExternalId: OAuthToken,
                        username: username,
                        accountName: 'spotify'                      
                    });
                }

                user.save(function(err) {
                    callback();
                });
            }
        });
    });

    queue.push(function(callback) {
        User.findById({
            _id: userId
        }, function(err, user) {
            if (err) {}

            if (user) {
                resstatus(201).send(user);
            } else {
                res.send('somethings up');
            }
        });
    });
});

router.put(':userId/spotify/update/:spotifyId', env.isAuthenticated, function(req, res, next) {

});

module.exports = router;



/*
{
  "href" : "https://api.spotify.com/v1/users/jeganmatthews/playlists?offset=0&limit=10",
  "items" : [ {
    "collaborative" : false,
    "external_urls" : {
      "spotify" : "http://open.spotify.com/user/jeganmatthews/playlist/3omWuSXtKz4tuE2QRaaS2X"
    },
    "href" : "https://api.spotify.com/v1/users/jeganmatthews/playlists/3omWuSXtKz4tuE2QRaaS2X",
    "id" : "3omWuSXtKz4tuE2QRaaS2X",
    "images" : [ {
      "height" : 640,
      "url" : "https://mosaic.scdn.co/640/347e767ad6c3172f80456bf2684f89d6ed38503229c49e2ad85a1917f70ef557016ae73f6e5006745ddca5dd6924ad1180cb6dda0274a346e961309171cb2f0c6c60f82f6bf86fe8938b2ea9f3b75ec3",
      "width" : 640
    }, {
      "height" : 300,
      "url" : "https://mosaic.scdn.co/300/347e767ad6c3172f80456bf2684f89d6ed38503229c49e2ad85a1917f70ef557016ae73f6e5006745ddca5dd6924ad1180cb6dda0274a346e961309171cb2f0c6c60f82f6bf86fe8938b2ea9f3b75ec3",
      "width" : 300
    }, {
      "height" : 60,
      "url" : "https://mosaic.scdn.co/60/347e767ad6c3172f80456bf2684f89d6ed38503229c49e2ad85a1917f70ef557016ae73f6e5006745ddca5dd6924ad1180cb6dda0274a346e961309171cb2f0c6c60f82f6bf86fe8938b2ea9f3b75ec3",
      "width" : 60
    } ],
    "name" : "Jay-z Freestyle",
    "owner" : {
      "external_urls" : {
        "spotify" : "http://open.spotify.com/user/jeganmatthews"
      },
      "href" : "https://api.spotify.com/v1/users/jeganmatthews",
      "id" : "jeganmatthews",
      "type" : "user",
      "uri" : "spotify:user:jeganmatthews"
    },
    "public" : false,
    "snapshot_id" : "J+2LSj8KuYKOLXNbwaQBYdns8B1k0ES+S2pb4ddKfJesg6fwdIclIMsIQpwMBlw/",
    "tracks" : {
      "href" : "https://api.spotify.com/v1/users/jeganmatthews/playlists/3omWuSXtKz4tuE2QRaaS2X/tracks",
      "total" : 7
    },
    "type" : "playlist",
    "uri" : "spotify:user:jeganmatthews:playlist:3omWuSXtKz4tuE2QRaaS2X"
  }, {
    "collaborative" : false,
    "external_urls" : {
      "spotify" : "http://open.spotify.com/user/jeganmatthews/playlist/78Ec98EJKwFE6sstPcklaU"
    },
    "href" : "https://api.spotify.com/v1/users/jeganmatthews/playlists/78Ec98EJKwFE6sstPcklaU",
    "id" : "78Ec98EJKwFE6sstPcklaU",
    "images" : [ {
      "height" : 640,
      "url" : "https://i.scdn.co/image/e270b673b6a1bf1e9108aa34391e6c6f84db6af8",
      "width" : 640
    } ],
    "name" : "Bloodsport '15 – Raleigh Ritchie",
    "owner" : {
      "external_urls" : {
        "spotify" : "http://open.spotify.com/user/jeganmatthews"
      },
      "href" : "https://api.spotify.com/v1/users/jeganmatthews",
      "id" : "jeganmatthews",
      "type" : "user",
      "uri" : "spotify:user:jeganmatthews"
    },
    "public" : false,
    "snapshot_id" : "HPoHxA/ShIY3cqGPb7Vd74vleOBGAlir6ToE6V7Q4I04oks9jfcguxf8t7dApev2",
    "tracks" : {
      "href" : "https://api.spotify.com/v1/users/jeganmatthews/playlists/78Ec98EJKwFE6sstPcklaU/tracks",
      "total" : 3
    },
    "type" : "playlist",
    "uri" : "spotify:user:jeganmatthews:playlist:78Ec98EJKwFE6sstPcklaU"
  }, {
    "collaborative" : false,
    "external_urls" : {
      "spotify" : "http://open.spotify.com/user/jeganmatthews/playlist/5zuxADGH6mIqfCLePWu8yW"
    },
    "href" : "https://api.spotify.com/v1/users/jeganmatthews/playlists/5zuxADGH6mIqfCLePWu8yW",
    "id" : "5zuxADGH6mIqfCLePWu8yW",
    "images" : [ {
      "height" : 640,
      "url" : "https://i.scdn.co/image/a55037c8fe6ebf1f67e563d0d4096b262d0e8842",
      "width" : 640
    } ],
    "name" : "Habasha",
    "owner" : {
      "external_urls" : {
        "spotify" : "http://open.spotify.com/user/jeganmatthews"
      },
      "href" : "https://api.spotify.com/v1/users/jeganmatthews",
      "id" : "jeganmatthews",
      "type" : "user",
      "uri" : "spotify:user:jeganmatthews"
    },
    "public" : false,
    "snapshot_id" : "tFAzjswUwGEp/FHyyKVJoi+Z9wljXlmoYMc1so3S8q5u+RzPn5E7pH+xZttLYixT",
    "tracks" : {
      "href" : "https://api.spotify.com/v1/users/jeganmatthews/playlists/5zuxADGH6mIqfCLePWu8yW/tracks",
      "total" : 2
    },
    "type" : "playlist",
    "uri" : "spotify:user:jeganmatthews:playlist:5zuxADGH6mIqfCLePWu8yW"
  }, {
    "collaborative" : false,
    "external_urls" : {
      "spotify" : "http://open.spotify.com/user/jeganmatthews/playlist/4myE0FyS1PwoIT6Pw1m5dQ"
    },
    "href" : "https://api.spotify.com/v1/users/jeganmatthews/playlists/4myE0FyS1PwoIT6Pw1m5dQ",
    "id" : "4myE0FyS1PwoIT6Pw1m5dQ",
    "images" : [ {
      "height" : 640,
      "url" : "https://mosaic.scdn.co/640/25e922d7e29f4e6f0c245068966a33c14471eff9c0f13aec1b2310708c6b12dd78388c7daf17f557a160371e4f76fa1fe58b5f2f3cb0545c23357a01ddfe1eaf636fdc2961e7dbffde564e9d14679042",
      "width" : 640
    }, {
      "height" : 300,
      "url" : "https://mosaic.scdn.co/300/25e922d7e29f4e6f0c245068966a33c14471eff9c0f13aec1b2310708c6b12dd78388c7daf17f557a160371e4f76fa1fe58b5f2f3cb0545c23357a01ddfe1eaf636fdc2961e7dbffde564e9d14679042",
      "width" : 300
    }, {
      "height" : 60,
      "url" : "https://mosaic.scdn.co/60/25e922d7e29f4e6f0c245068966a33c14471eff9c0f13aec1b2310708c6b12dd78388c7daf17f557a160371e4f76fa1fe58b5f2f3cb0545c23357a01ddfe1eaf636fdc2961e7dbffde564e9d14679042",
      "width" : 60
    } ],
    "name" : "Night 4",
    "owner" : {
      "external_urls" : {
        "spotify" : "http://open.spotify.com/user/jeganmatthews"
      },
      "href" : "https://api.spotify.com/v1/users/jeganmatthews",
      "id" : "jeganmatthews",
      "type" : "user",
      "uri" : "spotify:user:jeganmatthews"
    },
    "public" : false,
    "snapshot_id" : "vcRYjT06lFp1BYcGvQWHGjlo/juQw8uk4k+jXTvwIqk1QJztvz6K7zbvGenFVR+b",
    "tracks" : {
      "href" : "https://api.spotify.com/v1/users/jeganmatthews/playlists/4myE0FyS1PwoIT6Pw1m5dQ/tracks",
      "total" : 9
    },
    "type" : "playlist",
    "uri" : "spotify:user:jeganmatthews:playlist:4myE0FyS1PwoIT6Pw1m5dQ"
  }, {
    "collaborative" : false,
    "external_urls" : {
      "spotify" : "http://open.spotify.com/user/jeganmatthews/playlist/67nE8leAgXpYq5kekjZUP5"
    },
    "href" : "https://api.spotify.com/v1/users/jeganmatthews/playlists/67nE8leAgXpYq5kekjZUP5",
    "id" : "67nE8leAgXpYq5kekjZUP5",
    "images" : [ {
      "height" : 640,
      "url" : "https://i.scdn.co/image/c3ef2436487d0b7073af05bbb765d39697acd33d",
      "width" : 640
    } ],
    "name" : "molly times",
    "owner" : {
      "external_urls" : {
        "spotify" : "http://open.spotify.com/user/jeganmatthews"
      },
      "href" : "https://api.spotify.com/v1/users/jeganmatthews",
      "id" : "jeganmatthews",
      "type" : "user",
      "uri" : "spotify:user:jeganmatthews"
    },
    "public" : false,
    "snapshot_id" : "nASsWJWndQ64LPJG2qxFIJoZ626Y+zmfT7L4P/vXYgbu/MqururIRuS0uvOXXZEg",
    "tracks" : {
      "href" : "https://api.spotify.com/v1/users/jeganmatthews/playlists/67nE8leAgXpYq5kekjZUP5/tracks",
      "total" : 4
    },
    "type" : "playlist",
    "uri" : "spotify:user:jeganmatthews:playlist:67nE8leAgXpYq5kekjZUP5"
  }, {
    "collaborative" : false,
    "external_urls" : {
      "spotify" : "http://open.spotify.com/user/jeganmatthews/playlist/2Kb9Nj61o1U26SY8jUIObg"
    },
    "href" : "https://api.spotify.com/v1/users/jeganmatthews/playlists/2Kb9Nj61o1U26SY8jUIObg",
    "id" : "2Kb9Nj61o1U26SY8jUIObg",
    "images" : [ {
      "height" : 640,
      "url" : "https://i.scdn.co/image/51a60fbb7daba6e6fbc0d3b47e34017dce6f3921",
      "width" : 640
    } ],
    "name" : "The weeknd",
    "owner" : {
      "external_urls" : {
        "spotify" : "http://open.spotify.com/user/jeganmatthews"
      },
      "href" : "https://api.spotify.com/v1/users/jeganmatthews",
      "id" : "jeganmatthews",
      "type" : "user",
      "uri" : "spotify:user:jeganmatthews"
    },
    "public" : false,
    "snapshot_id" : "31PIdY/2Ti/uzDCBS89P3kzy/wIQMra5HK6TEtmTUReFjL+0GuwFXendUxuc+k8j",
    "tracks" : {
      "href" : "https://api.spotify.com/v1/users/jeganmatthews/playlists/2Kb9Nj61o1U26SY8jUIObg/tracks",
      "total" : 2
    },
    "type" : "playlist",
    "uri" : "spotify:user:jeganmatthews:playlist:2Kb9Nj61o1U26SY8jUIObg"
  }, {
    "collaborative" : false,
    "external_urls" : {
      "spotify" : "http://open.spotify.com/user/jeganmatthews/playlist/4BMqS7oZtsIOneqkwjFVay"
    },
    "href" : "https://api.spotify.com/v1/users/jeganmatthews/playlists/4BMqS7oZtsIOneqkwjFVay",
    "id" : "4BMqS7oZtsIOneqkwjFVay",
    "images" : [ {
      "height" : 640,
      "url" : "https://i.scdn.co/image/ec20cc7d2f47ae4fcbb1eb8a3eec9dab8addbd3b",
      "width" : 640
    } ],
    "name" : "FIRE",
    "owner" : {
      "external_urls" : {
        "spotify" : "http://open.spotify.com/user/jeganmatthews"
      },
      "href" : "https://api.spotify.com/v1/users/jeganmatthews",
      "id" : "jeganmatthews",
      "type" : "user",
      "uri" : "spotify:user:jeganmatthews"
    },
    "public" : false,
    "snapshot_id" : "BGgwPEF8LftpYT6IjksnQUkGRvZ/mQovs7Y8+/ffKnGUcJENvFqFAb1FBx+eln5k",
    "tracks" : {
      "href" : "https://api.spotify.com/v1/users/jeganmatthews/playlists/4BMqS7oZtsIOneqkwjFVay/tracks",
      "total" : 6
    },
    "type" : "playlist",
    "uri" : "spotify:user:jeganmatthews:playlist:4BMqS7oZtsIOneqkwjFVay"
  }, {
    "collaborative" : false,
    "external_urls" : {
      "spotify" : "http://open.spotify.com/user/jeganmatthews/playlist/1UkKRRvhVhPSOBXWMaZvr2"
    },
    "href" : "https://api.spotify.com/v1/users/jeganmatthews/playlists/1UkKRRvhVhPSOBXWMaZvr2",
    "id" : "1UkKRRvhVhPSOBXWMaZvr2",
    "images" : [ {
      "height" : 640,
      "url" : "https://mosaic.scdn.co/640/0bd5b423ac08aba2d0fb63cb3d91fdfaf586ef55718a15460e9c26a6130448cc128d2975c881d2607d803d8421d8ac9138255419a04a71323b31c9e3292c18a8d58184c6943033e10aa1deb98efc07de",
      "width" : 640
    }, {
      "height" : 300,
      "url" : "https://mosaic.scdn.co/300/0bd5b423ac08aba2d0fb63cb3d91fdfaf586ef55718a15460e9c26a6130448cc128d2975c881d2607d803d8421d8ac9138255419a04a71323b31c9e3292c18a8d58184c6943033e10aa1deb98efc07de",
      "width" : 300
    }, {
      "height" : 60,
      "url" : "https://mosaic.scdn.co/60/0bd5b423ac08aba2d0fb63cb3d91fdfaf586ef55718a15460e9c26a6130448cc128d2975c881d2607d803d8421d8ac9138255419a04a71323b31c9e3292c18a8d58184c6943033e10aa1deb98efc07de",
      "width" : 60
    } ],
    "name" : "How Deep Is Your Love",
    "owner" : {
      "external_urls" : {
        "spotify" : "http://open.spotify.com/user/jeganmatthews"
      },
      "href" : "https://api.spotify.com/v1/users/jeganmatthews",
      "id" : "jeganmatthews",
      "type" : "user",
      "uri" : "spotify:user:jeganmatthews"
    },
    "public" : false,
    "snapshot_id" : "38J6hpOyTYPWR+2Lrc0rhXb7hYwdk3wpVC2qjRC2Fc0pUlk8sf9AybHy7UjVmL1r",
    "tracks" : {
      "href" : "https://api.spotify.com/v1/users/jeganmatthews/playlists/1UkKRRvhVhPSOBXWMaZvr2/tracks",
      "total" : 5
    },
    "type" : "playlist",
    "uri" : "spotify:user:jeganmatthews:playlist:1UkKRRvhVhPSOBXWMaZvr2"
  }, {
    "collaborative" : false,
    "external_urls" : {
      "spotify" : "http://open.spotify.com/user/jeganmatthews/playlist/4DCaZp06zwHXIF3tJaHuWl"
    },
    "href" : "https://api.spotify.com/v1/users/jeganmatthews/playlists/4DCaZp06zwHXIF3tJaHuWl",
    "id" : "4DCaZp06zwHXIF3tJaHuWl",
    "images" : [ {
      "height" : 640,
      "url" : "https://mosaic.scdn.co/640/0bd5b423ac08aba2d0fb63cb3d91fdfaf586ef55441e5209b2ae3e91b1feb99c23af227ad3a82ef29c13f9e853e7b9345b48f34a8d919d88a97cac06b349c282a5efeda31e09b9b9a0d741a703f167ef",
      "width" : 640
    }, {
      "height" : 300,
      "url" : "https://mosaic.scdn.co/300/0bd5b423ac08aba2d0fb63cb3d91fdfaf586ef55441e5209b2ae3e91b1feb99c23af227ad3a82ef29c13f9e853e7b9345b48f34a8d919d88a97cac06b349c282a5efeda31e09b9b9a0d741a703f167ef",
      "width" : 300
    }, {
      "height" : 60,
      "url" : "https://mosaic.scdn.co/60/0bd5b423ac08aba2d0fb63cb3d91fdfaf586ef55441e5209b2ae3e91b1feb99c23af227ad3a82ef29c13f9e853e7b9345b48f34a8d919d88a97cac06b349c282a5efeda31e09b9b9a0d741a703f167ef",
      "width" : 60
    } ],
    "name" : "international flight",
    "owner" : {
      "external_urls" : {
        "spotify" : "http://open.spotify.com/user/jeganmatthews"
      },
      "href" : "https://api.spotify.com/v1/users/jeganmatthews",
      "id" : "jeganmatthews",
      "type" : "user",
      "uri" : "spotify:user:jeganmatthews"
    },
    "public" : false,
    "snapshot_id" : "kfz0Q4ctlsqAcF6d2il8woxuvhAcp3JqlXhAzjc743CwhJCpyuKar0lW+x/a2bTK",
    "tracks" : {
      "href" : "https://api.spotify.com/v1/users/jeganmatthews/playlists/4DCaZp06zwHXIF3tJaHuWl/tracks",
      "total" : 5
    },
    "type" : "playlist",
    "uri" : "spotify:user:jeganmatthews:playlist:4DCaZp06zwHXIF3tJaHuWl"
  }, {
    "collaborative" : false,
    "external_urls" : {
      "spotify" : "http://open.spotify.com/user/jeganmatthews/playlist/3L344XJtWKkrzMvE5zt9l6"
    },
    "href" : "https://api.spotify.com/v1/users/jeganmatthews/playlists/3L344XJtWKkrzMvE5zt9l6",
    "id" : "3L344XJtWKkrzMvE5zt9l6",
    "images" : [ {
      "height" : 640,
      "url" : "https://mosaic.scdn.co/640/af93e49425b91896bf83178a3560fc6b24ce0904a67ffa99f1b530d868f381c2fbcd3989f89a04f5e86b1e6ac40b742a8307fdb186745bbf820c68127d803d8421d8ac9138255419a04a71323b31c9e3",
      "width" : 640
    }, {
      "height" : 300,
      "url" : "https://mosaic.scdn.co/300/af93e49425b91896bf83178a3560fc6b24ce0904a67ffa99f1b530d868f381c2fbcd3989f89a04f5e86b1e6ac40b742a8307fdb186745bbf820c68127d803d8421d8ac9138255419a04a71323b31c9e3",
      "width" : 300
    }, {
      "height" : 60,
      "url" : "https://mosaic.scdn.co/60/af93e49425b91896bf83178a3560fc6b24ce0904a67ffa99f1b530d868f381c2fbcd3989f89a04f5e86b1e6ac40b742a8307fdb186745bbf820c68127d803d8421d8ac9138255419a04a71323b31c9e3",
      "width" : 60
    } ],
    "name" : "Alternative Smooth ",
    "owner" : {
      "external_urls" : {
        "spotify" : "http://open.spotify.com/user/jeganmatthews"
      },
      "href" : "https://api.spotify.com/v1/users/jeganmatthews",
      "id" : "jeganmatthews",
      "type" : "user",
      "uri" : "spotify:user:jeganmatthews"
    },
    "public" : false,
    "snapshot_id" : "2yEQzcIPkuXcaFhQTnxVTwg/8XBc+DZy+lqV8vTsEfYC857gxEWYWRgfDZwu7d9p",
    "tracks" : {
      "href" : "https://api.spotify.com/v1/users/jeganmatthews/playlists/3L344XJtWKkrzMvE5zt9l6/tracks",
      "total" : 9
    },
    "type" : "playlist",
    "uri" : "spotify:user:jeganmatthews:playlist:3L344XJtWKkrzMvE5zt9l6"
  } ],
  "limit" : 10,
  "next" : "https://api.spotify.com/v1/users/jeganmatthews/playlists?offset=10&limit=10",
  "offset" : 0,
  "previous" : null,
  "total" : 142
}
*/