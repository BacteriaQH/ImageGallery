$(window).on('load', function () {
    $('#delete').click(function () {
        const id = $('#delete').val();
        const csrf = $('#_csrf').val();
        console.log('click', id, csrf);
        $.ajax({
            url: '/admin/user/delete',
            method: 'POST',
            data: {
                id: id,
                _csrf: csrf,
            },
            success: function (data) {
                window.location.assign('/admin/user')
            },
            error: function (err) {
                console.log(err);
            },
        });
    });
    $('#promote').click(function () {
        const id = $('#promote').val();
        const csrf = $('#_csrf').val();
        console.log('click', id, csrf);
        $.ajax({
            url: '/admin/user/promote',
            method: 'POST',
            data: {
                id: id,
                _csrf: csrf,
            },
            success: function (data) {
                window.location.assign('/admin/user')
            },
            error: function (err) {
                console.log(err);
            },
        });
    });
});
