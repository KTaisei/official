---
title: 'Stophone 開発記'
description: 'Stophoneの技術書'
pubDate: 'dec 20 2024'
heroImage: '/official/walking_phone.jpg'
---

## Stophone

このアプリは、スマートフォンのセンサー（加速度センサー）を利用して、ユーザーが歩きながらスマートフォンを使用しているかどうかをリアルタイムで検知します。歩きスマホが検知されると、警告通知を表示し、安全を促すアプリケーションです。

---

## アプリの機能概要
- 加速度センサーを利用したユーザーの動きの監視
- ユーザーが歩行中かどうかの判定
- 歩行中にスマートフォンを使用しているかどうかの判定
- 歩きスマホを検知した場合の通知機能
- アプリをバックグラウンドで動作させる設定


---

## 技術仕様書

##### 1. 開発環境
	- 言語: Dart
	- フレームワーク: Flutter
	- パッケージ:
	- sensors_plus: 加速度センサーのデータ取得
	- flutter_background: バックグラウンド動作の管理
	- flutter_local_notifications: ローカル通知の送信

---

##### 2. 主な変数とその説明

- `_accelMagnitudes`
    - 型: `List`
    - 加速度センサーのデータから計算された加速度の大きさ（20個分の履歴を保持）。

- `_isWalking`
    - 型: `bool`
    - ユーザーが現在歩行中かどうかを判定するフラグ。

- `_isUsingPhoneWhileWalking`
    - 型: `bool`
    - ユーザーが歩行中にスマートフォンを使用しているかどうかを判定するフラグ。

- `_sensitivity`
    - 型: `double`
    - 歩きスマホ検知の感度を調整するためのしきい値。

- `_detectionTimer`
    - 型: `Timer?`
    - 一定間隔で歩きスマホを検知するためのタイマー。

- `detectionInterval`
    - 型: `int`
    - 歩きスマホ検知タイマーの間隔（ミリ秒）。

- `_warningCount`
    - 型: `int`
    - 歩きスマホの警告回数。

- `flutterLocalNotificationsPlugin`
    - 型: `FlutterLocalNotificationsPlugin`
    - ローカル通知を管理するプラグインインスタンス.

---

##### 3. 歩きスマホ判定の仕組み

##### (1) 加速度センサーのデータ取得

`_startAccelerometer`関数で、sensors_plusパッケージを使用して加速度センサーからデータを取得します。データは以下のように処理されます：

1. センサーの出力値（x, y, z軸の加速度）を受け取ります。
2. 各軸の値から加速度の大きさ（magnitude）を計算します:

```
magnitude = √(x^2 + y^2 + z^2)
```

3. 最新の加速度データ20個を`_accelMagnitudes`に格納します。

---

##### (2)歩行の判定

`_detectWalking`関数で以下を実行します：

1. 過去20個の加速度データの変動（隣接するデータ間の差）を計算します。
2. 変動の平均値が0.5〜2.5の範囲内であれば歩行中と判定します。

```
averageVariation = \frac{\sum_{i=1}^{n} \left| \text{magnitude}_{i} - \text{magnitude}_{i-1} \right|}{n}
```

---

##### (3) 歩きスマホの判定

`_detectPhoneUsageWhileWalking`関数で以下を実行します：

1. 歩行中であることが前提となります。
2. 加速度データの変動が `_sensitivity` を超える回数をカウントします。
3. 変動が一定回数（デフォルト8回）を超える場合、歩きスマホと判定されます。

---

##### (4) 通知の表示

`showNotification`関数で警告を通知:
- 「歩きスマホをやめてください！」という内容のローカル通知を送信。

---

##### 4. バックグラウンド動作

flutter_backgroundパッケージを使用して、アプリがバックグラウンドでも加速度センサーのデータを処理し続けるように設定。

---

##### 5. UIデザイン

|  ウィジェット    |    機能                                       |
|----------------|--------------------------------------------|
| `AppBar`      | アプリのタイトル「歩きスマホ検知アプリ」を表示 |
| `Text`        | ユーザーの状態（歩行中/静止中、歩きスマホ検知/非検知）を表示 |
| `Column`      | 警告回数を含む各状態を縦方向に配置             |


---

##### 6. 実装上の注意点
- センサーのデータ処理:
    - 加速度データはノイズを含むため、短期間で急激に変化するデータはフィルタリングする必要がある。
- 通知機能:
    - バックグラウンド動作時に通知が届くようにするため、Androidの特定の権限が必要。
- 感度調整:
    - ` _sensitivity`変数及び、`averageVariation`変数を調整することで、誤検知を防ぎつつ正確な判定が可能。