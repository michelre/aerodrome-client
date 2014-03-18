define(["knockout" ,"common/js/services-ajax"], function (ko ,services) {
    return function creditVM(baseVM) {
        var self = this;
		var baseVM = baseVM;
        //OBSERVABLES

		 self.pilotAccount = ko.observable(baseVM.currentPilot());
		
		 //self.credit=ko.observable();
		 self.montantCredit=ko.observable(0);

		self.callPaypalPage = {
			paypal: ko.observable(false),
			checkPaypal: function() {
				   alert("checked");
				   return true;
				}   
		};
		ko.applyBindings(callPaypalPage);
        //NOT OBSERVABLES


        //SERVICES
		self.crediterCompte = function(){
			if(self.allValidator()){
				var newCredit=
					{
						pilotAccount_id:self.pilotAccount().id(),
						price:self.montantCredit(),
					}
					console.log(newCredit);
				services.crediterCompte(newCredit , function(data){
					console.log(data);
				});
			}else{
				alert("Les champs n'ont pas tous été saisis");
			};
		}

        //COMPUTED
		 self.nouveauCredit=ko.computed(function(){
		 	var newCredit = parseInt(self.pilotAccount().credit()) + parseInt(self.montantCredit());
			if(isNaN(newCredit)){
				newCredit=parseInt(self.pilotAccount().credit());
			}
			return newCredit;
		 
		 });
		 
		 self.allValidator = ko.computed(function(){
			 return true;
		 });

    }
});