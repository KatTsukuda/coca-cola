let $signList;
let allSigns = [];

$(document).ready(function() {

    $signList = $('.group');

    // SHOW //
    $.ajax({
    method: 'GET',
    url: '/api/signs',
    success: handleSuccess
    });

    // CREATE //
    $('#submit-entry').on('submit', function(event) {
        event.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/signs',
            data: $(this).serialize(),
            success: newSignSuccess
        });
    });

    // DESTROY //
    $signList.on('click', '.deleteBtn', function(event) {
        $.ajax({
            method: 'DELETE',
            url: '/api/signs/' + $(this).attr('data-id'),
            success: deleteSuccess
        });
    });


    // initiate modal -- see modal event click in html below
    $('.group').on('click', '.editBtn', function(event) {

        signID = $(this).attr('data-id');

    });


    // PUT method
    $('#edit-sign-data-save').on('click', function() {

        $.ajax({
            method: 'PUT',
            url: '/api/signs/' + signID,
            data: $('.edit-entry').serialize(),
            success: handleSignUpdateResponse
        })
                $('#edit-sign-modal').modal('hide');

        var dialog = bootbox.dialog({
            message: '<p class="text-center">Refreshing! <img src="https://media.giphy.com/media/GkVvLW2NceSyY/giphy.gif"></p>',
            closeButton: false
        });
        // close alert
        dialog.modal('hide');
    })

    /////////////////////////////
    //*** HANDLE FUNCTIONS ***//
    ///////////////////////////
    function handleSignUpdateResponse(res, err) {
        let signID = res._id
        $('#' + signID).replaceWith(getSignHTML(res));
    }

    function getSignHTML(sign) {

    return `<div class="entry" id="${sign._id}">
        <div class="col-sm-3">
            <div class="sign clearfix">
                <img class="materialboxed" width="300" src="${sign.image_url}">
                <div class="overlay">
                    <p>${sign.street_address}<br>${sign.city}, ${sign.state}</p>
                    <img class="sign-image" src="${sign.image_url}">
                    <p>${sign.description}</p>
                </div>
            </div>
            <button type="button" class="deleteBtn btn btn-default" data-id="${sign._id}">
            <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
            </button>
            <button type="button" data-toggle="modal" data-target="#edit-sign-modal" class="editBtn btn btn-default" data-id="${sign._id}">
            <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
            </button>
        </div>
    </div>`;
    }

    function getAllSignsHTML(signs) {
    return signs.map(getSignHTML).join('');
    }
    // render updates on page
    function render () {
    $signList.empty();
    $signList.append(getAllSignsHTML(allSigns));
    }
    // response for SHOW to request all signs
    function handleSuccess(json) {
    allSigns = json.reverse();
    render();
    }
    // response for CREATE to request new sign entries
    function newSignSuccess(json) {
    $('#submit-entry input').val('');

    // add new sign entry to top of list -- unshift is inverse of push method
    allSigns.unshift(json);

    render();
    }

    function deleteSuccess(res, req) {

        let signID = res._id
        $('#' + signID).remove();
    }

    // response for CREATE to request new sign entries
    function newSignSuccess(json) {
    $('#submit-entry input').val('');

    // add new sign entry to top of list -- unshift is inverse of push method
    allSigns.unshift(json);

    render();
    }
});
