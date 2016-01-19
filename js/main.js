document.addEventListener("DOMContentLoaded", function () {
    var kp = $("#keyPress");
    var kd = $('#keyDown');
    var ku = $('#keyUp');
    var kpc = $('#kpc');
    var kdc = $('#kdc');
    var kuc = $('#kuc');
    var geusses=[];
    var hangman_body=["head","neck","body","right_sleeve","left_sleeve","right_hand","left_hand","right_leg","left_leg","right_foot","left_foot"]

var word="Hangman".toUpperCase();
var word_splited=word.split('');
var word_length=word_splited.length;
var counter=0;
for (i=0;i<word.length;i++){
$("li[data-pos=" +(11-(word.length- i)) + "]").css("background-color", "#4D5258");
}
    $(document).on('keyup',function(e){

        var value = String.fromCharCode(e.keyCode);
        console.log(value);
        geusses.push(value);
        console.log(geusses);
        console.log( geusses[geusses.length-1]);

        if(word.indexOf(geusses[geusses.length-1]) == -1){
        var li = $("<li>").text(geusses[geusses.length-1]);
        $("#wyniki").append(li);
counter+=1;
var part_of_body=$("#"+hangman_body[counter-1]);

part_of_body.removeClass("display");                                                }
      else{
        //var li = $("<li>").text(geusses[geusses.length-1]);
        //$("#correct").append(li);
            for(i=0;i<word.length;i++){
                if(geusses[geusses.length-1]==word[i]){
                      var letter = $("li[data-pos=" +(11-(word.length- i)) + "]");
                      letter.html(geusses[geusses.length-1]);
                                                      }
                                      }


        }
                                                });
});
