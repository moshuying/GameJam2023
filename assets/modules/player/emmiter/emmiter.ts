import { _decorator, Collider2D, Component, Contact2DType, IPhysics2DContact, Node, Quat, Vec3 } from 'cc';
const { ccclass, property } = _decorator;
const tempV3 = new Vec3()
const speed = 2
@ccclass('emmiter')
export class emmiter extends Component {
    public moveVector = new Vec3(-2,-2,0).multiplyScalar(2)
    start() {
        console.log(this.node)
        // 注册单个碰撞体的回调函数
        let collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
            collider.on(Contact2DType.PRE_SOLVE, this.onPreSolve, this);
            collider.on(Contact2DType.POST_SOLVE, this.onPostSolve, this);
        }

    }
    onBeginContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // 直接应用方向
        const otherQuat = otherCollider.node.parent.getRotation()
        const otherEuler = Quat.toEuler(tempV3,otherCollider.node.parent.getRotation())
        const applyFromOtherNodeEulerRotateDeg = (360-(otherEuler.z*-1))%360 // UI只绕Z轴旋转
        const tempQuat = new Quat()
        Quat.rotateX(tempQuat,tempQuat,applyFromOtherNodeEulerRotateDeg)
        Quat.rotateY(tempQuat,tempQuat,applyFromOtherNodeEulerRotateDeg)
        Quat.toEuler(tempV3,tempQuat)
        tempV3.set(tempV3.x/180,tempV3.y/180,tempV3.z/180)
        const final = new Vec3(0,1,0).add(tempV3)
        this.moveVector.set(final)

        // // 计算反射向量
        // // const A = this.node.position.clone()
        // const B = otherCollider.node.position.clone()
        // const contactWorldManifold = contact.getWorldManifold()
        // tempV3.set(contactWorldManifold.normal.x,contactWorldManifold.normal.y,0)
        
        // // 完全镜面反射 计算反射方向到reflection,这里直接使用则完全反射碰撞结果
        // const reflection = this.moveVector.add(vec3Reflect(tempV3,this.moveVector,tempV3)).normalize()

        // // 反射方向带按钮旋转的方向 为反射方向应用被碰撞物体的欧拉角，切合游戏??
        // const otherEuler = Quat.toEuler(tempV3,otherCollider.node.parent.getRotation())
        // const applyFromOtherNodeEulerRotateDeg = otherEuler.z*-1 // UI只绕Z轴旋转
        // const tempQuat = new Quat()
        // Quat.fromEuler(tempQuat,reflection.x*180,reflection.y*180,reflection.z*180)
        // Quat.rotateX(tempQuat,tempQuat,applyFromOtherNodeEulerRotateDeg*2) // 横屏只有左右，这里乘以倍率好演示
        // Quat.rotateY(tempQuat,tempQuat,applyFromOtherNodeEulerRotateDeg*2) // 横屏只有左右，这里乘以倍率好演示
        // Quat.toEuler(tempV3,tempQuat)
        // tempV3.set(tempV3.x/180,tempV3.y/180,tempV3.z/180)
        // const final = tempV3.normalize()

        // this.moveVector.set(final).multiplyScalar(2)
    }
    onEndContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // 只在两个碰撞体结束接触时被调用一次
        console.log('onEndContact');
    }
    onPreSolve (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // 每次将要处理碰撞体接触逻辑时被调用
        console.log('onPreSolve');
    }
    onPostSolve (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // 每次处理完碰撞体接触逻辑时被调用
        console.log('onPostSolve');
    }

    update(deltaTime: number) {
        this.node.setPosition(this.node.position.add(this.moveVector))
    }
}

const vec3Reflect = (out:Vec3,a:Vec3,normal:Vec3)=>{
    out.set(a.subtract(normal.multiplyScalar(2 * a.dot(normal))));
    return out
}