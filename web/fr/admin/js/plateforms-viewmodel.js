define(["knockout", "common/js/services-ajax", "common/js/mock/services-ajax", "admin/binding/autocomplete-manager", "common/model/airbase" , "common/model/manager"], function (ko, services, servicesMock, autocompleteManager, airbase, manager) {
    return function (baseVM, managers) {
        var self = this;
        var servicesCurrent = services;
        self.baseVM = baseVM;

        //OBSERVABLES
        self.airbases = ko.observableArray([]);
        self.managers = ko.observableArray([]);

        //Création
        self.name = ko.observable("");
        self.address = ko.observable("");
        self.manager = ko.observable("");
        self.selectedManagerCreate = ko.observable(undefined);
        self.selectedManagerUpdate = ko.observable(undefined);
		self.currentAdmin = ko.observable(baseVM.currentAdmin);


		self.successForm = ko.observable();
		self.warningForm = ko.observable();
		self.errorForm = ko.observable();
        //NOT OBSERVABLES
        self.managerJSON = [];

        //SERVICE
        self.init = function(){
            self.getAirbases();
            self.initManagers();
        }

        self.initManagers = function(){
            for(var i = 0; i < managers.length; i++){
                self.managers.push(new manager(managers[i].airbaseManager_id, managers[i].airbaseManager_firstName, managers[i].airbaseManager_lastName, managers[i].airbaseManager_address, null, null, null));
                self.managerJSON.push({ "fullName": self.managers()[i].firstName() + " " + self.managers()[i].lastName() })
            }
        }

        self.getAirbases = function () {
            self.airbases.removeAll();
            servicesCurrent.getAirbases(function (data) {
                for (var i = 0; i < data.length; i++) {
                    self.airbases.push(new airbase(data[i].airbase_id, data[i].airbase_name, data[i].airbase_address, data[i].airbase_runwayNumber, data[i].airbase_airbaseManager));
                }
            });
        }

        self.findManagerByFullName = function (fullname) {
            for (var i = 0; i < self.managers().length; i++) {
                if (self.managers()[i].fullName() === fullname) {
                    return self.managers()[i];
                }
            }
            return undefined;
        }

        self.selectAirbase = function (item) {
            window.location.hash = "airbase/" + item.id();
        };

        self.clicAddAirbase = function () {
            window.location.hash = "airbase/create";
        }

        self.clicCancelAirbase = function () {
            window.location.hash = "airbase";
        }

        self.clicCreateAirbase = function () {
            if (self.allCreateAirbaseValidator()) {
                var newAirbase = {
                    airbase_name: self.name(),
                    airbase_address: self.address(),
                    airbaseManager_id: self.selectedManagerCreate().id(),
                }
                servicesCurrent.createAirbase(newAirbase,self.redirectOnCreate);

            } else {
                self.warningForm(true);
            }
        }
		
		self.redirectOnCreate = function(data,status){
			if(status===200){
				self.warningForm(false);
				self.errorForm(false);
				self.successForm(true);
					setTimeout(function() {
						self.successForm(false);
						window.location.hash="airbase";
					}, 2000);
			}else{
				self.warningForm(false);
				self.errorForm(true);
			}
		};

        self.findAirbaseById = function(id){
            for(var i = 0; i < self.airbases().length; i++){
                if(self.airbases()[i].id() === id){
                    return self.airbases()[i]
                }
            }
            return undefined;
        };

        self.deleteAirbase = function (data) {
            servicesCurrent.deleteAirbase(data.id(), function(){
                self.airbases.remove(self.findAirbaseById(data.id()));
            });
        };

        //COMPUTED
        self.allCreateAirbaseValidator = ko.computed(function () {
            if (self.name().length != 0 && self.address().length != 0 && self.manager().length != 0){
                return true;
            } else {
                return false;
            }

        });

        self.updateSelectedInput = ko.computed(function () {
            if (self.manager() !== "")
                self.selectedManagerCreate(self.findManagerByFullName(self.manager()));
            else
                self.selectedManagerCreate(undefined);
        });
		
		
		self.displaySuccess  = ko.computed(function(){
			return self.successForm() ? "show" : "hidden";
		});

		self.displayError  = ko.computed(function(){
			return self.errorForm() ? "show" : "hidden";
		});

		self.displayWarning  = ko.computed(function(){
			return self.warningForm() ? "show" : "hidden";
		});
        self.init();
    }
});
