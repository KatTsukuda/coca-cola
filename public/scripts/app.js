let $signList;
let allSigns = [];
let formUpdate;
let signID;

$(document).ready(function() {
    console.log('app.js loaded!');

    $signList = $('.group');

    $.ajax({
        method: 'GET',
        url: '/api/signs',
        success: handleSuccess
    });

    // handle functions
    function getSignHTML(sign) {
        console.log("sign" + sign);
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
    function render () {
        $signList.empty();

        let signsHTML = getAllSignsHTML(allSigns);

        $signList.append(signsHTML);
    }
    function handleSuccess(json) {
        allSigns = json;
        render();
    }

});
