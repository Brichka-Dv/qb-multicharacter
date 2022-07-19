MultiCharacters = {}
var selectedChar = null;
var WelcomePercentage = "30vh"
var Loaded = false;
var clickDisable = false;
var cDataPed = $(this).data('cData');


$(document).ready(function (){
    window.addEventListener('message', function (event) {
        var data = event.data;
        if (data.action == "ui") {
            if (data.toggle) {
                    refreshCharacters()
					loadingCharacter()
                    start()
            } else {
                $('.container').fadeOut(250);
                MultiCharacters.resetAll();
            }
        }
        if (data.action == "setupCharacters") {
            setupCharacters(event.data.characters)
        }
        if (data.action == "logout") {
            refreshCharacters()
            start()
        }
        if (data.action == "setupCharInfo") {
            setupCharInfo(event.data.chardata)
        }
        if (data.action == "activeClick") {
            loadingCharacter(false);
        }
        if (data.action == "activeLoading") {
            loadingCharacter(true);
        }
    });
    $('.datepicker').datepicker();
});

loadingCharacter = function(val) {
    if (val) {
        $(".welcomescreen").fadeIn(150);
        clickDisable = true;
    } else {
        $(".welcomescreen").fadeOut(150);
        clickDisable = false;
        if (selectedChar !== null) {
            $('.char-selector').css({"visibility":"visible"})
        } else {
            $('.char-selector').css({"visibility":"hidden"});
            resetCharSelector()
        }
    }
}

$('.char-selector').click(function(){
    setTimeout(function(){
    if ($('.char-buttons').css("visibility") == "visible") {
        $('.char-buttons').css({"visibility":"visible"}).animate({opacity:1.0},1000);
    } else {
        $('.char-buttons').css({"visibility":"visible"}).animate({opacity:1.0},1000);
    }
	}, 300);
});

bodyclick = function(){
    if (clickDisable) {
        return false;
    }   
}


resetCharSelector = function() {
	 setTimeout(function(){
    $('.char-selector').css({"visibility":"hidden"}) 
    $('.char-buttons').css({"visibility":"visible"}).animate({opacity:1.0},1000);
	}, 300);
}

loadingIcon = function(tiempo) {
    $(".welcomescreen").fadeIn(1000);


    var loadingProgress = 0;
    var loadingDots = 0;
    var DotsInterval = setInterval(function() {
        loadingDots++;
        loadingProgress++;
    }, 500);

    setTimeout(function(){
        clearInterval(DotsInterval);
        loadingProgress = 0;
    }, 300);
}

$(document).ready(function(){
    $('.collapsible').collapsible();
    $('.tooltipped').tooltip()
});
      

let test = true

start = function() {
    $('.container').show();
    $('.bars').fadeOut(0)
	$('.char-buttons').fadeOut(0);
	$('.char-selector').show(); 
    $(".welcomescreen").fadeOut(0); 
    MultiCharacters.resetAll();
    setTimeout(function(){
           setTimeout(() => {   
        loadingIcon(300);   
        setTimeout(function(){
            $.post('https://qb-multicharacter/setupCharacters');
            setTimeout(function(){
                MultiCharacters.resetAll();
									$.post('https://qb-multicharacter/cDataPed', JSON.stringify({
                cData: cDataPed
    }));
                $(".welcomescreen").fadeOut(150);
                $('.bars').fadeIn(1000)
                //MultiCharacters.fadeInDown('.character-info', '20%', 400);
                MultiCharacters.fadeInLeft('.characters-list', '7%', 400);
                $.post('https://qb-multicharacter/removeBlur');
            }, 2000);
        }, 2000);
    }, 500);
    }, test && 1 || 1000);
}

$(".pinfodata p").click(function(){
    
});

let VipConfig = [
    cola = {

    },
    
]

let vipstate = [
    buyed = 'green'
]

