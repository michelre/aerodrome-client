define(["jquery", "knockout", "sammy", "pilot/js/base-viewmodel",
		"text!pilot/templates/nav.html",
        "text!pilot/templates/home.html",
        "text!pilot/templates/credit.html",
        "text!pilot/templates/payment.html",
        "text!pilot/templates/facture.html",
        "text!pilot/templates/plus.html",
        "text!pilot/templates/account.html",
        "text!pilot/templates/help.html",
		"jquery-cookie"
        ],
    function ($, ko, Sammy, baseVM, navTpl, homeTpl, creditTpl, paymentTpl, factureTpl, plusTpl,accountTpl, helpTpl) {

       	$("body").append(navTpl).append(homeTpl).append(creditTpl).append(paymentTpl).append(factureTpl).append(plusTpl).append(accountTpl).append(helpTpl);
        var viewModel = new baseVM();
		
		viewModel.initPilot($.cookie("id"),function(){
			Sammy(function () {
			this.get('home', function () {
                $.cookie("currentStep", "atterissage");
				viewModel.currentPage("Accueil");
			});
			this.get('solde', function () {
                $.cookie("currentStep", "atterissage");
				viewModel.currentPage("Solde");
			});
			this.get('payer', function () {
                $.cookie("currentStep", "atterissage");
				viewModel.currentPage("Payer");
			});
			this.get('archive', function () {
                $.cookie("currentStep", "atterissage");
				viewModel.currentPage("Archive");
			});
			this.get('plus', function () {
                $.cookie("currentStep", "atterissage");
				viewModel.currentPage("Plus");
			});
			this.get('account', function () {
                $.cookie("currentStep", "atterissage");
				viewModel.currentPage("Gestion du compte");
			});
            this.get('help', function () {
                $.cookie("currentStep", "atterissage");
                viewModel.currentPage("Aide");
            });
			this.notFound = function () {
                $.cookie("currentStep", "atterissage");
				viewModel.currentPage("Accueil");
				window.location.hash = "#home"
			}
		}).run();
		ko.applyBindings(viewModel);	
		});
    });
