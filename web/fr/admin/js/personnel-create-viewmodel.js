define(["knockout", "common/model/manager"], function (ko) {
    return function personnelVM() {
        var self = this;

        var newManager = ko.observable(undefined);

        //OBSERVABLES


        //NOT OBSERVABLES


        //SERVICES
        self.init = function(){
            console.log("init")
            //self.newManager
        };

        //COMPUTED


        self.init();

    }
});