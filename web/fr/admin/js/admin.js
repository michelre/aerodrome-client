define(["jquery", "knockout", "sammy", "admin/js/base-viewmodel",
		"text!admin/templates/nav.html",
        "text!admin/templates/home.html",
		"text!admin/templates/airbase.html",
		"text!admin/templates/airbase-create.html",
		"text!admin/templates/airbase-view.html"
        ],
    function ($, ko, Sammy, baseVM, navTpl, homeTpl, aerodromeTpl ,aerodromeCreateTpl,aerodromeViewTpl) {

       	$("body").append(navTpl).append(homeTpl).append(aerodromeTpl).append(aerodromeCreateTpl).append(aerodromeViewTpl);

        var viewModel = new baseVM();


        Sammy(function () {
            this.get('home', function () {
                viewModel.currentPage("Accueil");
            });
            this.get('airbase', function () {
                viewModel.initManagers(function(){
                    viewModel.currentPage("Plateforme");
                    viewModel.currentAction("view-all");
                })
            });
            this.get('airbase/create', function () {
                viewModel.initManagers(function(){
                    viewModel.currentPage("Plateforme");
                    viewModel.currentAction("create");
                })
            });

            this.get('airbase/:id', function () {
                viewModel.getAirbase(this.params['id'], function(){
                    viewModel.initManagers(function(){
                        viewModel.currentPage("Plateforme");
                        viewModel.currentAction("update-one");
                    })
                })
            });

            this.notFound = function () {
                viewModel.currentPage("Accueil");
                window.location.hash = "#home"
            }
        }).run();

        ko.applyBindings(viewModel);

    });
