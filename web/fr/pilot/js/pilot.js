define(["jquery", "knockout", "sammy", "pilot/js/base-viewmodel",
		"text!pilot/templates/nav.html",
        "text!pilot/templates/home.html",
        "text!pilot/templates/credit.html",
        "text!pilot/templates/payment.html",
        "text!pilot/templates/facture.html",
        "text!pilot/templates/plus.html",
        "text!pilot/templates/account.html",
		"jquery-cookie"
        ],
    function ($, ko, Sammy, baseVM, navTpl, homeTpl, creditTpl, paymentTpl, factureTpl, plusTpl,accountTpl) {

       	$("body").append(navTpl).append(homeTpl).append(creditTpl).append(paymentTpl).append(factureTpl).append(plusTpl).append(accountTpl);
		console.log(document.cookie);
        var viewModel = new baseVM();
		
		viewModel.initPilot($.cookie("id"),function(){
			Sammy(function () {
			this.get('home', function () {
				viewModel.currentPage("Accueil");
			});
			this.get('credit', function () {
				viewModel.currentPage("Credit");
			});
			this.get('paiement', function () {
				viewModel.currentPage("Paiement");
			});
			this.get('facture', function () {
				viewModel.currentPage("Facture");
			});
			this.get('plus', function () {
				viewModel.currentPage("Plus");
			});
			this.get('account', function () {
				viewModel.currentPage("Compte");
			});
			this.notFound = function () {
				viewModel.currentPage("Accueil");
				window.location.hash = "#home"
			}
		}).run();
		ko.applyBindings(viewModel);	
		});
    });
