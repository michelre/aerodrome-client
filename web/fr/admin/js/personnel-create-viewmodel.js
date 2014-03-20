define(["knockout", "common/model/manager", "common/js/utils", "common/js/mock/services-ajax"], function (ko, manager, utils, services) {
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
            if(!self.errorForm()){
                services.createManager(self.newManager().toJSON(), function(){
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