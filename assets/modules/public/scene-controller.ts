/**
 * 场景管理组件
 * 每个非关卡场景都挂一个，标记自身是常驻、还是离开就销毁等基础功能
 */

import { _decorator, Component, Node, EventTouch } from 'cc';
import { runLevel, runScene } from './scene-manager';

const { ccclass, property } = _decorator;

@ccclass('sceneController')
export class sceneController extends Component {
    @property({
        tooltip: '这个场景的唯一 ID，后续操作的时候，使用的就是这个名字',
    })
    sceneName: string = '';

    @property({
        tooltip: '是否常驻在后台，如果为 true，运行行其他场景后，这个场景 active 会被设置为 false，但不会被移出场景树并销毁',
    })
    isPersistnet: boolean = false;

    // 管理器控制函数

    /**
     * 当场景进入的时候触发的函数
     * 先退出之前的场景，然后才会进入这个场景
     */
    public async fadeIn() {}

    /**
     * 当场景退出的时候触发的函数
     * 先退出这个场景，然后才会进入其他场景
     */
    public async fadeOut() {}

    // 自定义函数

    /**
     * 为 Button 写的函数
     * @param event
     * @param level
     */
    private onButtonRunScene(event: EventTouch, name: string) {
        runScene(name);
    }

    /**
     * 为 Button 写的函数
     * @param event
     * @param level
     */
    private onButtonRunLevel(event: EventTouch, level?: string) {
        runLevel(level ? parseInt(level) : undefined);
    }
}
