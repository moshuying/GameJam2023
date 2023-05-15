/**
 * 收集袋
 * 管理一个进度，调用 addCounter 的时候进度增加
 * 一段时间后，进度会重新下降
 * 不同进度的时候，显示不同的纹理
 */

import { _decorator, CCInteger, Component, Node, Sprite, AudioSource, Tween, SpriteFrame } from 'cc';

const { ccclass, property } = _decorator;

@ccclass('bucket')
export class bucket extends Component {
    @property({ type: Node })
    sprite: Node | null = null;

    @property({ type: SpriteFrame })
    frameList: SpriteFrame[] = [];

    @property({
        type: CCInteger,
        slide: true,
        min: 0,
        max: 100,
    })
    get progress() {
        return this._progress;
    }
    set progress(val: number) {
        this._progress = Math.min(Math.max(val, 0), 100);

        this._updateContentProgress();
        this._updateAudio();
    }
    @property({ type: CCInteger })
    _progress: number = 0;
    public audio: AudioSource = null!;

    // 锁定最大音量
    tween: Tween<bucket> = null;
    addingLastFrame = 0;
    lock: boolean = false;
    timer?: number;

    // ---- 私有方法 ----

    _updateContentProgress() {
        if (this.frameList.length === 0) {
            return;
        }
        const sp = 100 / (this.frameList.length - 1);
        const index = Math.floor(this._progress / sp);
        const spriteComponent = this.sprite.getComponent(Sprite);
        spriteComponent.spriteFrame = this.frameList[index];
    }

    _updateAudio() {
        if (!this.audio) {
            return;
        }
        this.audio.volume = Math.min(this._progress / 100, 1);
    }

    // ---- 生命周期 ----

    start() {
        this._updateContentProgress();
        this.audio = this.node.getComponent(AudioSource);
        this.tween = new Tween(this);
    }

    update(deltaTime: number) {
        this.addingLastFrame++;
    }

    // ---- 公开方法 ----

    addCounter() {
        if (this.lock) {
            return;
        }
        this.tween.stop();
        this.progress += 25;
        this.addingLastFrame = 0;
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            if (this.addingLastFrame < 36) return;
            this.tween.to(2.2, { progress: 0 }).start();
        }, 3000);
    }

    lockMaxVolume() {
        clearTimeout(this.timer);
        this.progress = 100;
        this.lock = true;
    }
}
