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
		self.successForm = ko.observable();
		self.warningForm = ko.observable();
		self.errorForm = ko.observable();
		
		self.successFormCreate = ko.observable();
		self.warningFormCreate = ko.observable();
		self.errorFormCreate = ko.observable();
        //SERVICES	
		self.getService = function(){
			if(self.currentServiceId()!==null && self.currentServiceId()!=="new" && self.currentServiceId()!==undefined){
				servicesCurrent.getService(self.currentServiceId(),function(data){ //edit service
					//init all service types
					var weightRange=[];
					if(data.service_type==="tonnage"){
						weightRange = data.service_weightRangeService;
					}
					self.serviceTonnage(new serviceTonnage(data.service_id, data.service_name,data.service_desc,data.service_aircraftTypeCode,data.airbase_id,weightRange));
					self.serviceForfait(new serviceForfait(data.service_id, data.service_name, data.service_price,data.service_desc,data.service_aircraftTypeCode));
					if(data.service_type==="tonnage"){
						self.radioSelectedServiceType("Tonnage");
					}else if(data.service_type==="forfait"){
						self.radioSelectedServiceType("Forfait");
					}
				});	
			}else{ //new service
				self.serviceTonnage(new serviceTonnage(null, "","",null,self.currentAirbaseId(),[]));
				self.serviceForfait(new serviceForfait(null, "", 0,"",null,self.currentAirbaseId()));
				self.radioSelectedServiceType("Forfait");
			}
		};
		self.getService();
		self.clicCancelService = function(){
			window.location.hash="servicesbyairbase/"+self.currentAirbaseId();
		};
		
		self.clicUpdateService = function(){
			//escape []
			self.serviceAccordingType().name(self.serviceAccordingType().name().replace(/[[]/g, '(').replace(/[\]]/g, ')'));
			self.serviceAccordingType().desc(self.serviceAccordingType().desc().replace(/[[]/g, '(').replace(/[\]]/g, ')'));
						
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
							weightRangeService_id: self.serviceAccordingType().weightRangeServices()[i].id(),
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
				for (var i = 0; i < newService.service_weightRangeService.length; i++) {
					if(newService.service_weightRangeService[i].weightRangeService_id==="new"){
						delete newService.service_weightRangeService[i].weightRangeService_id;
					}
				}
				if(self.currentServiceId()==="new"){
					delete newService.service_id;
					servicesCurrent.createService(newService,self.redirectOnCreate,self.currentAirbaseId());				
				}else{
					servicesCurrent.updateService(newService,self.redirectOnUpdate,self.currentAirbaseId());
				}
			}else{
				self.showWarning();
			}
		};
		
		self.showWarning = function(){
				self.warningForm(true);
				self.errorForm(false);
				self.successForm(false);
		};
		
		self.redirectOnUpdate = function(data,status,id_airbase){
			if(status===200){
				self.warningForm(false);
				self.errorForm(false);
				self.successForm(true);
					setTimeout(function() {
						self.successForm(false);
						window.location.hash="servicesbyairbase/"+id_airbase;
					}, 2000);
			}else{
				self.warningForm(false);
				self.errorForm(true);
			}
		};
		
		self.redirectOnCreate = function(data,status,id_airbase){
			if(status===200){
				self.warningForm(false);
				self.warningFormCreate(false);
				self.errorFormCreate(false);
				self.successFormCreate(true);
					setTimeout(function() {
						self.successFormCreate(false);
						window.location.hash="servicesbyairbase/"+id_airbase;
					}, 2000);
			}else{
				self.warningFormCreate(false);
				self.errorFormCreate(true);
			}
		};
		
		self.addWeightRange = function(){
			self.serviceAccordingType().weightRangeServices.push(new weightRange(self.currentServiceId(),"new", 0, 0, 0, 0));
		};
		
		self.deleteWeightRange = function(weightRange){
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
			if(self.currentServiceId()==="new"){
				return "Création du nouveau service";
			}else{
				return "Edition du service #"+self.currentServiceId();
			}
		});	
		
		self.displaySuccess  = ko.computed(function(){
			return self.successForm() ? "show" : "hidden";
		});

		self.displayError  = ko.computed(function(){
			return self.errorForm() ? "show" : "hidden";
		});

		self.displayWarning  = ko.computed(function(){
			return self.warningForm() ? "show" : "hidden";
		});
		
		self.displaySuccessCreate  = ko.computed(function(){
			return self.successFormCreate() ? "show" : "hidden";
		});

		self.displayErrorCreate  = ko.computed(function(){
			return self.errorFormCreate() ? "show" : "hidden";
		});

		self.displayWarningCreate  = ko.computed(function(){
			return self.warningFormCreate() ? "show" : "hidden";
		});
	};
});