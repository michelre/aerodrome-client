define(["knockout"], function (ko) {
    return function Plane(immat, weight) {
        var self = this;

        self.immat = ko.observable(immat);
        self.weight = ko.observable(weight);

        //COMPUTED
        self.allInputsFilled = ko.computed(function(){
           return self.immat() !== "" && self.weight() !== "";
        });

        self.checkNegativeWeight = ko.computed(function(){
            (self.weight() <= 0 && self.weight()) ? self.weight(1) : self.weight();
        })

    }
});
