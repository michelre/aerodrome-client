define(["knockout" ,"common/js/services-ajax"], function (ko ,services) {
    return function creditVM(baseVM) {
		$.ajaxSetup({ cache: false });
		
        var self = this;
		var baseVM = baseVM;
		var flag_paymentType = 0;
		var msg_higherThan0 = "Merci de Saisir un montant supérieur à 0";
		var msg_radioBoxChecked = "Merci de choisir l'un des 2 modes de paiement";
		
		
			
        /******************
		 OBSERVABLES
		******************/

		self.pilotAccount = ko.observable(baseVM.currentPilot());
		self.montantCredit=ko.observable();
		
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
		
		ko.bindingHandlers.numeric = {
			init: function (element, valueAccessor) {
				$(element).on("keydown", function (event) {
					// Allow: backspace, delete, tab, escape, and enter
					if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 ||
						// Allow: Ctrl+A
						(event.keyCode == 65 && event.ctrlKey === true) ||
						// Allow: . ,
						(event.keyCode == 188 || event.keyCode == 190 || event.keyCode == 110) ||
						// Allow: home, end, left, right
						(event.keyCode >= 35 && event.keyCode <= 39)) {
						// let it happen, don't do anything
						return;
					}
					else {
						// Ensure that it is a number and stop the keypress
						if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
							event.preventDefault();
						}
					}
				});
			}
		};

		/******************
		 NON-OBSERVABLES
		******************/
		
        //SERVICES
		self.crediterCompte = function(){
			if(self.allValidator())
			{		
				//Test value to make sure it doesn't equal 0
				if(self.montantCredit() == "0" || self.montantCredit() == "" || self.montantCredit() == null)
					alert(msg_higherThan0);
				//Confirm that the radio Box is Checked for the Payment Mode
				else if ($('input[type=radio]:checked').length == 0)
					alert(msg_radioBoxChecked);
				else
				{
					//Paypal Choice
					if (flag_paymentType == 1)
					{
						var url = "templates/credit_paypal.htm?pilotAccount_id=" + encodeURIComponent(self.pilotAccount().id()) + "&price=" + encodeURIComponent(self.montantCredit());
						window.location.href = url;
					}
					//Credit Card
					else
					{
						var url = "templates/credit_creditCard.htm?pilotAccount_id=" + encodeURIComponent(self.pilotAccount().id()) + "&price=" + encodeURIComponent(self.montantCredit());
						window.location.href = url;
					}
				}
				
			}else{
				alert("Les champs n'ont pas tous été saisis");
			};
		}
		 
		 self.allValidator = ko.computed(function(){
			 return true;
		 });
		 
    }
});