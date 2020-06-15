/*
 * Flux 3D Carousel
 * Author: Dean Coulter
 * Licensed under the MIT license
 * 
 * Version 0.1
 */


(function ($) {
    
    $.fn.carousel3d = function (args) {
        document.getElementById('perspective').addEventListener("touchstart", startTouch, false);
        document.getElementById('perspective').addEventListener("touchmove", moveTouch, false);
        
        var el = ({
            carousel_frame: $(this)
        });

        var size = el.carousel_frame.children().size();
        var panelSize = el.carousel_frame.width();
        var translateZ = Math.round((panelSize / 2) / Math.tan(Math.PI / size) - 100);

        el.carousel_frame.css({
            "transform": "rotateY(0deg) translateZ(-" + translateZ + "px)"
        })

        var rotateY = 0;
        var rotate_int = 0;
        var ry = 360 / size;
        var box = 0;

        function animate_slider() {
            rotateY = ry * rotate_int;
            $("#test").text(rotateY + ", " + rotate_int + ", ");

            for (i = 0; i < size; i++) {
                var z = (rotate_int * ry) + (i * ry);
                el.carousel_frame.children("figure:eq(" + i + ")").css({
                    "transform": "rotateX(" + z + "deg ) translateZ(" + translateZ + "px)"
                });
            }

            rotateY = 0;
            box = 0; // reset rotateY, ready for re-use
        }

        animate_slider();

        $(".next").on("click", function () {
            rotate_int -= 1;
            animate_slider();
        });

        $(".prev").on("click", function () {
            rotate_int += 1;
            animate_slider();
        });

        // Swipe Up / Down / Left / Right
        var initialX = null;
        var initialY = null;

        function startTouch(e) {
            initialX = e.touches[0].clientX;
            initialY = e.touches[0].clientY;
        };

        function moveTouch(e) {
            if (initialX === null) {
                return;
            }
            if (initialY === null) {
                return;
            }
            var currentX = e.touches[0].clientX;
            var currentY = e.touches[0].clientY;
            var diffX = initialX - currentX;
            var diffY = initialY - currentY;

            if (Math.abs(diffX) > Math.abs(diffY)) {
                // sliding horizontally
                if (diffX > 0) {
                    // swiped left
                    console.log("swiped left");
                } else {
                    // swiped right
                    console.log("swiped right");
                }
            } else {
                // sliding vertically
                if (diffY > 0) {
                    // swiped up
                    rotate_int += 1;
                    animate_slider();
                    console.log("swiped up");
                } else {
                    // swiped down
                    rotate_int -= 1;
                    animate_slider();
                    console.log("swiped down");
                }
            }
            initialX = null;
            initialY = null;
            e.preventDefault();
        };

        el.carousel_frame.children().on("click", function () {
            new_int = -1 * $(this).index();
            if (new_int < rotate_int + (-1 * (size / 2))) {
                rotate_int = size + new_int;
            } else {
                rotate_int = new_int;
            }

            animate_slider();
        });

    }
})(jQuery);