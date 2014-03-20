define(["knockout", "common/model/manager", "common/js/services-ajax"], function (ko, manager, services) {
    return function personnelVM(baseVM) {
        var self = this;
		var baseVM = baseVM;

        //OBSERVABLES
        self.managers = ko.observableArray([]);
        self.loadingManagers = ko.observable(false);
		self.currentAdmin = ko.observable(baseVM.currentAdmin);


        //NOT OBSERVABLES


        //SERVICES
        self.init = function(){
            self.initManagers(undefined)
        }

        self.initManagers = function(callback){
            self.loadingManagers(true);
            services.getManagers(function(data){
                for(var i = 0; i < data.length; i++){
                    self.managers.push(new manager(data[i].airbaseManager_id, data[i].airbaseManager_firstName,
                        data[i].airbaseManager_lastName, data[i].airbaseManager_address, data[i].airbaseManager_phone,
                        data[i].airbaseManager_mail, data[i].airbaseManager_pass));
                }
                self.loadingManagers(false);
            })
        }

        self.clickModifyManager = function(){
            console.log("modify manager")
        };

        self.clickDeleteManager = function(data){
            services.deleteManager(data.id(), function(){
                self.managers.remove(data);
            });
        }

        //COMPUTED

        self.init();


    }
});