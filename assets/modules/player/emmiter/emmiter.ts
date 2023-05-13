import { _decorator, Collider2D, Component, Contact2DType, IPhysics2DContact, Node, Quat, UITransform, Vec3 } from 'cc';
import { bucket } from '../bucket/bucket';
import { point } from '../point/point';
const { ccclass, property } = _decorator;
const tempV3 = new Vec3()
@ccclass('emmiter')
export class emmiter extends Component {

    public moveVector = new Vec3(-1, 1, 0)
    public speed = 5;
    setSpeed(val:number){
        this.speed = val
        this.moveVector.normalize().multiplyScalar(this.speed)
    }
    start() {
        this.moveVector.normalize().multiplyScalar(this.speed)
    }

    controlPointArray:Node[] = []
    bucketPointArray:Node[] = []
    tempV3 = new Vec3
    i=0
    updater(deltaTime: number) {
        this.i++
        this.controlPointArray.forEach(e=>{
            const position = e.getWorldPosition()

            const eulerAngle = -e.angle
            const targetRotVec = printSineAndCosineForAnAngle(eulerAngle)
            const currentRotVec = this.moveVector.clone()

            const angle = vectorAngle(
                [targetRotVec.x,targetRotVec.y],
                [currentRotVec.x,currentRotVec.y]   
            ) *180/Math.PI
            if(angle<=6){return}

            const size = e.getComponent('point') as point
            const depth = Vec3.distance(this.node.getWorldPosition(),position)
            if(depth<=size.size/2 ){
                const widthAngle = 1- (180 - angle ) / 360
                const widthDepth = 1 - depth *2 / size.size
                const widthSpeed = this.speed / 1e4
                const angleToNumber = (widthAngle+widthDepth+widthSpeed)*0.7
                Vec3.slerp(this.moveVector,this.moveVector.normalize(),targetRotVec.normalize(),angleToNumber)
                this.moveVector.normalize().multiplyScalar(this.speed)
            }
        })
        this.bucketPointArray.forEach(e=>{
            const bucket = e.getComponent('bucket') as bucket
            if(bucket){
                const uiSize = e.getComponent(UITransform)
                const position = e.getWorldPosition()
                const aabb = {
                    xmin :position.x-uiSize.contentSize.width/2,
                    xmax:position.x+uiSize.contentSize.width/2,
                    ymin:position.y-uiSize.contentSize.height/2,
                    ymax:position.y+uiSize.contentSize.height/2,
                }
                const emmiterposition = this.node.getWorldPosition()
                if(emmiterposition.x<aabb.xmax && emmiterposition.x>aabb.xmin
                    && emmiterposition.y<aabb.ymax && emmiterposition.y>aabb.ymin){
                    bucket.addCounter()
                }
            }
        })
        this.node.setPosition(this.node.position.add(this.moveVector))
    }
}

const vec3Reflect = (out:Vec3,a:Vec3,normal:Vec3)=>{
    out.set(a.subtract(normal.multiplyScalar(2 * a.dot(normal))));
    return out
}

function printSineAndCosineForAnAngle(angleInDegrees) {
    const angleInRadians = angleInDegrees * Math.PI / 180;
    const s = Math.sin(angleInRadians);
    const c = Math.cos(angleInRadians);
return new Vec3(s,c,0)  
}
// vectorAngle([0.71,0.71],[0,1]) * 180 / Math.PI
const vectorAngle = (x, y) => {
    let mX = Math.sqrt(x.reduce((acc, n) => acc + Math.pow(n, 2), 0));
    let mY = Math.sqrt(y.reduce((acc, n) => acc + Math.pow(n, 2), 0));
    return Math.acos(x.reduce((acc, n, i) => acc + n * y[i], 0) / (mX * mY));
  };

function getAngleByDistance(distance:number){
    return Math.asin(distance/80)
}

function getOneSign(number:number){
    if(number===0){
        return Object.is(number,0)?1:-1
    }else{
        return Math.sign(0)
    }

}

// const tempV3 = new Vec3()
const tempQu = new Quat()
const tempNode = new Node()
const rotateRound = (pos:Vec3,rotation:Vec3)=>{
    const rP = new Vec3(
        pos.x*rotation.y+pos.y*rotation.x,
        pos.y* rotation.y-pos.x*rotation.x
    )
    return rP
}
// let p1 = new Vec3(0,1,0)
// console.log(rotateRound(p1,new Vec3(1,0,0)))


// var Vec3 = cc.Vec3
// var rotateRound = (pos,rotation)=>{
//     const rP = new Vec3(
//         pos.x*rotation.y+pos.y*rotation.x,
//         pos.y* rotation.y-pos.x*rotation.x
//     )
//     return rP
//     // tempNode.setRotationFromEuler(tempV3.set(90,0,0))
//     // tempNode.updateWorldTransform()

//     // const toEuler = Quat.fromEuler(tempQu,45,0,0)
//     // Quat.rotateZ(tempQu,tempNode.rotation,45)
//     // tempQu.
//     // const point = Quat.getAxisAngle(tempV3,)
// }
// let p1 = new Vec3(0,1,0)
// console.log(rotateRound(p1,new Vec3(1,0,0)))