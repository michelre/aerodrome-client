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
				prefix: '../css/style',
				resetCSS: true,
				useOrientation: true,
				boxModel: 'border',
				breakpoints: {
					'max': { range: '*', containers: 1440, hasStyleSheet: false },
					'wide': { range: '-1920', containers: 1360 },
					'normal': { range: '-1680', containers: 1200 },
					'narrow': { range: '-1280', containers: 960 },
					'narrower': { range: '-1000', containers: '95%', lockViewport: true },
					'mobile': { range: '-640', containers: '95%', grid: { gutters: 20 }, lockViewport: true },
					'mobile-narrow': { range: '-480', containers: '95%', grid: { collapse: true, gutters: 10 }, lockViewport: true, hasStyleSheet: false }
				}
			},

	};

/*********************************************************************************/
/* jQuery Plugins                                                                */
/*********************************************************************************/

	// formerize | (c) n33.co | MIT
		$.fn.formerize=function(){var _fakes=new Array(),_form = jQuery(this);_form.find('input[type=text],textarea').each(function() { var e = jQuery(this); if (e.val() == '' || e.val() == e.attr('placeholder')) { e.addClass('formerize-placeholder'); e.val(e.attr('placeholder')); } }).blur(function() { var e = jQuery(this); if (e.attr('name').match(/_fakeformerizefield$/)) return; if (e.val() == '') { e.addClass('formerize-placeholder'); e.val(e.attr('placeholder')); } }).focus(function() { var e = jQuery(this); if (e.attr('name').match(/_fakeformerizefield$/)) return; if (e.val() == e.attr('placeholder')) { e.removeClass('formerize-placeholder'); e.val(''); } }); _form.find('input[type=password]').each(function() { var e = jQuery(this); var x = jQuery(jQuery('<div>').append(e.clone()).remove().html().replace(/type="password"/i, 'type="text"').replace(/type=password/i, 'type=text')); if (e.attr('id') != '') x.attr('id', e.attr('id') + '_fakeformerizefield'); if (e.attr('name') != '') x.attr('name', e.attr('name') + '_fakeformerizefield'); x.addClass('formerize-placeholder').val(x.attr('placeholder')).insertAfter(e); if (e.val() == '') e.hide(); else x.hide(); e.blur(function(event) { event.preventDefault(); var e = jQuery(this); var x = e.parent().find('input[name=' + e.attr('name') + '_fakeformerizefield]'); if (e.val() == '') { e.hide(); x.show(); } }); x.focus(function(event) { event.preventDefault(); var x = jQuery(this); var e = x.parent().find('input[name=' + x.attr('name').replace('_fakeformerizefield', '') + ']'); x.hide(); e.show().focus(); }); x.keypress(function(event) { event.preventDefault(); x.val(''); }); });  _form.submit(function() { jQuery(this).find('input[type=text],input[type=password],textarea').each(function(event) { var e = jQuery(this); if (e.attr('name').match(/_fakeformerizefield$/)) e.attr('name', ''); if (e.val() == e.attr('placeholder')) { e.removeClass('formerize-placeholder'); e.val(''); } }); }).bind("reset", function(event) { event.preventDefault(); jQuery(this).find('select').val(jQuery('option:first').val()); jQuery(this).find('input,textarea').each(function() { var e = jQuery(this); var x; e.removeClass('formerize-placeholder'); switch (this.type) { case 'submit': case 'reset': break; case 'password': e.val(e.attr('defaultValue')); x = e.parent().find('input[name=' + e.attr('name') + '_fakeformerizefield]'); if (e.val() == '') { e.hide(); x.show(); } else { e.show(); x.hide(); } break; case 'checkbox': case 'radio': e.attr('checked', e.attr('defaultValue')); break; case 'text': case 'textarea': e.val(e.attr('defaultValue')); if (e.val() == '') { e.addClass('formerize-placeholder'); e.val(e.attr('placeholder')); } break; default: e.val(e.attr('defaultValue')); break; } }); window.setTimeout(function() { for (x in _fakes) _fakes[x].trigger('formerize_sync'); }, 10); }); return _form; };

	// scrolly | (c) n33.co | MIT
		$.fn.scrolly=function(d,b){d||(d=1E3);b||(b=0);jQuery(this).off("click.scrolly").on("click.scrolly",function(f){var a=jQuery(this),c=a.attr("href"),e;"#"==c.charAt(0)&&(1<c.length&&0<(e=jQuery(c)).length)&&(c=e.offset().top,a.hasClass("scrolly-centered")?a=c-($(window).height()-e.outerHeight())/2:(a=Math.max(c,0),b&&(a="function"==typeof b?a-b():a-b)),f.preventDefault(),jQuery("body,html").stop().animate({scrollTop:a},d,"swing"))})};

