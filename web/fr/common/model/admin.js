define(["knockout"], function (ko) {
    return function Admin(id,firstName,lastName,phone,pass,mail) {
        var self = this;
		self.id = ko.observable(id);
        self.firstName = ko.observable(firstName);
        self.lastName = ko.observable(lastName);
        self.phone = ko.observable(phone);
		self.pass = ko.observable(pass);
		self.mail = ko.observable(mail);
    }
});
