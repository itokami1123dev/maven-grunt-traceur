HTML5+α @福岡 - 第22回 発表向け資料
================================

20:30 ECMAScript6について（仮）  
http://html5fukuoka.doorkeeper.jp/events/17567  

### 1. ECMAScript 6 ってどんなの？

> ”ECMAScript 6 は "Harmony" または "ES.next" のコードネームで呼称される、JavaScript の次期標準仕様”
https://developer.mozilla.org/ja/docs/Web/JavaScript/ECMAScript_6_support_in_Mozilla

> ”ECMAに提出する正式のリリースは2015年の6月となる予定”
http://jser.info/post/88276341744/2014-06-09-js-bluebird/

### 2. 試しにES6つかってみたいな

>各ライブラリの対応状況  
http://kangax.github.io/compat-table/es6/

#### ES6を今のブラウザで動かすためのコンパイラ
2014/11/30の時点では..
- 6to5  
  GitHubの☆1,207 / 対応度 59%  
  https://github.com/6to5/6to5  

- google/traceur-compiler  
  GitHubの☆3,703 / 対応度 60%  
  https://github.com/google/traceur-compiler  

- toshok/echo-js  
  GitHubの☆143 / 対応度 66%
  https://github.com/toshok/echo-js  

- google/closure-compiler  
  GitHubの☆786 / 対応度 30%  
  https://github.com/google/closure-compiler

今回は tracerurで試してみました。

### 3. 実際にサンプルを作って試してみました。

#### let と For-Of構文

データモデルが変更時
登録されているView(Controller)配列の
描画メソッドを呼ぶとき...  
この例では*"this.listner"*が
*"View描画メソッド"*の配列

ES5
```JavaScript
notifyListeners() {
  this.listeners.forEach(function (listener) {
    listener();
  });
}
```

ES6
```JavaScript
notifyListeners() {
  for (let listener of this.listeners) {
    listener();
  }
}
```

let はブロック内のみに有効  
for inはkey名をループするがfor ofは値でループできる

#### アロー関数

さっきのはアロー関数で書くこともできる

ES5
```JavaScript
notifyListeners() {
  this.listeners.forEach(function (listener) {
    listener();
  });
}
```

ES6
```JavaScript
notifyListeners() {
  this.listeners.forEach(
    listener => listener()
  );
}
```

今回のサンプルではDOM操作イベント登録でつかっている

```JavaScript
setEvent() {
  this.wageView.addEventListener('change',
    (event) => {
      this.salary.wage = this.wageView.value;
    }
  );

  this.timeView.addEventListener('change',
    event => this.salary.time = this.timeView.value
  );
}
```

引数のカッコや処理スコープの波カッコは省略できる


#### クラス

モデルクラスの基本となるクラスを作成  

ES5
```JavaScript
var BaseModel = function() {
    this.listner = [];
};

BaseModel.prototype.addListner = function (callback) {
  this.listner.push(callback);
}
// ....省略 ...
```

ES6
```JavaScript
class BaseModel {
  constructor() {
    this.listner = [];
  }

  addListner(callback) {
    this.listner.push(callback);
  }

  // ....省略 ...
}
```

#### モジュール

ベースとなるモデルクラスを実際に読み込みます

頭にexportをつけると他のファイルでimportできます。

BaseModel.js
```JavaScript
export class BaseModel {
  constructor() {
    this.listner = [];
  }
  // ...省略...
}
```

Salary.js
```JavaScript
import {BaseModel} from './BaseModel';
```

#### 継承

継承もできます。  
今回はモデルの基本機能を継承した
時給計算モデルを作成しました

ES5
```JavaScript
var Salary = function() {
  BaseModel.call(this)
  this._wage = 0;
  this._time = 0;
};
Salary.prototype = Object.create(BaseModel.prototype);
Salary.ptorotype.constructor = Salary;
Salary.ptorotype.compute = function() {
  return this._wage * this._time;
}
// ... 省略...
```

ES6
```JavaScript
class Salary extends BaseModel {
  constructor() {
    super();
    this._wage = 0;
    this._time = 0;
  }
  compute() {
    return this._wage * this._time;
  }
  // ... 省略 ...
}
```

#### 引数にデフォルトのパラメータ  

Viewクラスは第２引数を省略可能とします  
その場合ES5だと..

ES5
```JavaScript
var BaseView = function(cssClassNm, models) {
  models = models || {};
  this.el = document.getElementsByClassName(cssClassNm)[0];

  // ... 省略 ...
}
```

ES6
```JavaScript
class BaseView {
  constructor(cssClassNm, models = {}) {
    this.el = document.getElementsByClassName(cssClassNm)[0];

  // ... 省略 ...
  }
}
```

このサンプルの起動方法
-------------------
```bash
$ mvn clean compile

$ mvn spring-boot:run
```
