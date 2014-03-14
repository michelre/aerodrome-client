define(["knockout", "owner/js/accueil-viewmodel" ,"owner/js/services-viewmodel"],
    function (ko, accueilVM, servicesVM) {
    return function baseVM() {
            var self = this;

            //OBSERVABLES
            self.currentPage = ko.observable();
            self.activeTemplate = ko.observable();
            self.currentVM = ko.observable();

            //COMPUTED
            self.homeActiveClass = ko.computed(function () {
               return (self.currentPage() === "Accueil") ? "active" : "";
            });

            self.servicesActiveClass = ko.computed(function () {
                return (self.currentPage() === "Services") ? "active" : "";
            });
			
			self.activeIcon = ko.computed(function(){
				if(self.currentPage() === "Accueil") return "fa fa-home";
				if(self.currentPage() === "Services") return "fa fa-fighter-jet";
			});

            self.setCurrentVM = ko.computed(function(){
                if(self.activeTemplate() === "home-owner-template")  self.currentVM(new accueilVM());
                if(self.activeTemplate() === "services-owner-template") self.currentVM(new servicesVM());
				
				
            });

            self.setActiveTemplate = ko.computed(function(){
                if(self.currentPage() === "Accueil") self.activeTemplate("home-owner-template");
                if(self.currentPage() === "Services") self.activeTemplate("services-owner-template");
            });
        }
});
