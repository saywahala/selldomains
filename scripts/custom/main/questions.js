
$(document).ready(function () {

    //save user answer
    $('body').on('click', '.js_submit_answer', function () {
        active_btn = $(this);
        doLoadingActiveButton();

        var params = {};
        params = $(this).parents('form').serializeArray(); // convert form to array

        url = $('.js_base_url').attr('value');

        sendToServer(url, params, returnSavedAnswer, 'post');
    });
});

/*
 * @fucntion returnAddQuestionToTest
 * @param {object} data
 * @returns void
 */
var returnSavedAnswer = function (data) {
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
        //remove question from question
        $('.js_hold_test_question').animate({"left": "-100%", "opacity": '0'});
        $('.js_hold_test_question').html(data.html).css({"left": "100%"}).promise().done(function () {
            $('.js_hold_test_question').animate({"left": "0%", "opacity": '1'});
        });
        if (data.current_count) {
            $('.js_dcurrent_num').html(data.current_count);
        }
    }
};
