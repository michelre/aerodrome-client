define(["knockout", "common/js/services-ajax", "common/model/pilot"], function (ko, services,pilot) {
    return function () {
            var self = this;
			
			//validator classes
			var noErrorClasses = 'fa fa-check';
			var errorClasses = 'fa fa-times';
			
            //OBSERVABLES
			//Création
			self.newAccount = new pilot(null, "", "","","","");
			self.createAccountFormValidatorError = ko.observable("");
			//loggin
			self.accountPass = ko.observable("");
			self.accountMail = ko.observable("");
			self.passConfirmation = ko.observable("");
			
            //SERVICES
			self.clickCreateAccount = function(){
				if(self.allValidator()){
					var newPilot={
						pilotAccount_mail:self.newAccount.mail(),
						pilotAccount_pass:self.newAccount.pass(),
						pilotAccount_lastName:self.newAccount.lastName(),
						pilotAccount_firstName:self.newAccount.firstName(),
						pilotAccount_phone:self.newAccount.phone()
					};
					console.log(newPilot);
					services.createPilotAccount(newPilot);	
				}else{
					alert("Veuillez compléter le formulaire en entier.\n Saisissez une adresse mail valide ainsi qu'un mot de passe de plus de 6 caractères.");	
				}
			}
			self.clickConnectAccount = function(){
				var account={
						email:self.accountMail(),
						password:self.accountPass()
				}
				console.log(account);
				services.connectAccount(account,function(data,status,jqXHR){
					if(status==401){
						alert("Email ou mot de passe incorrect");
					}else{
						if(data.role=="pilotAccount"){	
							window.location.replace("/fr/pilot")
						}
					}
					
				});
			}

            //COMPUTED
            self.mailValidator = ko.computed(function () {
                var hasError = false;
				var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
			 
				var emailaddressVal = $("#UserEmail").val();
				if(self.newAccount.mail() == '' || !emailReg.test(self.newAccount.mail())) {
				  hasError = true;
				}
			 	
				if(!hasError) { 
				self.createAccountFormValidatorError(false);
					return noErrorClasses; 
				}else{
					self.createAccountFormValidatorError(true);
					return errorClasses; 
				}
            });
            self.passValidator = ko.computed(function () {
                var hasError = false;
				if(self.newAccount.pass().length <6 || (self.passConfirmation()!=self.newAccount.pass())) {
				  hasError = true;
				}
			 	
				if(!hasError) { 
				self.createAccountFormValidatorError(false);
					return noErrorClasses; 
				}else{
					self.createAccountFormValidatorError(true);
					return errorClasses; 
				}
            });
			self.firstNameValidator = ko.computed(function () {
                var hasError = false;
				if(self.newAccount.firstName().length==0) {
				  hasError = true;
				}
			 	
				if(!hasError) { 
				self.createAccountFormValidatorError(false);
					return noErrorClasses; 
				}else{
					self.createAccountFormValidatorError(true);
					return errorClasses; 
				}
            });
			self.lastNameValidator = ko.computed(function () {
                var hasError = false;
				if(self.newAccount.lastName().length==0) {
				  hasError = true;
				}
			 	
				if(!hasError) { 
				self.createAccountFormValidatorError(false);
					return noErrorClasses; 
				}else{
					self.createAccountFormValidatorError(true);
					return errorClasses; 
				}
            });
			self.phoneValidator = ko.computed(function () {
                var hasError = false;
				var phoneRegexInternational =new RegExp("^(\ +[1-9]{2-3}[0-9]{7,11})|([0-9]{10,15})$");
				if(self.newAccount.phone().length==0 || !phoneRegexInternational.test(self.newAccount.phone())) {
				  hasError = true;
				}
			 	
				if(!hasError) { 
					self.createAccountFormValidatorError(false);
					return noErrorClasses; 
				}else{
					self.createAccountFormValidatorError(true);
					return errorClasses; 
				}
            });
			self.allValidator = ko.computed(function () {
				if(self.phoneValidator()==noErrorClasses &&
					self.firstNameValidator()==noErrorClasses &&
					self.lastNameValidator()==noErrorClasses &&
					self.mailValidator()==noErrorClasses &&
					self.passValidator()==noErrorClasses &&
					self.phoneValidator()==noErrorClasses){
						return true
					}else{
						return false;
					}
			});
        }
});
