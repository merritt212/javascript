
function is_draw(map) {
    for ( var i in map) {
        if (map[i] == '')
            return false;
    }
    return true;
}

function check_winner(map) {
    if (map[0] != '') {
        if (map[0] == map[1] && map[0] == map[2]) {
            return map[0];
        }
        if (map[0] == map[4] && map[0] == map[8]) {
            return map[0];
        }
        if (map[0] == map[3] && map[0] == map[6]) {
            return map[0];
        }
    }
    if (map[3] != '') {
        if (map[3] == map[4] && map[3] == map[5]) {
            return map[3];
        }
    }
    if (map[6] != '') {
        if (map[6] == map[7] && map[6] == map[8]) {
            return map[6];
        }
        if (map[6] == map[4] && map[6] == map[2]) {
            return map[6];
        }
    }
    if (map[1] != '') {
        if (map[1] == map[4] && map[1] == map[7]) {
            return map[1];
        }
    }
    if (map[2] != '') {
        if (map[2] == map[5] && map[2] == map[8]) {
            return map[2];
        }
    }
    return null;
}

function get_url_vars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function get_lobby_channel() {
    return (get_url_vars()['lobby'] || 'lobby');
}



function is_auto_play() {
    return ((get_url_vars()['autoplay'])?true:false);
}

function get_max_concurrent() {
    return (get_url_vars()['max'] || 3);
}

function is_debug() {
    return ((get_url_vars()['debug'])?true:false);
}

function debug_log(message) {
    if (is_debug()) {
        console.log(message);
    }
}

function is_display_mode() {
    return (get_url_vars()['display']);
}

function is_uuid_in_lobby(uuid, callback, error) {
    pubnub.where_now({
        'uuid'     : uuid,
        'callback' : function(r) {
             callback((r['channels'].indexOf(get_lobby_channel()) == -1)?false:true);
        },
        'error'    : function(r) {

        }
    });
}

function get_symbol(s) {
    return (get_url_vars()['symbol'] || s || 'X');
}

