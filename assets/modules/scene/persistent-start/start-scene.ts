import {
    _decorator,
    Component,
    EventTouch,
} from 'cc';
import { runScene } from '../../public/scene-manager';

const { ccclass, property } = _decorator;

@ccclass('start')
export class start extends Component {

    start() {
        
    }

    update(deltaTime: number) {
        
    }

    onButtonRunScene(event: EventTouch, name: string) {
        runScene(name);
    }
}
