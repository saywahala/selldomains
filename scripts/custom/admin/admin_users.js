var active_btn, active_div = null;

$(document).ready(function () {

    //add user to project
    $('body').on('click', '.js_add_user_to_project', function () {
        //get add user to project form
        url = base_url + 'admin/users/aget/getAddUserToProjectHTML';

        active_btn = $(this);
        var params = {};
        params['user_id'] = $('.js_user_id').attr('data-user-id');

        sendToServer(url, params, returnGetAddUserToProjectHTML, 'get');
    });

    //save user role 
    $('body').on('click', '.js_save_user_role', function () {
        active_btn = $(this);
        $(this).closest('form').remove('.message_holder');

        url = base_url + 'admin/users/aget/saveUserRole';
        var params = {};
        params = $(this).closest('form').serialize();

        sendToServer(url, params, returnSaveUserRole, 'post');
    });


    //edt user role 
    $('body').on('click', '.js_edit_user_to_project', function () {
        active_btn = $(this);
        active_div = $(this).closest('tr');

        url = base_url + 'admin/users/aget/getAddUserToProjectHTML';
        var params = {};
        params['id'] = $(this).attr('data-id');
        params['user_id'] = $('.js_user_id').attr('data-user-id');

        sendToServer(url, params, returnGetAddUserToProjectHTML, 'get');

    });

    //delee user role 
    $('body').on('click', '.js_delete_user_to_project', function () {
        if (confirm('Are sure you want to delete user role?')) {
            active_btn = $(this);

            url = base_url + 'admin/users/aget/deleteUserRole';
            var params = {};
            params['id'] = $(this).attr('data-id');

            sendToServer(url, params, returnDeleteUserRole, 'post');
        }

    });

    //close lightbox
    $('body').on('click', '.js_close_lbox', function () {
        $(this).closest('.js_outerlightbox').fadeOut(function () {
            $(this).remove();
        });
    });
});

/*
 * manages returned data
 * @param {json} data
 * @returns void
 */
var returnGetAddUserToProjectHTML = function (data) {
    if (data === "null" || data === "")
        return;

    if (data.error) {
        alert(data.error);
        return;
    }
    //add data to lightbox
    addDataToLightbox(data.html, data.header);
};

/*
 * manages returned values
 * @param data
 * @returns void
 */
var returnSaveUserRole = function (data) {
    if (data === "null" || data === "")
        return;

    if (data.error) {
        //add error to form
        text = '<div class="message_holder"><span class="message error_message">' + data.error + '</span></div>';
        $(active_btn).closest('form').prepend(text);
        //alert(data.error);
        return;
    }

    if (data.project_role_html) {
        //close ligtbox
        $(active_btn).closest('.js_outerlightbox').fadeOut(function () {
            $(this).remove();
        });
        text = '<div class="message_holder largebottommargin" id="delete555"><span class="message success_message">' + data.success + '</span></div>';
        $('.js_hold_project_list').prepend(text).promise().done(function () {
            //$('.js_hold_project_list #delete555').delay(2000).remove();
        });
        $('.js_user_role_table').append(data.project_role_html);
        if (active_div !== null && active_btn !== undefined) {
            $(active_div).remove().promise().done(function () {
                active_div = null;
            });
        }
    }

    //add data to lightbox
    //addDataToLightbox(data.html, data.header);
};

/*
 * manages returned values
 * @param data
 * @returns void
 */
var returnDeleteUserRole = function (data) {
    if (data === "null" || data === "")
        return;

    if (data.error) {
        //add error to form
        error_text = '<div class="message_holder" id="delete555"><span class="message error_message">' + data.error + '</span></div>';
        $(active_btn).closest('.hold_form').prepend(error_text).promise().done(function () {
            $('#delete555').delay(2000).remove();
        });
        //alert(data.error);
        return;
    }
    if (data.success) {
        $(active_btn).closest('tr').remove();
        text = '<div class="message_holder largebottommargin" id="delete555"><span class="message success_message">' + data.success + '</span></div>';
        $('.js_hold_project_list').prepend(text).promise().done(function () {
            //$('.js_hold_project_list #delete555').delay(2000).remove();
        });
        //alert(data.error);
        return;
    }
    //add data to lightbox
    //addDataToLightbox(data.html, data.header);
};