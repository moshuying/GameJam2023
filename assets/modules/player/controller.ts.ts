/**
 * 玩家控制器，负责控制玩家的移动和各种动作
 */

import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('playerContriller')
export class playerContriller extends Component {

    start() {

    }

    update(deltaTime: number) {
        
    }

    // 自定义方法

    // 是否在奔跑
    running: boolean = false;

    /**
     * 向左移动
     * @param step 移动步数
     */
    moveLeft(step: number = 1) {}

    /**
     * 向右移动
     * @param step 移动步数
     */
    moveRight(step: number = 1) {}

    /**
     * 向上移动
     * @param step 移动步数
     */
    moveUp(step: number = 1) {}

    /**
     * 向下移动
     * @param step 移动步数
     */
    moveDown(step: number = 1) {}

    /**
     * 发起攻击
     * @param action 攻击动作
     */
    attack(action?: string) {}
}

