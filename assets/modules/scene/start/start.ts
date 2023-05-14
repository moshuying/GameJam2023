import {
    _decorator,
    Component,
    Node,
    Prefab,
    instantiate,
} from 'cc';
import { throttle } from '../../utils';

const { ccclass, property } = _decorator;

@ccclass('start')
export class start extends Component {

    @property({
        type: [Prefab]
    })
    sceneList: Prefab[] = [];

    @property({
        type: [Node],
    })
    startNodeList: Node[] = [];

    @property({
        type: [Node],
    })
    otherNodeList: Node[] = [];

    @property({
        type: Node,
    })
    rootNode: Node | null = null;

    start() {
        this.nextScene = throttle(this.nextScene,120)
        this.prevScene = throttle(this.prevScene,120)
    }

    update(deltaTime: number) {
        
    }

    // 

    currentSceneIndex: number = -1;
    currentSceneNode: Node | null = null;

    nextScene() {
        if (this.currentSceneNode) {
            const parent = this.currentSceneNode.getParent();
            parent.removeChild(this.currentSceneNode);
        }
        this.currentSceneNode = null;

        let currentIndex = Math.min(this.currentSceneIndex + 1, this.sceneList.length - 1);

        if (this.currentSceneIndex + 1 > this.sceneList.length - 1) {
            currentIndex = -1;
        }

        const prefab = this.sceneList[currentIndex];
        if (prefab) {
            this.currentSceneNode = instantiate(prefab.data);
            this.rootNode.addChild(this.currentSceneNode);
        }
        this.currentSceneIndex = currentIndex;

        // start 场景才显示
        this.startNodeList.forEach(node => node.active = currentIndex === -1);
        this.otherNodeList.forEach(node => node.active = currentIndex !== -1);
    }

    prevScene() {
        if (this.currentSceneNode) {
            const parent = this.currentSceneNode.getParent();
            parent.removeChild(this.currentSceneNode);
        }
        this.currentSceneNode = null;

        const currentIndex = Math.max(this.currentSceneIndex - 1, -1);

        const prefab = this.sceneList[currentIndex];
        if (prefab) {
            this.currentSceneNode = instantiate(prefab.data);
            this.rootNode.addChild(this.currentSceneNode);
        }
        this.currentSceneIndex = currentIndex;

        // start 场景才显示
        this.startNodeList.forEach(node => node.active = currentIndex === -1);
        this.otherNodeList.forEach(node => node.active = currentIndex !== -1);
    }
}
