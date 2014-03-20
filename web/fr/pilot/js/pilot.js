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
				viewModel.currentPage("Accueil");
			});
			this.get('solde', function () {
				viewModel.currentPage("Solde");
			});
			this.get('payer', function () {
				viewModel.currentPage("Payer");
			});
			this.get('archive', function () {
				viewModel.currentPage("Archive");
			});
			this.get('plus', function () {
				viewModel.currentPage("Plus");
			});
			this.get('account', function () {
				viewModel.currentPage("Gestion du compte");
			});
            this.get('help', function () {
                    viewModel.currentPage("Aide");
                });
			this.notFound = function () {
				viewModel.currentPage("Accueil");
				window.location.hash = "#home"
			}
		}).run();
		ko.applyBindings(viewModel);	
		});
    });
