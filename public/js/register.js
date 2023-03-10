$(window).on('load', function () {
    $('#signup').click(function () {
        const nameReg = /^[a-z0-9_]{1,30}$/;
        const passReg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;
        const re_pass = $('#re_pass').val();
        const pass = $('#pass').val();
        console.log(pass);
        if (!nameReg.test($('#username').val())) {
            $('#username-err').css('color', 'red');
            return;
        } else {
            $('#username-err').css('color', 'black');
        }
        if (!passReg.test(pass)) {
            $('#pass-err').css('color', 'red');
            return;
        } else {
            $('#pass-err').css('color', 'black');
        }
        if (re_pass !== pass) {
            const err = 'Passwords do not match';
            $('#err').html(err);
            $('#err').css('color', 'red');
            return;
        } else {
            $('#err').html('');
        }
        console.log('ok');
        $('#register-form').submit();
    });
});
