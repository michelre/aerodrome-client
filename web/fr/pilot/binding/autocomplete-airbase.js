define(["jquery", "knockout", "typeahead"], function ($, ko, typeahead) {
    ko.bindingHandlers.autocompleteAirbase = {
        init: function (element, valueAccessor, allBindings) {
            ko.unwrap(valueAccessor());

            console.log(valueAccessor())

            var data = new Bloodhound({
                datumTokenizer: function(d) { return Bloodhound.tokenizers.whitespace( d.fullTextSearch ); },
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                local: valueAccessor()
            });

            data.initialize();

            $(element).typeahead({highlight: true}, {
                displayKey: "fullTextSearch",
                source: data.ttAdapter()
            });

            $(element).on("typeahead:selected", function(e, suggestion, dataset){
                allBindings().value(suggestion.fullTextSearch);
            })
        }
    };
});