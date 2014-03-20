define(["jquery", "knockout", "sammy", "admin/js/base-viewmodel",
		"text!admin/templates/nav.html",
        "text!admin/templates/home.html",
        "text!admin/templates/personnels.html",
        "text!admin/templates/personnel-create.html",
		"text!admin/templates/airbase.html",
		"text!admin/templates/airbase-create.html",
		"text!admin/templates/airbase-view.html"
        ],
    function ($, ko, Sammy, baseVM, navTpl, homeTpl, personnelsTpl, personnelCreateTpl, aerodromeTpl ,aerodromeCreateTpl,aerodromeViewTpl) {

       	$("body").append(navTpl).append(homeTpl).append(personnelsTpl).append(personnelCreateTpl).append(aerodromeTpl).append(aerodromeCreateTpl).append(aerodromeViewTpl);

        var viewModel = new baseVM();
		viewModel.initAdmin($.cookie("id"),function(){

        Sammy(function () {
            this.get('home', function () {
                viewModel.currentPage("Accueil");
            });
            this.get("personnel", function(){
                viewModel.currentPage("Personnel");
                viewModel.currentAction("view-all");
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
    });
