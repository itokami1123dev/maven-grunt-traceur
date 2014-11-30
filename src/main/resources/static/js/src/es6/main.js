import {Salary} from './model/Salary';
import {SalaryInputView} from './view/SalaryInputView';
import {SalaryResultView} from './view/SalaryResultView';

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

        new SalaryInputView('js-view-salary-input', models);
        new SalaryResultView('js-view-salary-result', models);

        // 時給計算モデルを初期化
        salary.wage = 700;
        salary.time = 10;
    }
}
