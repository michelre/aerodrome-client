define(["knockout", "app/services-ajax"], function (ko, services) {
    return{
        viewModel: function () {
            var self = this;

            //OBSERVABLES
			self.connected = ko.observable(false);
            self.currentPage = ko.observable("Accueil");
            self.activeTemplate = ko.observable("home-template");


            //SERVICES
			
			self.clickCreateAccount = function(){
				console.log("create account");	
			}


            //COMPUTED
			
			self.connectedTitle = ko.computed(function () {
                if(!self.connected()) return "Paydrome";
            });
			
            self.homeActiveClass = ko.computed(function () {
               return (self.currentPage() === "Accueil") ? "active" : "";
            });

            self.creditActiveClass = ko.computed(function () {
                return (self.currentPage() === "Credit") ? "active" : "";
            });

            self.paiementActiveClass = ko.computed(function () {
                return (self.currentPage() === "Paiement") ? "active" : "";
            });

            self.factureActiveClass = ko.computed(function () {
                return (self.currentPage() === "Facture") ? "active" : "";
            });

            self.plusActiveClass = ko.computed(function () {
                return (self.currentPage() === "Plus") ? "active" : "";
            });
			
			self.activeIcon = ko.computed(function(){
				if(self.currentPage() === "Accueil") return "fa fa-home";
				if(self.currentPage() === "Credit") return "fa fa-credit-card";
				if(self.currentPage() === "Paiement") return "fa fa-money";
				if(self.currentPage() === "Facture") return "fa fa-inbox";
				if(self.currentPage() === "Plus") return "fa fa-plus";
			});
        }
    }
});
