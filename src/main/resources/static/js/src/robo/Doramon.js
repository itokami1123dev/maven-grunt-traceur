(function (ns) {
    "use strict";

    var Doramon = function (classNm) {
        this.el = document.
            getElementsByClassName(classNm)[0];
    };

    Doramon.prototype = {
        constructor: Doramon,
        say: function (msg) {
            this.el.textContent = msg + "!!";
        }
    };

    ns.robo = ns.robo || {};
    ns.robo.Doramon = Doramon;
})(robonyan);