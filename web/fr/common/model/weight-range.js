define(["knockout"], function (ko) {
    return function WeightRange(id,tonMin, tonMax, priceFixed, pricePerTon) {
        var self = this;
		self.id = ko.observable(id);
        self.tonMin = ko.observable(tonMin);
        self.tonMax = ko.observable(tonMax);
        self.priceFixed = ko.observable(priceFixed);
        self.pricePerTon = ko.observable(pricePerTon);
    }
});
