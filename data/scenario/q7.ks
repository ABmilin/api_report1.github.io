*select2

[cm]
[free layer="1" name="timer"]
正解！[r][l]
[cm]
第7問[r][l]
69は...[r]
[position height=600 top=100 left=180]
[link storage=q8.ks target=*select1]【１】0100 0101[endlink][r]
[link storage=mistake.ks target=*select9]【２】0100 1001[endlink][r]
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