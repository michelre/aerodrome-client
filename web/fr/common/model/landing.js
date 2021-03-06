define(["knockout", "common/model/airbase"], function (ko, airbase) {
    return function Landing(airbase, date, hour) {
        var self = this;

        self.airbase = ko.observable(airbase)
        self.date    = ko.observable(date);
        self.hour    = ko.observable(hour);

        self.dateFormat = ko.computed(function(){
            if(self.date() !== ""){
				var options = {weekday: "long", year: "numeric", month: "long", day: "numeric"};
                return new Date(self.date()).toLocaleDateString("fr-FR", options);
            }
        });

        self.allInputsFilled = ko.computed(function(){
            return self.airbase() && self.date() !== "" && self.hour() !== "";
        });

    }
});
