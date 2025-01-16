tyrano.plugin.kag.tag.playbgm={vital:["storage"],pm:{loop:"true",storage:"",fadein:"false",time:2e3,volume:"",buf:"0",target:"bgm",sprite_time:"",pause:"false",seek:"",html5:"false",click:"false",stop:"false",base64:""},waitClick:function(pm){this.kag.weaklyStop();$(".tyrano_base").on("click.bgm",(()=>{this.kag.readyAudio();this.play(pm);$(".tyrano_base").off("click.bgm")}))},start:function(pm){const should_next_order="false"===pm.stop;if("bgm"==pm.target&&!1===this.kag.stat.play_bgm){should_next_order&&this.kag.ftag.nextOrder();return}if("se"==pm.target&&!1===this.kag.stat.play_se){should_next_order&&this.kag.ftag.nextOrder();return}let can_ignore_in_no_ready=!1;if(!should_next_order){can_ignore_in_no_ready=!0;"false"===pm.can_ignore&&(can_ignore_in_no_ready=!1)}"pc"===$.userenv()?this.kag.tmp.ready_audio?this.play(pm):can_ignore_in_no_ready||this.waitClick(pm):this.kag.stat.is_skip&&"se"===pm.target?should_next_order&&this.kag.ftag.nextOrder():this.kag.tmp.ready_audio?this.play(pm):can_ignore_in_no_ready||this.waitClick(pm)},parseMilliSeconds:function(_str){const str=$.trim(_str),colon_count=(str.match(/:/g)||[]).length;if(0===colon_count)return parseInt(str);let hours_str="0",minutes_str="0",seconds_str="0",milli_seconds_str="0";const colon_hash=str.split(":");if(1===colon_count){minutes_str=colon_hash[0];seconds_str=colon_hash[1]}else{hours_str=colon_hash[colon_hash.length-3];minutes_str=colon_hash[colon_hash.length-2];seconds_str=colon_hash[colon_hash.length-1]}const dot_hash=seconds_str.split(".");if(dot_hash[1]){seconds_str=dot_hash[0];milli_seconds_str=dot_hash[1].padEnd(3,"0").substring(0,3)}return 1e3*(parseInt(hours_str)||0)*60*60+1e3*(parseInt(minutes_str)||0)*60+1e3*(parseInt(seconds_str)||0)+(parseInt(milli_seconds_str)||0)},play:async function(pm){const is_se="se"===pm.target,buf=pm.buf,is_voice=!!this.kag.stat.map_vo.vobuf[buf],is_loop="true"===pm.loop;let is_fadein="true"===pm.fadein;(this.kag.stat.is_skip||0===parseInt(pm.time))&&(is_fadein=!1);const should_next_order="false"===pm.stop;should_next_order&&this.kag.weaklyStop();let sound_type=is_se?"sound":"bgm",timeout_after_voice_in_automode=500;void 0!==this.kag.stat.voconfig_waittime&&(timeout_after_voice_in_automode=parseInt(this.kag.stat.voconfig_waittime));const next=()=>{if(should_next_order){this.kag.cancelWeakStop();this.kag.ftag.nextOrder()}};let storage=pm.storage;const browser=$.getBrowser();"mp3"!==this.kag.config.mediaFormatDefault&&("msie"!==browser&&"safari"!==browser&&"edge"!==browser||(storage=$.replaceAll(storage,".ogg",".m4a")));storage=$.parseStorage(storage,sound_type);let tag_volume=1;""!==pm.volume&&(tag_volume=$.parseVolume(pm.volume));let config_volume=1;switch(sound_type){case"bgm":config_volume=$.parseVolume(this.kag.config.defaultBgmVolume);this.kag.stat.map_bgm_volume[buf]&&(config_volume=$.parseVolume(this.kag.stat.map_bgm_volume[buf]));break;case"sound":config_volume=$.parseVolume(this.kag.config.defaultSeVolume);void 0!==this.kag.stat.map_se_volume[buf]&&(config_volume=$.parseVolume(this.kag.stat.map_se_volume[buf]))}const howl_volume=tag_volume*config_volume;let audio_obj,initial_howl_volume=is_fadein?0:howl_volume;if("bgm"===sound_type&&this.kag.tmp.map_bgm[buf]){const old_audio_obj=this.kag.tmp.map_bgm[buf];if(storage===old_audio_obj._src){let need_restart=!0;void 0!==this.kag.stat.bgmopt_samebgm_restart&&(need_restart=this.kag.stat.bgmopt_samebgm_restart);"false"===pm.restart&&(need_restart=!1);if(!need_restart){if(tag_volume===old_audio_obj.__tag_volume);else{const time=is_fadein?parseInt(pm.time):0;this.kag.ftag.startTag("bgmopt",{tag_volume:pm.volume,next:"false",time:time})}next();return}}}switch(sound_type){case"bgm":this.kag.tmp.is_bgm_play=!0;this.kag.stat.current_bgm_pause_seek="";break;case"sound":this.kag.tmp.is_se_play=!0;is_voice&&(this.kag.tmp.is_vo_play=!0)}if(""!=pm.base64){storage="data:audio/"+pm.base64+";base64,"+await $.loadTextSync(storage);this.kag.stat.current_bgm_base64=pm.base64}else this.kag.stat.current_bgm_base64="";var howl_opt={preload:!1,loop:is_loop,src:storage,volume:initial_howl_volume,html5:"true"===pm.html5,onloaderror:(_,e)=>{console.error(e);next()}};let sprite_name,preloaded_audio_del;if(pm.sprite_time){const array_sprite=pm.sprite_time.split("-"),sprite_from=this.parseMilliSeconds(array_sprite[0]),duration=this.parseMilliSeconds(array_sprite[1])-sprite_from,sprite={};sprite_name="default_sprite";sprite[sprite_name]=[sprite_from,duration,is_loop];howl_opt.sprite=sprite}audio_obj=new Howl(howl_opt);audio_obj.__tag_volume=tag_volume;audio_obj.__config_volume=config_volume;switch(sound_type){case"bgm":if(this.kag.tmp.map_bgm[buf]){this.kag.tmp.map_bgm[buf].stop();this.kag.tmp.map_bgm[buf].unload()}this.kag.tmp.map_bgm[buf]=audio_obj;this.kag.stat.current_bgm=pm.storage;this.kag.stat.current_bgm_vol=pm.volume;this.kag.stat.current_bgm_html5=pm.html5;break;case"sound":if(this.kag.tmp.map_se[buf]){this.kag.tmp.map_se[buf].stop();this.kag.tmp.map_se[buf].unload()}this.kag.tmp.map_se[buf]=audio_obj;this.kag.stat.current_se||(this.kag.stat.current_se={});is_loop?this.kag.stat.current_se[buf]=$.extend({},pm):delete this.kag.stat.current_se[buf]}audio_obj.once("load",(()=>{if(preloaded_audio_del){preloaded_audio_del.unload();delete this.kag.tmp.preload_audio_map[storage]}this.kag.hideLoadingLog();""!=pm.seek&&audio_obj.seek(parseFloat(pm.seek));"true"!=pm.pause?audio_obj.play(sprite_name):next()}));audio_obj.once("play",(()=>{is_fadein&&audio_obj.fade(0,howl_volume,parseInt(pm.time));if(is_voice)this.analyzeAudioForLipSync(audio_obj,pm.chara_name);else if(pm.chara)this.analyzeAudioForLipSync(audio_obj,pm.chara);else if(is_se){const _buf=parseInt(buf);if(this.kag.stat.lipsync_buf_chara[buf]){pm.chara_name=this.kag.stat.lipsync_buf_chara[buf];this.analyzeAudioForLipSync(audio_obj,pm.chara_name)}else{pm.chara_name=this.kag.chara.getCharaName();if(pm.chara_name){const cpm=this.kag.stat.charas[pm.chara_name];cpm&&cpm.lipsync_bufs&&cpm.lipsync_bufs.includes(_buf)&&this.analyzeAudioForLipSync(audio_obj,pm.chara_name)}}}next()}));audio_obj.once("fade",(()=>{}));is_loop||audio_obj.once("end",(e=>{switch(sound_type){case"bgm":this.kag.tmp.is_bgm_play=!1;if(1==this.kag.tmp.is_bgm_play_wait){this.kag.tmp.is_bgm_play_wait=!1;this.kag.ftag.nextOrder()}break;case"sound":this.kag.tmp.is_se_play=!1;is_voice&&(this.kag.tmp.is_vo_play=!1);if(1==this.kag.tmp.is_se_play_wait){let is_sound_playing=!1;for(const key in this.kag.tmp.map_se){const howl=this.kag.tmp.map_se[key];if(!howl._loop&&howl.playing()){is_sound_playing=!0;break}}if(!is_sound_playing){this.kag.tmp.is_se_play_wait=!1;this.kag.ftag.nextOrder()}}else if(1==this.kag.tmp.is_vo_play_wait&&is_voice){this.kag.tmp.is_vo_play_wait=!1;$.setTimeout((()=>{this.kag.ftag.nextOrder()}),timeout_after_voice_in_automode)}}}));const preloaded_audio=this.kag.tmp.preload_audio_map[storage];if(preloaded_audio&&preloaded_audio._html5===howl_opt.html5)switch(preloaded_audio.state()){case"loaded":preloaded_audio.__single_use&&(preloaded_audio_del=preloaded_audio);audio_obj.load();break;case"unload":delete this.kag.tmp.preload_audio_map[storage];audio_obj.load();break;case"loading":preloaded_audio.__single_use&&(preloaded_audio_del=preloaded_audio);preloaded_audio.once("load",(()=>{audio_obj.load()}))}else{this.kag.showLoadingLog();audio_obj.load()}},analyzeAudioForLipSync(howl,name){const target_parts=this.kag.chara.getLipSyncParts(name);if(!target_parts)return null;const cancelAnimationFrame=clearTimeout,resetFrameOpacity=()=>{target_parts.forEach((target_part=>{target_part.j_frames.showAtIndexWithVisibility(0)}))};let animation_id,last_timestamp=performance.now(),silent_time=0;const audio_context=Howler.ctx,sound_node=howl._sounds[0]._node,analyser=audio_context.createAnalyser();sound_node.connect(analyser);analyser.connect(audio_context.destination);analyser.fftSize=32;const buffer_length=analyser.frequencyBinCount,data_array=new Uint8Array(buffer_length),analyze=()=>{const timestamp=performance.now(),elapsed_time=timestamp-last_timestamp;analyser.getByteTimeDomainData(data_array);let max=0;for(let i=0;i<buffer_length;i++)if(data_array[i]>max){max=data_array[i];if(255===max)break}max=Math.max(128,max);const volume=(max-128)/127*100|0;this.kag.chara.updateLipSyncWithVoice(volume,target_parts,elapsed_time);max<=128?silent_time+=elapsed_time:silent_time=0;if(silent_time>=1e4)resetFrameOpacity();else{last_timestamp=timestamp;animation_id=setTimeout(analyze,1e3/30)}};howl.on("stop",(function(){resetFrameOpacity();cancelAnimationFrame(animation_id)}));howl.on("end",(function(){resetFrameOpacity();cancelAnimationFrame(animation_id)}));analyze()}};tyrano.plugin.kag.tag.stopbgm={pm:{fadeout:"false",time:2e3,target:"bgm",buf:"0",buf_all:"false",stop:"false"},start:function(pm){const should_next_order="false"===pm.stop;let target_map=null,is_fadeout="true"===pm.fadeout;(this.kag.stat.is_skip||0===parseInt(pm.time))&&(is_fadeout=!1);if("bgm"==pm.target){target_map=this.kag.tmp.map_bgm;this.kag.tmp.is_bgm_play=!1;this.kag.tmp.is_bgm_play_wait=!1;if(should_next_order){this.kag.stat.current_bgm="";this.kag.stat.current_bgm_vol=""}}else{target_map=this.kag.tmp.map_se;this.kag.tmp.is_vo_play=!1;this.kag.tmp.is_se_play=!1;this.kag.tmp.is_se_play_wait=!1;this.kag.stat.current_se&&this.kag.stat.current_se[pm.buf]&&delete this.kag.stat.current_se[pm.buf]}for(const key in target_map){if(!(String(key)===String(pm.buf)||"true"===pm.buf_all))continue;const audio_obj=target_map[key];delete target_map[key];if(audio_obj)if(is_fadeout&&audio_obj.playing()){const bind_fade_complete_listener=()=>{audio_obj.once("fade",(()=>{if(0===audio_obj.volume()){audio_obj.stop();audio_obj.unload()}else bind_fade_complete_listener()}))};bind_fade_complete_listener();audio_obj.fade(audio_obj.volume(),0,parseInt(pm.time))}else{audio_obj.stop();audio_obj.unload()}}should_next_order&&this.kag.ftag.nextOrder()}};tyrano.plugin.kag.tag.fadeinbgm={vital:["storage"],pm:{loop:"true",storage:"",fadein:"true",sprite_time:"",html5:"false",time:2e3,pause:"false",seek:""},start:function(pm){parseInt(pm.time)<=100&&(pm.time=100);this.kag.ftag.startTag("playbgm",pm)}};tyrano.plugin.kag.tag.fadeoutbgm={pm:{loop:"true",storage:"",fadeout:"true",time:2e3},start:function(pm){parseInt(pm.time)<=100&&(pm.time=100);this.kag.ftag.startTag("stopbgm",pm)}};tyrano.plugin.kag.tag.xchgbgm={vital:["storage"],pm:{loop:"true",storage:"",fadein:"true",fadeout:"true",time:2e3,buf:"0"},start:function(pm){if(this.kag.stat.is_skip||0===parseInt(pm.time)){pm.time="0";pm.fadein="false";this.kag.ftag.startTag("playbgm",pm);return}parseInt(pm.time)<=100&&(pm.time=100);const audio_obj=this.kag.tmp.map_bgm[pm.buf];if(audio_obj&&audio_obj.playing()){const bind_fade_complete_listener=()=>{audio_obj.once("fade",(()=>{if(0===audio_obj.volume()){audio_obj.stop();audio_obj.unload()}else bind_fade_complete_listener()}))};bind_fade_complete_listener();audio_obj.fade(audio_obj.volume(),0,parseInt(pm.time));delete this.kag.tmp.map_bgm[pm.buf]}this.kag.ftag.startTag("playbgm",pm)}};tyrano.plugin.kag.tag.playse={vital:["storage"],pm:{storage:"",target:"se",volume:"",loop:"false",buf:"0",sprite_time:"",html5:"false",clear:"false"},start:function(pm){"true"==pm.clear&&this.kag.ftag.startTag("stopbgm",{target:"se",stop:"true",buf_all:"true"});this.kag.ftag.startTag("playbgm",pm)}};tyrano.plugin.kag.tag.stopse={pm:{storage:"",fadeout:"false",time:2e3,buf:"0",target:"se"},start:function(pm){this.kag.ftag.startTag("stopbgm",pm)}};tyrano.plugin.kag.tag.fadeinse={vital:["storage","time"],pm:{storage:"",target:"se",loop:"false",volume:"",fadein:"true",buf:"0",sprite_time:"",html5:"false",time:"2000"},start:function(pm){parseInt(pm.time)<=100&&(pm.time=100);this.kag.ftag.startTag("playbgm",pm)}};tyrano.plugin.kag.tag.fadeoutse={pm:{storage:"",target:"se",loop:"false",buf:"0",fadeout:"true"},start:function(pm){parseInt(pm.time)<=100&&(pm.time=100);this.kag.ftag.startTag("stopbgm",pm)}};tyrano.plugin.kag.tag.bgmopt={pm:{volume:"",effect:"true",buf:"",tag_volume:"",next:"true",time:"",samebgm_restart:""},start:function(pm){let tag_volume,config_volume;if(pm.buf){""!==pm.volume&&(this.kag.stat.map_bgm_volume[pm.buf]=pm.volume);config_volume=this.kag.stat.map_bgm_volume[pm.buf]}else{if(""!==pm.volume){this.kag.stat.map_bgm_volume={};this.kag.config.defaultBgmVolume=pm.volume}config_volume=this.kag.config.defaultBgmVolume}config_volume=$.parseVolume(config_volume);if(""!==pm.tag_volume){tag_volume=$.parseVolume(pm.tag_volume);pm.effect="true";this.kag.stat.current_bgm_vol=pm.tag_volume}const target_map=this.kag.tmp.map_bgm;if("true"==pm.effect&&0==this.kag.define.FLAG_APRI){const options={config:config_volume,tag:tag_volume,time:pm.time};if(pm.buf){const audio_obj=target_map[pm.buf];audio_obj&&this.kag.changeHowlVolume(audio_obj,options)}else for(const key in target_map){const audio_obj=target_map[key];audio_obj&&this.kag.changeHowlVolume(audio_obj,options)}}pm.samebgm_restart&&(this.kag.stat.bgmopt_samebgm_restart="true"===pm.samebgm_restart);void 0!==pm.volume&&""!==pm.volume?this.kag.ftag.startTag("eval",{exp:"sf._system_config_bgm_volume = "+pm.volume,next:pm.next}):"false"!==pm.next&&this.kag.ftag.nextOrder()}};tyrano.plugin.kag.tag.seopt={pm:{volume:"",effect:"true",buf:"",tag_volume:"",next:"true"},start:function(pm){let tag_volume,config_volume;if(pm.buf){""!==pm.volume&&(this.kag.stat.map_se_volume[pm.buf]=pm.volume);config_volume=this.kag.stat.map_se_volume[pm.buf]}else{if(""!==pm.volume){this.kag.stat.map_se_volume={};this.kag.config.defaultSeVolume=pm.volume}config_volume=this.kag.config.defaultSeVolume}config_volume=$.parseVolume(config_volume);if(""!==pm.tag_volume){tag_volume=$.parseVolume(pm.tag_volume);pm.effect="true"}const target_map=this.kag.tmp.map_se;if("true"==pm.effect&&0==this.kag.define.FLAG_APRI){const options={config:config_volume,tag:tag_volume,time:pm.time};if(pm.buf){const audio_obj=target_map[pm.buf];if(audio_obj){this.kag.changeHowlVolume(audio_obj,options);this.kag.stat.current_se[pm.buf]&&(this.kag.stat.current_se[pm.buf].volume=pm.tag_volume)}}else for(const key in target_map){const audio_obj=target_map[key];if(audio_obj){this.kag.changeHowlVolume(audio_obj,options);this.kag.stat.current_se[key]&&(this.kag.stat.current_se[key].volume=pm.tag_volume)}}}void 0!==pm.volume&&""!==pm.volume?this.kag.ftag.startTag("eval",{exp:"sf._system_config_se_volume = "+pm.volume,next:pm.next}):"false"!==pm.next&&this.kag.ftag.nextOrder()}};tyrano.plugin.kag.tag.changevol={pm:{target:"bgm",volume:"",buf:"",time:"",next:"true"},obtainTargets:function(target,buf){const target_map="bgm"===target?this.kag.tmp.map_bgm:this.kag.tmp.map_se,target_dict={};if(buf){const audio_obj=target_map[buf];audio_obj&&(target_dict[buf]=audio_obj)}else for(const key in target_map){const audio_obj=target_map[key];audio_obj&&(target_dict[key]=audio_obj)}return target_dict},start:function(pm){const next=()=>{"false"!==pm.next&&this.kag.ftag.nextOrder()};if(""===pm.volume||this.kag.define.FLAG_APRI){next();return}const tag_volume=$.parseVolume(pm.volume),is_bgm="bgm"===pm.target;is_bgm&&(this.kag.stat.current_bgm_vol=pm.volume);const volume_map=is_bgm?this.kag.stat.map_bgm_volume:this.kag.stat.map_se_volume,default_volume=is_bgm?this.kag.config.defaultBgmVolume:this.kag.config.defaultSeVolume,target_dict=this.obtainTargets(pm.target,pm.buf);for(const buf in target_dict){const audio_obj=target_dict[buf];let config_volume=volume_map[buf]?volume_map[buf]:default_volume;config_volume=$.parseVolume(config_volume);this.kag.changeHowlVolume(audio_obj,{config:config_volume,tag:tag_volume,time:pm.time});!is_bgm&&this.kag.stat.current_se[buf]&&(this.kag.stat.current_se[buf].volume=pm.volume)}next()}};tyrano.plugin.kag.tag.pausebgm={pm:{target:"bgm",buf:"",next:"true"},start:function(pm){const target_dict=this.kag.getTag("changevol").obtainTargets(pm.target,pm.buf);for(const buf in target_dict){const audio_obj=target_dict[buf];audio_obj.pause();this.kag.stat.current_bgm_pause_seek=audio_obj.seek()}(()=>{"false"!==pm.next&&this.kag.ftag.nextOrder()})()}};tyrano.plugin.kag.tag.resumebgm={pm:{target:"bgm",buf:"",next:"true"},start:function(pm){const target_dict=this.kag.getTag("changevol").obtainTargets(pm.target,pm.buf);for(const buf in target_dict){target_dict[buf].play()}this.kag.stat.current_bgm_pause_seek="";(()=>{"false"!==pm.next&&this.kag.ftag.nextOrder()})()}};tyrano.plugin.kag.tag.pausese={pm:{target:"se",buf:"",next:"true"},start:function(pm){this.kag.getTag("pausebgm").start(pm)}};tyrano.plugin.kag.tag.resumese={pm:{target:"se",buf:"",next:"true"},start:function(pm){this.kag.getTag("resumebgm").start(pm)}};tyrano.plugin.kag.tag.wbgm={pm:{},start:function(){1==this.kag.tmp.is_bgm_play?this.kag.tmp.is_bgm_play_wait=!0:this.kag.ftag.nextOrder()}};tyrano.plugin.kag.tag.wse={pm:{},start:function(){1==this.kag.tmp.is_se_play?this.kag.tmp.is_se_play_wait=!0:this.kag.ftag.nextOrder()}};tyrano.plugin.kag.tag.voconfig={pm:{sebuf:"",name:"",vostorage:"",number:"",waittime:"",preload:""},start:function(pm){this.kag.stat.map_vo;this.kag.stat.map_vo.vobuf[pm.sebuf]=1;if(""!=pm.name){var vochara={};vochara=this.kag.stat.map_vo.vochara[pm.name]?this.kag.stat.map_vo.vochara[pm.name]:{vostorage:"",buf:pm.sebuf||"0",number:0};""!==pm.sebuf&&(vochara.buf=pm.sebuf);""!=pm.vostorage&&(vochara.vostorage=pm.vostorage);""!==pm.number&&(vochara.number=pm.number);this.kag.stat.map_vo.vochara[pm.name]=vochara}pm.waittime&&(this.kag.stat.voconfig_waittime=parseInt(pm.waittime));pm.preload&&(this.kag.stat.voconfig_preload="true"===pm.preload);this.kag.ftag.nextOrder()}};tyrano.plugin.kag.tag.vostart={pm:{},start:function(){this.kag.stat.vostart=!0;this.kag.stat.voconfig_preload&&this.kag.preloadNextVoice();this.kag.ftag.nextOrder()}};tyrano.plugin.kag.tag.vostop={pm:{},start:function(){this.kag.stat.vostart=!1;this.kag.ftag.nextOrder()}};tyrano.plugin.kag.tag.speak_on={vital:[],pm:{volume:"100",pitch:"100",rate:"100",cancel:"false"},start:function(pm){if(!("speechSynthesis"in window)){console.error("*error:この環境は[speak_on]の読み上げ機能に対応していません");this.kag.ftag.nextOrder();return}this.kag.stat.play_speak=!0;pm.volume&&(this.kag.tmp.speak_on_volume=parseInt(pm.volume)/100);pm.pitch&&(this.kag.tmp.speak_on_pitch=parseInt(pm.pitch)/100);pm.rate&&(this.kag.tmp.speak_on_rate=parseInt(pm.rate)/100);pm.cancel&&(this.kag.tmp.speak_on_cancel="true"===pm.cancel);const voices=window.speechSynthesis.getVoices();console.warn(voices);this.kag.ftag.nextOrder()}};tyrano.plugin.kag.tag.speak_off={vital:[],pm:{volume:""},start:function(pm){this.kag.stat.play_speak=!1;this.kag.ftag.nextOrder()}};
