define(["knockout"], function (ko) {
    return function WeightRange(tonMin, tonMax, priceFixed, pricePerTon) {
        var self = this;

        self.tonMin = ko.observable(tonMin);
        self.tonMax = ko.observable(tonMax);
        self.priceFixed = ko.observable(priceFixed);
        self.pricePerTon = ko.observable(pricePerTon);

    }
});
