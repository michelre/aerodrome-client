define(["jquery", "knockout", "typeahead"], function ($, ko, typeahead) {
    ko.bindingHandlers.autocompleteManager = {
        init: function (element, valueAccessor, allBindings) {
            ko.unwrap(valueAccessor());			
			
            var data = new Bloodhound({
                datumTokenizer: function(d) { return Bloodhound.tokenizers.whitespace(d.fullName); },
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                local: valueAccessor()
            });

            data.initialize();

            $(element).typeahead({highlight: true}, {
                displayKey: "fullName",
                source: data.ttAdapter()
            });

            $(element).on("typeahead:selected", function(e, suggestion, dataset){
                allBindings().value(suggestion.fullName);
            })
        }
    };
});