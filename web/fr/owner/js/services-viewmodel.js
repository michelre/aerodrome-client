define(["knockout","common/js/Mock/services-ajax","common/js/services-ajax","common/model/airbase","common/model/service"], function (ko,servicesMock,services,airbase,service) {
    return function servicesVM() {
        var self = this;

        //OBSERVABLES
		self.managerAirbases = ko.observableArray([]);
        self.chosenAirbase = ko.observable("");


		//services
		self.airbaseServices = ko.observableArray([]);

		
        //SERVICES

		self.getManagerAirbases = function(){
			self.managerAirbases.removeAll();
			servicesMock.getAirbases(function(data){
				for(var i = 0 ; i < data.length; i++){
					self.managerAirbases.push(new airbase(data[i].airbase_id, data[i].airbase_name, data[i].airbase_address, data[i].airbaseManager_firstname));
				}
				console.log(self.managerAirbases()[0].id());
			});
		}
		
		self.getManagerAirbases();
		
		self.selectService = function(item) {
			window.location.hash="services/"+item.id();
        };
		
		self.deleteService = function(data){
			services.deleteService(data.id());	
		}
		
        //COMPUTED
		self.getServicesByAirbase = ko.computed(function(){
			self.airbaseServices.removeAll();
			if(self.chosenAirbase()!=null && self.chosenAirbase()!=""){
				servicesMock.getServicesByAirbase(self.chosenAirbase(),function(data){
					for(var i = 0; i < data.length; i++){
						self.airbaseServices.push(new service(data[i].service_id, data[i].service_name, data[i].service_type, data[i].service_price,data[i].service_desc,data[i].service_aircraftTypeCode,data[i].service_weightRangeServices));
					}
				});
			}
		});
    }
});