function get_uid() {
    return (get_url_vars()['uid'] || PUBNUB.uuid() + ((is_auto_play())?'-BOT':'') );
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function get_player_list(callback){
    pubnub.here_now({
        'channel' : get_lobby_channel(),
        'callback' : callback
    })
}

function get_next_move(map, symbol, opponent_symbol) {
    return winCheck(map, symbol, opponent_symbol);
}

function winCheck(map, symbol, opponent_symbol) {
    
    if(map[0] == symbol && map[1] == symbol && map[2] == '') {
        return 2;
    }
    else if(map[1] == symbol && map[2] == symbol && map[0] == '') {
        return 0;
    }
    else if(map[3] == symbol && map[4] == symbol && map[5] == '') {
        return 5;
    }
    else if(map[4] == symbol && map[5] == symbol && map[3] == '') {
        return 3;
    }
    else if(map[6] == symbol && map[7] == symbol && map[8] == '') {
        return 8;
    }
    else if(map[7] == symbol && map[8] == symbol && map[6] == '') {
        return 6;
    }
    else if(map[0] == symbol && map[4] == symbol && map[8] == '') {
        return 8;
    }
    else if(map[4] == symbol && map[8] == symbol && map[0] == '') {
        return 0;
    }
    else if(map[2] == symbol && map[4] == symbol && map[6] == '') {
        return 6;
    }
    else if(map[6] == symbol && map[4] == symbol && map[2] == '') {
        return 2;
    }
    else if(map[0] == symbol && map[2] == symbol && map[1] == '') {
        return 1;
    }
    else if(map[3] == symbol && map[5] == symbol && map[4] == '') {
        return 4;
    }
    else if(map[6] == symbol && map[8] == symbol && map[7] == '') {
        return 7;
    }
    else if(map[0] == symbol && map[6] == symbol && map[3] == '') {
        return 3;
    }
    else if(map[1] == symbol && map[7] == symbol && map[4] == '') {
        return 4;
    }
    else if(map[2] == symbol && map[8] == symbol && map[5] == '') {
        return 5;
    }
    else if(map[0] == symbol && map[4] == symbol && map[8] == '') {
        return 8;
    }
    else if(map[3] == symbol && map[6] == symbol && map[0] == '') {
        return 0;
    }
    else if(map[4] == symbol && map[7] == symbol && map[1] == '') {
        return 1;
    }
    else if(map[5] == symbol && map[8] == symbol && map[2] == '') {
        return 2;
    }
    else if(map[0] == symbol && map[3] == symbol && map[6] == '') {
        return 6;
    }
    else if(map[1] == symbol && map[4] == symbol && map[7] == '') {
        return 7;
    }
    else if(map[2] == symbol && map[5] == symbol && map[8] == '') {
        return 8;
    }
    else if(map[0] == symbol && map[8] == symbol && map[4] == '') {
        return 4;
    }
    else if(map[2] == symbol && map[6] == symbol && map[4] == '') {
        return 4;
    }
    else {
        return computer(map, symbol, opponent_symbol);
    }
}


function computer(map, symbol, opponent_symbol) {

    if(map[0] == opponent_symbol && map[1] == opponent_symbol && map[2] == '') {
        return 2;
    }
    else if(map[1] == opponent_symbol && map[2] == opponent_symbol && map[0] == '') {
        return 0;
    }
    else if(map[3] == opponent_symbol && map[4] == opponent_symbol && map[5] == '') {
        return 5;
    }
    else if(map[4] == opponent_symbol && map[5] == opponent_symbol && map[3] == '') {
        return 3;
    }
    else if(map[6] == opponent_symbol && map[7] == opponent_symbol && map[8] == '') {
        return 8;
    }
    else if(map[7] == opponent_symbol && map[8] == opponent_symbol && map[6] == '') {
        return 6;
    }
    else if(map[0] == opponent_symbol && map[4] == opponent_symbol && map[8] == '') {
        return 8;
    }
    else if(map[4] == opponent_symbol && map[8] == opponent_symbol && map[0] == '') {
        return 0;
    }
    else if(map[2] == opponent_symbol && map[4] == opponent_symbol && map[6] == '') {
        return 6;
    }
    else if(map[6] == opponent_symbol && map[4] == opponent_symbol && map[2] == '') {
        return 2;
    }
    else if(map[0] == opponent_symbol && map[2] == opponent_symbol && map[1] == '') {
        return 1;
    }
    else if(map[3] == opponent_symbol && map[5] == opponent_symbol && map[4] == '') {
        return 4;
    }
    else if(map[6] == opponent_symbol && map[8] == opponent_symbol && map[7] == '') {
        return 7;
    }
    else if(map[0] == opponent_symbol && map[6] == opponent_symbol && map[3] == '') {
        return 3
    }
    else if(map[1] == opponent_symbol && map[7] == opponent_symbol && map[4] == '') {
        return 4;
    }
    else if(map[2] == opponent_symbol && map[8] == opponent_symbol && map[5] == '') {
        return 5;
    }
    else if(map[0] == opponent_symbol && map[4] == opponent_symbol && map[8] == '') {
        return 8;
    }
    else if(map[3] == opponent_symbol && map[6] == opponent_symbol && map[0] == '') {
        return 0;
    }
    else if(map[4] == opponent_symbol && map[7] == opponent_symbol && map[1] == '') {
        return 1;
    }
    else if(map[5] == opponent_symbol && map[8] == opponent_symbol && map[2] == '') {
        return 2;
    }
    else if(map[0] == opponent_symbol && map[3] == opponent_symbol && map[6] == '') {
        return 6;
    }
    else if(map[1] == opponent_symbol && map[4] == opponent_symbol && map[7] == '') {
        return 7;
    }
    else if(map[2] == opponent_symbol && map[5] == opponent_symbol && map[8] == '') {
        return 8;
    }
    else if(map[0] == opponent_symbol && map[8] == opponent_symbol && map[4] == '') {
        return 4;
    }
    else if(map[2] == opponent_symbol && map[6] == opponent_symbol && map[4] == '') {
        return 4;
    }
    else {
        return AI(map, symbol, opponent_symbol);
    }
}

function AI(map, symbol, opponent_symbol) {

    if(map[4] == "") {
        return 4;
    }
    else if(map[0] == "") {
        return 0;
    }
    else if(map[8] == "") {
        return 8;
    }
    else if(map[5] == "") {
        return 5;
    }
    else if(map[1] == "") {
        return 1;
    }
    else if(map[7] == "") {
        return 7;
    }
    else if(map[2] == "") {
        return 2;
    }
    else if(map[6] == "") {
        return 6;
    }
    else if(map[3] == "") {
        return 3;
    }
}
