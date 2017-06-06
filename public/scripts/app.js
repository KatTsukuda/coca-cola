let $signList;
let allSigns = [];
let formUpdate;
let signID;

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
    $('#submit-entry').on('submit', function(entry) {
        entry.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/signs',
            data: $(this).serialize(),
            success: newSignSuccess
        })
    })

    // handle functions
    function getSignHTML(sign) {
        return `<div class="entry clearfix">
            <div class="col-md-10 offset-md-2">
                <div class="sign" data-id="sign-${sign._id}">
                <img src="${sign.image_url}">
                <p>${sign.city}, ${sign.state}</p>
                </div>
            </div>
        </div>`;
    }
    function getAllSignsHTML(signs) {
        return signs.map(getSignHTML).join('');
    }
    // render updates on page
    function render () {
        $signList.empty();

        let signsHTML = getAllSignsHTML(allSigns);

        $signList.append(signsHTML);
    }
    // response for GET request for all signs
    function handleSuccess(json) {
        allSigns = json;
        render();
    }
    // response for PUT request for new sign entries
    function newSignSuccess(json) {
        $('#submit-form input').val('');
        allSigns.push(json);
        render();
    }
});
