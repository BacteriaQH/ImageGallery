$(document).ready(function () {
    $('.small-image').click(function () {
        var path = $(this).attr('src');
        $('.container').css('filter', 'blur(3px)');
        $('#large-image').attr('src', path);
        $('#image-popup').css('display', 'flex');
    });
    $('#close-btn').click(function () {
        $('#image-popup').css('display', 'none');
        $('.container').css('filter', 'blur(0px)');
    });
});
