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
		if(!$.cookie("id") || !$.cookie("role")){
			window.location.replace("/fr/login");
		}
       	$("body").append(navTpl).append(homeTpl).append(creditTpl).append(paymentTpl).append(factureTpl).append(plusTpl).append(accountTpl).append(helpTpl);
        var viewModel = new baseVM();
		
		viewModel.initPilot($.cookie("id"),function(){
			Sammy(function () {
			this.get('home', function () {
				$.removeCookie("currentStep",{ path: '/' });
               // $.cookie("currentStep", "atterissage", { expires: 7, path: '/' });
				viewModel.currentPage("Accueil");
			});
			this.get('solde', function () {
				$.removeCookie("currentStep",{ path: '/' });
               // $.cookie("currentStep", "atterissage", { expires: 7, path: '/' });
				viewModel.currentPage("Solde");
			});
			this.get('payer', function () {
				viewModel.currentPage("Payer");
			});
			this.get('archive', function () {
                $.removeCookie("currentStep",{ path: '/' });
				//$.cookie("currentStep", "atterissage", { expires: 7, path: '/' });
				viewModel.currentPage("Archive");
			});
			this.get('plus', function () {
				$.removeCookie("currentStep",{ path: '/' });
               // $.cookie("currentStep", "atterissage", { expires: 7, path: '/' });
				viewModel.currentPage("Plus");
			});
			this.get('account', function () {
				$.removeCookie("currentStep",{ path: '/' });
               // $.cookie("currentStep", "atterissage",  { expires: 7, path: '/' });
				viewModel.currentPage("Gestion du compte");
			});
            this.get('help', function () {
				$.removeCookie("currentStep",{ path: '/' });
                //$.cookie("currentStep", "atterissage",  { expires: 7, path: '/' });
                viewModel.currentPage("Aide");
            });
			this.notFound = function () {
				$.removeCookie("currentStep",{ path: '/' });
               // $.cookie("currentStep", "atterissage", { expires: 7, path: '/' });
				viewModel.currentPage("Accueil");
				window.location.hash = "#home"
			}
		}).run();
		ko.applyBindings(viewModel);	
		});
    });