setPlayerValues = function(data) {

    setAllHide(true)
    $('#streamermode').prop('checked', true);
    $('.steamname').html("Martu");
    $('.steam').html('No tengo xd');
    $('.discord').html("test");
    $('.icoins').html("0");
    $('.vip').html("Desactivado");
    let htmlinsert = '<li><div class="collapsible-header vipcolap"><i class="material-icons">filter_drama</i>Cola prioritaria<span class="new badge yellow">4</span></div><div class="collapsible-body bodycolap"><p></p></div></li>'
}

$( "#streamermode" ).change(function() {
    let valstreamer = $(this).prop('checked')
    setAllHide(valstreamer)
    $.post('https://qb-multicharacter/streamermode', JSON.stringify({val: valstreamer}));
});

setAllHide = function(val) {
    $('.playerinfoslot').each(function(i, obj) {
       let inf = $(obj).find( ".pinfodata p" )
       let btn = $(obj).find( ".hidebtn" )
       if (val) {
           $(inf).addClass('hideinfo')
           $(btn).html('visibility_off')
        } else {
            $(inf).removeClass('hideinfo')
            $(btn).html('visibility')
        }
    });
}

$(".hidebtn").click(function(){
    let val = $('.'+$(this).data("val"))
    if (val.hasClass('hideinfo')) {
        val.removeClass('hideinfo')
        $(this).html('visibility')
    } else {
        val.addClass('hideinfo')
        $(this).html('visibility_off')
    }
});

let accountOpen = false;

$('#paccountselect').click(function(e){
    if ($(this).hasClass('blocked')) {
        return
    }
});


$('.disconnect-btn').click(function(e){
    e.preventDefault();

    $.post('https://qb-multicharacter/closeUI');
    $.post('https://qb-multicharacter/disconnectButton');
});

function setupCharInfo(cData) {
    if (cData == 'empty') {
        $('a.char-info').attr('<div class="tooltipchar"><span id="no-char">The selected character slot is not in use yet.</span></div>');
        $('.char-info').tooltip();
        $('.char-info').addClass('disabled')
        $('.char-delete').addClass('disabled')
    } else {
        var gender = "Man"
        if (cData.charinfo.gender == 1) { gender = "Woman" }
        $('.char-info').removeClass('disabled')
        $('.char-delete').removeClass('disabled')
        $('a.char-info').attr('data-tooltip','<div class="tooltipchar">' +
        '<div class="character-info-box"><span id="info-label">Name: </span><span class="char-info-js">'+cData.charinfo.firstname+' '+cData.charinfo.lastname+'</span></div>' +
        '<div class="character-info-box"><span id="info-label">Birth date: </span><span class="char-info-js">'+cData.charinfo.birthdate+'</span></div>' +
        '<div class="character-info-box"><span id="info-label">Gender: </span><span class="char-info-js">'+gender+'</span></div>' +
        '<div class="character-info-box"><span id="info-label">Nationality: </span><span class="char-info-js">'+cData.charinfo.nationality+'</span></div>' +
        '<div class="character-info-box"><span id="info-label">Job: </span><span class="char-info-js">'+cData.job.label+'</span></div>' +
        '<div class="character-info-box"><span id="info-label">Gang: </span><span class="char-info-js">'+cData.gang.label+'</span></div>' +
        '<div class="character-info-box"><span id="info-label">Cash: </span><span class="char-info-js">$ '+cData.money.cash+'</span></div>' +
        '<div class="character-info-box"><span id="info-label">Bank: </span><span class="char-info-js">$ '+cData.money.bank+'</span></div><br>' +
        '<div class="character-info-box"><span id="info-label">Phone number: </span><span class="char-info-js">'+cData.charinfo.phone+'</span></div>' +
        '<div class="character-info-box"><span id="info-label">Account number: </span><span class="char-info-js">'+cData.charinfo.account+'</span></div></div>');
        $('.char-info').tooltip();
    }
}

