/*********************************************************************************/
/* Settings                                                                      */
/*********************************************************************************/
var _settings = {

    // Fullscreen
    useFullScreen: true,

    // Section Transitions
    useSectionTransitions: true,

    // Fade in speed (in ms)
    fadeInSpeed: 500,

    // skel
    skel: {
        prefix: '../css/credit_2',
        resetCSS: true,
        useOrientation: true,
        boxModel: 'border',
        breakpoints: {
            'max': {
                range: '*',
                containers: 1440,
                hasStyleSheet: false
            },
            'wide': {
                range: '-1920',
                containers: 1360
            },
            'normal': {
                range: '-1680',
                containers: 1200
            },
            'narrow': {
                range: '-1280',
                containers: 960
            },
            'narrower': {
                range: '-1000',
                containers: '95%',
                lockViewport: true
            },
            'mobile': {
                range: '-640',
                containers: '95%',
                grid: {
                    gutters: 20
                },
                lockViewport: true
            },
            'mobile-narrow': {
                range: '-480',
                containers: '95%',
                grid: {
                    collapse: true,
                    gutters: 10
                },
                lockViewport: true,
                hasStyleSheet: false
            }
        }
    },
};

/*********************************************************************************/
/* Initialize                                                                    */
/*********************************************************************************/

// skel
skel.init(_settings.skel);

// jQuery
$(function () {

	//Disable Cache
	$.ajaxSetup({ cache: false });
	
    var $window = $(window),
        $body = $('body'),
        $header = $('#header'),
        $all = $body.add($header),
        sectionTransitionState = false;

    // Disable animations/transitions until everything's loaded
    $all
        .addClass('loading')
        .fadeTo(0, 0.0001);

    $window.load(function () {
        window.setTimeout(function () {
            $all
                .fadeTo(_settings.fadeInSpeed, 1, function () {
                    $body.removeClass('loading');
                    $all.fadeTo(0, 1);
                });
        }, _settings.fadeInSpeed);
    });

    // Settings overrides

    // IE <= 9?
    if (skel.vars.IEVersion <= 9)
        _settings.useSectionTransitions = false;

    // Touch?
    if (skel.vars.isTouch) {

        // Disable section transitions
        _settings.useSectionTransitions = false;

        // Turn on touch mode
        $body.addClass('touch');
    }


    // Forms
    if (skel.vars.IEVersion < 10)
        $('form').formerize();


    // Events

    // State change (skel)
    skel.onStateChange(function () {

        // Force touch mode if we're in mobile
        if (skel.isActive('mobile'))
            $body.addClass('touch');
        else if (!skel.vars.isTouch)
            $body.removeClass('touch');

        // Section transitions
        if (_settings.useSectionTransitions) {

            if (!skel.isActive('mobile')) {

                if (!sectionTransitionState)
                    sectionTransitionState = true;
            } else
                sectionTransitionState = false;

        }

    });

    // Resize
    $window.resize(function () {

        // Disable animations/transitions
        $body.addClass('loading');

        window.setTimeout(function () {

            // Resize fullscreen elements
            if (_settings.useFullScreen && !skel.isActive('mobile')) {
                $('.fullscreen').each(function () {

                    var $t = $(this),
                        $c = $t.children('.content'),
                        x = Math.max(100, Math.round(($window.height() - $c.outerHeight() - $header.outerHeight()) / 2) + 1);

                    $t
                        .css('padding-top', x)
                        .css('padding-bottom', x);

                });
            } else
                $('.fullscreen')
                    .css('padding-top', '')
                    .css('padding-bottom', '');


            // Re-enable animations/transitions
            window.setTimeout(function () {
                $body.removeClass('loading');
                $window.trigger('scroll');
            }, 1000);

        }, 100);

    });

    // Trigger events on load
    $window.load(function () {
        $window
            .trigger('resize')
            .trigger('scroll');
    });

    $(window).resize(function () {
        fluidDialog();
    });
    // catch dialog if opened within a viewport smaller than the dialog width
    $(document).on("dialogopen", ".ui-dialog", function (event, ui) {
        fluidDialog();
    });

});

/*********************************************************************************/
/* Crediting Scripts                                                                    */
/*********************************************************************************/

var queryString = new Array();
$(function () {
    if (queryString.length == 0) {
        if (window.location.search.split('?').length > 1) {
            var params = window.location.search.split('?')[1].split('&');
            for (var i = 0; i < params.length; i++) {
                var key = params[i].split('=')[0];
                var value = decodeURIComponent(params[i].split('=')[1]);
                queryString[key] = value;
            }
        }
    }
    $(queryString["price"]).appendTo($("#montant").val());
    //--------------------------------------
    //Assign the price to the Input
    $('#montant').val(queryString["price"]);

    //--------------------------------------
    //Cancel the Payment Transaction
    $("#cancelTransaction").click(function () {
        history.go(-1);
        return false;
    });
    //--------------------------------------
    //Confirm the Payment Transaction
    $("#confirmTransaction").click(function () {
        var newCredit = {
            pilotAccount_id: queryString["pilotAccount_id"],
            price: queryString["price"]

        }
        creditBasket(newCredit);
    });
});
//--------------------------------------
//Credit the Basket Function

function creditBasket(dataCredit, callback) {
    var SaNPoint = "http://tarikgilani.eweb702.discountasp.net/ws/";
    //var SaNPoint = "http://localhost/ws/";
    $.ajax({
        url: SaNPoint + "pilot/" + dataCredit.pilotAccount_id + "/credit",
        dataType: "json",
        data: JSON.stringify(dataCredit),
        method: "PUT",
        success: function () {
            $("#dialog_message").show();
            $("#dialog_message").dialog({
                width: 'auto', // overcomes width:'auto' and maxWidth bug
                maxWidth: 600,
                height: 'auto',
                modal: true,
                fluid: true, //new option
                resizable: false,
                buttons: {
                    Ok: function () {
                        $(this).dialog("close");
						deleteCookie('paiement');
						window.location="/fr/pilot/#payer";
                        return false;
                    }
                }
            });
        },
    }).done(function (data) {
        if (callback)
            callback(data)
    }).fail(function (jqXHR) {
        console.log("Error crediterCompte:", jqXHR);
    });
}

function deleteCookie(cookiename)
    {
        var d = new Date();
        d.setDate(d.getDate() - 1);
        var expires = ";expires="+d;
        var name=cookiename;
        alert(name);
        var value="";
        document.cookie = name + "=" + value + expires + "; path=/acc/html";                    
    }
//--------------------------------------
//Fluid Dialog

function fluidDialog() {
    var $visible = $(".ui-dialog:visible");
    // each open dialog
    $visible.each(function () {
        var $this = $(this);
        var dialog = $this.find(".ui-dialog-content").data("ui-dialog");
        // if fluid option == true
        if (dialog.options.fluid) {
            var wWidth = $(window).width();
            // check window width against dialog width
            if (wWidth < (parseInt(dialog.options.maxWidth) + 50)) {
                // keep dialog from filling entire screen
                $this.css("max-width", "90%");
            } else {
                // fix maxWidth bug
                $this.css("max-width", dialog.options.maxWidth + "px");
            }
            //reposition dialog
            dialog.option("position", dialog.options.position);
        }
    });

}