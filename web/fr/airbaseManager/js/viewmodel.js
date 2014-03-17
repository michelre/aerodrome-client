define(["knockout", "common/js/services-ajax", "common/model/manager"], function (ko, services,manager) {
    return{
        viewModel: function () {
            var self = this;
			//validator classes
			var noErrorClasses = 'fa fa-check';
			var errorClasses = 'fa fa-times';
			
            //OBSERVABLES
//ToCheck			//Creation
			self.newAirbaseManagerAccount = new Manager(null, "","","","","","");
			self.createAccountFormValidatorError = ko.observable("");
//ToCheck			//login
			self.accountPass = ko.observable("");
			self.accountMail = ko.observable("");
			
            //SERVICES
			self.clickCreateAirbaseManagerAccount = function(){
				if(self.allValidator()){
					var newAirbaseManager={
						airbaseManager_mail:self.newAirbaseManagerAccount.mail(),
						airbaseManager_pass:self.newAirbaseManagerAccount.pass(),
						airbaseManager_lastName:self.newAirbaseManagerAccount.lastName(),
						airbaseManager_firstName:self.newAirbaseManagerAccount.firstName(),
						airbaseManager_phone:self.newAirbaseManagerAccount.phone(),
						airbaseManager_address:self.newAirbaseManagerAccount.address()
					};
					console.log(newAirbaseManager);
					services.createAirbaseManagerAccount(newAirbaseManager);	
				}else{
					alert("Veuillez compléter le formulaire en entier.\n Saisissez une adresse mail valide ainsi qu'un mot de passe de plus de 6 caractères.");	
				}
			}
			self.clickConnectAccount = function(){
				var account={
						airbaseManager_mail:self.accountMail(),
						airbaseManager_pass:self.accountPass()
				}
				console.log(account);
				services.connectAccount(account);
			}

            //COMPUTED
            self.mailValidator = ko.computed(function () {
                var hasError = false;
				var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
			 
				var emailaddressVal = $("#UserEmail").val();
				if(self.newAirbaseManagerAccount.mail() == '' || !emailReg.test(self.newAirbaseManagerAccount.mail())) {
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
				if(self.newAirbaseManagerAccount.pass().length <6 || (self.newAirbaseManagerAccount.passConfirmation()!=self.newAirbaseManagerAccount.pass())) {
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
				if(self.newAirbaseManagerAccount.firstName().length==0) {
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
				if(self.newAirbaseManagerAccount.lastName().length==0) {
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
			self.addressValidator = ko.computed(function () {
                var hasError = false;
				if(self.newAirbaseManagerAccount.address().length==0) {
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
				if(self.newAirbaseManagerAccount.phone().length==0) {
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
    }
});
