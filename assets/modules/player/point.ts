/**
 * 控制点
 * 包含方向、圆大小、位置
 * 光线碰撞后，收集能量
 */

import { _decorator, ccenum, Component, UITransform, Vec2, Vec3, Size, EventTouch, NodeEventType } from 'cc';
const { ccclass, property } = _decorator;

enum PointDirectionEnum {
    UP = 0,
    RIGHT = 1,
    DOWN = 2,
    LEFT = 3,
    AUTO = 4,
}
ccenum(PointDirectionEnum);

@ccclass('point')
export class point extends Component {
    /**
     * 控制点方向
     */
    @property({
        type: PointDirectionEnum,
    })
    get direction(): PointDirectionEnum {
        return this._direction;
    }
    set direction(val: PointDirectionEnum) {
        this._direction = val;
        this.node.setRotationFromEuler(0, 0, this._direction * 90);
    }
    _direction: PointDirectionEnum = PointDirectionEnum.AUTO;

    /**
     * 控制点大小
     */
    @property()
    get size() {
        return this._size;
    }
    set size(val: number) {
        this._updateSize();
        this._size = val;
    }
    _size: number = 100;

    _offset: Vec2 = new Vec2(960 / 2, 640 / 2);

    onLoad() {
        // this._updateEuler();
        this._updateSize();
    }

    start() {}

    onEnable() {
        this.node.on(NodeEventType.TOUCH_START, this._onTouchBegan, this);
        this.node.on(NodeEventType.TOUCH_MOVE, this._onTouchMove, this);
        this.node.on(NodeEventType.TOUCH_END, this._onTouchEnded, this);
    }

    onDisable() {
        this.node.off(NodeEventType.TOUCH_START, this._onTouchBegan, this);
        this.node.off(NodeEventType.TOUCH_MOVE, this._onTouchMove, this);
        this.node.off(NodeEventType.TOUCH_END, this._onTouchEnded, this);
    }

    _updateSize() {
        const transform = this.node.getComponent('cc.UITransform') as UITransform;
        transform.contentSize = new Size(this._size, this._size);
    }

    _updateEuler() {
        this.node.setRotationFromEuler(0, 0, this.direction * 90);
    }
    private _onTouchBegan(event: EventTouch) {
        const uiPos = event.getUILocation();
        this._offset = new Vec2(uiPos.x - this.node.position.x, uiPos.y - this.node.position.y);
    }

    private _onTouchMove(event: EventTouch) {
        const uiPos = event.getUILocation();
        uiPos.x -= this._offset.x;
        uiPos.y -= this._offset.y;
        this.node.setPosition(new Vec3(uiPos.x, uiPos.y));
    }

    private _onTouchEnded(event: EventTouch) {}

    update(deltaTime: number) {}
}
