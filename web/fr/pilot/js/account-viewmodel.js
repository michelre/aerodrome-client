define(["knockout","common/js/mock/services-ajax","common/js/services-ajax","common/model/pilot"], function (ko,servicesMock,services,pilot) {
    return function accountVM(baseVM) {
        var self = this;

		var baseVM = baseVM;
     	//ACCOUNT SETTINGS
		//validator classes
			var noErrorIconClass = 'fa fa-check';
			var errorIconClass = 'fa fa-times';
			var emptyIconClass = '';
		
			var noErrorClass = 'has-success';
			var errorClass = 'has-error';
			var emptyClass = '';
		//OBSERVABLES
		
		self.successFormUpdate = ko.observable();
		self.warningFormUpdate = ko.observable();
		self.successFormUpdateMdp = ko.observable();
		self.warningFormUpdateMdp = ko.observable();
		self.errorFormUpdateMdp = ko.observable();
		
		
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
				services.modifyPilotAccount(self.pilotAccount().id(),modifiedPilot,function(){
					self.warningFormUpdate(false);
					self.successFormUpdate(true);
					setTimeout(function() {
 						self.successFormUpdate(false);
					}, 2000);
				});		
			}else{
				
				self.warningFormUpdate(true);	
			}
		}
		
		self.clickModifyMdpAccount = function(){
			if(self.passValidator()==noErrorClass){
				var modifiedPilot={
					oldPassword:self.oldMdp(),
				    newPassword:self.newMdp()
				}
				console.log(modifiedPilot);
				services.modifyPilotMdpAccount(self.pilotAccount().id(),modifiedPilot,function(data,status){
					if (status==403 || status==400){
						self.warningFormUpdateMdp(false);
						self.errorFormUpdateMdp(true);
					}else if(status==200){
						self.errorFormUpdateMdp(false);
						self.warningFormUpdateMdp(false);
						self.successFormUpdateMdp(true);
						setTimeout(function() {
							self.successFormUpdateMdp(false);
						}, 2000);
					}
				});		
			}else{
				self.errorFormUpdateMdp(false);
				self.warningFormUpdateMdp(true);
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
				return noErrorClass; 
			}else{
				self.createAccountFormValidatorError(true);
				if(self.pilotAccount().mail() == ''){
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
			
			if(self.oldMdp().length <6) {
			  hasError = true;
			}
			
			if(!hasError) { 
			self.createAccountFormValidatorError(false);
				return noErrorClass; 
			}else{
				self.createAccountFormValidatorError(true);
				if(self.oldMdp() == ''){
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
		
		self.passValidatorWithConfirm = ko.computed(function () {
			var hasError = false;
			
			if(self.newMdp().length <6 || (self.passConfirmation()!=self.newMdp())) {
			  hasError = true;
			}
			
			if(!hasError) { 
			self.createAccountFormValidatorError(false);
				return noErrorClass; 
			}else{
				self.createAccountFormValidatorError(true);
				if(self.newMdp() == '' || self.passConfirmation()==''){
					return emptyClass; 
				}
				return errorClass; 
			}
			
		});
		
		self.passValidatorWithConfirmIcon = ko.computed(function () {
              
				if(self.passValidatorWithConfirm()===noErrorClass) {
					return noErrorIconClass; 
				}else if(self.passValidatorWithConfirm()===emptyClass) {
					return emptyIconClass; 
				}else{
					return errorIconClass; 
				}
        });
		
		
		
		self.firstNameValidator = ko.computed(function () {
			var hasError = false;
			if(self.pilotAccount().firstName().length==0) {
			  hasError = true;
			}
			
			if(!hasError) { 
			self.createAccountFormValidatorError(false);
				return noErrorClass; 
			}else{
				self.createAccountFormValidatorError(true);
				if(self.pilotAccount().firstName() == ''){
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
			if(self.pilotAccount().lastName().length==0) {
			  hasError = true;
			}
			
			if(!hasError) { 
			self.createAccountFormValidatorError(false);
				return noErrorClass; 
			}else{
				self.createAccountFormValidatorError(true);
				if(self.pilotAccount().lastName() == ''){
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
				if(self.pilotAccount().phone().length==0 || !phoneRegexInternational.test(self.pilotAccount().phone())) {
			  hasError = true;
			}
			
			if(!hasError) { 
				self.createAccountFormValidatorError(false);
				return noErrorClass; 
			}else{
				self.createAccountFormValidatorError(true);
				if(self.pilotAccount().phone() == ''){
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
				self.phoneValidator()==noErrorClass){
					return true
				}else{
					return false;
				}
		});
		
		
		
		
		
		 self.displaySuccessUpdate  = ko.computed(function(){
                return self.successFormUpdate() ? "show" : "hidden";
         });
		 
		 self.displayWarningUpdate  = ko.computed(function(){
                return self.warningFormUpdate() ? "show" : "hidden";
         });
		 
		 self.displaySuccessUpdateMdp  = ko.computed(function(){
                return self.successFormUpdateMdp() ? "show" : "hidden";
         });
		 
		  self.displayWarningUpdateMdp  = ko.computed(function(){
                return self.warningFormUpdateMdp() ? "show" : "hidden";
         });
		 
		 self. displayErrorUpdateMdp  = ko.computed(function(){
                return self.errorFormUpdateMdp() ? "show" : "hidden";
         });
		
    }
});