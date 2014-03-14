define(["knockout","common/js/Mock/services-ajax","common/js/services-ajax","common/model/service-forfait","common/model/service-tonnage"], function (ko,servicesMock,services,serviceForfait,serviceTonnage) {
    return function serviceVM() {
        var self = this;

        //OBSERVABLES	
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
					alert("update");
				}else{
					alert("Veuillez compléter le formulaire en entier.");	
				}
			}
		//COMPUTED	
		self.displayCurrentService = ko.computed(function(){
			return 	"Edition du service #"+self.currentService();
		});
		
		self.getService = ko.computed(function(){
			servicesMock.getService(self.currentService(),function(data){
				if(data.service_type=="tonnage"){
					self.service(new serviceTonnage(data.service_id, data.service_name, data.service_price,data.service_desc,data.service_aircraftTypeCode,data.service_weightRangeServices));
					self.radioSelectedSerivceType("Tonnage");
				}else{
					self.service(new serviceForfait(data.service_id, data.service_name, data.service_price,data.service_desc,data.service_aircraftTypeCode));
					self.radioSelectedSerivceType("Forfait");
				}
			});	
			
		});
		
		self.allUpdateServiceValidator = ko.computed(function () {
			if(false){
				return true;
			}else{
				return false;
			}		
		});
	}
});