define(["knockout","common/js/Mock/services-ajax","common/js/services-ajax","common/model/service"], function (ko,servicesMock,services,service) {
    return function serviceVM() {
        var self = this;

        //OBSERVABLES	
		self.service = ko.observable();
		self.currentService = ko.observable();


        //SERVICES	
		
		//COMPUTED	
		self.getService = ko.computed(function(){
			servicesMock.getService(self.currentService(),function(data){
				console.log(data);
				self.service(new service(data.service_id, data.service_name, data.service_type, data.service_price,data.service_desc,data.service_aircraftTypeCode,data.service_weightRangeServices));
			});	
		});
	}
});