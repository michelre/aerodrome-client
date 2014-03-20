define(["knockout", "common/js/services-ajax", "common/model/pilot"], function (ko, services,pilot) {
    return function () {
            var self = this;
			
			//validator classes
			
			var noErrorIconClass = 'fa fa-check';
			var errorIconClass = 'fa fa-times';
			var emptyIconClass = '';
		
			var noErrorClass = 'has-success';
			var errorClass = 'has-error';
			var emptyClass = '';
		
			self.warningFormConnexion = ko.observable();
			self.errorFormConnexion = ko.observable();
			self.successFormCreate = ko.observable();
			self.warningFormCreate = ko.observable();
			self.errorFormCreate = ko.observable();
			
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
					services.createPilotAccount(newPilot,function(data,status){
						console.log(status);
						if(status==200){
							self.warningFormCreate(false);
							self.errorFormCreate(false);
							self.successFormCreate(true);
								setTimeout(function() {
									self.successFormCreate(false);
								}, 2000);
						}else{
							console.log("error");
							self.warningFormCreate(false);
							self.errorFormCreate(true);

						}
				
					});	
				}else{
					self.errorFormCreate(false);
					self.warningFormCreate(true);
				}
			}
			self.clickConnectAccount = function(){
				var account={
						email:self.accountMail(),
						password:self.accountPass()
				}
				console.log(account);
				services.connectAccount(account,function(data,status,jqXHR){
					if(status==401 || status==500){
						self.errorFormConnexion(true);
					}else{
						if(data.role=="pilotAccount"){	
							window.location.replace("/fr/pilot");
						}else if(data.role=="airbaseManager"){	
							window.location.replace("/fr/owner");
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
					return noErrorClass; 
				}else{
					self.createAccountFormValidatorError(true);
					if(self.newAccount.mail() == ''){
						return emptyClass; 
					}
					return errorClass; 
					
				}
            });
			self.mailValidatorIcon = ko.computed(function () {
              
				if(self.mailValidator()===noErrorClass) {
					return noErrorIconClass; 
				}else if(self.mailValidator()===emptyClass) {
					return emptyIconClass; 
				}else{
					return errorIconClass; 
				}
            });
            self.passValidator = ko.computed(function () {
                var hasError = false;
				if(self.newAccount.pass().length <6 || (self.passConfirmation()!=self.newAccount.pass())) {
				  hasError = true;
				}
			 	
				if(!hasError) { 
				self.createAccountFormValidatorError(false);
					return noErrorClass; 
				}else{
					self.createAccountFormValidatorError(true);
					if(self.newAccount.pass() == '' || self.passConfirmation()=='' ){
						return emptyClass; 
					}
					return errorClass; 
				}
            });
			
			self.passValidatorIcon = ko.computed(function () {
              
				if(self.passValidator()===noErrorClass) {
					return noErrorIconClass; 
				}else if(self.passValidator()===emptyClass) {
					return emptyIconClass; 
				}else{
					return errorIconClass; 
				}
            });
			
			self.firstNameValidator = ko.computed(function () {
                var hasError = false;
				if(self.newAccount.firstName().length==0) {
				  hasError = true;
				}
			 	
				if(!hasError) { 
				self.createAccountFormValidatorError(false);
					return noErrorClass; 
				}else{
					self.createAccountFormValidatorError(true);
					if(self.newAccount.firstName() == ''){
						return emptyClass; 
					}
					return errorClass; 
				}
            });
			
			self.firstNameValidatorIcon = ko.computed(function () {
              
				if(self.firstNameValidator()===noErrorClass) {
					return noErrorIconClass; 
				}else if(self.firstNameValidator()===emptyClass) {
					return emptyIconClass; 
				}else{
					return errorIconClass; 
				}
            });
			
			self.lastNameValidator = ko.computed(function () {
                var hasError = false;
				if(self.newAccount.lastName().length==0) {
				  hasError = true;
				}
			 	
				if(!hasError) { 
				self.createAccountFormValidatorError(false);
					return noErrorClass; 
				}else{
					self.createAccountFormValidatorError(true);
					if(self.newAccount.lastName()=='' ){
						return emptyClass; 
					}
					return errorClass; 
				}
            });
			
			self.lastNameValidatorIcon = ko.computed(function () {
              
				if(self.lastNameValidator()===noErrorClass) {
					return noErrorIconClass; 
				}else if(self.lastNameValidator()===emptyClass) {
					return emptyIconClass; 
				}else{
					return errorIconClass; 
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
					return noErrorClass; 
				}else{
					self.createAccountFormValidatorError(true);
					if(self.newAccount.phone()=='' ){
						return emptyClass; 
					}
					return errorClass; 
				}
            });
			
			self.phoneValidatorIcon = ko.computed(function () {
              
				if(self.phoneValidator()===noErrorClass) {
					return noErrorIconClass; 
				}else if(self.phoneValidator()===emptyClass) {
					return emptyIconClass; 
				}else{
					return errorIconClass; 
				}
            });
			
			self.allValidator = ko.computed(function () {
				if(self.phoneValidator()==noErrorClass &&
					self.firstNameValidator()==noErrorClass &&
					self.lastNameValidator()==noErrorClass &&
					self.mailValidator()==noErrorClass &&
					self.passValidator()==noErrorClass &&
					self.phoneValidator()==noErrorClass){
						return true
					}else{
						return false;
					}
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
			
			self.displayErrorConnexion  = ko.computed(function(){
                return self.errorFormConnexion() ? "show" : "hidden";
         	});
			
			
 	  }
});
