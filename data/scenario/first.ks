
;コメント

*start
*title

[position height=0 top=0]
;メッセージレイヤを非表示にしておく
@layopt layer=message0 visible=false

;背景画像を設定
[image layer="base" page="fore" storage=title.jpg]


[locate x=530 y=470 ]
[button graphic="title/button_start.png" target=*first]



[s]



;ストーリー最初から
*first
[cm]
[freeimage layer=1]
@layopt layer=message0 visible=true




[bg storage=kuro.jpg time=3000]
[wait time=200]
[position height=300 top=300]
◯ ◯ ◯ ◯ ◯ ◯[l][r]
皆さんは上の◯がいくつあるかわかりますよね。[r]
見ただけで6つあることがわかったと思います。[r][l]
[r]
他にも5+4と言われたら9と答えがわかりますよね。[r][l]
これは日頃から10進数に慣れているからではないでしょうか[r][l][cm]

[position height=200 top=500 left=180]
[bg storage=room.jpg time=3000]

[chara_new name="yuko" storage="yuko1.png" jname="ゆうこ"]
[chara_show name="yuko"]

皆さんの生活には数字が溢れていますよね[r][l]
それらのほとんどは10進数で表された物だと思います[r][l]
しかし、パソコンを扱う場合には2進数を扱うことも少なくありません[r][l]
これからもっと2進数に触れていきましょう！[r][p]


[chara_face name="yuko" face="angry" storage="yuko2.png"]

[chara_mod name="yuko" face="angry"]
早めに答えないと勝手にゲームオーバーしちゃうからね！[l][r]
思ったよりはやいよ！[l][r]
問題はだんだん難しくなるけど...[r][l]
簡単だし、まず間違えないよね！[r][l]
[cm]

[chara_hide name="yuko" ]

[position height=600 top=100 left=180]
第1問[l][r]
56は...[r]
[link storage=q2.ks target=*select1]【１】32+16+8[endlink][r]
[link storage=mistake.ks target=*select9]【２】32+16+8+4[endlink][r]

[wait time="3000"]
[r]
[r]
[r]
[r]
[r]
56を分解することが大切だね[r]
56の中に2はいくつあるかな[r]

[call target="*Sub_CountDownFive"]
[jump storage=mistake.ks target=*select9]
[s]


[cm]
*common
[chara_new name="yuko" storage="yuko1.png" jname="ゆうこ"]
[chara_show name="yuko"]
[position height=200 top=500]
あらら...[r][l]
間違っちゃったね[r][l]
たくさん問題を解いて覚えながら、また挑戦してね！[r][p]

[chara_hide name="yuko" ]
[jump target="*start"]




*Sub_CountDownFive
[keyframe name="kanim_timer"]
[frame p=" 0%" scale="1.2"]
[frame p=" 20%" scale="1"]
[endkeyframe]
[image name="timer" layer="1" storage="timer.png" x="440" y="25" width="100"]
[ptext name="timer,timer_text" layer="1" text="5" size="38" x="480" y="33" color="0x000000" bold="bold" edge="0x000000"]
[wait time="1"]
[kanim name="timer" time="1000" keyframe="kanim_timer" count="infinite"]
[wait time="1000"]
[ptext text="4" overwrite="true" name="timer_text" layer="1" x="0" y="0"]
[wait time="1000"]
[ptext text="3" overwrite="true" name="timer_text" layer="1" x="0" y="0"]
[wait time="1000"]
[ptext text="2" overwrite="true" name="timer_text" layer="1" x="0" y="0"]
[wait time="1000"]
[ptext text="1" overwrite="true" name="timer_text" layer="1" x="0" y="0"]
[wait time="1000"]
[free layer="1" name="timer"]
[return]

