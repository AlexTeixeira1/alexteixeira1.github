'use strict';

document.addEventListener('DOMContentLoaded', function () {

    // MAIN MENU

    var lastScroll = null

    $(window).scroll(function (e) {

        var currentScroll = $(window).scrollTop()

        $('.bg-coral').css('background-position', '0 0, 0 0, 0 ' + currentScroll * -0.3 + 'px')

        if (lastScroll) {
            if (lastScroll < currentScroll) {
                $('.main-menu--links').addClass('hide')
            } else {
                $('.main-menu--links').removeClass('hide')
            }
        }

        lastScroll = currentScroll;
    })

    $('.main-menu').mouseover(function (e) {
        $('.main-menu--links').removeClass('hide')
    })

    // MOBILE MENU

    $('.navbar-burger').click(function(e){
        var el = $(e.currentTarget)
        var target = $('#' + el.data('target'))
        el.toggleClass('is-active')
        target.toggleClass('is-active')
    })

    // SELECT DROPDOWN

    $('.is-select-nav select').change(function(e){
        var me = $(e.currentTarget)
        window.location = me.val()
    })

    // DESTAQUES

    var $destaques = $('.destaques').flickity({
        prevNextButtons: false,
        wrapAround: true,
        autoPlay: 4000
    })

    $destaques.on( 'change.flickity', function( event, index ) {
        console.log( 'Slide changed to ' + index )
        var slide = $('.destaques--slide').eq(index)
        $('.destaques--info .destaques--title').text(slide.attr('data-title')).fadeOut(0).fadeIn(300)
        $('.destaques--info .coral-btn').attr('href', slide.attr('data-url'))
    })

    // ISOTOPE

    var $isonews = $('.isotope-news').isotope({
        itemSelector: '.isotope-news--item',
        percentPosition: true,
        masonry: {
            columnWidth: '.isotope-news--sizer',
            horizontalOrder: true,
            gutter: 20
        }
    })

    $isonews.imagesLoaded().progress(function () {
        $isonews.isotope('layout')
    })

    // PROEX

    $('.proex-form-periodo .button').not('.logout').click(function(e){
        e.preventDefault()
        var button = $(e.currentTarget)
        var id = button.attr('data-id')
        if(!button.hasClass('inscrito')){
            if(button.hasClass('is-link')){
                button.removeClass('is-link')
                button.text('Selecionar')
                $('#estagio-' + id).empty()
            } else {
                button.addClass('is-link')
                button.text('Selecionado')
                $('#estagio-' + id).append('<input type="hidden" name="fields[userEstagioInscricoes][]" value="'+id+'">')
            }
        }
    })

    $('#proex-form-submit').click(function(e){
        e.preventDefault()
        if(!$('.proex-form-periodo .button.is-link:not(.inscrito)').length){
            alert('Selecione um período para se inscrever')
        } else {
            if(!$('#proex-form-submit').hasClass('coral-btn-disabled')){
                $('#proex-form').submit()
                $('#proex-form-submit').addClass('coral-btn-disabled')
            }
        }
    })

    $('.numeric').numeric(false)

    if($('.help.is-danger').length){
        $('html, body').animate({
            scrollTop: $('.help.is-danger:eq(0)').offset().top - 300
        }, 900);
    }

    // TRACK DOWNLOADS

    $('.track-download').click(function(e){
        e.preventDefault()
        var me = $(e.currentTarget)
        var file = me.data('filename')
        var href = me.attr('href')
        ga('send', 'event', 'file', 'download', file)
        fbq('trackCustom', 'Download', {content_name: file})
        console.log(['download',file])
        setTimeout(function(){
            window.location = href
        },500)
    })

    // PROD ACADEMICA

    $('.producao-academica-subtitle').each(function(i,el){
        var cat = $(el)
        $('.prod-academica-acesso-rapido').append('<li><a href="#'+cat.attr('id')+'">'+cat.text()+'</a>')
        $('.prod-academica-acesso-rapido a').click(function(e){
            e.preventDefault()
            var id = $(e.currentTarget).attr('href')
            smoothScroll(id, 150, 300)
        })

    })

    if($('.producao-academica-list').length){

        var articles = $('.producao-academica-list li');
        var articles_timer = null;

        //$('#sidebar').stick_in_parent();

        $('#producao-academica-filter').on('keydown',function(){
            
            var _this = this;

            if(articles_timer !== null) {
                clearTimeout(articles_timer);
                articles_timer = null;
            }

            articles_timer = setTimeout(function(){

                var filter = $(_this).val().toLowerCase();
                
                console.log(filter)

                if(filter != ''){

                    articles.hide()
                    articles.filter(function () {

                        return (this.innerHTML.toLowerCase()).indexOf(filter) !== -1;

                    }).show();

                } else {

                    articles.show();

                }

                articles_timer = null;

                smoothScroll('body',0,0)

            }, 10);

        });
    }

    $('#producao-academica-sidebar').sticky({topSpacing: 150})


    /// COMMON

    function smoothScroll(selector, offset, vel){

        $('html, body').stop().animate({
            scrollTop: $(selector).offset().top - offset
        }, vel);

    }


})