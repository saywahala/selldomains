var win_height = $(window).height();
var win_width = $(window).width();
var active_btn, $active_div, $active_box, ctext;


$(document).ready(function () {

    $('body').on('click', '.js_submit_form', function () {
        active_btn = $(this);
        doLoadingActiveButton();
    });


    $('body').on('click', '.js_show_comment_box', function () {
        active_btn = $(this);
        doLoadingActiveButton();

        var params = {};
        params['object_id'] = $(this).attr('data-object-id'); // convert form to array
        params['object_type'] = $(this).attr('data-object-type'); // convert form to array

        url = base_url + "/common/aget/get_comment_html";

        sendToServer(url, params, returnGetCommentHTML, 'post');
    });

});

/*
 * @fucntion returnGetUserAnswer
 * @param {object} data
 * @returns void
 */
var returnGetCommentHTML = function (data) {
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
        $vars['header'] = data.header;
        showMessage(message, $vars);
        return;
    }
};


/*
 * Displays image error  * @param string message
 * @returns void
 */
var showImageError = function (message) {
    html = '';
    html = html + '<div class="js_img_error_msg message_holder"><div class="message error_message">' + message + "</div></div>";
    $(html).insertBefore('.js_upload_images_box');
};
/*
 * @function showMessage
 * Displays message using lightbox
 * @param string message
 * @returns void
 */
var showMessage = function (message, data) {
    if (data['header'] === "null" || data['header'] === "" || typeof (data) === 'undefined')
        $header = 'Message';
    else
        $header = data['header'];

    $html = message;

    addDataToLightbox($html, $header);
};
/*
 * creates lightba and adds html to ita
 * @param {string} html_content
 * @param {array} data
 * @returns void
 */
var addDataToLightbox = function (html_content, header, lightbox_data) {
    $close_html = '<div class="inpop_close_box">'
            + '<div class="rfl">'
            + '<button type="button" class="pop_box_btn show_block lfl js_close_lbox">Close</button>'
            + '<div class="clear"></div>'
            + '</div>'
            + '<div class="clear"></div>'
            + '</div>';

    if (typeof (lightbox_data) === 'undefined' || typeof (lightbox_data['showClose']) === "undefined" || lightbox_data['showClose'] === true) {
        showClose = $close_html;
    } else {
        showClose = "";
    }


    lightboxHtml = '<div class="outer_lightbox js_outerlightbox">'
            + '<div class="inlightbox">'
            + '<h1 class="lbox_header">' + header + '</h1>'
            + '<div class="inlightbox_content">' + html_content + '</div>'

            //
            + showClose
            //end inlightbox
            + '</div>'

            //end outerlightbox
            + '</div>';

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
 *	@param fileUpload : text either upload image
 *	  * 	@return jsonData
 */
var sendToServer = function (url, params, toCall, method, fileUpload)
{
    if (method !== null && method === "post")
        method = 'POST';
    else
        method = 'GET';

    if (fileUpload === null || typeof (fileUpload) === 'undefined') {
        $.ajax({
            type: method,
            url: url,
            data: params,
            xhr: function () {
                var myXhr = $.ajaxSettings.xhr();
                if (myXhr.upload) {
                    myXhr.upload.addEventListener('progress', progress, false);
                }
                return (myXhr);
            },
            success: function (data) {
                jsonData = $.parseJSON(data);
                if (toCall !== null && toCall !== "" && (typeof toCall === "function"))
                    toCall(jsonData);
            },
            error: function (data) {
                if ($('.js_loading_result').length !== 0)
                    $('.js_loading_result').html('<span class="error">An Error Occured while processing the information : ' + data.status + '</span>').show();
                else {
                    message = '<div class="error_message message">An Error Occured while processing the information : ' + data.status + '</div>';
                    $vars['header'] = 'Server Error';
                    showMessage(message, $vars);
                }
            }
        });
    } else
    {
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
                    myXhr.upload.addEventListener('progress', progress, false);
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
                    showMessage(message, $vars);
                }

            }
        });
    }

};
/*  * function progress
 * retun void
 */
var progress = function (e) {

    if (e.lengthComputable) {
        var max = e.total;
        var current = e.loaded;
        var Percentage = (current * 100) / max;

        if ($('.js_progress_now').length > 0) {
            $('.js_progress_now').css('width', Math.round(Percentage) + '%');
        }
    }
};

/*
 * 
 * @param mixed array_items
 * @returns mixed
 */
var trimLowerArray = function (array_items) {
    if ($.isArray(array_items)) {
        $.each(array_items, function (index, value) {
            array_items[index] = $.trim(value).toLocaleLowerCase();
        });
    } else {
        $.trim(array_items).toLocaleLowerCase();
    }
    return array_items;
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
