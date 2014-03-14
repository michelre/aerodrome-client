define(["jquery", "knockout", "sammy", "secretary/js/viewmodel",
		"text!secretary/templates/nav.html",
        "text!secretary/templates/home.html"
        ],
    function ($, ko, Sammy, VM, navTpl, homeTpl) {

       	$("body").append(navTpl).append(homeTpl);
        var viewModel = new VM.viewModel();

        Sammy(function () {
            this.get('home', function () {
                viewModel.currentPage("Accueil");
                viewModel.activeTemplate("home-secretary-template");
            });
            this.notFound = function () {
                window.location.hash = "#home"
            }
        }).run();

        ko.applyBindings(viewModel);

    });
