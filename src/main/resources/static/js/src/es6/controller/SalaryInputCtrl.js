import {BaseCtrl} from './BaseCtrl';

export class SalaryInputCtrl extends BaseCtrl {
    /**
     * classのコンストラクタ
     * @param {string} cssClassNm 管理対象にするDOMをcssのclass名で指定
     * @param {Object} models
     */
    constructor(cssClassNm, models = {}) {
        super(cssClassNm, models);

        this.wageView = this.find('js-wage');
        this.timeView = this.find('js-time');

        this.salary = models.salary;

        this.setEvent();
    }

    setEvent() {
        this.wageView.addEventListener('change',
                event=>this.salary.wage = this.wageView.value);

        this.timeView.addEventListener('change',
                event=>this.salary.time = this.timeView.value);
    }

    /**
     * 描画処理
     * @override
     */
    render() {
        this.wageView.value = this.salary.wage;
        this.timeView.value = this.salary.time;
    }
}