/*********************************************************************************/
/* Initialize                                                                    */
/*********************************************************************************/

	// skel
		skel.init(_settings.skel);

	// jQuery
		$(function() {

			var $window = $(window),
				$body = $('body'),
				$header = $('#header'),
				$all = $body.add($header),
				sectionTransitionState = false;

			// Disable animations/transitions until everything's loaded
				$all
					.addClass('loading')
					.fadeTo(0, 0.0001);
				
				$window.load(function() {
					window.setTimeout(function() {
						$all
							.fadeTo(_settings.fadeInSpeed, 1, function() {
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
					skel.onStateChange(function() {

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
								}
								else
									sectionTransitionState = false;

							}
						
					});

				// Resize
					$window.resize(function() {

						// Disable animations/transitions
							$body.addClass('loading');

						window.setTimeout(function() {

							// Update scrolly links
								$('a[href^=#]').scrolly(1500, $header.outerHeight() - 1);

							// Resize fullscreen elements
								if (_settings.useFullScreen
								&&	!skel.isActive('mobile')) {
									$('.fullscreen').each(function() {
									
										var $t = $(this),
											$c = $t.children('.content'),
											x = Math.max(100, Math.round(($window.height() - $c.outerHeight() - $header.outerHeight()) / 2) + 1);

										$t
											.css('padding-top', x)
											.css('padding-bottom', x);
									
									});
								}
								else
									$('.fullscreen')
										.css('padding-top', '')
										.css('padding-bottom', '');
								
								
							// Re-enable animations/transitions
								window.setTimeout(function() {
									$body.removeClass('loading');
									$window.trigger('scroll');
								}, 1000);

						}, 100);
					
					});
					
			// Trigger events on load
				$window.load(function() {
					$window
						.trigger('resize')
						.trigger('scroll');
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
			$("#cancelTransaction").click(function()
			{
				history.go(-1); return false;
			});
			//--------------------------------------
			//Confirm the Payment Transaction
			$("#confirmTransaction").click(function()
			{
				var newCredit=
				{
					pilotAccount_id:queryString["pilotAccount_id"],
					price:queryString["price"]
					
				}
				creditBasket(newCredit);
			});
		});
		//--------------------------------------
		//Credit the Basket Function
		
		function creditBasket(dataCredit,callback)
		{
			var SaNPoint = "http://tarikgilani.eweb702.discountasp.net/ws/";
			//var SaNPoint = "http://localhost/ws/";
			$.ajax({
				url: SaNPoint+"pilot/"+dataCredit.pilotAccount_id+"/credit",
				dataType: "json",
				data: JSON.stringify(dataCredit),
				method:"PUT",
				success: function(){
					$( "#dialog_message" ).show();
					$( "#dialog_message" ).dialog({
					  modal: true,
					  width: 620,
					  buttons: {
							Ok: function() {
							  $( this ).dialog( "close" );
							  history.go(-1); return false;
							}
					  }
					});
				},
			}).done(function(data)
			{
				if(callback)
					callback(data)
			}).fail(function(jqXHR){
				console.log("Error crediterCompte:", jqXHR);
			});
		}