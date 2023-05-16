/**
 * 场景管理器本体
 * 包含一个全局的 manager 和一个用于管理的组件
 * 组件上主要是管理一些全局数据，全局只能有一个管理器组件
 * 全局管理器则是其他子 scene 调用的接口
 */

import { sceneController } from './scene-controller';
import { levelController } from './level-controller';
import { _decorator, Component, Node, Prefab, instantiate, AudioClip } from 'cc';
const { ccclass, property } = _decorator;

let sceneManagerSingleton: sceneManager | null = null;
let currentLevel: Node | null = null;
let currentScene: Node | null = null;

/**
 * 运行下一个关卡
 * @param level 
 */
export async function runLevel(level?: number) {
    if (!sceneManagerSingleton) {
        console.error('SceneManager 没有初始化，请在任意节点上挂载它并设置内容');
    }
    // 展示关卡节点，隐藏非关卡节点
    if (sceneManagerSingleton.persistentRoot.active) {
        if (currentScene) {
            const comp = currentScene.getComponent(sceneController);
            await comp.fadeOut();
            currentScene = null;
        }
        sceneManagerSingleton.persistentRoot.active = false;
    }
    sceneManagerSingleton.levelRoot.active = true;

    // 关卡节点只能同时展示一个，所以移出原来的关卡
    let node = sceneManagerSingleton.levelRoot.children[0];
    if (level === undefined) {
        return;
    }
    if (node && node.name !== level.toString()) {
        sceneManagerSingleton.levelRoot.removeChild(node);
        node = undefined;
    }
    if (node) {
        currentLevel = node;
    } else {
        const prefab = sceneManagerSingleton.levelSceneList[level - 1];
        if (!prefab) {
            console.error(`没有找到 ${level} level scene`);
            return;
        }
        node = instantiate(prefab.data);
        node.name = level.toString();
        sceneManagerSingleton.levelRoot.addChild(node);
        currentLevel = node;
    }
    const comp = currentLevel.getComponent(levelController);
    await comp.fadeIn();
}

/**
 * 运行除关卡外的场景
 * @param name 
 */
export async function runScene(name: string) {
    if (!sceneManagerSingleton) {
        console.error('SceneManager 没有初始化，请在任意节点上挂载它并设置内容');
    }
    // 展示非关卡节点，隐藏关卡节点
    if (sceneManagerSingleton.levelRoot.active) {
        if (currentLevel) {
            const comp = currentLevel.getComponent(levelController);
            await comp.fadeOut();
            currentLevel = null;
        }
        sceneManagerSingleton.levelRoot.active = false;
    }
    if (sceneManagerSingleton.persistentRoot.active === false) {
        sceneManagerSingleton.persistentRoot.active = true;
    }
    

    // 遍历非关卡节点，将不需要的节点记录到数组，后续将移出节点树
    let node: Node | null = null;
    const removeNodeList = [];
    sceneManagerSingleton.persistentRoot.children.forEach((child) => {
        if (child.name == name) {
            child.active = true;
            node = child;
        } else {
            child.active = false;
            // 判断场景是否需要常驻
            const prefab = sceneManagerSingleton.sceneMap.get(child.name);
            const comp = prefab.data.getComponent(sceneController);
            if (!comp.isPersistnet) {
                removeNodeList.push(child);
            }
        }
    });

    // 移出不需要常驻的场景
    removeNodeList.forEach((child) => {
        sceneManagerSingleton.persistentRoot.removeChild(child);
    })

    if (!node) {
        const prefab = sceneManagerSingleton.sceneMap.get(name);
        if (!prefab) {
            console.error(`没有找到 ${name} 的场景`);
            return;
        }
        node = instantiate(prefab.data);
        node.name = name;
        sceneManagerSingleton.persistentRoot.addChild(node);
        currentScene = node;
    } else {
        currentScene = node;
    }
    const comp = currentScene.getComponent(sceneController);
    await comp.fadeIn();
}

@ccclass('sceneManager')
export class sceneManager extends Component {

    @property({
        type: [Prefab],
        tooltip: '静态场景的 Prefab，这些场景可以选择是否常驻，是否销毁等功能',
    })
    sceneList: Prefab[] = [];

    @property({
        type: [Prefab],
        tooltip: '关卡 Prefab 列表，这些关卡可以通过 nextLevel 切换',
    })
    levelSceneList: Prefab[] = [];

    @property({
        tooltip: '默认启动的场景',
    })
    defaultScene: string = '';

    @property({
        type: Node,
        tooltip: '静态场景存放的位置',
    })
    persistentRoot: Node = null;

    @property({
        type: Node,
        tooltip: '关卡场景存放的位置',
    })
    levelRoot: Node = null;

    sceneMap: Map<string, Prefab> = new Map();

    start() {
        if (sceneManagerSingleton) {
            console.error('SceneManager 全局只能有一个，请勿挂在多个元素上');
        } else {
            sceneManagerSingleton = this;
            this.sceneList.forEach((prefab) => {
                const comp = prefab.data.getComponent(sceneController);
                this.sceneMap.set(comp.sceneName, prefab);
            });
        }
        if (!this.persistentRoot) {
            console.error('PersistentRoot 没有设置，无法创建默认场景');
        } else {
            runScene(this.defaultScene);
        }
    }
}
