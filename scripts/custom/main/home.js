$(document).ready(function (e) {
    $('.js_show_more_about').click(function () {
        if ($('.js_more_box').css('max-height') === "2000px") {
            $('.js_more_box').animate({'max-height': "128px"});
        } else {
            $('.js_more_box').animate({'max-height': "2000px"});
        }
    });

    $('.js_main_nav li a.do_slide_nav, .js_footer_nav li a.do_slide_nav').click(function () {
        $div_to_go = $(this).attr('data-div');
        $('body').animate({scrollTop: $('#' + $div_to_go).offset().top});
    });

    
});


//slide var
var s_count = $('.js_one_testimonial').length;
var s_timer = 5500;

var s_current_img = $('.js_one_testimonial:first');
var s_prev_img = $('.js_one_testimonial:first');

var s_current_nav = $('.js_test_nav li:first');
var s_prev_nav = $('.js_test_nav li:first');

var current = 0;
var next = 1;

var intervalValue = null;


$(window).on('load', function () {

    $(s_current_img).fadeIn(500, function () {
        $(s_current_nav).addClass('selected');
        intervalValue = setInterval(next_slide, s_timer);
    });
    $('.js_test_nav li').click(function () {
        index = $(this).index();
        if (current === index)
            return;
        clearInterval(intervalValue);
        next_slide(index);
        intervalValue = setInterval(next_slide, s_timer);
    })

});

/*
 *	next slide image
 *	@var next : next index for slide item
 */
function next_slide(next)
{
    if (typeof next === 'undefined') {
        next = current + 1;
    }

    if (next === s_count) {
        next = 0;
    }

    s_prev_img = s_current_img;
    s_current_img = $('.js_one_testimonial').get([next]);

    s_prev_nav = s_current_nav;
    s_current_nav = $('.js_test_nav li').get([next]);

    //set prev
    $(s_prev_img).css({'left': '0px', "z-index": '10'});
    $(s_current_img).css({'left': '100%', "z-index": '11', 'display': 'block'});

    $(s_prev_img).animate({"left": '-100%'}, 500, 'easeOutCubic');
    $(s_current_img).animate({"left": "0%"}, 500, 'easeOutCubic', function () {
        $(s_prev_nav).removeClass('selected');
        $(s_current_nav).addClass('selected');
        current = next;
    });

}
