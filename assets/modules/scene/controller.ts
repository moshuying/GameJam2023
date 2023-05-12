/**
 * 场景控制器
 * 负责管理场景里的元素生成、移动、变化
 * 以及管理场景内的一些数据，例如碰撞
 */

import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('sceneController')
export class sceneController extends Component {

    start() {

    }

    update(deltaTime: number) {
        
    }

    // 自定义函数

    /**
     * 在 x,y 位置生成一个地块
     * @param x 
     * @param y 
     * @param type 
     */
    generateGround(x: number, y: number, type: string) {}
}

