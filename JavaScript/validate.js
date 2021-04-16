var pendingTasks =[];

function validatelogin() 
{
    var username = document.getElementById("uname");
    var password = document.getElementById("password");
    var uerror= document.getElementById("uerror");
    let perror = document.getElementById("perror");

    if(username.value == "admin"){
        uerror.innerText = "Valid Username.";
        username.style.border="2px solid green";       
    }
    else{
        uerror.innerText="Invalid Username";
        username.style.border="2px solid red";
        return false;
    }

    if(password.value == "12345"){
        perror.innerText = "Valid Password."
        return true;        
    }
    else{
        perror.innerText="Invalid password";
        password.style.border="2px solid red";
        return false;
    }

}

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function(){
    if(this.readyState==4&&this.status==200){
        var response = JSON.parse(this.responseText);
        var output = [];
        var task ="";
        var x=[];

        for(var i=0;i<response.length;i++){
            output[i] =response[i].title;
            x[i] =response[i].completed;
        }
        var j=0;
        for(var y=0;y<x.length;y++){
            if(x[y] == true){
                task +=  `<input id = ${y} type=checkbox checked disabled=true>`+"&ensp;&ensp;"+output[y]+"<br><br>";
            }
            else{
                pendingTasks[j] = response[y];
                j++;
                task +=  `<input type=checkbox id = ${y} onclick=countCheckBox(this);>`+"&ensp;&ensp;"+output[y]+"<br><br>";
            }
            
        }
        document.getElementById("list").innerHTML=task;
    }
}

xhttp.open("Get","https://jsonplaceholder.typicode.com/todos",true);
xhttp.send();



var tickCount = 0;
function countCheckBox(input){
    doneFiveTasks(input)
    .then(showAlert)
    .then(function(){
        tickCount = 0;
    });
}

function doneFiveTasks(input){
    return new Promise(function(resolve){
        if(input.checked){
            tickCount++;
            pendingTasks[input.id].completed = true;
        }
        else{
            tickCount--;
            pendingTasks[input.id].completed = false;
            if(tickCount < 0){
                tickCount = 0;
            }
        }
        if(tickCount >= 5){
            resolve();
        }
    });
}

function showAlert(){
    return new Promise(function(resolve){
        setTimeout(function(){
            let userResponse = alert(`Congrats! You've done ${tickCount} tasks.`);
            if(userResponse == true){
                resolve();
            }
        },100);
    });
}