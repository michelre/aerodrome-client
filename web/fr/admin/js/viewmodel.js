define(["knockout", "common/js/services-ajax", "common/js/mock/services-ajax","admin/binding/autocomplete-manager","common/model/airbase" , "common/model/manager"], function (ko, services, serviceMock, autocompleteManager, airbase , manager) {
    return{
        viewModel: function () {
            var self = this;
            var servicesCurrent = services;
            //OBSERVABLES
            self.currentPage = ko.observable("Accueil");
            self.activeTemplate = ko.observable("home-admin-template");	
			self.airbases = ko.observableArray([]);
			self.modifiedAirbase = ko.observable();
			
			self.currentAirbase = ko.observable("");
			
			
			
			//Création
			self.name = ko.observable("");
			self.address = ko.observable("");
			self.manager = ko.observable("");
			self.selectedManagerCreate = ko.observable(undefined);
			self.selectedManagerUpdate = ko.observable(undefined);
			self.managers = ko.observableArray([]);
	
			//NOT OBSERVABLES
            self.managerJSON = [];
			
			
            //SERVICE
			
			//Manager autocomplete
			
			self.getManagers = function(callback){
                servicesCurrent.getManagers(function(data){
					console.log(data);
                    for(var i = 0; i < data.length; i++){
                       self.managers.push(new manager(data[i].airbaseManager_id,data[i].airbaseManager_firstName,data[i].airbaseManager_lastName,data[i].airbaseManager_address,null,null,null));
					   self.managerJSON.push({ "fullName" : self.managers()[i].firstName() + " " + self.managers()[i].lastName() })
                    }
                });
            }
			
			
			
			 self.findManagerByFullName = function(fullname){
				
                for(var i = 0; i < self.managers().length; i++){
					 
                    if(self.managers()[i].fullName() === fullname){
						console.log(self.managers()[i]);
                        return self.managers()[i];
					}
                }
                return undefined;
            }
			
			self.getManagers();
			
			
			//airbase
			
			
			self.getAirbases = function(){
				self.airbases.removeAll();
				servicesCurrent.getAirbases(function(data){
					for(var i = 0 ; i < data.length; i++){
						var airbaseManager = data[i].airbase_airbaseManager;
						var _manager = new manager(airbaseManager.airbaseManager_id, airbaseManager.airbaseManager_firstName, airbaseManager.airbaseManager_lastName,airbaseManager.airbaseManager_address,null,null,null);
						self.airbases.push(new airbase(data[i].airbase_id, data[i].airbase_name, data[i].airbase_address, data[i].airbase_runwayNumber, _manager));
					}
				});
			}
			
			self.getAirbase = function(id){
				servicesCurrent.getAirbase(id,function(data){
					console.log(data);
					var airbaseManager = data.airbase_airbaseManager;
						var _manager = new manager(airbaseManager.airbaseManager_id, airbaseManager.airbaseManager_firstName, airbaseManager.airbaseManager_lastName,airbaseManager.airbaseManager_address,null,null,null);
					self.modifiedAirbase(new airbase(data.airbase_id, data.airbase_name, data.airbase_address,data.airbase_runwayNumber, _manager));
					self.currentAirbase("Plateforme " +data.airbase_name);
				});
				
			}
			
			self.selectAirbase = function(item) {
				window.location.hash="airbase/"+item.id();
        	};
			
			self.clicAddAirbase = function(){
				 window.location.hash="airbase/create";
			}
			
			self.clicCancelAirbase = function(){
				 window.location.hash="airbase";
			}
			
			self.clicCreateAirbase = function(){
				if(self.allCreateAirbaseValidator()){
					var newAirbase={
						airbase_name:self.name(),
						airbase_address:self.address(),
						airbaseManager_id:self.selectedManagerCreate().id(),
					}
					console.log(newAirbase);
					if(servicesCurrent.createAirbase(newAirbase)){
							window.location.hash="airbase";
					};
	
				}else{
					alert("Veuillez compléter le formulaire en entier.");	
				}
			}
			
			self.deleteAirbase = function(data){
				servicesCurrent.deleteAirbase(data.id());	
			}
			
			self.clicUpdateAirbase = function(){
				if(self.allUpdateAirbaseValidator()){
					var newAirbase={
						airbase_id:self.modifiedAirbase().id(),
						airbase_name:self.modifiedAirbase().name(),
						airbase_address:self.modifiedAirbase().address(),
						airbaseManager_id:self.selectedManagerUpdate().id(),
					}
					console.log(newAirbase);
					if(servicesCurrent.updateAirbase(newAirbase)){
						 window.location.hash="airbase";
					};
						
				}else{
					alert("Veuillez compléter le formulaire en entier.");	
				}
			}

            //COMPUTED
			
            self.homeActiveClass = ko.computed(function () {
               return (self.currentPage() === "Accueil") ? "active" : "";
            });
			 self.airbaseActiveClass = ko.computed(function () {
               return (self.currentPage() === "Plateforme") ? "active" : "";
            });
			
			self.activeIcon = ko.computed(function(){
				if(self.currentPage() === "Accueil") return "fa fa-home";
				if(self.currentPage() === "Plateforme") return "fa fa-fighter-jet";
			});
			
			
			
			self.allCreateAirbaseValidator = ko.computed(function () {
				if( self.name().length!= 0 &&
					self.address().length!= 0 &&
					self.manager().length!= 0
				){
					return true;
				}else{
					return false;
				}
				
			});
			
			self.allUpdateAirbaseValidator = ko.computed(function () {
				if(self.modifiedAirbase() && self.modifiedAirbase().name().length!= 0 &&
					self.modifiedAirbase().address().length!= 0 &&
					self.modifiedAirbase().manager().length!= 0
				){
					return true;
				}else{
					return false;
				}
				
			});
			
			self.updateSelectedInput = ko.computed(function(){
                if(self.manager() !== "")
                    self.selectedManagerCreate(self.findManagerByFullName(self.manager()));
                else
                    self.selectedManagerCreate(undefined);
					
				if(self.selectedManagerCreate())
				console.log(self.selectedManagerCreate().id());
            });
			
			self.updateModifAirbaseSelectedInput = ko.computed(function(){
				if(self.modifiedAirbase()){
					console.log(self.modifiedAirbase().manager());
                if(self.modifiedAirbase().manager() !== ""){
					console.log("ok");
                    self.selectedManagerUpdate(self.findManagerByFullName(self.modifiedAirbase().manager().fullName()));
				}
                else
                    self.selectedManagerUpdate(undefined);
					
				if(self.selectedManagerUpdate())
					console.log(self.selectedManagerUpdate().id());
				}
            });
			
			
        }
    }
});
