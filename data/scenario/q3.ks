*select1

[cm]
[free layer="1" name="timer"]
正解！[r][l]
[cm]
第3問[r][l]
98は...[r]
[position height=600 top=100 left=180]
[link storage=mistake.ks target=*select9]【1】64+32+8[endlink][r]
[link storage=q4.ks target=*select2]【2】64+32+2[endlink][r]
[call target="*Sub_CountDownFive"]
[jump storage=mistake.ks target=*select9]
[s]


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