define(["knockout"], function (ko) {
    return function Pilot(id,firstName,lastName, phone,pass,passConfirmation,mail) {
        var self = this;
		self.id = ko.observable(id);
        self.firstName = ko.observable(firstName);
        self.lastName = ko.observable(lastName);
        self.phone = ko.observable(phone);
		self.pass = ko.observable(pass);
		self.passConfirmation = ko.observable(passConfirmation);
		self.mail = ko.observable(mail);
    }
});
