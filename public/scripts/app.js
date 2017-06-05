let allSigns = [];
let $signList;
let formUpdate;
let signID;

$(document).ready(function() {
    console.log('app.js loaded!');

    $signList = $('div.entry');

    $.ajax({
        method: 'GET',
        url: '/api/signs',
        success: handleSuccess
    });

    // add a new sign entry
    $('#submit-form').on('submit', function(entry) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/signs',
            data: $(this).serialize(),
            success: newSignSuccess
        })
    })

    // handle functions
    function getSignHTML(sign) {
        return `<div class="sign" data-id="sign-${sign._id}">
            <img src="${sign.image_url}">
            <p>${sign.city}, ${sign.state}</p>
        </div>`;
    }
    function getAllSignsHTML(signs) {
        return signs.map(getSignHTML).join('');
    }
    function render () {
        $signList.empty();

        let signsHTML = getAllSignsHTML(allSigns);

        $signList.append(signsHTML);
    }
    function handleSuccess(json) {
        allSigns = json;
        render();
    }
    function newSignSuccess(json) {
        $('#submit-form input').val('');
        allSigns.push(json);
        render();
    };
});
