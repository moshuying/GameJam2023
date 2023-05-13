import {
    _decorator,
    CCInteger,
    Node,
    Sprite,
    Vec3,
} from 'cc';
import { bucket } from './bucket';

const { ccclass, property } = _decorator;

@ccclass('bucketInk')
export class bucketInk extends bucket {

    @property( { type: [Node]})
    bgNodes: Node[] = [];

    _updateContentProgress() {
        let index = Math.floor(this._progress / 25);
        if (index >= this.bgNodes.length) {
            index = this.bgNodes.length - 1;
        }
        this.bgNodes.forEach((sp: Node) => {
            if (sp.active) {
                sp.active = false;
            }
        })
        this.bgNodes[index].active = true;
    }
}
