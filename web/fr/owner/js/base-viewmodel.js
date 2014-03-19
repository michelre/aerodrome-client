define(["knockout", "owner/js/accueil-viewmodel" ,"owner/js/services-viewmodel" ,"owner/js/service-view-viewmodel","common/js/services-ajax","common/js/mock/services-ajax","common/model/manager"],
	function (ko, accueilVM, servicesVM, serviceViewVM , servicesAjax, servicesAjaxMock, manager) {
	return function baseVM() {
		var self = this;
		var services = servicesAjax;

		//OBSERVABLES
		self.currentPage = ko.observable();
		self.activeTemplate = ko.observable();
		self.currentVM = ko.observable();
		self.currentAirebaseManager=ko.observable();

		self.currentServiceId = null;
		self.currentAirbaseId = null;
		
		self.initAirbaseManager = function(id,callback){
			services.getAirbaseManager(id,function(data){
			self.currentAirebaseManager(new manager(data.airbaseManager_id,data.airbaseManager_firstName,data.airbaseManager_lastName,data.airbaseManager_address, data.airbaseManager_phone,data.airbaseManager_mail,null))
				if(callback)
					callback();
			})
		}
		
		self.clickDisconnect = function(){
			console.log("disconnect");
			services.disconnectAccount(function(){
				window.location.replace("/fr/login");
			});
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
