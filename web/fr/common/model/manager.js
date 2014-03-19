define(["knockout"], function (ko) {
    return function Manager(id,firstName,lastName,address,phone,mail,pass) {
        var self = this;
		self.id = ko.observable(id);
        self.firstName = ko.observable(firstName);
        self.lastName = ko.observable(lastName);
		self.address = ko.observable(address);
        self.phone = ko.observable(phone);
		self.pass = ko.observable(pass);
		self.mail = ko.observable(mail);

        self.toJSON = function(){
            return {
                "firstName": self.firstName(),
                "lastName" : self.lastName(),
                "address"  : self.address(),
                "phone"    : self.phone(),
                "mail"    : self.mail(),
                "pass"     : self.pass()
            }
        };

        self.fullName = ko.computed({
            read: function(){
                if(self.firstName() && self.lastName())
                    return self.firstName() + " " + self.lastName();
            },
            write: function(value){
                self.firstName(value.split(" ")[0]);
                self.lastName(value.split(" ")[1]);
            }
        });

        self.phoneDisplay = ko.computed(function(){
            return (self.phone() !== "") ? self.phone() : "non renseigné";
        });

        self.mailDisplay = ko.computed(function(){
            return (self.mail() !== "") ? self.mail() : "non renseigné";
        });

    }
});
 