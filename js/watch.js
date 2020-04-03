
$('.c_btn').click(function () {
    $(this).next().slideToggle();
    if ($(this).children('.iconfont').hasClass('icon-youjiantou')){
        $(this).children('.iconfont').removeClass('icon-youjiantou').addClass('icon-jiantou8');
    }else {
        $(this).children('.iconfont').removeClass('icon-jiantou8').addClass('icon-youjiantou');
    }
});

document.getElementById('player').volume = 0.3;

$('.chapter .v_list li').click(function () {
    let path = $(this).children('span')[0].innerText+'.mp4';
    new Promise(resolve => {
        $('.learning .watch').empty();
        resolve();
    }).then(()=>{
        $('.learning .watch').append(`<video id="player" width="620" height="452" controls><source src="../vedio/${path}" type="video/mp4"></video>`);
    })
});
