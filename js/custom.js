/* global classie, google */

$(document).ready(function () {
    "use strict"; // Start of use strict

    // Animate loader off screen
    $(".se-pre-con").fadeOut("slow");

    //Plugin intialization
    if (window.matchMedia('(min-width: 768px)').matches) {
        $('#pagepiling').pagepiling({
            direction: 'horizontal',
            menu: '#menu',
            anchors: ['home', 'portfolio', 'skill', 'education', 'contact'],
            sectionsColor: ['#f2f2f2', '#f2f2f2', '#f2f2f2', '#f2f2f2', '#f2f2f2'],
            navigation: {
                'position': 'right',
                'tooltips': ['Home', 'Portfolio', 'skills', 'Education', 'contact']
            },
            afterRender: function () {
                $('#pp-nav').addClass('custom');
            },
            afterLoad: function (index) {
                if (index > 1) {
                    $('#pp-nav').removeClass('custom');
                } else {
                    $('#pp-nav').addClass('custom');
                }
            }
        });
    }

    var shuffleme = (function ($) {
        var $grid = $('#grid'), //locate what we want to sort 
                $filterOptions = $('.portfolio-sorting li'), //locate the filter categories
                $sizer = $grid.find('.shuffle_sizer'), //sizer stores the size of the items
                init = function () {
                    setTimeout(function () {
                        listen();
                        setupFilters();
                    }, 100);
                    $grid.shuffle({
                        itemSelector: '[class*="col-"]',
                        sizer: $sizer
                    });
                },
                // Set up button clicks
                setupFilters = function () {
                    var $btns = $filterOptions.children();
                    $btns.on('click', function (e) {
                        e.preventDefault();
                        var $this = $(this),
                                isActive = $this.hasClass('active'),
                                group = isActive ? 'all' : $this.data('group');
                        if (!isActive) {
                            $('.portfolio-sorting li a').removeClass('active');
                        }
                        $this.toggleClass('active');
                        $grid.shuffle('shuffle', group);
                    });
                    $btns = null;
                },
                listen = function () {
                    var debouncedLayout = $.throttle(300, function () {
                        $grid.shuffle('update');
                    });
                    $grid.find('img').each(function () {
                        var proxyImage;
                        if (this.complete && this.naturalWidth !== undefined) {
                            return;
                        }
                        proxyImage = new Image();
                        $(proxyImage).on('load', function () {
                            $(this).off('load');
                            debouncedLayout();
                        });
                        proxyImage.src = this.src;
                    });
                    setTimeout(function () {
                        debouncedLayout();
                    }, 500);
                };
        return {
            init: init
        };
    }(jQuery));

    shuffleme.init(); //filter portfolio

// progress-bar
    $('[data-toggle="tooltip"]').tooltip({trigger: 'manual'}).tooltip('show');
    $('.progress-bar').css("width",
            function () {
                return $(this).attr("aria-valuenow") + "%";
            }
    );
//    youtube, vimeo, google map popup
    $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });
    //image
    $('.zoom-gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        closeOnContentClick: false,
        closeBtnInside: false,
        mainClass: 'mfp-with-zoom mfp-img-mobile',
        image: {
            verticalFit: true,
            titleSrc: function (item) {
                return item.el.attr('title') + ' &middot; <a class="image-source-link" href="' + item.el.attr('data-source') + '" target="_blank">image source</a>';
            }
        },
        gallery: {
            enabled: true
        },
        zoom: {
            enabled: true,
            duration: 300, // don't foget to change the duration also in CSS
            opener: function (element) {
                return element.find('img');
            }
        }
    });
    //owl carousel custom
    $(".owl-demo").owlCarousel({
        items: 1,
        itemsDesktop: [1199, 1],
        itemsDesktopSmall: [980, 1],
        itemsTablet: [768, 1],
        itemsTabletSmall: false,
        itemsMobile: [479, 1],
        navigation: true,
        pagination: false,
        lazyLoad: true,
        navigationText: [
            "<i class='fa fa-chevron-left icon-white'></i>",
            "<i class='fa fa-chevron-right icon-white'></i>"
        ]
    });
//form custom
    if (!String.prototype.trim) {
        (function () {
            // Make sure we trim BOM and NBSP
            var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
            String.prototype.trim = function () {
                return this.replace(rtrim, '');
            };
        })();
    }
    [].slice.call(document.querySelectorAll('.input__field')).forEach(function (inputEl) {
        // in case the input is already filled..
        if (inputEl.value.trim() !== '') {
            classie.add(inputEl.parentNode, 'input--filled');
        }
        // events:
        inputEl.addEventListener('focus', onInputFocus);
        inputEl.addEventListener('blur', onInputBlur);
    });
    function onInputFocus(ev) {
        classie.add(ev.target.parentNode, 'input--filled');
    }
    function onInputBlur(ev) {
        if (ev.target.value.trim() === '') {
            classie.remove(ev.target.parentNode, 'input--filled');
        }
    }
// Google Maps Scripts
    google.maps.event.addDomListener(window, 'load', init);
    function init() {
        var mapOptions = {
            zoom: 11,
            center: new google.maps.LatLng(40.6700, -73.9400), // New York
            styles: [{"featureType": "all", "elementType": "labels.text.fill", "stylers": [{"saturation": 36}, {"color": "#ABC502"}, {"lightness": 40}]}, {"featureType": "all", "elementType": "labels.text.stroke", "stylers": [{"visibility": "on"}, {"color": "#000000"}, {"lightness": 16}]}, {"featureType": "all", "elementType": "labels.icon", "stylers": [{"visibility": "off"}]}, {"featureType": "administrative", "elementType": "geometry.fill", "stylers": [{"color": "#000000"}, {"lightness": 20}]}, {"featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{"color": "#000000"}, {"lightness": 17}, {"weight": 1.2}]}, {"featureType": "landscape", "elementType": "geometry", "stylers": [{"color": "#000000"}, {"lightness": 20}]}, {"featureType": "poi", "elementType": "geometry", "stylers": [{"color": "#000000"}, {"lightness": 21}]}, {"featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{"color": "#000000"}, {"lightness": 17}]}, {"featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{"color": "#ABC502"}, {"lightness": 29}, {"weight": 0.2}]}, {"featureType": "road.arterial", "elementType": "geometry", "stylers": [{"color": "#000000"}, {"lightness": 18}]}, {"featureType": "road.local", "elementType": "geometry", "stylers": [{"color": "#000000"}, {"lightness": 16}]}, {"featureType": "transit", "elementType": "geometry", "stylers": [{"color": "#000000"}, {"lightness": 19}]}, {"featureType": "water", "elementType": "geometry", "stylers": [{"color": "#000000"}, {"lightness": 17}]}]
        };
        var mapElement = document.getElementById('map');
        var map = new google.maps.Map(mapElement, mapOptions);
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(40.6700, -73.9400),
            map: map,
            title: 'Snazzy!'
        });
    }
});