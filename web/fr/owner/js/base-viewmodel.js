define(["knockout", "owner/js/accueil-viewmodel" ,"owner/js/services-viewmodel" ,"owner/js/service-view-viewmodel"],
	function (ko, accueilVM, servicesVM, serviceViewVM) {
	return function baseVM() {
		var self = this;

		//OBSERVABLES
		self.currentPage = ko.observable();
		self.activeTemplate = ko.observable();
		self.currentVM = ko.observable();

		self.currentServiceId = null;
		self.currentAirbaseId = null;
		
		self.initAirbaseManager = function(id,callback){
			services.getAirbaseManager(id,function(data){
				self.currentPilot(new manager(data.pilotAccount_id,data.pilotAccount_firstName,data.pilotAccount_lastName, data.pilotAccount_phone,null,data.pilotAccount_mail,data.pilotAccount_basket))
				if(callback)
					callback();
				})
		}
	
		//COMPUTED
		self.homeActiveClass = ko.computed(function () {
		   return (self.currentPage() === "Accueil") ? "active" : "";
		});

		self.servicesActiveClass = ko.computed(function () {
			return (self.currentPage() === "Services") ? "active" : "";
		});

		self.serviceActiveClass = ko.computed(function () {
			return (self.currentPage() === "Service") ? "active" : "";
		});

		self.activeIcon = ko.computed(function(){
			if(self.currentPage() === "Accueil") return "fa fa-home";
			if(self.currentPage() === "Services") return "fa fa-fighter-jet";
			if(self.currentPage() === "Service") return "fa fa-fighter-jet";
		});

		self.setCurrentVM = ko.computed(function(){
			if(self.activeTemplate() === "home-owner-template")  self.currentVM(new accueilVM());
			if(self.activeTemplate() === "services-owner-template") self.currentVM(new servicesVM());
			if(self.activeTemplate() === "service-view-owner-template"){
				self.currentVM(new serviceViewVM(self.currentServiceId,self.currentAirbaseId));
			}
		});

		self.setActiveTemplate = ko.computed(function(){
			if(self.currentPage() === "Accueil") self.activeTemplate("home-owner-template");
			if(self.currentPage() === "Services") self.activeTemplate("services-owner-template");
			if(self.currentPage() === "Service") self.activeTemplate("service-view-owner-template");
		});
	}
});
