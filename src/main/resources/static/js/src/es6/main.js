import {Doramon} from './robo/Doramon';

export class MainApp {
    /**
     * コンストラクター
     */
    constructor() {
    }

    /**
     * めそっどー
     */
    run() {
        var doramon = new Doramon("js-dramon");
        doramon.say("hello nobicho");
    }
}

