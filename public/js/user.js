$(document).ready(function () {
    $('#input-image').on('change', function () {
        const file = $('#input-image')[0].files[0];
        if (file) {
            let fd = new FormData();
            fd.append('file', file);
            $.ajax({
                url: '/api/file/upload',
                type: 'POST',
                data: fd,
                contentType: false,
                processData: false,
                success: function (res) {
                    console.log(res);
                },
            });
        }
    });

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
