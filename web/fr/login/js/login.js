define(["jquery", "knockout", "login/js/viewmodel",
		"text!templates/login.html"],
		
    function ($, ko, VM, loginTpl) {
        if($.cookie("id") && $.cookie("role")){
			if($.cookie("role")=="pilotAccount"){
				window.location.replace("/fr/pilot");
			}else if($.cookie("role")=="airbaseManager"){
				window.location.replace("/fr/owner");
			}
		}
        $("body").append(loginTpl)
		var viewModel = new VM();
        ko.applyBindings(viewModel);

    });
