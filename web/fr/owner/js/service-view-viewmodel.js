define(["knockout","common/js/Mock/services-ajax","common/js/services-ajax","common/model/service-forfait","common/model/service-tonnage","common/model/weight-range"], function (ko,servicesMock,services,serviceForfait,serviceTonnage,weightRange) {
    return function serviceVM(idService) {
        var self = this;

        //OBSERVABLES
		self.serviceForfait = null;
		self.serviceTonnage = null;
		self.currentServiceId = ko.observable(idService);
		self.radioSelectedServiceType = ko.observable();
		
        //SERVICES	
		self.getService = function(){
			console.log("Load:"+self.currentServiceId());
			if(self.currentServiceId()!==null && self.currentServiceId()!=="new" && self.currentServiceId()!==undefined){
				servicesMock.getService(self.currentServiceId(),function(data){ //edit service
					//init all service types
					self.serviceTonnage = new serviceTonnage(data.service_id, data.service_name,data.service_desc,data.service_aircraftTypeCode,data.service_weightRangeServices);
					self.serviceForfait = new serviceForfait(data.service_id, data.service_name, data.service_price,data.service_desc,data.service_aircraftTypeCode);
					if(data.service_type==="tonnage"){
						self.radioSelectedServiceType("Tonnage");
					}else if(data.service_type==="forfait"){
						self.radioSelectedServiceType("Forfait");
					}
				});	
			}else{ //new service
				self.serviceTonnage = new serviceTonnage(null, "","",null,[]);
				self.serviceForfait = new serviceForfait(null, "", 0,"",null);
				self.radioSelectedServiceType("Forfait");
			}
		};
		self.getService();
		
		self.clicCancelService = function(){
			window.location.hash="services";
		};
		
		self.clicUpdateService = function(){
			if(self.allUpdateServiceValidator()){
				console.log(ko.toJSON(self.serviceAccordingType()));
			}else{
				alert("Veuillez compléter le formulaire en entier.");	
			}
		};
		
		self.addWeightRange = function(){
			self.serviceAccordingType().weightRangeServices.push(new weightRange(0, 0, 0, 0, 0));
		};
		
		self.deleteWeightRange = function(weightRange){
			self.serviceAccordingType().weightRangeServices.remove(weightRange);
		};
		
		//COMPUTED	
		self.serviceAccordingType = ko.computed(function () {
			if(self.radioSelectedServiceType()==='Tonnage'){
				return self.serviceTonnage;
			}else if(self.radioSelectedServiceType() === 'Forfait'){
				return self.serviceForfait;
			}
		});
		
		self.displayCurrentServiceId = ko.computed(function(){
			return 	"Edition du service #"+self.currentServiceId();
		});	
		
		self.allUpdateServiceValidator = ko.computed(function () {
			if(self.serviceAccordingType().name().length > 0){
				return true;
			}else{
				return false;
			}		
		});

	};
});