requirejs.config({

    baseUrl: '.',

    paths: {
        "secretary": ".",
		"common": "../common",
        "jquery": "../common/vendor/js/jquery-2.1",
        "knockout": "../common/vendor/js/knockout",
        "sammy": "../common/vendor/js/sammy",
        "text": "../common/vendor/js/text",
		"jquery-cookie":"../common/vendor/js/jquery-cookie"
    }
});
require(["secretary/js/secretary"]);