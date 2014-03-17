define(["knockout","common/js/mock/services-ajax","common/js/services-ajax","common/model/pilot"], function (ko,servicesMock,services,pilot) {
    return function accountVM(baseVM) {
        var self = this;

		var baseVM = baseVM;
     	//ACCOUNT SETTINGS
		//validator classes
		var noErrorClasses = 'fa fa-check';
		var errorClasses = 'fa fa-times';
		//OBSERVABLES
		//Modification
		self.pilotAccount = ko.observable(baseVM.currentPilot());
		

		self.createAccountFormValidatorError = ko.observable("");
		//Suppression
		self.idPilot =ko.observable()//SERVICES
		//Modif mot de passe
		self.oldMdp = ko.observable("");
		self.newMdp = ko.observable("");
		self.passConfirmation = ko.observable("");
		
		self.clickModifyAccount = function(){
			if(self.allValidator()){
				var modifiedPilot={
					pilotAccount_mail:self.pilotAccount().mail(),
					pilotAccount_lastName:self.pilotAccount().lastName(),
					pilotAccount_firstName:self.pilotAccount().firstName(),
					pilotAccount_phone:self.pilotAccount().phone()
				}
				services.modifyPilotAccount(self.pilotAccount().id(),modifiedPilot,baseVM.initPilot(baseVM.currentPilot().id()));		
			}else{
				alert("Veuillez compléter le formulaire en entier.\n Saisissez une adresse mail valide");	
			}
		}
		
		self.clickModifyMdpAccount = function(){
			if(self.passValidator()==noErrorClasses){
				var modifiedPilot={
					oldPassword:self.oldMdp(),
				    newPassWord:self.newMdp()
				}
				console.log(modifiedPilot);
				services.modifyPilotMdpAccount(self.pilotAccount().id(),modifiedPilot);		
			}else{
				alert("Veuillez compléter le formulaire en entier.\n Saisissez une adresse mail valide");	
			}
		}
		
		self.clickDeleteAccount = function(){
			var deletedPilote=self.idPilot();
			console.log(deletedPilote);
			services.deletePilotAccount(deletedPilote);
			alert("Votre compte a bien été supprimé.");
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
			
			if(self.oldMdp().length <6) {
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
		
		self.passValidatorWithConfirm = ko.computed(function () {
			var hasError = false;
			
			if(self.newMdp().length <6 || (self.passConfirmation()!=self.newMdp())) {
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
				self.phoneValidator()==noErrorClasses){
					return true
				}else{
					return false;
				}
		});
		
		console.log(baseVM);
		console.log(baseVM.currentPage());
		console.log(baseVM.currentPilot());
    }
});