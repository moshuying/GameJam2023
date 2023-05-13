import {
    _decorator,
    CCInteger,
    Component,
    BoxCollider2D,
    Contact2DType,
    Node,
    IPhysics2DContact,
    PhysicsSystem2D,
    Vec3,
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
    }
    @property({ type: CCInteger })
    _progress: number = 100;

    _updateContentProgress() {
        this.content.scale = new Vec3(1, this._progress / 100, 1);
    }

    start() {
        const collider = this.getComponent(BoxCollider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            // collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
            // collider.on(Contact2DType.PRE_SOLVE, this.onPreSolve, this);
            // collider.on(Contact2DType.POST_SOLVE, this.onPostSolve, this);
        }
    }

    onBeginContact (selfCollider: BoxCollider2D, otherCollider: BoxCollider2D, contact: IPhysics2DContact | null) {
        this.addCounter();
        // const collider = this.getComponent(BoxCollider2D);
        // collider.enabled = false;
    }

    update(deltaTime: number) {

    }

    addCounter() {
        this.progress += 50;
        setTimeout(() => {
            this.progress -= 50;
        }, 3000)
    }
}

