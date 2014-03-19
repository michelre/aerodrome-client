requirejs.config({

    baseUrl: '.',
	
	 shim:{
	'jquery-cookie': {
            "deps": ["jquery"]
        }
	 },
	
    paths: {
        "owner": ".",
		"common": "../common",
        "jquery": "../common/vendor/js/jquery-2.1",
        "typeahead": "../common/vendor/js/typeahead",
        "knockout": "../common/vendor/js/knockout",
        "sammy": "../common/vendor/js/sammy",
        "text": "../common/vendor/js/text",
		"jquery-cookie":"../common/vendor/js/jquery-cookie"
    }
});
require(["owner/js/owner"]);