$(window).on('load', function () {
    $('#login').click(function () {
        console.log('login');
        $('#signup-form').submit();
    });
});
