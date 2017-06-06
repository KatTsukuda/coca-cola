let $signList;
let allSigns = [];
let formUpdate;

$(document).ready(function() {
    console.log('app.js loaded!');

    $signList = $('.group');

    // show index of signs
    $.ajax({
        method: 'GET',
        url: '/api/signs',
        success: handleSuccess
    });

    // add new sign entry
    $('#submit-entry').on('submit', function(event) {
        event.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/signs',
            data: $(this).serialize(),
            success: newSignSuccess
        });
    });

    // delete entries
        $('.group').on('click', '.deleteBtn', function(event) {
            console.log('event' + event);
            let signID = $(event.delegateTarget).attr('data-id');
            console.log('sign id ' + signID);
            let deleteSign = allSigns.filter(function(sign) {
                console.log('sign ' + sign);
                return sign._id == signID;
            })[0];
            $.ajax({
                method: 'DELETE',
                url: '/api/signs/59366501f64959bc938d8ac6',
                success: function deleteSuccess(data) {
                    allSigns.splice(allSigns.indexOf(deleteSign), 1);
                    render();
                }
            });
        });

    //*** HANDLE FUNCTIONS ***//

    function getSignHTML(sign) {

        return `<div class="entry">
            <div class="col-md-10 offset-md-2">
                <div class="sign">
                    <img src="${sign.image_url}">
                    <p>${sign.city}, ${sign.state}</p>
                    <button type="button" class="deleteBtn btn btn-default btn-lg" data-id="${sign._id}">
                    <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
                    </button>
                </div>
            </div>
        </div>`;
    }


    // $signList.on('click', '.deleteBtn', function() {
    //     console.log('clicked delete button to', '/api/signs/'+$(this).attr('data-id'));
    //     $.ajax({
    //         method: 'DELETE',
    //         url: '/api/signs/'+$(this).attr('data-id'),
    //         success: deleteSignSuccess,
    //         error: deleteSignError
    //     });
    // });
    //
    // function deleteSignSuccess() {
    //
    // }
    //
    // function deleteSignError() {
    //
    // }
    //

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
        allSigns = json;
        render();
    }
    // response for CREATE to request new sign entries
    function newSignSuccess(json) {
        $('#submit-entry input').val('');

        // add new sign entry to top of list -- unshift is inverse of push method
        allSigns.unshift(json);

        render();
    }
});
