const form = document.getElementById('form');
const username = document.getElementById('username');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const jiaose = document.getElementById('jiaose');
let usernameT=0;
let passwordT =0;
let password2T =0;
let jiaoseT =0;
username.onblur = ()=>{
	checkInputs();
	checkName();
};
password.onblur = ()=>{
	checkInputs();
	checkName();
};
password2.onblur = ()=>{
	checkInputs();
	checkName();
};
jiaose.onchange = ()=>{
	checkInputs();
	checkName();
};

form.addEventListener('submit', e => {
	e.preventDefault();
	checkInputs();
	checkName();
	console.log(usernameT,passwordT,password2T,jiaoseT);
	if (usernameT==1&&passwordT==1&&password2T==1&&jiaoseT==1){
		form.submit();
	}else {
		alert('请正确填写！');
	}
});
function checkName() {
	const usernameValue = username.value.trim();
	ajax.post('http://127.0.0.1:8080/check',usernameValue,(resData)=>{
		if (resData == '1'){
			setErrorFor(username, '用户名重复');
			usernameT=0;
		}
		else usernameT=1;
	});
}
function GetRadioValue(RadioName){
	var obj;
	obj=document.getElementsByName(RadioName);
	if(obj!=null){
		var i;
		for(i=0;i<obj.length;i++){
			if(obj[i].checked){
				return obj[i].value;
			}
		}
	}
	return null;
}
function checkInputs() {
	// trim to remove the whitespaces
	const usernameValue = username.value.trim();
	const passwordValue = password.value.trim();
	const password2Value = password2.value.trim();
	const  radioValue = GetRadioValue('jiaose');
	if(usernameValue === '') {
		setErrorFor(username, '用户名不能为空');
		usernameT=0;
	} else {
		setSuccessFor(username);
		// usernameT=1;
	}
	if(!radioValue) {
		setErrorFor(jiaose, '请选择一个角色');
		jiaoseT=0;
	} else {
		setSuccessFor(jiaose);
		jiaoseT=1;
	}
	if(passwordValue === '') {
		setErrorFor(password, '密码不能为空');
		passwordT=0;
	} else {
		setSuccessFor(password);
		passwordT=1;
	}
	if(password2Value === '') {
		setErrorFor(password2, '密码不能为空');
		password2T=0;
	} else if(passwordValue !== password2Value) {
		setErrorFor(password2, '两次密码不正确');
		password2T=0;
	} else{
		setSuccessFor(password2);
		password2T=1;
	}

}

function setErrorFor(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'form-control error';
	small.innerText = message;
}

function setSuccessFor(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-control success';
}

var ajax = {
	getxhr:function(){
		return new XMLHttpRequest();
	},
	get:function (url,fun,sync=true) {
		var xhr = this.getxhr();
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4){
				fun(xhr.responseText);
			}
		};
		xhr.open('get',url,sync);
		xhr.send();
	},
	post:function (url,post_data,fun,sync=true) {
		var xhr = this.getxhr();
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4){
				fun(xhr.responseText);
			}
		};
		xhr.open('post',url,sync);
		xhr.send(post_data);
	}
};
