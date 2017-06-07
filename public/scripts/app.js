let $signList;
let allSigns = [];

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

        $.ajax({
            method: 'DELETE',
            url: '/api/signs/' + $(this).attr('data-id'),
            success: deleteSuccess
        });
    });

    // editing an entry
    $signList.on('click', '.editBtn', function(event) {
        console.log('clicked edit button ', '/api/signs/'+ $(this).attr('data-id'))
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
            <button type="button" data-toggle="modal" data-target="#edit-sign-modal" class="editBtn btn btn-default btn-lg" data-id="${sign._id}">
            <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> Refresh Yourself
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
    function deleteSuccess(json) {
    let sign = json;

    console.log(json);

    let signID = sign._id;

    // search through array for signID to delete from array
    for(let index=0; index<allSigns.length; index++) {
        if(allSigns[index]._id === signID) {
            allSigns.splice(index);
            // end for loop and splice once signID is found
            break;
        }
    }
    render();
    }

    function editSuccess(json) {

        let sign = json;

        //find sign id stored in HTML as 'data-id'
        let signID = sign._id;


        //     //search through array for signID to edit sign from array
            for(let i=0; i<allSigns.length; i++) {
                if(allSigns[i]._id === signID) {

            //replace sign to update with newly updated version(data)
            signs.findIdAndUpdate(req.params.id);
            break;
        }
    }
    //render all signs to view
    render();
    }
});
