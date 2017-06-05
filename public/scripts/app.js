$(document).ready(function() {
    console.log('app.js loaded!');
    $.ajax({
        method: 'GET',
        url: '/api/signs',
        success: handleSuccess
    });
});

function handleSuccess(json) {
    allSigns = json;
    render();
}
