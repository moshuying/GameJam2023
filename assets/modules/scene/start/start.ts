import {
    _decorator,
    Component,
    Node,
    Prefab,
    instantiate,
} from 'cc';

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

    start() {

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

        const currentIndex = this.currentSceneIndex + 1;

        const prefab = this.sceneList[currentIndex];
        if (prefab) {
            this.currentSceneNode = instantiate(prefab.data);
            this.node.addChild(this.currentSceneNode);
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

        const currentIndex = this.currentSceneIndex - 1;

        const prefab = this.sceneList[currentIndex];
        if (prefab) {
            this.currentSceneNode = instantiate(prefab.data);
            this.node.addChild(this.currentSceneNode);
        }
        this.currentSceneIndex = currentIndex;

        // start 场景才显示
        this.startNodeList.forEach(node => node.active = currentIndex === -1);
        this.otherNodeList.forEach(node => node.active = currentIndex !== -1);
    }
}
