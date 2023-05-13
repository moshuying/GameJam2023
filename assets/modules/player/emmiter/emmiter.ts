import { _decorator, Collider2D, Component, Contact2DType, IPhysics2DContact, Node, Quat, UITransform, Vec3 } from 'cc';
import { bucket } from '../bucket/bucket';
const { ccclass, property } = _decorator;
const tempV3 = new Vec3()
@ccclass('emmiter')
export class emmiter extends Component {

    public moveVector = new Vec3(-1, 1, 0)
    public speed =30
    start() {
        this.moveVector.normalize().multiplyScalar(this.speed)
    }

    controlPointArray:Node[] = []
    bucketPointArray:Node[] = []
    tempV3 = new Vec3
    i=0
    updater(deltaTime: number) {
        this.i++
        // this.nearCheck(this.node.position.clone())
            // const nodeVector = new Vec3(0.5,0,0)
        this.controlPointArray.forEach(e=>{
            const {
                position,
            }=e
            const rotation = e.getRotation().getEulerAngles(tempV3)
            const nodeVector = Vec3.normalize(tempV3,rotation)
            const currentNodePosition = this.node.position.clone()
            debugger

            if(Vec3.distance(this.node.position,position)<=80 ){
                const cross =   currentNodePosition.cross(nodeVector)
                this.moveVector.set(rotateRound(this.moveVector,printSineAndCosineForAnAngle(
                    getAngleByDistance(Vec3.distance(this.node.position,position) )+this.speed/5
                )))
                // if(!temp1.multiply(temp2).equals(new Vec3(0,0,0),0.01)){
                //     this.moveVector.set(rotateRound(this.moveVector,new Vec3(100,1,0))).normalize()
                // }else{
                //     console.log('方向相等',temp1.toString(),temp2.toString())
                // }
                // if(!this.moveVector.multiply(nodeVector).equals(new Vec3(0,0,0),0.1)){
                // }else{
                //     console.log('方向大致相等',this.moveVector.toString(),nodeVector.toString())
                // }
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
function getAngleByDistance(distance:number){
    return Math.asin(distance/80)
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