var $active_btn, active_btn;

$(document).ready(function () {

    //deleting item
    $('body').on('click', '.js_show_delete', function () {
        $active_btn = $(this);
        $link = $(this).attr('data-url');
        $id = $(this).attr('data-id');
        $type = $(this).attr('data-type');
        $rurl = $(this).attr('data-ref-url');

        var params = {};
        params['submit_link'] = $link;
        params['id'] = $id;
        params['type'] = $type;
        params['ref_url'] = $rurl;

        url = base_url + 'admin/common/aget/getDeleteFormHtml';

        sendToServer(url, params, returnDoDelteHtml, 'post');
    });

    //close lightbox
    $('body').on('click', '.js_close_lbox', function () {
        $(this).closest('.js_outerlightbox').fadeOut(300, function () {
            $(this).remove();
            removeLoadingActiveButton();
        });
    });

    //do select all table
    $('.js_select_all').click(function (event) {
        if (this.checked) {
            // Iterate each checkbox
            $('.js_insell:checkbox').each(function () {
                this.checked = true;
            });
        } else {
            $('.js_insell:checkbox').each(function () {
                this.checked = false;
            });
        }
    });

    //for timepicker
    $('body').on('keydown', '.js_timepicker', function () {
        return false;
    });

    $('body').on('focus', '.js_timepicker', function () {
        $('.js_timepicker').timepicker({'step': 60, 'timeFormat': 'h:i A'});
    });

    //for datepicker
    $('body').on('focus', '.js_datepicker', function () {
        if ($('[type="date"]').prop('type') !== 'date') {
            $('.js_datepicker').datepicker({'step': 10, dateFormat: 'dd-mm-yy'});
            $initial_date = $(this).attr('data-date');
            if (typeof ($initial_date) !== 'undefined' && $initial_date !== "" && $initial_date !== null) {
                $(this).datepicker("setDate", $initial_date);
            }
        }

    });

    //for ckeditor
    if ($('.js_ckeditor').length > 0) {
        $(".js_ckeditor").each(function () {
            $name = $(this).attr('name');
            setEditor($name);
        });
    }
    //remove img
    $('body').on('click', '.js_remove_img', function () {
        $name = $(this).attr('data-name');
        $class = $(this).attr('data-class');

        $('<input type="file" class="show_block lfl input_item ' + $class + '" placeholder="Image" name="' + $name + '" />').insertBefore('.js_hold_image');
        $('.js_hold_image').remove();
    });

    //pages
    if ($('.js_home_page_details').length > 0) {
        $is_home_active = $('.js_is_home_page').val();
        if ($('.js_is_home_page').is(":checked")) {
            $('.js_home_page_details').show();
        }

        $('body').on('click', '.js_is_home_page', function () {
            if ($(this).is(":checked")) {
                $('.js_home_page_details').show();
            } else {
                $('.js_home_page_details').hide();
            }
        });
    }

    //settings
    $('body').on('click', '.js_add_new_social', function () {
        $count = $(this).attr('data-current-count');
        $scount = parseInt($count) + 1;
        $html = '<div class="one_social">' +
                '<div class="one_input two-rows lfl">'
                + '<span class="input_label">Social Icon ' + $scount + '</span>'
                + '<input type="text" class="input_item" value="" '
                + 'name="social_icon_' + $scount + '" placeholder="Social Link ' + $scount + '"/>'
                + '<div class="clear"></div></div>'
                //
                + '<div class="one_input two-rows lfl">'
                + '<span class="input_label">Social Link ' + $scount + '</span>'
                + '<input type="text" class="input_item" value="" '
                + 'name="social_link_' + $scount + '" placeholder="Social Link ' + $scount + '"/>'
                + '<div class="clear"></div></div>'

                //
                + '<div class="clear"></div>'
                + '</div>'
                + '<div class="line-separator"></div>';

        $('.js_current_scount').val($scount);
        $('.js_all_social_links').append($html);
    });

    //for days settings
    $('body').on('click', '.js_hold_days a', function () {
        if ($(this).hasClass('active')) {
            //make inactive
            $(this).children('input').prop('checked', false);
            $(this).removeClass('active');
        } else {
            $(this).children('input').prop('checked', true);
            $(this).addClass('active');
        }
    });

    //select inactive dates
    if ($('.js_the_datepicker').length > 0) {
        $('.js_the_datepicker').datepicker({
            'step': 10,
            dateFormat: 'dd-mm-yy',
            showOn: "button",
            buttonText: "Add Date",
            minDate: +0,
            onSelect: function (dateText, inst) {
                addToDisabledDates(dateText);
            }
        });
    }
    //delete inactive dates
    $('body').on('click', '.js_inactive_dates i', function () {
        $date = $(this).parent().attr('data-date-value');
        removeFromDisabledDates($date);
        $(this).parent().remove();
    });
});

/*
 * @functio addToDisabledDates
 * @param {type} $picked_date
 * @returns voide
 */
var addToDisabledDates = function ($picked_date) {
    $current_dates = $('.js_all_ddates').attr('value');
    //
    $new_date_html = '<span data-date-value="' + $picked_date + '" href="javascript:void(0)" class="inactive_dates js_inactive_dates">' + $picked_date + '<i class="fa fa-times"></i></span>';
    $($new_date_html).insertBefore('.js_the_datepicker');

    if ($current_dates === "") {
        $('.js_all_ddates').val($picked_date);
        return;
    }
    $cdates_array = $current_dates.split(',');
    $cdates_array.push($picked_date);
    $current_dates = $cdates_array.join();
    $('.js_all_ddates').val($current_dates);
};

