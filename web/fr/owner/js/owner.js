define(["jquery", "knockout", "sammy", "owner/js/base-viewmodel",
		"text!owner/templates/nav.html",
        "text!owner/templates/home.html",
		"text!owner/templates/services.html",
		"text!owner/templates/service-view.html","jquery-cookie"
        ],
    function ($, ko, Sammy, baseVM, navTpl, homeTpl,servicesTpl,serviceViewTpl) {

       	$("body").append(navTpl).append(homeTpl).append(servicesTpl).append(serviceViewTpl);
        var viewModel = new baseVM();
		
		viewModel.initAirbaseManager($.cookie("id"),function(){
        Sammy(function () {
            this.get('home', function () {
                viewModel.currentPage("Accueil");
            });
			this.get('servicesbyairbase/:idAirbase', function () {
                var idAirbase = this.params['idAirbase'];
				viewModel.currentAirbaseId=idAirbase;
				viewModel.currentPage("Services");
            });
			this.get('servicesbyairbase', function () {
                viewModel.currentPage("Services");
            });
			this.get('services/:idService/:idAirbase', function () {
				var idService = this.params['idService'];
				var idAirbase = this.params['idAirbase'];
				viewModel.currentServiceId=idService;
				viewModel.currentAirbaseId=idAirbase;
				viewModel.currentPage("Service");
            });			
            this.notFound = function () {
				console.log("not found");
				viewModel.currentPage("Accueil");
					window.location.hash = "#home";
            };
        }).run();

        ko.applyBindings(viewModel);
		});
    });
