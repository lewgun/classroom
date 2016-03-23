/*
http://www.html5rocks.com/en/tutorials/getusermedia/intro/
http://code.tutsplus.com/tutorials/build-a-custom-html5-video-player--pre-8905
http://www.creativebloq.com/html5/build-custom-html5-video-player-9134473
https://msdn.microsoft.com/zh-cn/library/hh924823(v=vs.85).aspx
http://www.inserthtml.com/2013/03/custom-html5-video-player/

https://blog.nraboy.com/2016/01/include-external-javascript-libraries-in-an-angular-2-typescript-project/

http://juristr.com/blog/2016/02/learning-ng2-creating-tab-component/
https://github.com/kittencup/angular2-ama-cn/issues/66
 */

import {
	OnInit,
    Input,
	Component
} from 'angular2/core';

import { RouteData,RouteParams } from 'angular2/router';

 import {FullScreenDirective} from '../../directives/fullscreen.directive';

interface source {
    src: string;
    typ: string;
}
@Component({
	selector: "video-player",
	templateUrl: "player/video-player.component.html",
	//styleUrls: ["src/app/components/player/video-player.component.css"],
    styles: [],
     directives: [FullScreenDirective]

})
export class VideoPlayerComponent  implements OnInit {
	
	private player: any = null;
    private _progressBar: any = null;
    private _btnPnP: any = null;
    private _btnMute: any = null;
    
    private isFullScreen: boolean = false;
    
    width: number = 480;
    height: number = 320;
    
    progress = {
        min: 0,
        max: 100,
        value: 0
    }
    
    sources: Array<source> = [];
    
    progressText: string = "0% Played";

    
    //pls care the difference with RouteData, that's what ? i do not know.
    constructor(  private _routeParams: RouteParams) {}
	ngOnInit() {
        
      //  console.log("hahah", this._routeParams.get('link'));
        
		this.initMediaPlayer();
	}
	
    onLoadMetaData() {
        console.log("onLoadMetaData");
       // this.initMediaPlayer();
    }
    
	initMediaPlayer() {
        
		this.player = document.getElementById("video");
		this.player.controls = false;
        
        this._btnPnP = document.getElementById('play-pause');
        this._progressBar = document.getElementById('progress-bar');
        this._btnMute = document.getElementById('mute');
                
        this.sources = [
            {
                src: "http://iandevlin.com/html5/media-player/parrots.mp4",
                typ: "video/mp4"
            },
            {
                src: "http://iandevlin.com/html5/media-player/parrots.webm",
                typ: "video/webm"
            }
        ];
        
	}
	
	togglePnP() {
		let typ: string;
		
		if (this.player.paused || this.player.ended) {
			typ = "pause";
			this.player.play();
			
		} else {
			typ = "play";
			this.player.pause();
		}
		
		this._changeButtonType(this._btnPnP, typ);
		
		
	}
    
    /*
      The media API doesn't provide a specific stop method,
      because there's no real difference between pausing and stopping a video or audio file.
     */ 
    stop() {
        this.player.pause();
        this.player.currentTime = 0;
    }
    
    changeVolume( direction: string ) {
        let step : number;
        if (direction === '+') {
            step = this.player.volume == 1 ? 0 : 0.1;
            
        } else {
            step = this.player.volume == 0 ? 0 : -0.1;
        }
        
        this.player.volume += step;
        //this.player.volume = this.player.volume.toFixed(1);
    }
    
    toggleMute() {
        
        if (this.player.muted) {
            this._changeButtonType(this._btnMute, 'mute');
            this.player.muted = false;
        
        } else {
            this._changeButtonType(this._btnMute, 'unmute');
            this.player.muted = true;
        }
    }
    
    toggleFullScreen() {
        
        this.isFullScreen = !this.isFullScreen;
    }
    
    
    onProgressUpdated() {
       
        let percentage = Math.floor((100 / this.player.duration) * this.player.currentTime);
        
        this._progressBar.value = percentage;        
        this.progressText =  percentage + '% played';
        
    }
    
    onSeek(value: number)  {
       
       let step: number  = 0;
       switch (value) {
           case +1:
           {
                step = 10;         
           }
           break;
                
           case -1:
           {
               step = -10;        
           }
           break;
                
           default:
           {
               this._resetPlayer();
           }
           return 
       }
                
        this.player.currentTime += step;
        
        if (this.player.currentTime > 1) {
            this.player.currentTime = 1;
            
        } else if (this.player.currentTime < 0) {
              this.player.currentTime = 0;          
        }

    }
    
    onSpeed(value: number)  {
       
       let step: number  = 0;
       switch (value) {
           case +1:
           {
                step = .25;         
           }
           break;
                
           case -1:
           {
               step = -.25;        
           }
           break;
                
           default:
           {
              this.player.playbackRate = 1;
           }
           return 
       }
                
        this.player.playbackRate += step;
        
        if (this.player.playbackRate < 0) {
              this.player.playbackRate = 0;          
        }

    }
                            
    
    onVolumeChanged( target: any) {
        if (this.player.muted) {
            this._changeButtonType(target, 'unmute');
        } else {
             this._changeButtonType(target, 'unmute');           
        }
    }
    
    onPlayStatusChanged(target: any, typ: string ) {
        this._changeButtonType(target, typ);
    }
    
    onMouseDown() {
       // this.player.stopTrackingPlayProgress(); 
        this.togglePnP();
    }
    onMouseMove($event ) {
        this.player._setPlayProgress($event.pageX);
    }
    
    onMouseUp($event) {
        this.player.play();
        this._setPlayProgress($event.pageX);
    }
    
    _setPlayProgress ( clickX: number ) { 
		var newPercent = Math.max( 0, Math.min(1, (clickX - this._findPosX(this._progressBar)) / this._progressBar.offsetWidth) ); 
		this.player.currentTime = newPercent * this.player.duration; 
		//playProgressBar.style.width = newPercent * (progressHolder.offsetWidth)  + "px"; 
	}
    
    _findPosX (pb : any) { 
		var curleft = pb.offsetLeft; 
		while( pb = pb.offsetParent ) { 
			curleft += pb.offsetLeft; 
		} 
		return curleft; 
	}
    	
	_changeButtonType( btn: any, typ: string ) {
		
		btn.title= typ;
		btn.innerHTML = typ;
		btn.className = typ;
	}
    
    _resetPlayer() {
        this.player.currentTime = 0;
        this._progressBar.value = 0;
        this.player.playbackRate = 1;
        this._changeButtonType(this._btnPnP, 'play');
    }
    
    loadVideos(...videos : string[] ) {
        
        for ( let mov of videos) {
            let name = mov.split('.');
            let ext = name[name.length-1];
            
            if (this._canPlay(ext)) {
                this._resetPlayer();
                this.player.src = name;
                this.player.load();
                break;
            }
        }
    }
    
    
    _canPlay(ext: string ) {
        let ok = this.player.canPlay('video/' + ext);
        if ( ok === '') {
            return false;
        } else {
            return true;
        }
    }
   

}
