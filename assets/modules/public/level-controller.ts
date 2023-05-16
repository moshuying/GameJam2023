/**
 * 游戏关卡控制器
 * 需要挂在在每个关卡的 prefab 根节点
 * 负责管理游戏场景里的元素生成、移动、变化
 * 以及管理场景内的一些数据，例如碰撞
 */

import { _decorator, Component, Node, Vec2, Vec3, Prefab, instantiate, Animation, EventTouch } from 'cc';
import { bucket } from '../player/bucket';
import { emmiter } from '../player/emmiter';
import { runLevel, runScene } from './scene-manager';

const { ccclass, property } = _decorator;

enum GameState {
    END = 0,
    RUN = 1,
    IDLE = 2,
}

@ccclass('levelController')
export class levelController extends Component {
    @property({
        type: Prefab,
        tooltip: '发射出来的元素的模版，prefab 文件',
    })
    emmiter: Prefab | null = null;

    @property({
        type: Node,
        tooltip: '发射光线的元素，新建的元素都会挂在这个元素里',
    })
    emmiterList: Node | null = null;

    @property({
        type: Vec2,
        tooltip: '发射初始位置',
    })
    beginPosition: Vec2 = new Vec2(0, 0);

    @property({
        type: Vec2,
        tooltip: '发射方向',
    })
    direction: Vec2 = new Vec2(0, 2);

    @property({
        tooltip: '随机位置大小',
    })
    randomSize: number = 20;

    @property({
        tooltip: '发射速度',
    })
    emmiterSpeed: number = 30;

    @property({
        tooltip: '转弯力度',
    })
    public turningStrength = 1;

    @property({
        type: Node,
        tooltip: '收集盒子的列表',
    })
    bucketList: Node | null = null;

    @property({
        type: Node,
        tooltip: '施加转向力的元素列表',
    })
    pointList: Node | null = null;

    @property({
        type: Node,
    })
    gameEndNode: Node | null = null;

    current: GameState = GameState.IDLE;

    // 引擎生命周期

    start() {
        this.current = GameState.RUN;
        const comp = this.getComponent(Animation);
        comp.play('game-start');
    }

    update(deltaTime: number) {
        const bucketFull =
            this.bucketList &&
            this.bucketList.children.every((node) => {
                const comp = node.getComponent('bucket') as bucket;
                if (comp) {
                    return comp.progress >= 100;
                }
            });
        this.emmiterList &&
            this.emmiterList.children.forEach((node) => {
                const comp = node.getComponent('emmiter') as emmiter;
                if (comp) {
                    comp.setSpeed(this.emmiterSpeed);
                    comp.controlPointArray = this.pointList.children;
                    comp.bucketPointArray = this.bucketList.children;
                    comp.widthSpeed = this.turningStrength;
                    comp.updater(deltaTime);
                }
            });
        if (bucketFull) {
            this._onBucketFull();
        }
    }

    // 管理器控制函数

    /**
     * 当场景进入的时候触发的函数
     * 先退出之前的场景，然后才会进入这个场景
     */
    public async fadeIn() {
        const anim = this.getComponent(Animation);
        anim.play('level-fade-in');
    }

    /**
     * 当场景退出的时候触发的函数
     * 先退出这个场景，然后才会进入其他场景
     */
    public async fadeOut() {
        const anim = this.getComponent(Animation);
        anim.play('level-fade-out');
    }

    // 自定义函数

    /**
     * 在 x,y 位置生成一个地块
     */
    public generateMotion() {
        const node = instantiate(this.emmiter.data);
        const comp = node.getComponent('emmiter');
        comp.moveVector = new Vec3(this.direction.x + Math.random() / 5, this.direction.y + Math.random() / 5, 0);
        node.position = new Vec3(
            this.beginPosition.x + Math.random() * this.randomSize,
            this.beginPosition.y + Math.random() * this.randomSize,
            0,
        );
        this.emmiterList.addChild(node);

        setTimeout(() => {
            this.emmiterList.removeChild(node);
        }, 3000);
    }

    /**
     * 当所有桶收集满了之后触发的回调
     */
    private _onBucketFull() {
        if (this.current === GameState.END) {
            return;
        }
        this.current = GameState.END;

        this.bucketList &&
            this.bucketList.children.forEach((node) => {
                const comp = node.getComponent('bucket') as bucket;
                if (comp) {
                    comp.lockMaxVolume();
                }
            });

        const comp = this.getComponent(Animation);
        comp.play('level-game-end');
    }

    /**
     * 为 Button 写的函数
     * @param event 
     * @param level 
     */
    private onButtonRunLevel(event: EventTouch, level?: string) {
        runLevel(level ? parseInt(level) : undefined);
    }

    /**
     * 为 Button 写的函数
     * @param event 
     * @param level 
     */
    private onButtonRunScene(event: EventTouch, name: string) {
        runScene(name);
    }

    private onButtonDescriptionHidden() {
        const anim = this.getComponent(Animation);
        anim.play('level-description-hidden');
    }
}
