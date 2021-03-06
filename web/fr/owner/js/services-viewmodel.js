define(["knockout","common/js/Mock/services-ajax","common/js/services-ajax","common/model/airbase","common/model/service-forfait","common/model/service-tonnage"], function (ko,servicesMock,services,airbase,serviceForfait,serviceTonnage) {
    return function servicesVM(baseVM) {
        var self = this;
		var servicesCurrent = services;
		
        //OBSERVABLES
		
		self.managerAirbases = ko.observableArray([]);
        self.chosenAirbase = ko.observable(null);
		self.currentAirbaseManager = ko.observable(baseVM.currentAirebaseManager());

		//services
		self.airbaseServices = ko.observableArray([]);

		
        //SERVICES

		self.getManagerAirbases = function(){
			self.managerAirbases.removeAll();
			if(self.currentAirbaseManager().id()){
				servicesCurrent.getAirbasesByManager(self.currentAirbaseManager().id(),function(data){
					for(var i = 0 ; i < data.length; i++){
						self.managerAirbases.push(new airbase(data[i].airbase_id, data[i].airbase_name, data[i].airbase_address, data[i].airbaseManager_firstname,self.currentAirbaseManager()));
					}
					if(baseVM.currentAirbaseId===null || baseVM.currentAirbaseId===undefined){
						self.chosenAirbase(null);
					}else{
						self.chosenAirbase([eval(baseVM.currentAirbaseId)]);
					}
				});
			}   
		};
		
		self.getManagerAirbases();
		
		self.selectService = function(item) {
			window.location.hash="services/"+item.id()+"/"+self.chosenAirbase();
        };
		
		self.createService = function() {
			window.location.hash="services/new"+"/"+self.chosenAirbase();
        };
		
		self.deleteService = function(data){
			servicesCurrent.deleteService(data.id());	
			self.airbaseServices.remove(data);
		};
		
        //COMPUTED
		self.getServicesByAirbase = ko.computed(function(){
			self.airbaseServices.removeAll();
			if(self.chosenAirbase()!==undefined && self.chosenAirbase()!==null && eval(self.chosenAirbase())>0){
				servicesCurrent.getServicesByAirbase(self.chosenAirbase(),function(data){
					for(var i = 0; i < data.length; i++){
						if(data[i].service_type==="tonnage"){
							self.airbaseServices.push(new serviceTonnage(data[i].service_id, data[i].service_name,data[i].service_desc,data[i].service_aircraftTypeCode,data[i].service_weightRangeService));
						}else{
							self.airbaseServices.push(new serviceForfait(data[i].service_id, data[i].service_name, data[i].service_price,data[i].service_desc,data[i].service_aircraftTypeCode));
						}
					}
				});
			}
		});
    };
});