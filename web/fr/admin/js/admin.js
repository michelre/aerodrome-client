define(["jquery", "knockout", "sammy", "admin/js/base-viewmodel",
		"text!admin/templates/nav.html",
        "text!admin/templates/home.html",
        "text!admin/templates/personnel.html",
        "text!admin/templates/personnel-create.html",
		"text!admin/templates/airbase.html",
		"text!admin/templates/airbase-create.html",
		"text!admin/templates/airbase-view.html"
        ],
    function ($, ko, Sammy, baseVM, navTpl, homeTpl, personnelTpl, personnelCreateTpl, aerodromeTpl ,aerodromeCreateTpl,aerodromeViewTpl) {

       	$("body").append(navTpl).append(homeTpl).append(personnelTpl).append(personnelCreateTpl).append(aerodromeTpl).append(aerodromeCreateTpl).append(aerodromeViewTpl);

        var viewModel = new baseVM();


        Sammy(function () {
            this.get('home', function () {
                viewModel.currentPage("Accueil");
            });
            this.get("personnel", function(){
                viewModel.currentPage("Personnel");
            });
            this.get("personnel/create", function(){
                viewModel.currentPage("Personnel");
                viewModel.currentAction("create");
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
