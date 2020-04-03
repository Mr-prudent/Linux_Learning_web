
$('.c_btn').click(function () {
    $(this).next().slideToggle();
    if ($(this).children('.iconfont').hasClass('icon-youjiantou')){
        $(this).children('.iconfont').removeClass('icon-youjiantou').addClass('icon-jiantou8');
    }else {
        $(this).children('.iconfont').removeClass('icon-jiantou8').addClass('icon-youjiantou');
    }
});

document.getElementById('player').volume = 0.3;
let data_name = $('.data_name')[0].innerText;

$('.chapter .v_list li').click(function () {
    let path = $(this).children('span')[0].innerText+'.mp4';
    let stat = {
        path:$(this).children('span')[0].innerText,
        stat_id:data_name
    };
    $.post('http://127.0.0.1:8080/status',stat);
    new Promise(resolve => {
        $('.learning .watch').empty();
        resolve();
    }).then(()=>{
        $('.learning .watch').append(`<video id="player" width="620" height="452" controls><source src="/vedio?id=${path}" type="video/mp4"></video>`);
        document.getElementById('player').volume = 0.3;
    }).then(()=>{
        return new Promise(resolve => {
            $('.chapter ul li').removeClass('chapter_color');
            resolve();
        })
    }).then(()=>{
        $(this).addClass('chapter_color');
    })
});
