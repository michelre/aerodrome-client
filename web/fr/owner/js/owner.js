define(["jquery", "knockout", "sammy", "owner/js/base-viewmodel",
		"text!owner/templates/nav.html",
        "text!owner/templates/home.html",
		"text!owner/templates/services.html"
        ],
    function ($, ko, Sammy, baseVM, navTpl, homeTpl,servicesTpl) {

       	$("body").append(navTpl).append(homeTpl).append(servicesTpl);
        var viewModel = new baseVM();

        Sammy(function () {
            this.get('home', function () {
                viewModel.currentPage("Accueil");
                //viewModel.activeTemplate("home-owner-template");
            });
			this.get('services', function () {
                viewModel.currentPage("Services");
                //viewModel.activeTemplate("services-owner-template");
            });
			
            this.notFound = function () {
              window.location.hash = "#home"
            }
        }).run();

        ko.applyBindings(viewModel);

    });
