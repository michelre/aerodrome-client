define(["knockout", "common/js/services-ajax", "common/js/mock/services-ajax", "admin/binding/autocomplete-manager", "common/model/airbase" , "common/model/manager"], function (ko, services, servicesMock, autocompleteManager, airbase, manager) {
    return function (baseVM, _airbase, managers) {
            var self = this;
            var servicesCurrent = services;
            self.baseVM = baseVM;

            //OBSERVABLES
            self.modifiedAirbase = ko.observable(undefined);
            self.managers = ko.observableArray([]);
            self.selectedManagerUpdate = ko.observable(undefined);
            self.manager = ko.observable("");
			self.currentAdmin = ko.observable(baseVM.currentAdmin);

            //NOT OBSERVABLES
            self.managerJSON = [];

            //SERVICES
            self.init = function(){
                self.modifiedAirbase(new airbase(_airbase.airbase_id, _airbase.airbase_name, _airbase.airbase_address, _airbase.airbase_runwayNumber, _airbase.airbase_airbaseManager));
                self.initManagers();
            }

            self.initManagers = function(){
                for (var i = 0; i < managers.length; i++) {
                    self.managers.push(new manager(managers[i].airbaseManager_id, managers[i].airbaseManager_firstName, managers[i].airbaseManager_lastName, managers[i].airbaseManager_address, null, null, null));
                    self.managerJSON.push({ "fullName": self.managers()[i].firstName() + " " + self.managers()[i].lastName() })
                }
            }

            self.findManagerByFullName = function (fullname) {
                for (var i = 0; i < self.managers().length; i++) {
                    if (self.managers()[i].fullName() === fullname) {
                        return self.managers()[i];
                    }
                }
                return undefined;
            }

            self.clicCancelAirbase = function () {
                window.location.hash = "airbase";
            }

            self.clicUpdateAirbase = function () {
                if (self.allUpdateAirbaseValidator()) {
                    var newAirbase = {
                        airbase_id: self.modifiedAirbase().id(),
                        airbase_name: self.modifiedAirbase().name(),
                        airbase_address: self.modifiedAirbase().address(),
                        airbaseManager_id: self.selectedManagerUpdate().id(),
                    }
                    servicesCurrent.updateAirbase(newAirbase.airbase_id, newAirbase, function(){
                        window.location.hash = "airbase"
                    })
                } else {
                    alert("Veuillez compléter le formulaire en entier.");
                }
            }

            self.allUpdateAirbaseValidator = ko.computed(function () {
                if (self.modifiedAirbase() && self.modifiedAirbase().name().length != 0 &&
                    self.modifiedAirbase().address().length != 0 &&
                    self.modifiedAirbase().manager().length != 0
                    ) {
                    return true;
                } else {
                    return false;
                }

            });

            self.updateModifAirbaseSelectedInput = ko.computed(function () {
                if (self.modifiedAirbase() && self.modifiedAirbase().manager())
                    self.selectedManagerUpdate(self.findManagerByFullName(self.modifiedAirbase().manager().fullName()));
                else
                    self.selectedManagerUpdate(undefined);
            });

        self.init();

        }
});
