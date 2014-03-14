define(["jquery", "knockout", "login/js/viewmodel",
		"text!templates/login.html"
        ],
    function ($, ko, VM,loginTpl) {
 
        $("body").append(loginTpl)
        var viewModel = new VM.viewModel();

        ko.applyBindings(viewModel);

    });
