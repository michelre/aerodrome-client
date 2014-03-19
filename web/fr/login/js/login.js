define(["jquery", "knockout", "login/js/viewmodel",
		"text!templates/login.html"],
		
    function ($, ko, VM, loginTpl) {
        if($.cookie("id") && $.cookie("role")){
			if($.cookie("role")=="pilotAccount"){
				window.location.replace("/fr/pilot");
			}
		}
        $("body").append(loginTpl)
		var viewModel = new VM();
        ko.applyBindings(viewModel);

    });
