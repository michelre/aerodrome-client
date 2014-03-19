define(["knockout" ,"common/js/services-ajax"], function (ko ,services) {
    return function creditVM(baseVM) {
        var self = this;
		var baseVM = baseVM;
		var flag_paymentType = 0;
		
        /******************
		 OBSERVABLES
		******************/

		self.pilotAccount = ko.observable(baseVM.currentPilot());
		self.montantCredit=ko.observable(0);
		
		

		self.paypal = ko.observable(false);
		self.checkPaypal = function() {
				   flag_paymentType = 1;
				   return true;
				}   
		
		self.creditCard = ko.observable(false);
		self.checkCreditCard = function() {
				   flag_paymentType = 2;
				   return true;
				}  
		

		/******************
		 NON-OBSERVABLES
		******************/
		
        //SERVICES
		self.crediterCompte = function(){
			if(self.allValidator())
			{
					alert(self.montantCredit);
					if (flag_paymentType == 1)
					{
						var url = "templates/credit_paypal.htm?pilotAccount_id=" + encodeURIComponent(self.pilotAccount().id()) + "&price=" + encodeURIComponent(self.montantCredit());
						//window.location.href = url;
					}
					else
					{
						window.location.replace("templates/credit_creditCard.html");
					}
				
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