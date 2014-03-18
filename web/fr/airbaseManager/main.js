requirejs.config({

    baseUrl: '.',

    paths: {
        "login": ".",
		"common": "../common",
        "jquery": "../common/vendor/js/jquery-2.1",
        "knockout": "../common/vendor/js/knockout",
        "sammy": "../common/vendor/js/sammy",
        "text": "../common/vendor/js/text"
    }
});
require(["login/js/login"]);