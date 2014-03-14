define(["jquery", "knockout", "sammy", "app/aerodrome-viewmodel",
		"text!templates/login.html",
		"text!templates/pilot/nav.html",
        "text!templates/pilot/home.html",
        "text!templates/pilot/credit.html",
        "text!templates/pilot/payment.html",
        "text!templates/pilot/facture.html",
        "text!templates/pilot/plus.html",
		"text!templates/pilot/pilot-account-creation.html",
		"text!templates/secretary/nav.html",
        "text!templates/secretary/home.html",
		"text!templates/owner/nav.html",
        "text!templates/owner/home.html"
        ],
    function ($, ko, Sammy, aerodromeVM,loginTpl,navPilotTpl, homePilotTpl, creditPilotTpl, paymentPilotTpl, facturePilotTpl, plusPilotTpl,pilotAccountCreationTpl,navSecretaryTpl,homeSecretaryTpl,navOwnerTpl,homeOwnerTpl) {

        var document = $("body");
        document.append(homePilotTpl).append(creditPilotTpl).append(paymentPilotTpl).append(facturePilotTpl).append(plusPilotTpl).append(pilotAccountCreationTpl).append(loginTpl).append(navPilotTpl);
		document.append(homeSecretaryTpl).append(navSecretaryTpl);
		document.append(homeOwnerTpl).append(navOwnerTpl);
        var viewModel = new aerodromeVM.viewModel();

        Sammy(function () {
			this.get('login', function () {
                viewModel.currentPage("Paydrome");
                viewModel.activeTemplate("login-template");
            });
            this.get('pilot/accueil', function () {
                viewModel.currentPage("Accueil");
                viewModel.activeTemplate("home-pilot-template");
            });
            this.get('pilot/credit', function () {
                viewModel.currentPage("Credit");
                viewModel.activeTemplate("credit-pilot-template");
            });
            this.get('pilot/paiement', function () {
                viewModel.currentPage("Paiement");
                viewModel.activeTemplate("payment-pilot-template");
            });
            this.get('pilot/facture', function () {
                viewModel.currentPage("Facture");
                viewModel.activeTemplate("facture-pilot-template");
            });
            this.get('pilot/plus', function () {
                viewModel.currentPage("Plus");
                viewModel.activeTemplate("plus-pilot-template");
            });
			this.get('pilot/pilot-account-creation', function () {
                viewModel.currentPage("Nouveau compte pilote");
                viewModel.activeTemplate("pilot-account-creation-template");
            });
			
			this.get('secretary/accueil', function () {
                viewModel.currentPage("Accueil");
                viewModel.activeTemplate("home-secretary-template");
            });
			this.get('owner/accueil', function () {
                viewModel.currentPage("Accueil");
                viewModel.activeTemplate("home-owner-template");
            });
            this.notFound = function () {
                console.log("not found");
            }
        }).run();

        ko.applyBindings(viewModel);

    });
