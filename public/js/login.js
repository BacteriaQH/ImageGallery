$(window).on('load', function () {
    $('#login').click(function () {
        const name = $('#name').val();
        const password = $('#password').val();
        $('#err').text('');
        $('#noti').text('Loading...');
        login(name, password);
    });
});

const login = async (name, password) => {
    const res = await axios.post('/api/login', { name, password });
    if (res.data.code === 200) {
        $('#noti').text('');
        //save token to local storage
        localStorage.setItem('token', res.data.accessToken);
        //save user to local storage
        localStorage.setItem('user', JSON.stringify(res.data.user));
        //redirect to home page
        window.location.href = '/';
    } else if (res.data.code === 400 || res.data.code === 403) {
        $('#noti').text('');
        $('#err').text(res.data.message);
    }
};

//decode jwt token
function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(
        window
            .atob(base64)
            .split('')
            .map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join(''),
    );

    return JSON.parse(jsonPayload);
}
