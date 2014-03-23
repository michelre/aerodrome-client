define(["knockout" ,"common/js/services-ajax"], function (ko ,services) {
    return function creditVM(baseVM) {
		$.ajaxSetup({ cache: false });
		
        var self = this;
		var baseVM = baseVM;
		
		
			
        /******************
		 OBSERVABLES
		******************/
		self.warningEmptyInput = ko.observable();
		self.warningSupNumber = ko.observable();
		self.warningModePaiement = ko.observable();


		self.pilotAccount = ko.observable(baseVM.currentPilot());
		self.montantCredit=ko.observable(0);
		self.paypal = ko.observable(false);
		self.creditCard = ko.observable(false);
		
		self.reglementCB = ko.observable(false); 
		self.reglementPaypal = ko.observable(false); 

		/******************
		 NON-OBSERVABLES
		******************/
		
		
		
        //SERVICES
		
		self.checkCreditCard = function() {
				   self.reglementCB(true);
				   self.reglementPaypal(false);
				   return true;
				}
				
		self.checkPaypal = function() {
				   self.reglementPaypal(true);
				   self.reglementCB(false);
				   return true;
				}   
		
		self.crediterCompte = function(){
			if(self.allValidator())
			{		
				//Test value to make sure it doesn't equal 0
				if(self.montantCredit() == "0" || self.montantCredit() == "" || self.montantCredit() == null){
				
					self.warningEmptyInput(false);
					self.warningSupNumber(true);
					self.warningModePaiement(false);
					
				//Confirm that the radio Box is Checked for the Payment Mode
				}else if (!self.reglementPaypal()&&!self.reglementCB()){
					self.warningEmptyInput(false);
					self.warningSupNumber(false);
					self.warningModePaiement(true);
				}else
				{
					//Paypal Choice
					if (self.reglementPaypal())
					{
						var url = "templates/credit_paypal.htm?pilotAccount_id=" + encodeURIComponent(self.pilotAccount().id()) + "&price=" + encodeURIComponent(self.montantCredit());
						window.location.href = url;
					}
					//Credit Card
					else if(self.reglementCB())
					{
						var url = "templates/credit_creditCard.htm?pilotAccount_id=" + encodeURIComponent(self.pilotAccount().id()) + "&price=" + encodeURIComponent(self.montantCredit());
						window.location.href = url;
					}
				}
				
			}else{
				self.warningEmptyInput(true);
				self.warningSupNumber(false);
				self.warningModePaiement(false);
			};
		}

        self.checkMontantCredit = ko.computed(function(){
            if(self.montantCredit() < 0) self.montantCredit(0);
            if(isNaN(self.montantCredit())) self.montantCredit(0);
            if(self.montantCredit() === "") self.montantCredit(0);

        });
		
		 self.modeReglementPaypalCss= ko.computed(function(){
			 return self.reglementPaypal() ? "active" : "";
		 });
		 
		  self.modeReglementCBCss= ko.computed(function(){
			 return self.reglementCB() ? "active" : "";
		 });
		 
		 self.allValidator = ko.computed(function(){
			 return true;
		 });

		self.displayWarningEmptyInput  = ko.computed(function(){
			return self.warningEmptyInput() ? "show" : "hidden";
		});
		
		self.displayWarningSupNumber  = ko.computed(function(){
			return self.warningSupNumber() ? "show" : "hidden";
		});
		
		self.displayWarningModePaiement  = ko.computed(function(){
			return self.warningModePaiement() ? "show" : "hidden";
		});
		
	
		 
    }
});