/**
 * 场景控制器
 * 负责管理场景里的元素生成、移动、变化
 * 以及管理场景内的一些数据，例如碰撞
 */

import {
    _decorator,
    Component,
    Node,
    Vec2,
    Vec3,
    Prefab,
    instantiate,
} from 'cc';
import type { bucket } from '../player/bucket/bucket';
const { ccclass, property } = _decorator;

@ccclass('sceneController')
export class sceneController extends Component {

    @property({
        type: Prefab,
    })
    emmiter: Prefab | null = null;

    @property({
        type: Node,
    })
    emmiterList: Node | null = null;

    @property({
        type: Node,
    })
    bucketList: Node | null = null;

    // 发射方向
    @property({
        type: Vec2,
    })
    direction: Vec2 = new Vec2(0, 2);

    // 随机位置大小
    @property
    randomSize: number = 30;

    start() {

    }

    update(deltaTime: number) {
        const bucketFull = this.bucketList && this.bucketList.children.every((node) => {
            const comp = node.getComponent('bucket') as bucket;
            if (comp) {
                return comp.progress === 100;
            }
        });
        if (bucketFull) {
            this._onBucketFull();
        }
    }

    // 自定义函数

    /**
     * 在 x,y 位置生成一个地块
     */
    generateMotion() {
        const node = instantiate(this.emmiter.data);
        const comp = node.getComponent('emmiter');
        comp.moveVector = new Vec3(
            this.direction.x + Math.random() * this.randomSize,
            this.direction.y + Math.random() * this.randomSize,
            0,
        );
        this.emmiterList.addChild(node);
    }

    /**
     * 当所有桶收集满了之后触发的回调
     */
    _onBucketFull() {

    }
}

