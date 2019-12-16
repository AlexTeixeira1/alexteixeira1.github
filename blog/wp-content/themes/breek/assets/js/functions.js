
(function($){
    "use strict";

    /* All Images Loaded */

	$(window).load(function(){ 

        var rtl = false;
        if( $('body').hasClass('rtl') ){
            rtl = true;
        }

        // Sticky elements

		if($(document).width() > 1200){

            if( $('#header').hasClass('enable-sticky') ){
                var header_height = $('#header div.menu-wrapper').outerHeight();
                $('#header').height( header_height );
                $(window).scroll(function(){
                    if ($(window).scrollTop() >= 300) {
                        $('#header').addClass('is-sticky');                        
                    }
                    else {
                        $('#header').removeClass('is-sticky');
                    }
                });
            }
        }
        
        $(window).resize(function() {
            var document_width = $(document).width();
            var header_height = $('#header div.menu-wrapper').outerHeight();
            $('#header').height( header_height );
            if( document_width < 1200 ){
                $('#header').removeClass('enable-sticky is-sticky');
            }
        });
        
		if($(document).width() > 767){
			$('div.epcl-share-container').stickySidebar({
				topSpacing: 80,
				bottomSpacing: 80
            });
            var $grid = $('.enable-masonry .grid-posts div.articles:not(.classic)').masonry({
                itemSelector: 'article',
                gutter: 0,
                horizontalOrder: true,
                isOriginLeft: !rtl,
            });
        }     
        
        if( $(document).width() > 1200 ){
            if( $('#sidebar').hasClass('sticky-enabled') && ( $('#sidebar').outerHeight() < $('div.left-content').outerHeight() ) ){
                $('#sidebar.sticky-enabled').theiaStickySidebar({
                    additionalMarginTop: 30,
                    additionalMarginBottom: 30
                });
            }
        }

        AOS.init({
            offset: 220,
            duration: 700,
            disable: window.innerWidth < 1024,
            easing: 'ease',
            once: true
        });

    });
    
    /* Dom Loaded */

	$(document).ready(function($){ 

        var rtl = false;
        if( $('body').hasClass('rtl') ){
            rtl = true;
        }

        // Safari mobile fix
        $('#header nav ul.menu li.menu-item-has-children').attr('onClick', '');

        // Last submenu fix
        $('#header nav ul.menu > li.menu-item-has-children:last').addClass('last-menu-item');

        // Enable HTML5 form validation
        $('#commentform').removeAttr('novalidate');

        // Submenu on Mobile

        if( $(document).width() < 768){
			$('#header li.menu-item-has-children > a').on('click', function(e){
                $(this).parent().toggleClass('menu-open');
                e.preventDefault();
            });
		}

        // Lazy load images and iframes

		$(".lazy, img[data-src], iframe[data-src]").Lazy({
            placeholder: "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",
            enableThrottle: true,
            throttle: 500,
			afterLoad: function(element){
				element.addClass('loaded');
			}
        });

        // Lazy load for Adsense
        
        if( $('body').hasClass('enable-lazy-adsense') ){
            $('ins[data-ad-slot]').adsenseLoader();
        }
        

		// Counter animation

		$('.count').each(function () {
			$(this).prop('Counter',0).animate({
				Counter: $(this).data('total')
			}, {
				duration: 1500,
				easing: 'swing',
				step: function (now) {
					$(this).text(Math.ceil(now));
				}
			});
        });

        // Ajax Download

        $('div.epcl-download a').on('click', function(){
			var elem = $(this);
			var post_id = elem.data('post-id');
			$.ajax({
				type: 'post',
				url: ajax_var.url,
				data: { action: 'epcl_download', nonce: ajax_var.nonce, post_id: post_id },
				success: function(count){

				}
			});
        })

        // Custom Select and filters

        $('select.custom-select, aside select, #footer select, .wp-block-archives-dropdown select').niceSelect();

		$('#header div.menu-mobile').on('click', function(){
			$('#header').toggleClass('menu-open');
		});

		$('.filters select').change(function(){
			var url = $(this).val();
			if(url)
				document.location = url;
        });

        // Back to top button

		$('#back-to-top').on('click', function(event) {
			event.preventDefault();
			$('html, body').animate({scrollTop: 0}, 500);
			return false;
        });

        // Single Post copy button

        $(".permalink .copy").on('click', function(){
            $("#copy-link").select();
            document.execCommand('copy');
        });

		// Gallery Post Format

        $('.post-format-gallery .slick-slider').each(function(){
            var rtl = false;
            if( parseInt( $(this).data('rtl') ) > 0 ){
                rtl = true;
            }
            $(this).slick({
                cssEase: 'ease',
                fade: true,
                arrows: true,
                infinite: true,
                dots: false,
                autoplay: false,
                speed: 600,
                slidesToShow: 1,
                slidesToScroll: 1,
                rtl: rtl,
            });
        });


        // Module: carousel

		$('.epcl-carousel').each(function(index, el) {
            var slides_to_show = parseInt( $(this).data('show') );
            var rtl = false;
            if( parseInt( $(this).data('rtl') ) > 0 ){
                rtl = true;
            }
			$(this).slick({
				cssEase: 'ease',
				fade: false,
				arrows: true,
				infinite: true,
				dots: false,
				autoplay: false,
                speed: 600,
                rtl: rtl,
				slidesToShow: slides_to_show,
				slidesToScroll: slides_to_show,
                responsive: [,
                    {
                        breakpoint: 1700,
                        settings: {
                            slidesToShow: 4,
                            slidesToScroll: 4
                        }
                    },
                    {
                        breakpoint: 1200,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3
                        }
                    },
                    {
                        breakpoint: 980,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2
                        }
                    },
                    {
                        breakpoint: 767,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    },
                ]
			});
		});

		// Flickr feed

		if( $('.widget_epcl_flickr').length > 0 ){
			$('.widget_epcl_flickr').each(function(index, el) {
				var elem = $(this);
				var flickr_limit = elem.find('.epcl-flickr-gallery').data('limit');
				var flickr_id = elem.find('.epcl-flickr-gallery').data('flickr-id');
				elem.find('ul').jflickrfeed({
					limit: parseInt(flickr_limit),
					qstrings: {
						id: flickr_id
					},
					useTemplate: false,
					itemCallback: function(item){
						$(this).append('<li class="grid-50 tablet-grid-33 mobile-grid-33"><div class="wrapper"><a href="'+item.image_b+'" title="'+item.title+'" class="hover-effect"><span class="cover" style="background-image: url('+item.image_m+');"></span></a></div></li>');
					}
				}, function(data) {
					elem.addClass('loaded');
					elem.find('ul').magnificPopup({
						type: 'image',
						gallery:{
							enabled: true,
                            arrowMarkup: '<i class="mfp-arrow mfp-arrow-%dir% fa fa-chevron-%dir%"></i>',
                            tCounter: '%curr% / %total%'
						},
						delegate: 'a',
						mainClass: 'my-mfp-zoom-in',
						removalDelay: 300,
						closeMarkup: '<span title="%title%" class="mfp-close">&times;</span>'
					});
				});

			});
		}

		// Global: lightbox

		$('.lightbox').magnificPopup({
			mainClass: 'my-mfp-zoom-in',
			removalDelay: 300,
			closeMarkup: '<i title="%title%" class="mfp-close fa fa-times"></i>',
			fixedContentPos: true
        });

        // Global: related galleries

        $('.epcl-gallery').each(function() {
            var elem = $(this);
            elem.find('ul').magnificPopup({
                type: 'image',
                gallery:{
                    enabled: true,
                    arrowMarkup: '<i class="mfp-arrow mfp-arrow-%dir% fa fa-chevron-%dir%"></i>',
                    tCounter: '%curr% / %total%'
                },
                delegate: 'a',
                mainClass: 'my-mfp-zoom-in',
                removalDelay: 300,
                closeMarkup: '<span title="%title%" class="mfp-close">&times;</span>'
            });
        });

        // Gutenberg Gallery with lightbox
        $('.wp-block-gallery, .woocommerce-product-gallery').each(function() {
            var elem = $(this);
            elem.magnificPopup({
                type: 'image',
                gallery:{
                    enabled: true,
                    arrowMarkup: '<i class="mfp-arrow mfp-arrow-%dir% fa fa-chevron-%dir%"></i>',
                    tCounter: '%curr% / %total%'
                },
                delegate: "a[href$='.jpg'],a[href$='.png'],a[href$='.gif']",
                mainClass: 'my-mfp-zoom-in',
                removalDelay: 300,
                closeMarkup: '<span title="%title%" class="mfp-close">&times;</span>'
            });
        });

        // Gutenberg Single Image with lightbox
        $('.wp-block-image').magnificPopup({
            type: 'image',
            gallery:{
                enabled: true,
                arrowMarkup: '<i class="mfp-arrow mfp-arrow-%dir% fa fa-chevron-%dir%"></i>',
                tCounter: '%curr% / %total%'
            },
            delegate: "a[href$='.jpg'],a[href$='.png'],a[href$='.gif']",
            mainClass: 'my-mfp-zoom-in',
            removalDelay: 300,
            closeMarkup: '<span title="%title%" class="mfp-close">&times;</span>'
        });

	});

})(jQuery);