function setupCharacters(characters) {
    $.each(characters, function(index, char){
        $('#char-'+char.cid).html("");
        $('#char-'+char.cid).data("citizenid", char.citizenid);
        setTimeout(function(){
            $('#char-'+char.cid).html('<span id="slot-icon2" class="material-icons">account_box</span><span id="slot-name">'+char.charinfo.firstname+' '+char.charinfo.lastname+'</span>');
            $('#char-'+char.cid).data('cData', char)
            $('#char-'+char.cid).data('cid', char.cid)
        }, 100)
    })
}

$(document).on('click', '#close-log', function(e){
    e.preventDefault();
    selectedLog = null;
    $('.welcomescreen').css("filter", "none");
    $('.server-log').css("filter", "none");
    $('.server-log-info').fadeOut(150);
    logOpen = false;
});

$(document).on('click', '.character', function(e) {
    if ($(this).hasClass('blocked')) {
        return
    }
	
    var cDataPed = $(this).data('cData');
    e.preventDefault();
    resetCharSelector();
    

    if (selectedChar === null) {
        selectedChar = $(this);
        if ((selectedChar).data('cid') == "") {
            $(selectedChar).addClass("char-selected");
            setupCharInfo('empty')
            $.post('https://qb-multicharacter/cDataPed', JSON.stringify({
                cData: cDataPed
            }));
            clickDisable = true;
        } else {
            $(selectedChar).addClass("char-selected");
            setupCharInfo($(this).data('cData'))
            $.post('https://qb-multicharacter/cDataPed', JSON.stringify({
                cData: cDataPed
            }));
            clickDisable = true;
        }
		setTimeout(function(){
	    $('.char-buttons').fadeIn(300);
    }, 300);
    } else if ($(selectedChar).attr('id') !== $(this).attr('id')) {
        $(selectedChar).removeClass("char-selected");
        selectedChar = $(this);
        if ((selectedChar).data('cid') == "") {
            $(selectedChar).addClass("char-selected");
            setupCharInfo('empty')
            $.post('https://qb-multicharacter/cDataPed', JSON.stringify({
                cData: cDataPed
            }));
            clickDisable = true;
        } else {
            $(selectedChar).addClass("char-selected");
            setupCharInfo($(this).data('cData'))
            $.post('https://qb-multicharacter/cDataPed', JSON.stringify({
                cData: cDataPed
            }));
            clickDisable = true;
        }
    }
});

$(document).on('click', '#create', function(e){
    e.preventDefault();
    $.post('https://qb-multicharacter/createNewCharacter', JSON.stringify({
        firstname: $('#first_name').val(),
        lastname: $('#last_name').val(),
        nationality: $('#nationality').val(),
        birthdate: $('#birthdate').val(),
        gender: $(SelectedCharGender),
        cid: $(selectedChar).attr('id').replace('char-', ''),
    }));
    $(".container").fadeOut(150);
    $('.characters-list').css("filter", "none");
    $('.character-info').css("filter", "none");
    MultiCharacters.fadeOutDown('.Expert-NewCharacterRegister', '125%', 400);
    refreshCharacters()
});

$(document).on('click', '.Expert-Register-ImageStyle', function(e){
    SelectedCharGender = null
    var genders = $(this).data('gender');
    if(genders == "man"){
        SelectedCharGender = "Male"
        $('#Expert-man').attr('src','https://cdn.discordapp.com/attachments/877595408325574656/878350193475588146/male2.png');
        $('#Expert-woman').attr('src','https://cdn.discordapp.com/attachments/877595408325574656/878254563063369818/female.png');
    }else{
        SelectedCharGender = "Female"
        $('#Expert-woman').attr('src','https://cdn.discordapp.com/attachments/877595408325574656/878350146792984616/female2.png');
        $('#Expert-man').attr('src','https://cdn.discordapp.com/attachments/877595408325574656/878254579622502471/male.png');
    }
});

