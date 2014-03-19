define(["knockout", "admin/js/plateforms-viewmodel", "admin/js/plateform-viewmodel", "admin/js/accueil-viewmodel", "admin/js/personnel-viewmodel", "common/js/services-ajax","common/js/mock/services-ajax","common/model/admin"],
    function (ko, plateformsVM, plateformVM, accueilVM, personnelVM, servicesAjax, servicesAjaxMock,admin) {
        return function baseVM() {
            var self = this;
            console.log(servicesAjax)
            var services = servicesAjaxMock;

            //OBSERVABLES
            self.currentPage = ko.observable();
            self.currentAction = ko.observable();
            self.activeTemplate = ko.observable();
            self.currentVM = ko.observable();
			self.currentAdmin = ko.observable();

            //NOT OBSERVABLES
            self.managers = undefined;
            self.airbaseToUpdate = undefined;


            //SERVICES
			self.initAdmin = function(id,callback){
				services.getAdminAccount(id,function(data){
					self.currentAdmin(new admin(data.superAdmin_id,data.superAdmin_firstName,data.superAdmin_lastName, data.superAdmin_phone,null,data.superAdmin_mail))
					if(callback)
						callback();
				})
			};
			
            self.getAirbase = function (id, callback) {
                services.getAirbase(id, function (data) {
                    self.airbaseToUpdate = data;
                    if(callback)
                        callback();
                });
            };

            self.initManagers = function(callback){
                services.getManagers(function (data) {
                    self.managers = data;
                    if(callback)
                        callback();
                });
            }

            //COMPUTED
            self.homeActiveClass = ko.computed(function () {
                return (self.currentPage() === "Accueil") ? "active" : "";
            });

            self.personnelActiveClass = ko.computed(function () {
                return (self.currentPage() === "Personnel") ? "active" : "";
            });

            self.airbaseActiveClass = ko.computed(function () {
                return (self.currentPage() === "Plateforme") ? "active" : "";
            });

            self.activeIcon = ko.computed(function(){
                if(self.currentPage() === "Accueil") return "fa fa-home";
                if(self.currentPage() === "Plateforme") return "fa fa-fighter-jet";
                if(self.currentPage() === "Personnel") return "fa fa-fighter-jet";
            });

            self.setCurrentVM = ko.computed(function(){
                if(self.activeTemplate() === "home-admin-template")  self.currentVM(new accueilVM(self));
                if(self.activeTemplate() === "airbase-admin-template") self.currentVM(new plateformsVM(self, self.managers));
                if(self.activeTemplate() === "airbase-create-admin-template") self.currentVM(new plateformsVM(self, self.managers));
                if(self.activeTemplate() === "airbase-view-admin-template") self.currentVM(new plateformVM(self, self.airbaseToUpdate, self.managers));
                if(self.activeTemplate() === "personnel-view-admin-template") self.currentVM(new personnelVM(self));
            });

            self.setActiveTemplate = ko.computed(function(){
                if(self.currentPage() === "Accueil") self.activeTemplate("home-admin-template");
                if(self.currentPage() === "Personnel") self.activeTemplate("personnel-admin-template");
                if(self.currentPage() === "Plateforme" && self.currentAction() === "view-all" && self.managers !== undefined) self.activeTemplate("airbase-admin-template");
                if(self.currentPage() === "Plateforme" && self.currentAction() === "create") self.activeTemplate("airbase-create-admin-template");
                if(self.currentPage() === "Plateforme" && self.currentAction() === "update-one" && self.airbaseToUpdate !== undefined) self.activeTemplate("airbase-view-admin-template");
            });

        }
    });
