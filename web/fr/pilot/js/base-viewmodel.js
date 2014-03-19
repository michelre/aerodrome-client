define(["knockout", "pilot/js/accueil-viewmodel" ,"pilot/js/credit-viewmodel", "pilot/js/payment-viewmodel", "pilot/js/facture-viewmodel", "pilot/js/plus-viewmodel","pilot/js/account-viewmodel","common/js/services-ajax","common/js/mock/services-ajax", "common/model/pilot"],
    function (ko, accueilVM, creditVM, paymentVM, factureVM, plusVM, accountVM,servicesAjax,servicesAjaxMock, pilot) {
    return function(){
            var self = this;
			var services = servicesAjaxMock;
			
            //OBSERVABLES
            self.currentPage = ko.observable();
            self.activeTemplate = ko.observable();
            self.currentVM = ko.observable();
			self.currentPilot = ko.observable(undefined);
			
			//SERVICE
			
			self.initPilot = function(id,callback){
				services.getPilotAccount(id,function(data){
					self.currentPilot(new pilot(data.pilotAccount_id,data.pilotAccount_firstName,data.pilotAccount_lastName, data.pilotAccount_phone,null,data.pilotAccount_mail,data.pilotAccount_basket))
					if(callback)
						callback();
				})
			}
			
			self.clickDisconnect = function(){
				services.disconnectAccount(function(){
					console.log(document.cookie);
					window.location.replace("/fr/login");
				});
			}
			
			

            //COMPUTED
            self.homeActiveClass = ko.computed(function () {
               return (self.currentPage() === "Accueil") ? "active" : "";
            });

            self.creditActiveClass = ko.computed(function () {
                return (self.currentPage() === "Solde") ? "active" : "";
            });

            self.paiementActiveClass = ko.computed(function () {
                return (self.currentPage() === "Payer") ? "active" : "";
            });

            self.factureActiveClass = ko.computed(function () {
                return (self.currentPage() === "Historique") ? "active" : "";
            });

            self.plusActiveClass = ko.computed(function () {
                return (self.currentPage() === "Plus") ? "active" : "";
            });
			
			self.activeIcon = ko.computed(function(){
				if(self.currentPage() === "Accueil") return "fa fa-home";
				if(self.currentPage() === "Solde") return "fa fa-credit-card";
				if(self.currentPage() === "Payer") return "fa fa-money";
				if(self.currentPage() === "Historique") return "fa fa-inbox";
				if(self.currentPage() === "Plus") return "fa fa-plus";
			});

            self.setCurrentVM = ko.computed(function(){
                if(self.activeTemplate() === "home-pilot-template")  self.currentVM(new accueilVM(self));
                if(self.activeTemplate() === "payment-pilot-template") self.currentVM(new paymentVM(self));
                if(self.activeTemplate() === "credit-pilot-template") self.currentVM(new creditVM(self));
                if(self.activeTemplate() === "facture-pilot-template") self.currentVM(new factureVM(self));
                if(self.activeTemplate() === "plus-pilot-template") self.currentVM(new plusVM(self));
                if(self.activeTemplate() === "account-pilot-template") self.currentVM(new accountVM(self));
            });

            self.setActiveTemplate = ko.computed(function(){
                if(self.currentPage() === "Accueil") self.activeTemplate("home-pilot-template");
                if(self.currentPage() === "Solde") self.activeTemplate("credit-pilot-template");
                if(self.currentPage() === "Payer") self.activeTemplate("payment-pilot-template");
                if(self.currentPage() === "Historique") self.activeTemplate("facture-pilot-template");
                if(self.currentPage() === "Plus") self.activeTemplate("plus-pilot-template");
				if(self.currentPage() === "Gestion du compte") self.activeTemplate("account-pilot-template");
            });

        }
});
