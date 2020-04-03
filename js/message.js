
$.get('http://127.0.0.1:8080/message',function (message_data) {
    let message_json = JSON.parse(message_data);
    for (let i=0;i<2;i++){
        $('.news_show ul ').append(`<li><span>${message_json[i].add_date} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${message_json[i].teacher_name}：${message_json[i].title}</span></li>`);
    }
});
$.get('http://127.0.0.1:8080/file',function (file_data) {
    $('.files_list .wrap .new_files .file_row .file_list').empty();
    $('.files_list .wrap .new_files .file_row .file_list').append(`<li class="file_list_th clearfloat"><div class="col">文件</div><div class="col">大小</div><div class="col">修改时间</div></li>`);
    let file_arr = JSON.parse(file_data);
    for(let i=0;i<7;i++){
        if (file_arr[i].size!='-'){
            $('.files_list .wrap .new_files .file_row .file_list').append(`<li class="file_list_th clearfloat"><div>${file_arr[i].name}</div><div>${file_arr[i].size}</div><div>${file_arr[i].mtime}</div></li>`);
        }
    }
});


