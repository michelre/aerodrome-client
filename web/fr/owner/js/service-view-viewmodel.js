define(["knockout","common/js/Mock/services-ajax","common/js/services-ajax","common/model/service-forfait","common/model/service-tonnage","common/model/weight-range"], function (ko,servicesMock,services,serviceForfait,serviceTonnage,weightRange) {
    return function serviceVM() {
        var self = this;

        //OBSERVABLES	
		self.oldService = ko.observable();
		self.service = ko.observable();
		self.currentService = ko.observable();
		self.radioSelectedSerivceType = ko.observable();

        //SERVICES	
		self.clicCancelService = function(){
			window.location.hash="services";
		}
		
		self.clicUpdateService = function(){
			if(self.allUpdateServiceValidator()){
				/*var newAirbase={
					airbase_id:self.modifiedAirbase().id(),
					airbase_name:self.modifiedAirbase().name(),
					airbase_address:self.modifiedAirbase().address(),
					airbase_managerId:self.selectedManagerUpdate().id(),
				}
				console.log(newAirbase);
				services.updateAirbase(newAirbase);	*/
				console.log(self.service());
				console.log(self.service().weightRangeServices());
				alert("update");
			}else{
				alert("Veuillez compléter le formulaire en entier.");	
			}
		};
		self.addWeightRange = function(){
			self.service().weightRangeServices.push(new weightRange(0, 0, 0, 0, 0));
		};
		self.deleteWeightRange = function(weightRange){
			self.service().weightRangeServices.remove(weightRange);
		};
		//COMPUTED	
		self.displayCurrentService = ko.computed(function(){
			return 	"Edition du service #"+self.currentService();
		});
		
		self.getService = ko.computed(function(){
			servicesMock.getService(self.currentService(),function(data){
				if(data.service_type=="tonnage"){
					self.service(new serviceTonnage(data.service_id, data.service_name,data.service_desc,data.service_aircraftTypeCode,data.service_weightRangeServices));
					self.radioSelectedSerivceType("Tonnage");
				}else{
					self.service(new serviceForfait(data.service_id, data.service_name, data.service_price,data.service_desc,data.service_aircraftTypeCode));
					self.radioSelectedSerivceType("Forfait");
				}
				self.oldService(self.service());
			});	
			
		});
		
		self.allUpdateServiceValidator = ko.computed(function () {
			if(self.service().name().length > 0){
				return true;
			}else{
				return false;
			}		
		});
		
		self.changeServiceType = ko.computed(function () {
			if(self.radioSelectedSerivceType()=='Tonnage'){
				console.log('Tonnage');
			}else if(self.radioSelectedSerivceType() == 'Forfait'){
				console.log('Forfait');
			}		
		});
	}
});