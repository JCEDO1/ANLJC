
var tarHtml = ''
var coachName,leaderName,unitName;

window.onload = function (){

  h = function(arr){
    let dh = '';

    for(let i = 0 ; i < arr.length ; i++){
      if(i == 0){
        dh +=   '&nbsp;&nbsp;<span>'+arr[i].id+'</span>'+
          '&nbsp;&nbsp;&nbsp;<span>'+arr[i].name+'</span>';
      }else if((i+1)%3 == 0){
        dh +=   '&nbsp;&nbsp;<span>'+arr[i].id+'</span>'+
          '&nbsp;&nbsp;&nbsp;<span>'+arr[i].name+'</span>'+
          '</p>'+
          '<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
      }else{
        dh +=   '&nbsp;&nbsp;<span>'+arr[i].id+'</span>'+
          '&nbsp;&nbsp;&nbsp;<span>'+arr[i].name+'</span>'
      }
    }
    dh += '</p>';
    let index = dh.indexOf('<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>');
    if(index !== -1){
      dh = dh.slice(0,index);
    }
    return dh;
  }



  var xhr = new XMLHttpRequest();
  xhr.open('POST','http://47.106.15.217:81/v1/control/eachunitpeople',true);
  xhr.setRequestHeader("Content-Type","application/json; charset=utf-8");

  xhr.onreadystatechange = function (){
    if(xhr.readyState == 4){
      if(xhr.status >= 200 && xhr.status <= 300){
        var resData = JSON.parse(xhr.responseText);
        msg = resData.msg;
        console.log(msg);
        for(let i = 0 ; i < msg.length ; i++){
          unitName = msg[i].unitname;
          leaderName = msg[i].leadername;
          coachName = msg[i].coachname;
          tarHtml += '<p style="margin-top:30px;">'+
            '<h1>'+msg[i].unitname+'</h1>'+
            '</p>'+
            '<p style="text-indent: 3em;">'+
            '<span>领队:&nbsp;&nbsp;'+msg[i].leadername+'</span>'+
            '</p>'+
            '<p style="text-indent: 3em;">'+
            '<span>教练:&nbsp;&nbsp;'+msg[i].coachname+'</span>'+
            '</p>';
          for(var prop in msg[i]){
            if(prop == 'adult' &&  msg[i][prop].length!==0){
              tarHtml += '<p style="text-indent:1em;">'+
                '<span>青成年组：</span>'+
                h(msg[i][prop])+
                '</p>';
              continue;
            }else if(prop == 'teen' && msg[i][prop].length!==0){
              tarHtml += '<p style="text-indent:2em;">'+
                '<span>少年组：</span>'+
                h(msg[i][prop])+
                '</p>';
              continue;
            }else if(prop == 'child' && msg[i][prop].length!==0){
              tarHtml += '<p style="text-indent:2em;">'+
                '<span>儿童组：</span>'+
                h(msg[i][prop])+
                '</p>';
              continue;
            }
          }

        }
        var u = document.getElementById('unitData');
        u.innerHTML = tarHtml;
      }
    }
  }
  xhr.send(JSON.stringify({"match_id":6}));
}
