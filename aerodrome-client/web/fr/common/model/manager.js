define(["knockout"], function (ko) {
    return function Manager(id,firstName,lastName,address,phone,mail,pass,passConfirmation) {
        var self = this;
		self.id = ko.observable(id);
        self.firstName = ko.observable(firstName);
        self.lastName = ko.observable(lastName);
		self.address = ko.observable(address);
        self.phone = ko.observable(phone);
		self.pass = ko.observable(pass);
		self.passConfirmation = ko.observable(passConfirmation);
		self.mail = ko.observable(mail);
		
		self.fullName = ko.computed(function(){
			return self.firstName() + " " + self.lastName();
		});
    }
});
 