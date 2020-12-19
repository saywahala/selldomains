var active_btn, active_div = null;

$(document).ready(function () {

    //add user to project
    $('body').on('click', '.js_add_project_to_user', function () {
        //get add user to project form
        url = base_url + 'admin/projects/aget/getAddProjectToUserHTML';

        active_btn = $(this);
        var params = {};
        params['project_id'] = $('.js_project_id').attr('data-project-id');

        sendToServer(url, params, returnGetAddProjectToUserHTML, 'get');
    });

    //save user role 
    $('body').on('click', '.js_save_user_project_role', function () {
        active_btn = $(this);
        $(this).closest('form').remove('.message_holder');

        url = base_url + 'admin/projects/aget/saveUserProjectRole';
        var params = {};
        params = $(this).closest('form').serialize();

        sendToServer(url, params, returnSaveUserRole, 'post');
    });


    //edt user role 
    $('body').on('click', '.js_edit_project_to_user', function () {
        active_btn = $(this);
        active_div = $(this).closest('tr');

        url = base_url + 'admin/projects/aget/getAddProjectToUserHTML';
        var params = {};
        params['id'] = $(this).attr('data-id');
        params['project_id'] = $('.js_project_id').attr('data-project-id');

        sendToServer(url, params, returnGetAddProjectToUserHTML, 'get');

    });

    //delee user role 
    $('body').on('click', '.js_delete_project_to_user', function () {
        if (confirm('Are sure you want to delete user role?')) {
            active_btn = $(this);

            url = base_url + 'admin/projects/aget/deleteUserRole';
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
var returnGetAddProjectToUserHTML = function (data) {
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