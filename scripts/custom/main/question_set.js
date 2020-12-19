var $type = 'next';
var $qtest_type = $('.js_qtest_type').val(); //test type either questionsets or tests

$(document).ready(function () {
    //check and uncheck answer
    $('body').on('click', '.js_one_answer', function () {
        if ($(this).children('.js_rbtn').is(":checked")) {
            $(this).children('.js_rbtn').prop("checked", false);
            $(this).removeClass('active');
        } else {
            $cbox = $(this).children('.js_rbtn');
            $cbox_div = $(this);
            $('.js_one_answer').removeClass('active');
            $('.js_rbtn').prop("checked", false).promise().done(function () {
                $cbox.prop("checked", true);
                $cbox_div.addClass('active');
            });
        }
    });

    //check if answer is accurate
    $('body').on('click', '.js_check_answer', function () {
        $('.js_answer_correct_div').remove();
        //validate answer
        $answer = $('.js_rbtn:checked').val();
        $correct_answer = $('.js_correct_answer').val();
        $html = "";
        $effect = '';
        $this = $(this);

        if (typeof ($answer) === 'undefined') {
            alert("Select answer first");
            return;
        }

        if ($answer.toLowerCase() === $correct_answer.toLowerCase()) {
            //show correct answer
            $html = getAnswerCheckHtml('valid');
        } else {
            //show incorrect answer
            $html = getAnswerCheckHtml('invalid');
            $effect = 'shake';
        }
        $this.parents('.js_hold_answer_check').append($html).promise().done(function () {
            $this.siblings('.js_answer_correct_div').fadeIn();
            if ($effect !== '') {
                $('.js_answer_correct_div').effect($effect);
            }
        });

        //save answer if first time
        $count = parseInt($this.attr('data-check-count'));
        if ($count === 0) {
            //save
            var params = {};
            params = $this.parents('form').serializeArray(); // convert form to array
            url = $this.attr('data-url');

            sendToServer(url, params, returnSaveQuestion, 'post');

            $count = $count + 1;
            $this.attr('data-check-count', $count);
        }

    });

    //close check answer info
    $('body').on('click', '.js_info_close', function () {
        $(this).parents('.js_answer_correct_div').fadeOut().remove();
    });
    //clear answer
    $('body').on('click', '.js_clear_answer', function () {
        $('.js_rbtn').prop('checked', false);
        $('.js_info_close').click();
    });

    //show answer
    $('body').on('click', '.js_show_the_answer_btn, .js_close_answer_details', function () {
        $('.js_hold_answer_details').toggle('blind', function () {
            $('body').animate({scrollTop: $('.js_hold_answer_details').offset().top - 100});
        });
        $('.js_info_close').click();
    });


    //show hint
    $('body').on('click', '.js_show_hint', function () {
        $('.js_hint_description').toggle('blind');
    });

    //next question
    $('body').on('click', '.js_next_question, .js_previous_question, .js_qlist_numbers li a, .js_submit_question', function () {
        active_btn = $(this);
        doLoadingActiveButton();

        var params = {};
        params = $('.js_submit_qs_form').serializeArray(); // convert form to array
        $type = $(this).attr('data-type');
        params.push({'name': 'type', 'value': $type});

        $submit_answer = $(this).attr('data-submit-answer');
        if (typeof ($submit_answer) !== "undefined" && $submit_answer !== "") {
            params.push({'name': 'submit_answer', 'value': $submit_answer});
        }

        //for only index
        $question_index = $(this).attr('data-question-index');
        if (typeof ($question_index) !== "undefined" && $question_index !== "") {
            params.push({'name': 'question_index', 'value': $question_index});
        }

        url = $(this).attr('data-url');

        sendToServer(url, params, returnGetQuestion, 'post');
    });

    //delete set from user sets
    $('body').on('click', '.js_oqset_delete', function () {
        active_btn = $(this);
        doLoadingActiveButton();

        var params = {};
        params['id'] = $(this).attr('data-id') // convert form to array

        url = base_url + "/question_sets/aget/delete_set";

        sendToServer(url, params, returnDeleteQuestionSet, 'post');
    });

    //show correct answer
    $('body').on('click', '.js_show_question_answer', function () {
        active_btn = $(this);
        doLoadingActiveButton();

        var params = {};
        params['id'] = $(this).attr('data-question-id') // convert form to array
        params['question_set_id'] = $(this).attr('data-qs-id'); // convert form to array

        url = base_url + "/question_sets/aget/get_question_result";

        sendToServer(url, params, returnGetUserAnswer, 'post');
    });

    //end study
    $('body').on('click', '.js_show_end_study', function () {
        active_btn = $(this);
        doLoadingActiveButton();

        var params = {};
        params['id'] = $(this).attr('data-set-id') //
        params['end_study_type'] = $(this).attr('data-study-type'); //

        url = base_url + "/question_sets/aget/get_end_study_html";

        sendToServer(url, params, returnGetEndStudyHtml, 'get');
    });

    //end study
    $('body').on('click', '.js_show_submit_test', function () {
        if (confirm("Are you sure you want to submit the Test?")) {
            active_btn = $(this);
            doLoadingActiveButton();

            var params = {};
            params['id'] = $(this).attr('data-test-id'); //
            params['time_taken'] = $('.js_timer').html(); //

            url = base_url + "/question_sets/aget/do_end_test";

            sendToServer(url, params, returnGetEndTestHtml, 'post');
        }
    });

});

