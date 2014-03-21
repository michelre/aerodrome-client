define(["knockout", "common/model/manager", "common/js/utils", "common/js/services-ajax"], function (ko, manager, utils, services) {
    return function personnelVM(baseVM) {
        var self = this;
		var baseVM = baseVM;
		
		var noErrorIconClass = 'fa fa-check';
		var errorIconClass = 'fa fa-times';
		var emptyIconClass = '';

		var noErrorClass = 'has-success';
		var errorClass = 'has-error';
		var emptyClass = '';
		
        self.newManager = ko.observable(undefined);
        self.checkForm = ko.observable(false);
        self.creationOK = ko.observable(false);
		self.creationError = ko.observable(false);
		self.currentAdmin = ko.observable(baseVM.currentAdmin);

        //OBSERVABLES


        //NOT OBSERVABLES


        //SERVICES
        self.init = function(){
            self.newManager(new manager("", "", "", "", "", "", utils.generatePassword(2, 2, 2), ""));
        };
		
		self.init();
		
        self.clickCancel = function(){
            window.location.hash="#personnel";
        };

        self.clickAdd = function(){
            self.checkForm(true);
			var newManager = {
				airbaseManager_firstName : self.newManager().firstName(),
				airbaseManager_lastName : self.newManager().lastName(),
				airbaseManager_pass : self.newManager().pass(),
				airbaseManager_mail : self.newManager().mail(),
				airbaseManager_phone : self.newManager().phone(),
				airbaseManager_address : self.newManager().address()
			};
			
            if(!self.errorForm()){
                services.createManager(newManager,self.createStatus);
            }else{
				self.checkForm(true);
			}
        };

		self.createStatus = function(data,status){
			self.checkForm(false);
			self.creationError(false);
			self.creationOK(false);
			if(status===200){
				self.creationOK(true);
					setTimeout(function() {
						self.creationOK(false);
						window.location.hash="personnel";
					}, 2000);
			}else{
				self.creationError(true);
			}
		};
		
        //COMPUTED
		self.lastNameValidator = ko.computed(function () {
			var hasError = false;
			if(self.newManager().lastName().length===0) {
			  hasError = true;
			}
			if(!hasError) { 
				return noErrorClass; 
			}else{
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
		
		self.firstNameValidator = ko.computed(function () {
			var hasError = false;
			if(self.newManager().firstName().length===0) {
			  hasError = true;
			}
			if(!hasError) {
				return noErrorClass; 
			}else{
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
		
		self.addressValidator = ko.computed(function () {
			var hasError = false;
			if(self.newManager().address().length===0) {
			  hasError = true;
			}
			if(!hasError) {
				return noErrorClass; 
			}else{
				return errorClass; 
			}
		});
			
		self.addressValidatorIcon = ko.computed(function () {
			if(self.addressValidator()===noErrorClass) {
				return noErrorIconClass; 
			}else if(self.addressValidator()===emptyClass) {
				return emptyIconClass; 
			}else{
				return errorIconClass; 
			}
		});
		
		self.mailValidator = ko.computed(function () {
			var hasError = false;
			var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
			if(self.newManager().mail() === '' || !emailReg.test(self.newManager().mail())) {
			  hasError = true;
			}
			if(!hasError) {
				return noErrorClass; 
			}else{
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
		
		self.phoneValidator = ko.computed(function () {
		    var hasError = false;
			var phoneRegexInternational =new RegExp("^(\ +[1-9]{2-3}[0-9]{7,11})|([0-9]{10,15})$");
			if(self.newManager().phone().length===0 || !phoneRegexInternational.test(self.newManager().phone())) {
			  hasError = true;
			}

			if(!hasError) { 
				return noErrorClass; 
			}else{
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
		
		 self.passValidator = ko.computed(function () {
                var hasError = false;
				var motDePasseRegex = new RegExp("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}$");
				if(self.newManager().pass().length===0 || !motDePasseRegex.test(self.newManager().pass())) {
				  hasError = true;
				}
				if(!hasError) { 
					return noErrorClass; 
				}else{
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
		
		 self.errorForm = ko.computed(function(){
            if(self.newManager()){
                return (
						self.checkForm() && 
						(self.phoneValidator()===errorClass ||
					self.firstNameValidator()===errorClass ||
					self.lastNameValidator()===errorClass ||
					self.mailValidator()===errorClass ||
					self.passValidator()===errorClass ||
					self.phoneValidator()===errorClass)) ? true : false;
            }
        });
		
        self.creationOKClass = ko.computed(function(){
            return (self.creationOK()) ? "show" : "hidden";
        });
		
		self.creationErrorClass = ko.computed(function(){
            return (self.creationError()) ? "show" : "hidden";
        });

		self.errorFormClass = ko.computed(function(){
            return (self.errorForm()) ? "show" : "hidden";
        });

       
    };
});