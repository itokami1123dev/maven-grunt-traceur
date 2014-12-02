import {Salary} from './model/Salary';
import {SalaryInputView} from './view/SalaryInputView';
import {SalaryResultView} from './view/SalaryResultView';

import {ApiService} from './service/ApiService';

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
        // データモデルクラス
        var salary = new Salary();
        var models = {
            salary
        };

        // View(Controller)クラス
        new SalaryInputView('js-view-salary-input', models);
        new SalaryResultView('js-view-salary-result', models);

        // モデルの初期データ取得
        var api = new ApiService();
        api.call("hogehoge").then(
            (response) => {
                var {wage, time} = JSON.parse(response);
                salary.wage = wage;
                salary.time = time;
            }
        );
    }
}
