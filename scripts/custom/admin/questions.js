var $current_index = 0;

$(document).ready(function () {

    if ($('.js_current_answers').length > 0) {
        $current_answers = $('.js_current_answers').val();
        if ($current_answers === "null" || $current_answers === "" || typeof ($current_answers) === 'undefined')
            $current_answers = [];
        else {
            $current_answers = JSON.parse($current_answers);
            for (i = 0; i < $current_answers.length; i++) {
                var params = {};
                params['answer'] = $current_answers[i]['answer'];
                params['order'] = $current_answers[i]['order'];
                params['image_link'] = $current_answers[i]['image_link'];
                addAnswerToList(params);
            }
        }

        $value = $('.js_select_question_type').val();
        doAnswerUpdate($value);
    }

    $('body').on('change', '.js_select_question_type', function () {
        $value = $(this).val();
        doAnswerUpdate($value);
    });

    $('body').on('click', '.js_add_answer', function () {
        active_btn = $(this);
        doLoadingActiveButton();
        var params = {};
        url = base_url + 'admin/questions/aget/get_add_answer_html';

        sendToServer(url, params, returnGetAddAnswerHtml, 'get');
    });


    $('body').on('click', '.js_save_answer', function () {
        $answer = $('.js_answer_choice').val();
        $order = $('.js_answer_choice_order').val();

        var params = {};
        params['answer'] = $answer;
        params['order'] = $order;
        $current_answers.push(params);

        $('.js_current_answers').val(JSON.stringify($current_answers));
        addAnswerToList(params);
        $('.js_close_lbox').click();
    });

    ////////////////////////////////////////////
    /*
     * js_edit_choice --get html
     */
    $('body').on('click', '.js_edit_answer_choice', function () {
        $values = $(this).parents('.manage_cbxbtn').attr('data-value');
        $v = JSON.parse($values);

        active_btn = $(this);
        $active_edit = $(this).parents('li');
        doLoadingActiveButton();
        var params = {};
        params['answer'] = $v.answer;
        params['order'] = $v.order;
        if ($v.image_link) {
            params['image_link'] = $v.image_link;
        } else {
            params['image_link'] = '';
        }
        params['values'] = $values;

        url = base_url + 'admin/questions/aget/get_add_answer_html';

        sendToServer(url, params, returnGetAddAnswerHtml, 'get');
    });

    //save edit
    $('body').on('click', '.js_save_edit_answer', function () {
        $answer = $('.js_answer_choice').val();
        $order = $('.js_answer_choice_order').val();
        $initial = $('.js_initial_values').val();
        //update current 
        for (i = 0; i < $current_answers.length; i++) {
            if ($current_answers[i]['answer'] === $initial) {

                $current_answers[i]['answer'] = $answer;
                $current_answers[i]['order'] = $order;
                $current_index = i;

                $($active_edit).remove();
                var params = {};
                params['answer'] = $answer;
                params['order'] = $order;
                uploadAnswerImage();

                //addAnswerToList(params);
                //$('.js_close_lbox').click();
                break;
            }
        }
        $('.js_current_answers').val(JSON.stringify($current_answers));

    });

    //Delete answer choice
    $('body').on('click', '.js_delete_answer_choice', function () {
        $values = $(this).parents('.manage_cbxbtn').attr('data-value');
        $v = JSON.parse($values);

        $active_edit = $(this).parents('li');
        //update current 
        for (i = 0; i < $current_answers.length; i++) {
            if ($current_answers[i]['answer'] === $v.answer) {
                $current_answers.splice(i, 1);
                $($active_edit).remove();
            }
        }
        $('.js_current_answers').val(JSON.stringify($current_answers));
    });

    //add question to a test
    $('body').on('click', '.js_add_question_to_test', function () {
        active_btn = $(this);
        $active_edit = $(this).parents('tr');
        doLoadingActiveButton();

        var params = {};
        params['question_id'] = $(this).attr('data-id');
        params['test_id'] = $('.js_test_id').val();

        url = base_url + 'admin/test_questions/aget/add_question_to_test';

        sendToServer(url, params, returnAddQuestionToTest, 'post');

    });

});

/*
 * @fucntion returnGetAddAnswerHtml
 * @param {object} data
 * @returns void
 */
var returnGetAddAnswerHtml = function (data) {
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
        addDataToLightbox(data.html, data.header);
    }
};


/*
 * @fucntion returnAddQuestionToTest
 * @param {object} data
 * @returns void
 */
var returnAddQuestionToTest = function (data) {
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
        $($active_edit).remove();
    }
};


var uploadAnswerImage = function () {
    $current_answers[$current_index]['image_link'] = "";
    if ($('.js_upload_image').length > 0) {
        //upload image
        var data = new FormData(document.querySelector(".js_submit_answer_form"));
        var params = data;

        url = base_url + 'admin/questions/aget/upload_answer_image';

        sendToServerWithFile(url, params, returnUploadPhotos, 'post');
    } else {
        alert('')
        if ($('.js_answer_image_link').length > 0) {
            $current_answers[$current_index]['image_link'] = $('.js_answer_image_link').val();
        }
        addAnswerToList($current_answers[$current_index]);
        $('.js_close_lbox').click();
        $('.js_current_answers').val(JSON.stringify($current_answers));
    }
};

/*
 * manages returned data
 * @param {json} data
 * @returns text
 */
var returnUploadPhotos = function (data) {
    if (data === "null" || data === "" || typeof (data) === 'undefined')
        return;

    if (data.error) {
        alert(data.error);
        return;
    }

    if (data.image_link) {
        $current_answers[$current_index]['image_link'] = data.image_link;
        addAnswerToList($current_answers[$current_index]);
        $('.js_close_lbox').click();
        $('.js_current_answers').val(JSON.stringify($current_answers));
    }

};

/*
 * @function addAnswerToList
 * @param {object} $params
 * @returns {void}
 */
var addAnswerToList = function ($params) {
    var $correct_answer = $('.js_correct_answer').val();
    var selected = $image = '';
    if ($correct_answer.toLowerCase().trim() === $params['answer'].toLowerCase().trim()) {
        selected = 'checked="checked"';
    }

    if ($params['image_link']) {
        $image = '<div class="lfl hansimg"><img src="' + base_url + $params['image_link'] + '"/></div> ';
    }

    $html = '<li><div class="manage_cbxbtn lfl" data-value=\'' + JSON.stringify($params) + '\'><a href="javascript:void(0)" class="js_delete_answer_choice"><i class="fa fa-times"></i></a><a href="javascript:void(0)" class="smallleftmargin js_edit_answer_choice"><i class="fa fa-pencil"></i></a></div><div class="lfl mediumleftmargin"><input class="cbox lfl" name="answer" ' + selected + ' value="' + $params['answer'] + '" type="radio"/> ' + $image + $params['answer'] + '</div><div class="lfl mediumleftmargin order_ans">' + $params['order'] + '</div><div class="clear"></div></li>';

    $('.js_answers').append($html);
};

/*
 * @param {type} value
 * @returns {none}
 */
var doAnswerUpdate = function ($value) {
    if ($value.toLowerCase() === "essay") {
        $('.js_anwers').css({'display': 'none'});
    } else {
        $('.js_anwers').css({'display': 'block'});
    }
};