/*
 * @fucntion returnAddQuestionToTest
 * @param {object} data
 * @returns void
 */
var returnGetQuestion = function (data) {
    removeLoadingActiveButton();
    if (data === "null" || data === "" || typeof (data) === 'undefined')
        return;

    if (data.error) {
        message = '<div class="error_message message">' + data.error + '</div>';
        $vars['header'] = 'Error';
        showMessage(message, $vars);
        return;
    }

    if (data.html) {

        if ($type === "previous") {
            $left_one = "100%";
            $left_two = "-100%";
            $left_three = "0";
        } else {
            $left_one = "-100%";
            $left_two = "100%";
            $left_three = "0";
        }
        $('.js_qlist_numbers li').removeClass('active');

        //remove question from question
        $('.js_hold_test_question').animate({"left": $left_one, "opacity": '0'}, function () {
            $('.js_hold_test_question').html(data.html).css({"left": $left_two}).promise().done(function () {
                $('.js_hold_test_question').animate({"left": $left_three, "opacity": '1'}, doAfterAnimate);
            });
        });
    } else {
        if (data.current_count === "-1") {
            doAfterAnimate();
        }
    }

    /*
     * @functio doAfterAnimate
     * changes the content of new question
     * @returns void
     */
    function doAfterAnimate() {
        if (data.current_count) {
            $total_count = parseInt($('.js_cur_num').attr('data-total-questions'));
            if (data.current_count === '-1') {
                //end of questions
                $('.js_show_end_study_two').css('display', 'block');
            } else {
                $('.js_cur_num').html(data.current_count + ' of ' + $total_count);
                $('.js_show_end_study_two').css('display', 'none');
            }
            //hide previous or show
            if (data.current_count > 1 || data.current_count === "-1") {
                $('.js_previous_question').removeClass('hidden');
            } else {
                $('.js_previous_question').addClass('hidden');
            }
            //hide/show previous
            if (data.current_count >= $total_count || data.current_count === "-1") {
                $('.js_next_question').addClass('hidden');
            } else {
                $('.js_next_question').removeClass('hidden');
            }
        }
        $cactive = $('.js_qlist_numbers li').get([parseInt(data.current_count) - 1]);
        $($cactive).addClass('active');
        //do right nav
        if (data.the_answer_text) {
            if ($('#qans_' + data.the_answer.id).length > 0) {
                $('#qans_' + data.the_answer.id).html(data.the_answer_text);
            }
        }
    }
};

/*
 * @fucntion returnDeleteQuestionSet
 * @param {object} data
 * @returns void
 */
var returnDeleteQuestionSet = function (data) {
    removeLoadingActiveButton();
    if (data === "null" || data === "" || typeof (data) === 'undefined')
        return;

    if (data.error) {
        message = '<div class="error_message message">' + data.error + '</div>';
        $vars['header'] = 'Error';
        showMessage(message, $vars);
        return;
    }

    if (data.success) {
        //remove question from question
        window.location.href = base_url + 'user/questions';
    }
};


/*
 * @fucntion returnSaveQuestion
 * @param {object} data
 * @returns void
 */
var returnSaveQuestion = function (data) {
    if (data === "null" || data === "" || typeof (data) === 'undefined')
        return;

    if (data.error) {
        message = '<div class="error_message message">' + data.error + '</div>';
        $vars['header'] = 'Error';
        showMessage(message, $vars);
        return;
    }

    if (data.success) {
        return;
    }
};

