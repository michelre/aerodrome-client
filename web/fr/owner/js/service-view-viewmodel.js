define(["knockout","common/js/Mock/services-ajax","common/js/services-ajax","typeahead","common/model/service-forfait","common/model/service-tonnage","common/model/weight-range"], function (ko,servicesMock,services,typeahead,serviceForfait,serviceTonnage,weightRange) {
    return function serviceVM(idService,idAirbase) {
        var self = this;
		var servicesCurrent = services;
		
        //OBSERVABLES
		self.serviceForfait = null;
		self.serviceTonnage = null;
		self.currentServiceId = ko.observable(idService);
		self.currentAirbaseId = ko.observable(idAirbase);
		self.radioSelectedServiceType = ko.observable();
		
        //SERVICES	
		self.getService = function(){
			console.log("Load:"+self.currentServiceId());
			if(self.currentServiceId()!==null && self.currentServiceId()!=="new" && self.currentServiceId()!==undefined){
				servicesCurrent.getService(self.currentServiceId(),function(data){ //edit service
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
			if(self.serviceAccordingType().weightRangeServices!==undefined){//tonnage
				if(self.serviceAccordingType().isValid()){
					var newService={
						service_id:self.serviceAccordingType().id(),
						service_name:self.serviceAccordingType().name(),
						service_desc:self.serviceAccordingType().desc(),
						service_price:0,
						airbase_id: self.currentAirbaseId(),
						service_weightRangeServices:[]
					};
					for (var i = 0; i < self.serviceAccordingType().weightRangeServices().length; i++) {
						service_weightRangeService={
							service_WeightRangeService_tonMin: self.serviceAccordingType().weightRangeServices()[i].tonMin,
							service_WeightRangeService_tonMax: self.serviceAccordingType().weightRangeServices()[i].tonMax,
							service_WeightRangeService_priceFixed: self.serviceAccordingType().weightRangeServices()[i].priceFixed,
							service_WeightRangeService_pricePerTon: self.serviceAccordingType().weightRangeServices()[i].pricePerTon
						};
						newService.service_weightRangeServices.push(service_weightRangeService);
					}		
				}else{
					alert("Veuillez compléter le formulaire en entier.");
				}
			}else{//forfait
				if(self.serviceAccordingType().isValid()){
					var newService={
						service_id:self.serviceAccordingType().id(),
						service_name:self.serviceAccordingType().name(),
						service_desc:self.serviceAccordingType().desc(),
						service_price:self.serviceAccordingType().price(),
						airbase_id: self.currentAirbaseId(),
						service_weightRangeServices:[]
					};
				}else{
					alert("Veuillez compléter le formulaire en entier.");
				}
			}
			console.log(ko.toJSON(newService));
			if(self.currentServiceId()==="new"){
				delete newService.service_id;
				if(servicesCurrent.createService(newService)){
					window.location.hash="services";
				};	
			}else{
				if(servicesCurrent.updateService(newService)){
					window.location.hash="services";
				};
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
		
		
		
		self.allTonServiceValidator = function () {
			var valid=true;
			for (var i = 0; i < self.serviceTonnage.weightRangeServices().length; i++) {
				typeof self.serviceTonnage.weightRangeServices()[i].tonMin()=== "number" ? valid=true  : valid=false;
				typeof self.serviceTonnage.weightRangeServices()[i].tonMax()=== "number" ? valid=true  : valid=false;
			}
			return valid;
		};

	};
});