$(document).on('click', '#accept-delete', function(e){
    $.post('https://qb-multicharacter/removeCharacter', JSON.stringify({
        citizenid: $(selectedChar).data("citizenid"),
    }));
    $('.SelectChar-NewMenu').fadeOut(150);
    refreshCharacters()
    start()
});


$(document).on('click', '#cancel-delete', function(e){
    e.preventDefault();
    $('.characters-block').css("filter", "none");
    $('.SelectChar-NewMenu').fadeOut(150);
});

function refreshCharacters() {
    $('.characters-list').show();  
    setTimeout(function(){
        $(selectedChar).removeClass("char-selected");
        selectedChar = null;
        $("#delete").css({"display":"none"});
        $("#play").css({"display":"none"});
        $('.char-buttons').fadeOut(300);
        MultiCharacters.resetAll();
        $('.char-selector').css({"visibility":"visib"});
        resetCharSelector()
    }, 100)
}

function closereg(){
    $('.characters-list').css("filter", "none")
    $('.character-info').css("filter", "none")
    MultiCharacters.fadeOutDown('.Expert-NewCharacterRegister', '125%', 400);
}

function closedel(){
    $('.characters-block').css("filter", "none");
    $('.SelectChar-NewMenu').fadeOut(250);
}

chatplay = function(){
    setTimeout(function(){
    $('.char-buttons').css({"visibility":"hidden"}).animate({opacity:1.0},1000);
    }, 300);
    $('.tooltipped').tooltip('close');
	
    var charData = $(selectedChar).data('cid');
    if (selectedChar !== null) {
        if (charData !== "") {
            $.post('https://qb-multicharacter/selectCharacter', JSON.stringify({
                cData: $(selectedChar).data('cData')
            }));
            setTimeout(function(){
                MultiCharacters.fadeOutDown('.characters-list', "-40%", 400);
                MultiCharacters.fadeOutDown('.character-info', "-40%", 400);
                $("#delete").css({"display":"none"});
                $("#play").css({"display":"none"});
                MultiCharacters.resetAll();
            }, 1500);
        } else {
            $('.characters-list').css("filter", "blur(2px)")
            $('.character-info').css("filter", "blur(2px)")
            MultiCharacters.fadeInDown('.Expert-NewCharacterRegister', '25%', 400);
        }
    }
    $('.char-selector').css({"visibility":"hidden"});
    resetCharSelector();
}

deletePlayer = function(){
    var charData = $(selectedChar).data('cid');
    if (selectedChar !== null) {
        if (charData !== "") {
            $('.characters-block').css("filter", "blur(2px)")
            $('.SelectChar-NewMenu').fadeIn(150);
        }
    }
}

MultiCharacters.fadeOutUp = function(element, time) {
    $(element).css({"display":"block"}).animate({top: "-80.5%",}, time, function(){
        $(element).css({"display":"none"});
    });
}

MultiCharacters.fadeOutDown = function(element, percent, time) {
    if (percent !== undefined) {
        $(element).css({"display":"block"}).animate({top: percent,}, time, function(){
            $(element).css({"display":"none"});
        });
    } else {
        $(element).css({"display":"block"}).animate({top: "103.5%",}, time, function(){
            $(element).css({"display":"none"});
        });
    }
}

MultiCharacters.fadeInDown = function(element, percent, time) {
    $(element).css({"display":"block"}).animate({top: percent,}, time);
}

MultiCharacters.fadeInLeft = function(element, percent, time) {
    $(element).css({"display":"block"}).animate({left: percent,}, time);
}

MultiCharacters.resetAll = function() {
    $('.characters-list').hide();
    $('.characters-list').css("top", "-40");
    $('.character-info').hide();
    $('.character-info').css("top", "-40");
    $('.welcomescreen').css("top", WelcomePercentage);
    $('.server-log').show();
    $('.server-log').css("top", "25%");
}

if (test) {
    start()
}
