define(["knockout", "common/js/services-ajax"], function (ko, services) {
    return{
        viewModel: function () {
            var self = this;

            //OBSERVABLES
            self.currentPage = ko.observable("Accueil");
            self.activeTemplate = ko.observable("home-secretary-template");


            //SERVICES


            //COMPUTED
            self.homeActiveClass = ko.computed(function () {
               return (self.currentPage() === "Accueil") ? "active" : "";
            });

			
			self.activeIcon = ko.computed(function(){
				if(self.currentPage() === "Accueil") return "fa fa-home";
			});
        }
    }
});