/*
 * @fucntion returnGetUserAnswer
 * @param {object} data
 * @returns void
 */
var returnGetUserAnswer = function (data) {
    removeLoadingActiveButton();
    if (data === "null" || data === "" || typeof (data) === 'undefined')
        return;

    if (data.error) {
        message = '<div class="error_message message">' + data.error + '</div>';
        $vars['header'] = 'Error';
        showMessage(message, $vars);
        return;
    }

    if (data.html) {
        message = data.html;
        $vars['header'] = 'View answer result';
        showMessage(message, $vars);
        return;
    }
};

/*
 * @fucntion returnGetEndStudyHtml
 * @param {object} data
 * @returns void
 */
var returnGetEndStudyHtml = function (data) {
    if (data === "null" || data === "" || typeof (data) === 'undefined')
        return;

    if (data.error) {
        message = '<div class="error_message message">' + data.error + '</div>';
        $vars['header'] = 'Error';
        showMessage(message, $vars);
        return;
    }

    if (data.html) {
        html_content = data.html;
        html_header = data.header;
        addDataToLightbox(html_content, html_header);
        removeLoadingActiveButton();
        return;
    }
};

/*
 * @fucntion returnGetEndTestHtml
 * @param {object} data
 * @returns void
 */
var returnGetEndTestHtml = function (data) {
    if (data === "null" || data === "" || typeof (data) === 'undefined')
        return;

    if (data.error) {
        message = '<div class="error_message message">' + data.error + '</div>';
        $vars['header'] = 'Error';
        showMessage(message, $vars);
        return;
    }

    if (data.html) {
        html_content = data.html;
        html_header = data.header;
        lbox_data = {};
        lbox_data['showClose'] = false;
        addDataToLightbox(html_content, html_header, lbox_data);
        removeLoadingActiveButton();
        return;
    }
};

/*
 * @function getAnswerCheckHtml
 * @var $type : valid/invalid
 * @returns {text} 
 */
var getAnswerCheckHtml = function ($type) {
    if ($type === 'valid') {
        $vheader = 'Good';
        $vicon = 'icon-001-checked';
        $vtext = 'Your answer is correct. <a href="javascript:void(0)" class="js_next_question" data-type="next" data-url="' + base_url + '/question_sets/aget/get_question">Goto Next question</a>';
    } else {
        $vheader = 'Not Quite';
        $vicon = 'icon-002-wrong red_text';
        $vtext = 'Incorrect Answer, <a href="javascript:void(0)" class="js_clear_answer">Try again</a> or <a href="javascript:void(0)" class="js_next_question" data-type="next" data-url="' + base_url + '/question_sets/aget/get_question">Skip this question</a>';
    }
    $cor_html = '<div class="answer_correct_div js_answer_correct_div">'
            + '<div class="lfl hold_icon"><i class="' + $vicon + '"></i></div>'
            + '<div class="hold_info rfl">'
            + '<h4>' + $vheader + '</h4>'
            + '<h3>' + $vtext + '</h3>'
            + '<a class="show_the_answer_btn js_show_the_answer_btn" href="javascript:void(0)">Show Answer</a>'
            + '</div>'
            + '<div class="clear"></div>'
            + '<span class="harrow_down"><i class="fa fa-caret-down"></i></span>'
            + '<a href="javascript:void(0)" class="info_close js_info_close"><i class="icon-002-wrong"></i></a>'
            + '</div>';

    return $cor_html;
};

$(window).on('load', function () {
    var interval = setInterval(function () {
        var timer = $('.js_timer').html();
        timer = timer.split(':');
        var minutes = parseInt(timer[0], 10);
        var seconds = parseInt(timer[1], 10);
        seconds -= 1;
        if (minutes < 0)
            return clearInterval(interval);
        if (minutes < 10 && minutes.length != 2)
            minutes = '0' + minutes;
        if (seconds < 0 && minutes != 0) {
            minutes -= 1;
            seconds = 59;
        } else if (seconds < 10 && length.seconds != 2)
            seconds = '0' + seconds;
        $('.js_timer').html(minutes + ':' + seconds);

        if (minutes == 0 && seconds == 0) {
            clearInterval(interval);
            alert('test done');
        }
        if (minutes === 0) {
            $('.js_timer').addClass('danger');
        }

    }, 1000);
});

/*
 * @functi completeTest
 * test is completed by user
 * @access public
 * @return void
 */
var completeTest = function () {

};