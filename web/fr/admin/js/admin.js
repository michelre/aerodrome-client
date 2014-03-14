define(["jquery", "knockout", "sammy", "admin/js/viewmodel",
		"text!admin/templates/nav.html",
        "text!admin/templates/home.html",
		"text!admin/templates/airbase.html",
		"text!admin/templates/airbase-create.html",
		"text!admin/templates/airbase-view.html"
        ],
    function ($, ko, Sammy, VM, navTpl, homeTpl,aerodromeTpl ,aerodromeCreateTpl,aerodromeViewTpl) {

       	$("body").append(navTpl).append(homeTpl).append(aerodromeTpl).append(aerodromeCreateTpl).append(aerodromeViewTpl);
        var viewModel = new VM.viewModel();

        Sammy(function () {
            this.get('home', function () {
                viewModel.currentPage("Accueil");
                viewModel.activeTemplate("home-admin-template");
            });
			this.get('airbase', function () {
                viewModel.currentPage("Plateforme");
                viewModel.activeTemplate("airbase-admin-template");
				viewModel.getAirbases();
            });
			this.get('airbase/create', function () {
                viewModel.currentPage("Plateforme");
                viewModel.activeTemplate("airbase-create-admin-template");
            });
			
			this.get('airbase/:id', function () {
                viewModel.currentPage("Plateforme");
                viewModel.activeTemplate("airbase-view-admin-template");
				var id = this.params['id'];
				viewModel.getAirbase(id);
            });
			
            this.notFound = function () {
             // window.location.hash = "#home"
            }
        }).run();

        ko.applyBindings(viewModel);

    });
