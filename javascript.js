$(function(){
    

    //declare varibales
    var paint = false;//paintorerase or not
    var paint_erase = "paint";//painting or erasing
    var canvas = document.getElementById("painting");//get the canvas and context
    var ctx = canvas.getContext("2d");

    //get the canvas continer
    var container = $("#container");
    //mouse position 
    var mouse = {x:0, y:0};
    
    //set drawing parameters
    ctx.lineWidth = 3;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    //click inside container
    container.mousedown(function(e){
        paint = true;
        ctx.beginPath();
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        ctx.moveTo(mouse.x,mouse.y);
    });

    //move the mouse while holding mouse key
    container.mousemove(function(e){
        
        if(paint == true){
            if(paint_erase == "paint"){
                //get color input
                ctx.strokeStyle = $("#paintColor").val();
            }else{
                ctx.strokeStyle = "white";
            }
            mouse.x = e.pageX - this.offsetLeft;
            mouse.y = e.pageY - this.offsetTop;
            ctx.lineTo(mouse.x,mouse.y);
            ctx.stroke();
        }

    });

    //mouse up >--we are not paintErase any more
    container.mouseup(function(){
        paint = false;
    });

     //if we leave the container
     container.mouseleave(function(){
        paint = false;
    });

    //click on reset button
    $("#reset").click(function(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        paint_erase = "paint";
        $("#erase").removeClass("eraseMode");
    });

    //click on erase button
    $("#erase").click(function(){
        if(paint_erase == "paint"){
            paint_erase = "erase";
        }else{
            paint_erase = "paint";
        }
        $(this).toggleClass("eraseMode");
    });

    //click save button
    $("#save").click(function(){
        localStorage.setItem("imgCanvas",canvas.toDataURL());
    });

    //on load ,load saved work
    if(localStorage.getItem("imgCanvas")!= null){
        var img = new Image();
        img.onload = function(){
            ctx.drawImage(img, 0, 0);
        }
        img.src = localStorage.getItem("imgCanvas");
    };

    //change linewidth using slider
    $("#slider").slider({
        min:3,
        max:30,
        slide: function(event, ui){
            $("#circle").height(ui.value);
            $("#circle").width(ui.value);
            ctx.lineWidth = ui.value;
        }
    });

    //change color input
    $("#paintColor").change(function(){
        $("#circle").css("background-color",$(this).val());
    });




});