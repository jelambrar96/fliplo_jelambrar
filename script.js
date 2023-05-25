

var twentyfourh = true;
var leadingzero = true;
var fullscreen = false;




var past_h = '';
var past_m = '';


var canvas; 
var ctx;

var is_horizontal = true;

var hour_bgd_w = 0;
var hour_bgd_h = 0;
var min_bgd_w = 0;
var min_bgd_h = 0;

var hour_bgd_x = 0;
var hour_bgd_y = 0;
var min_bgd_x = 0;
var min_bgd_y = 0;

render_ampm = function (text_digits, x, y, w, h) {

    h_font = h;

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold ' + h_font.toString() + "px gluqlo";
    ctx.textBaseline = text_digits;
    ctx.fillText(text_digits, x,y,h,w);

}

render_animation = function () {

}

render_digits = function (text_digits, x, y, w, h) {

    h_font = h;

    ctx.fillStyle = '#FFFFFF';
    ctx.letterSpacing = "0.05em";
    ctx.font = h_font.toString() + "px gluqlo";
    ctx.textBaseline = text_digits;
    ctx.fillText(text_digits, x,y,h,w);

}

render_little_spacing_h = function () {

    h_space_rect_w = hour_bgd_w;
    h_space_rect_h = hour_bgd_h / 100;
    h_space_rect_x = hour_bgd_x;
    h_space_rect_y = hour_bgd_y + hour_bgd_h / 2 - h_space_rect_h / 2;

    ctx.fillStyle = '#000000';
    ctx.fillRect(h_space_rect_x, h_space_rect_y, h_space_rect_w, h_space_rect_h);
    ctx.stroke();
    // ctx.fill();

}

render_little_spacing_m = function () {

    h_space_rect_w = min_bgd_w;
    h_space_rect_h = min_bgd_h / 100;
    h_space_rect_x = min_bgd_x;
    h_space_rect_y = min_bgd_y + min_bgd_h / 2 - h_space_rect_h / 2;

    ctx.fillStyle = '#000000';
    ctx.fillRect(h_space_rect_x, h_space_rect_y, h_space_rect_w, h_space_rect_h);
    ctx.stroke();
    // ctx.fill();

}

render_rectangles = function() {

    is_horizontal =  canvas.width > canvas.height;
    rectsize = is_horizontal ? canvas.height * 0.6 : canvas.width * 0.6;
    spacing = is_horizontal ? canvas.width * 0.031 : canvas.height * 0.031;
    radius = is_horizontal ? canvas.height * 0.05714 : canvas.width * 0.05714;

    hour_bgd_w = rectsize;
    hour_bgd_h = rectsize;
    min_bgd_w = rectsize;
    min_bgd_h = rectsize;

    hour_bgd_x = is_horizontal ? 
                    0.5 * (canvas.width - (0.031 * canvas.width) - (1.2 * canvas.height)) + jitter_width : 
                    0.2 * canvas.width + jitter_width;
    
    hour_bgd_y = is_horizontal ? 
                    0.2 * canvas.height + jitter_height : 
                    0.5 * (canvas.height - (0.031 * canvas.height) - (1.2 * canvas.width)) + jitter_height;

    min_bgd_x = is_horizontal ? 
                    hour_bgd_x + (0.6 * canvas.height) + spacing : 
                    hour_bgd_x;
    min_bgd_y = is_horizontal ? 
                    hour_bgd_y : 
                    hour_bgd_y + (0.6 * canvas.width) + spacing;

    ctx.fillStyle = '#1A1A1A';
    ctx.roundRect(hour_bgd_x, hour_bgd_y, hour_bgd_w, hour_bgd_h, hour_bgd_h * 0.1);
    ctx.stroke();
    ctx.fill();

    ctx.roundRect(min_bgd_x, min_bgd_y, min_bgd_w, min_bgd_h, min_bgd_h * 0.1);
    ctx.stroke();
    ctx.fill();
}

render_clock = function(maxsteps, step) {

    xdelta  = 0.05;
    
    let date = new Date();    
    let hour = date.getHours();
    let minute = date.getMinutes();

    let h = twentyfourh ? hour : (hour + 11) % 12 + 1;
    let str_h = twentyfourh && leadingzero && h < 10 ? '0' + h.toString() : h.toString();
    if (past_h !== str_h) {

        dx = str_h.length === 2 ? hour_bgd_x + hour_bgd_w * 0.08 : hour_bgd_x + hour_bgd_w * 0.40;
        dy = hour_bgd_y + hour_bgd_h * 0.85;
        dw = hour_bgd_w * 0.90;
        dh = hour_bgd_h * 0.90;
        render_digits(str_h, dx, dy, dw, dh);


        if (!twentyfourh) {
            var str_ampm = hour > 11 ? 'PM' : 'AM';
            dx = hour_bgd_x + hour_bgd_w * xdelta;
            dy = hour_bgd_y + hour_bgd_h * 0.85;
            dw = hour_bgd_w * 0.15;
            dh = hour_bgd_h * 0.15;
            render_ampm(str_ampm, dx, dy, dw, dh);    
        }
    
        render_little_spacing_h();

    }


    let str_m = minute < 10 ? '0' + minute.toString() : minute.toString();
    if (past_m !== str_m ) {

        dx = min_bgd_x + min_bgd_w * 0.08;
        dy = min_bgd_y + min_bgd_h * 0.85;
        dw = min_bgd_w * 0.90;
        dh = min_bgd_h * 0.90;
        render_digits(str_m, dx, dy, dw, dh);

        render_little_spacing_m();
    }

	if(step == maxsteps-1) {
		past_h = str_h;
		past_m = str_m;
	}

    // render_digits("HOLA", hour_bgd_x, hour_bgd_y + hour_bgd_h, hour_bgd_w, hour_bgd_h);
}


// Canvas Resize
fitCanvasSize = function () {
    canvas.width = document.documentElement.clientWidth * 0.95;
    canvas.height = document.documentElement.clientHeight * 0.95;
}

// CREATE BACKGROUND
onload_function = function() {
    
    canvas = document.querySelector('canvas');
    if (typeof canvas.getContext === 'undefined') {
        return;
    }
    ctx = canvas.getContext("2d");

    fitCanvasSize();

    display_scale_factor = 1;
	jitter_width  = 0;
	jitter_height = 0;

    render_rectangles();
    render_clock();


};

window.onload = function() {
    onload_function();
    render_rectangles();
}
window.onresize = onload_function;
window.onfocus = onload_function;
setInterval(onload_function, 1000);
