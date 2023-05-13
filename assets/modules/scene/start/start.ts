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

    start() {

    }

    update(deltaTime: number) {
        
    }

    // 

    currentSceneIndex: number = 0;
    currentSceneNode: Node | null = null;

    nextScene() {
        if (this.currentSceneNode) {
            const parent = this.currentSceneNode.getParent();
            parent.removeChild(this.currentSceneNode);
        }

        const prefab = this.sceneList[this.currentSceneIndex];
        this.currentSceneNode = instantiate(prefab.data);
        this.node.addChild(this.currentSceneNode);
        this.currentSceneIndex++;

        // start 场景才显示
        this.startNodeList.forEach(node => node.active = this.currentSceneIndex === 0);
    }

    prefabScene() {

    }
}