/*
 * @functio removeFromDisabledDates
 * @param {type} $picked_date
 * @returns voide
 */
var removeFromDisabledDates = function ($picked_date) {
    $current_dates = $('.js_all_ddates').attr('value');
    if ($current_dates === "") {
        $('.js_all_ddates').val('');
        return;
    }
    $cdates_array = $current_dates.split(',');
    for (var i = 0; i < $cdates_array.length; i++) {
        if($cdates_array[i] === $picked_date){
            $cdates_array.splice(i, 1);
        }
    }
    $current_dates = $cdates_array.join();
    $('.js_all_ddates').val($current_dates);    
};
/*
 * @fucntion returnDoDelete
 * @param {type} data
 * @returns void
 */
var returnDoDelteHtml = function (data) {

    if (data.error) {
        message = '<div class="error_message message">' + data.error + '</div>';
        $vars['header'] = 'Error';
        showMessage(message, $vars);
        return;
    }

    if (data.html) {
        if (data.header)
            $header = data.header;
        else
            $header = 'Delete';
        addDataToLightbox(data.html, $header);
    }
};

/*
 * creates lightba and adds html to ita
 * @param {
 string} html_content
 * @param {array} data
 * @returns void
 */
var addDataToLightbox = function (html_content, header) {
    lightboxHtml = '<div class="outer_lightbox js_outerlightbox"><div class="inlightbox"><h1 class="lbox_header">' + header + '</h1><a href="javascript:void(0)" class="close_lbox js_close_lbox"><i class="fa fa-times"></i></a><div class="inlightbox_content">' + html_content + '</div></div></div>';

    $('body').append(lightboxHtml).promise().done(function () {
        //$('.js_outerlightbox').height($('body').height());
        $('.js_outerlightbox').fadeIn();
    });
};
/**
 *	Sends request to the server
 *	@param url : the url link
 *	@param params : the parameters to send to server
 *	@param toCall : function to call after execution
 *	@param method : method either post/get
 *	
 * 	@return jsonData
 */
var sendToServer = function (url, params, toCall, method)
{
    if (method !== null && method === "post")
        method = 'POST';
    else
        method = 'GET';

    $.ajax({
        type: method,
        url: url,
        data: params,
        success: function (data) {
            jsonData = $.parseJSON(data);
            if (toCall !== null && toCall !== "" && (typeof toCall === "function"))
                toCall(jsonData);
        },
        error: function (data) {
            if ($('.js_loading_result').length !== 0)
                $('.js_loading_result').html('<span class="error">An Error Occured while processing the information : ' + data.status + '</span>').show();
            else
                alert('An Error Occured while processing the information : ' + data.status);
        }
    });
};

/**
 *	Sends request to the server
 *	@param url : the url link
 *	@param params : the parameters to send to server
 *	@param toCall : function to call after execution
 *	@param method : method either post/get  
 *	@return jsonData
 */
var sendToServerWithFile = function (url, params, toCall, method)
{
    if (method !== null && method === "post")
        method = 'POST';
    else
        method = 'GET';

    $.ajax({
        type: method,
        url: url,
        data: params,
        contentType: false,
        processData: false,
        cache: false,
        xhr: function () {
            var myXhr = $.ajaxSettings.xhr();
            if (myXhr.upload) {
                //myXhr.upload.addEventListener('progress', progress, false);
            }
            return (myXhr);
        },
        success: function (data) {
            jsonData = $.parseJSON(data);
            if ($('.js_progress_now').length > 0) {
                $('.js_progress_now').css('width', '0%');
            }
            if (toCall !== null && toCall !== "" && (typeof toCall === "function"))
                toCall(jsonData);
        },
        error: function (data) {
            if ($('.js_progress_now').length > 0) {
                $('.js_progress_now').css('width', '0%');
            }
            //
            if ($('.js_loading_result').length !== 0)
                $('.js_loading_result').html('<span class="error">An Error Occured while processing the information : ' + data.status + '</span>').show();
            else {
                message = '<div class="error_message message">An Error Occured while processing the information : ' + data.status + '</div>';
                $vars['header'] = 'Server Error';
                alert(message);
            }

        }
    });

};

/*
 * function  doLoadingActiveButton
 * adds loading text to a loading btn
 * @return void
 */
var doLoadingActiveButton = function () {
    ctext = (active_btn).html();
    active_btn.attr('data-loading-pretext', ctext);
    active_btn.html('<i class="fa fa-spin fa-spinner"></i>');
};

/*
 * function  removeLoadingActiveButton
 * removes loading text to a loading btn
 * @return void
 */
var removeLoadingActiveButton = function () {
    var attr = active_btn.attr('data-loading-pretext');
    if (typeof (attr) !== 'undefined' && attr !== false && attr !== null) {
        ctext = active_btn.attr('data-loading-pretext');
        active_btn.html(ctext);
    }
};
/*
 * @fucntion setEditor
 * sets ckeditor
 * @var name : name of textarea
 */
var setEditor = function ($name) {
    CKEDITOR.replace($name, {
        language: 'en',
        toolbar: [['Source', '-', 'Bold', 'Italic', 'TextColor', 'Underline', '-', 'NumberedList', 'BulletedList', '-', 'Link', 'Unlink', '-', 'Undo', 'Redo', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'Styles', 'Format'/*,'-','Image','Flash','Table'*/]],
        width: '100%'
    });
};
