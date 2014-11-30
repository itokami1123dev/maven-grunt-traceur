import {Salary} from './model/Salary';
import {SalaryInputCtrl} from './controller/SalaryInputCtrl';
import {SalaryResultCtrl} from './controller/SalaryResultCtrl';

export class Main {
    /**
     * コンストラクター
     */
    constructor() {
    }

    /**
     * 起動処理
     */
    run() {
        var salary = new Salary();
        var models = {
            salary
        };

        new SalaryInputCtrl('js-view-salary-input', models);
        new SalaryResultCtrl('js-view-salary-result', models);

        // 時給計算モデルを初期化
        salary.wage = 700;
        salary.time = 10;
    }
}
