(function (ns) {
    "use strict";

    var init = function () {
        var doramon = new ns.robo.Doramon("js-dramon");
        doramon.say("hello nobicho!");
    };

    document.addEventListener("DOMContentLoaded", init, false);
})(robonyan);