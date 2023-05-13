import {
    _decorator,
    CCInteger,
    Component,
    Contact2DType,
    Node,
    IPhysics2DContact,
    PhysicsSystem2D,
    Vec3,
    AudioSource,
} from 'cc';

const { ccclass, property } = _decorator;

@ccclass('bucket')
export class bucket extends Component {

    @property({ type: Node })
    background: Node | null = null;

    @property({ type: Node })
    content: Node | null = null;

    @property({
        type: CCInteger,
        slide: true,
        min: 0,
        max: 100,
    })
    get progress() {
        return this._progress;
    }
    set progress(val: number) {
        this._progress = Math.min(Math.max(val, 0), 100);
        this._updateContentProgress();
        this._updateAudio();
    }
    @property({ type: CCInteger })
    _progress: number = 0;
    public audio: AudioSource = null!;
    
    _updateContentProgress() {
        this.content.scale = new Vec3(1, this._progress / 100, 1);
    }

    _updateAudio() {
        if (this.audio) {
            this.audio.volume = this._progress > 1 ? 1 : this._progress;
        }
    }

    @property
    counterDelayTime:number = 500
    start() {
        this.audio = this.node.getComponent(AudioSource);
        this.addCounter = throttle(this.addCounter, this.counterDelayTime);
    }


    update(deltaTime: number) {

    }
    // 音量上升速度
    // @property({
    //     type: CCInteger,
    //     slide: true,
    //     min: 0,
    //     max: 100,
    //     step:1
    // })
    volumeProgressSpeed:number = 25
    addCounter() {
        this.progress += this.volumeProgressSpeed;
        setTimeout(() => {
            this.progress -= this.volumeProgressSpeed;
        }, 3000)
    }
}


/**
 * 创建并返回一个像节流阀一样的函数，当重复调用函数的时候，最多每隔delay毫秒调用一次该函数
 * @param fn 执行函数
 * @param delay 时间间隔
 * @returns {Function}
 */
function throttle(fn, delay) {
    var timer = null;
    var timeStamp = (new Date()).getTime();
    return function() {
      var context = this;  //获取函数所在作用域this
      var args = arguments;  //取得传入参数
      if((new Date()).getTime()-timeStamp>delay){
          timeStamp = (new Date()).getTime();
          timer = setTimeout(function(){
          fn.apply(context,args);
        },delay);
      }
  
    }
  }