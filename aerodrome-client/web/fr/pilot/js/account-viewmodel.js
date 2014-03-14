define(["knockout","common/js/mock/services-ajax","common/js/services-ajax","common/model/pilot"], function (ko,servicesMock,services,pilot) {
    return function accountVM() {
        var self = this;

     	//ACCOUNT SETTINGS
		//validator classes
		var noErrorClasses = 'fa fa-check';
		var errorClasses = 'fa fa-times';
		//OBSERVABLES
		//Modification
		self.pilotAccount = ko.observable(new pilot("","","","","","",""));
		self.createAccountFormValidatorError = ko.observable("");
		//Suppression
		self.idPilot = ko.observable();
		//SERVICES
		
		self.getPilotAccount = function(){
			services.getPilotAccount(9,function(data){
				self.pilotAccount(new pilot(data.pilotAccount_id,data.pilotAccount_firstName,data.pilotAccount_lastName, data.pilotAccount_phone,data.pilotAccount_pass,data.pilotAccount_pass,data.pilotAccount_mail));
				self.idPilot(data.pilotAccount_id);
			});
		}
		self.getPilotAccount();
		
		self.clickModifyAccount = function(){
			if(self.allValidator()){
				var modifiedPilot={
					pilotAccount_mail:self.pilotAccount().mail(),
					pilotAccount_pass:self.pilotAccount().pass(),
					pilotAccount_lastName:self.pilotAccount().lastName(),
					pilotAccount_firstName:self.pilotAccount().firstName(),
					pilotAccount_phone:self.pilotAccount().phone()
				}
				console.log(modifiedPilot);
				services.modifyPilotAccount(self.idPilot(),modifiedPilot,self.getPilotAccount());	
				
			}else{
				alert("Veuillez compléter le formulaire en entier.\n Saisissez une adresse mail valide ainsi qu'un mot de passe de plus de 6 caractères.");	
			}
		}
		
		self.clickDeleteAccount = function(){
			var deletedPilote=self.idPilot();
			console.log(deletedPilote);
			services.deletePilotAccount(deletedPilote);
			alert("Votre compte a bien été supprimé.")
			//window.location="../login";
		}
		
		//COMPUTED
		 self.mailValidator = ko.computed(function () {
			var hasError = false;
			var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		 
			var emailaddressVal = $("#UserEmail").val();
			if(self.pilotAccount().mail() == '' || !emailReg.test(self.pilotAccount().mail())) {
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
			if(self.pilotAccount().pass().length <6 || (self.pilotAccount().passConfirmation()!=self.pilotAccount().pass())) {
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
			if(self.pilotAccount().firstName().length==0) {
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
			if(self.pilotAccount().lastName().length==0) {
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
			if(self.pilotAccount().phone().length==0) {
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