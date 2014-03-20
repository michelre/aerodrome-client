define(["knockout","common/js/Mock/services-ajax","common/js/services-ajax","common/model/airbase","common/model/service-forfait","common/model/service-tonnage"], function (ko,servicesMock,services,airbase,serviceForfait,serviceTonnage) {
    return function servicesVM(baseVM) {
        var self = this;
		var servicesCurrent = services;
		
        //OBSERVABLES
		self.managerAirbases = ko.observableArray([]);
        self.chosenAirbase = ko.observable("");
		self.currentAirbaseManager = ko.observable(baseVM.currentAirebaseManager());

		//services
		self.airbaseServices = ko.observableArray([]);

		
        //SERVICES

		self.getManagerAirbases = function(){
			self.managerAirbases.removeAll();
			servicesCurrent.getAirbasesByManager(self.currentAirbaseManager().id(),function(data){
				for(var i = 0 ; i < data.length; i++){
					self.managerAirbases.push(new airbase(data[i].airbase_id, data[i].airbase_name, data[i].airbase_address, data[i].airbaseManager_firstname,self.currentAirbaseManager()));
				}
			});
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
		};
		
        //COMPUTED
		self.getServicesByAirbase = ko.computed(function(){
			self.airbaseServices.removeAll();
			if(self.chosenAirbase()!==null && self.chosenAirbase()!==""){
				servicesCurrent.getServicesByAirbase(self.chosenAirbase(),function(data){
					for(var i = 0; i < data.length; i++){
						if(data[i].service_type==="tonnage"){
							console.log(data[i].service_weightRangeService);
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