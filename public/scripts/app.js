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
        $signList.on('click', '.deleteBtn', function(event) {
            console.log('clicked delete button ', '/api/signs/' + $(this).attr('data-id'));

            // let signID = $(event.delegateTarget).attr('data-id');
            //
            // console.log(signID);

            // let deleteSign = allSigns.filter(function(sign) {
            //
            // });


            $.ajax({
                method: 'DELETE',
                url: '/api/signs/' + $(this).attr('data-id'),
                success: deleteSuccess
            });
        });

    //*** HANDLE FUNCTIONS ***//

    function getSignHTML(sign) {

        return `<div class="entry">
            <div class="col-sm-3">
                <div class="sign clearfix">
                    <img src="${sign.image_url}">
                    <div class="overlay">
                        <p class="description">${sign.city}, ${sign.state}</p>
                        <p class="description">${sign.description}</p>
                    </div>
                </div>
                <button type="button" class="deleteBtn btn btn-default btn-lg" data-id="${sign._id}">
                <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
                </button>
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
    function deleteSuccess(json) {
        let sign = json;

        console.log(json);

        let signID = sign._id;
        console.log('delete sign entry ' + signID);

        // search through array for signID to delete from array
        for(let index=0; index<allSigns.length; index++) {
            if(allSigns[index]._id === signID) {
                allSigns.splice(index, 1);
                // end for loop and splice once signID is found
                break;
            }
        }
        render();
    }
});
