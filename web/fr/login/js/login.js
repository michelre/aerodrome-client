define(["jquery", "knockout", "login/js/viewmodel",
		"text!templates/login.html"],
		
    function ($, ko, VM, loginTpl) {
        if($.cookie("id") && $.cookie("role")){
			if($.cookie("role")=="pilotAccount"){
				window.location.replace("/fr/pilot");
			}else if($.cookie("role")=="airbaseManager"){
				window.location.replace("/fr/owner");
			}else if($.cookie("role")=="superAdmin"){
				window.location.replace("/fr/admin");
			}
		}
        $("body").append(loginTpl)
		var viewModel = new VM();
        ko.applyBindings(viewModel);

    });
