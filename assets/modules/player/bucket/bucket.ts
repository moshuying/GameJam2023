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
        this._progress = val;
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

    start() {
        this.audio = this.node.getComponent(AudioSource);
    }


    update(deltaTime: number) {

    }

    addCounter() {
        this.progress += 20;
        setTimeout(() => {
            this.progress -= 20;
        }, 3000)
    }
}

