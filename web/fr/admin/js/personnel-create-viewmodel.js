define(["knockout", "common/model/manager", "common/js/utils", "common/js/services-ajax"], function (ko, manager, utils, services) {
    return function personnelVM(baseVM) {
        var self = this;
		var baseVM = baseVM;
		
        self.newManager = ko.observable(undefined);
        self.checkForm = ko.observable(false);
        self.creationOK = ko.observable(false);
		self.currentAdmin = ko.observable(baseVM.currentAdmin);

        //OBSERVABLES


        //NOT OBSERVABLES


        //SERVICES
        self.init = function(){
            self.newManager(new manager("", "", "", "", "", "", utils.generatePassword(2, 2, 2), ""));
        };

        self.clickCancel = function(){
            window.location.hash="#personnel"
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
			}
			
            if(!self.errorForm()){
                services.createManager(newManager, function(){
                    self.checkForm(false);
                    self.creationOK(true);
                })
            }
        };


        //COMPUTED
        self.creationOKClass = ko.computed(function(){
            return (self.creationOK()) ? "show" : "hidden"
        });

        self.errorForm = ko.computed(function(){
            if(self.newManager()){
                return (self.checkForm() && (self.newManager().firstName() === "" || self.newManager().lastName() === "" || self.newManager().pass() === ""
                    || self.newManager().address() === "")) ? true : false;
            }
        });

        self.errorFormClass = ko.computed(function(){
            return (self.errorForm()) ? "show" : "hidden"
        });


        self.init();

    }
});