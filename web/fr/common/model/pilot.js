define(["knockout"], function (ko) {
    return function Pilot(id,firstName,lastName, phone,pass,mail,credit) {
        var self = this;
		self.id = ko.observable(id);
        self.firstName = ko.observable(firstName);
        self.lastName = ko.observable(lastName);
        self.phone = ko.observable(phone);
		self.pass = ko.observable(pass);
		self.mail = ko.observable(mail);
		self.credit = ko.observable(credit);

        self.creditEuros = ko.computed(function(){
            if(self.credit())
                return self.credit().toFixed(2)+"€";
        });
    }
});
