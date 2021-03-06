requirejs.config({

    baseUrl: '.',
	
	 shim:{
        'typeahead': {
            "deps": ["jquery"]
        },
        'jquery-cookie':{
            "deps": ["jquery"]
        }
    },

    paths: {
        "admin": ".",
		"common": "../common",
        "jquery": "../common/vendor/js/jquery-2.1",
        "jquery-cookie": "../common/vendor/js/jquery-cookie",
		"typeahead": "../common/vendor/js/typeahead",
        "knockout": "../common/vendor/js/knockout",
        "sammy": "../common/vendor/js/sammy",
        "text": "../common/vendor/js/text"
    }
});
require(["admin/js/admin"]);