window.requestAnimFrame = ( function() {
    return  window.requestAnimationFrame       || 
            window.webkitRequestAnimationFrame || 
            window.mozRequestAnimationFrame    || 
            window.oRequestAnimationFrame      || 
            window.msRequestAnimationFrame     || 
            function(draw, element) {
                window.setTimeout(draw, 1000 / 60);
            };
})();

animate = function(timestamp) {
    requestAnimFrame(animate);
    draw(timestamp);
}