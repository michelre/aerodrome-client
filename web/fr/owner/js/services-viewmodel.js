define(["knockout","common/js/Mock/services-ajax","common/js/services-ajax","common/model/airbase"], function (ko,servicesMock,services,airbase) {
    return function servicesVM() {
        var self = this;

        //OBSERVABLES
		self.managerAirbases = ko.observableArray([]);
        chosenAirbase = ko.observable(); // Initially, only Germany is selected

        //NOT OBSERVABLES


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
        //COMPUTED

    }
});