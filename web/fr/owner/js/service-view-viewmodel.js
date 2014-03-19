define(["knockout","common/js/Mock/services-ajax","common/js/services-ajax","typeahead","common/model/service-forfait","common/model/service-tonnage","common/model/weight-range"], function (ko,servicesMock,services,typeahead,serviceForfait,serviceTonnage,weightRange) {
    return function serviceVM(baseVM) {
        var self = this;
		var servicesCurrent = services;
		
        //OBSERVABLES
		self.currentAirbaseManager = ko.observable(baseVM.currentAirebaseManager());
		
		self.serviceForfait = ko.observable();
		self.serviceTonnage = ko.observable();
		self.currentServiceId = ko.observable(baseVM.currentServiceId);
		self.currentAirbaseId = ko.observable(baseVM.currentAirbaseId);
		self.radioSelectedServiceType = ko.observable();
		
        //SERVICES	
		self.getService = function(){
			console.log("Load:"+self.currentServiceId());
			if(self.currentServiceId()!==null && self.currentServiceId()!=="new" && self.currentServiceId()!==undefined){
				servicesCurrent.getService(self.currentServiceId(),function(data){ //edit service
					//init all service types
					var weightRange=[];
					if(data.service_type==="tonnage"){
						weightRange = data.service_weightRangeService;
					}
					self.serviceTonnage(new serviceTonnage(data.service_id, data.service_name,data.service_desc,data.service_aircraftTypeCode,weightRange));
					self.serviceForfait(new serviceForfait(data.service_id, data.service_name, data.service_price,data.service_desc,data.service_aircraftTypeCode));
					if(data.service_type==="tonnage"){
						self.radioSelectedServiceType("Tonnage");
					}else if(data.service_type==="forfait"){
						self.radioSelectedServiceType("Forfait");
					}
				});	
			}else{ //new service
				self.serviceTonnage(new serviceTonnage(null, "","",null,[]));
				self.serviceForfait(new serviceForfait(null, "", 0,"",null));
				self.radioSelectedServiceType("Forfait");
			}
		};
		self.getService();
		self.clicCancelService = function(){
			window.location.hash="services";
		};
		
		self.clicUpdateService = function(){
			var errorForm = false;
			if(self.serviceAccordingType().weightRangeServices!==undefined){//tonnage
				if(self.serviceAccordingType().isValid()){
					var newService={
						service_id:self.serviceAccordingType().id(),
						service_name:self.serviceAccordingType().name(),
						service_description:self.serviceAccordingType().desc(),
						service_price:0,
						service_type:"tonnage",
						airbase_id: self.currentAirbaseId(),
						service_weightRangeService :[]
					};
					for (var i = 0; i < self.serviceAccordingType().weightRangeServices().length; i++) {
						newService.service_weightRangeService.push({
							//service_id: self.serviceAccordingType().id(),
							//weightRangeService_id: self.serviceAccordingType().weightRangeServices()[i].id(),
							weightRangeService_tonMin: self.serviceAccordingType().weightRangeServices()[i].tonMin(),
							weightRangeService_tonMax: self.serviceAccordingType().weightRangeServices()[i].tonMax(),
							weightRangeService_priceFixed: self.serviceAccordingType().weightRangeServices()[i].priceFixed(),
							weightRangeService_pricePerTon: self.serviceAccordingType().weightRangeServices()[i].pricePerTon()
						});
					}
				}else{
					errorForm=true;
				}
			}else{//forfait
				if(self.serviceAccordingType().isValid()){
					var newService={
						service_id:self.serviceAccordingType().id(),
						service_name:self.serviceAccordingType().name(),
						service_description:self.serviceAccordingType().desc(),
						service_price:self.serviceAccordingType().price(),
						service_type:"forfait",
						airbase_id: self.currentAirbaseId(),
						service_weightRangeService:[]
					};
				}else{
					errorForm=true;
				}
			}
			if(!errorForm){
				console.log(ko.toJSON(newService));
				if(self.currentServiceId()==="new"){
					delete newService.service_id;
					if(newService.service_type==='tonnage'){
						servicesCurrent.createService(newService);
					}else{
						servicesCurrent.createService(newService);
					}
					//window.location.hash="services";					
				}else{	
					if(newService.service_type==='tonnage'){
						servicesCurrent.updateService(newService);
					}else{
						//self.deleteAllWeightRange(newService);
						servicesCurrent.updateService(newService);
					}			
					//window.location.hash="services";
				}
			}else{
				alert("Veuillez compléter le formulaire en entier.");
			}
		};
		/*self.deleteAllWeightRange = function(service){
			for(var i = 0; i < service.weightRangeServices().length; i++){
				if(service.weightRangeServices()[i].editionStatus()!=="create"){
					service.weightRangeServices()[i].editionStatus("delete");
				}else{
					self.serviceAccordingType().weightRangeServices.remove(service.weightRangeServices()[i]);
				}
			}
			self.updateCreateDeleteWeightRanger(newService,newService.service_id);
		};*/
		/*self.updateCreateDeleteWeightRanger = function(service,serviceId){
			for (var i = 0; i < service.weightRangeServices().length; i++) {
				service_weightRangeService={
					service_id: serviceId,
					weightRangeService_id: service.weightRangeServices()[i].id(),
					weightRangeService_tonMin: service.weightRangeServices()[i].tonMin(),
					weightRangeService_tonMax: service.weightRangeServices()[i].tonMax(),
					weightRangeService_priceFixed: service.weightRangeServices()[i].priceFixed(),
					weightRangeService_pricePerTon: service.weightRangeServices()[i].pricePerTon()
				};
				if(service.weightRangeServices()[i].editionStatus()==="create"){
					delete service_weightRangeService.weightRangeService_id;
					servicesCurrent.createWeightRangeService(service_weightRangeService);
				}else if(service.weightRangeServices()[i].editionStatus()==="delete"){
					servicesCurrent.deleteWeightRangeService(service_weightRangeService.weightRangeService_id);
				}else{
					var id= service_weightRangeService.weightRangeService_id;
					delete service_weightRangeService.weightRangeService_id;
					delete service_weightRangeService.service_id;
					servicesCurrent.updateWeightRangeService(id,service_weightRangeService);
				}
			}
		};*/
		
		self.addWeightRange = function(){
			self.serviceAccordingType().weightRangeServices.push(new weightRange("new", 0, 0, 0, 0));
		};
		
		self.deleteWeightRange = function(weightRange){
			/*if(weightRangeData.editionStatus()!=="create"){
				weightRangeData.editionStatus("delete");
			}else{
				self.serviceAccordingType().weightRangeServices.remove(weightRange);
			}*/
			self.serviceAccordingType().weightRangeServices.remove(weightRange);
		};
		
		//COMPUTED	
		self.serviceAccordingType = ko.computed(function () {
			if(self.radioSelectedServiceType()==='Tonnage'){
				return self.serviceTonnage();
			}else if(self.radioSelectedServiceType() === 'Forfait'){
				return self.serviceForfait();
			}
		});
		
		self.displayCurrentServiceId = ko.computed(function(){
			return 	"Edition du service #"+self.currentServiceId();
		});	
		
		/*self.allTonServiceValidator = function () {
			var valid=true;
			for (var i = 0; i < self.serviceTonnage.weightRangeServices().length; i++) {
				typeof self.serviceTonnage.weightRangeServices()[i].tonMin()=== "number" ? valid=true  : valid=false;
				typeof self.serviceTonnage.weightRangeServices()[i].tonMax()=== "number" ? valid=true  : valid=false;
			}
			return valid;
		};*/

	};
});