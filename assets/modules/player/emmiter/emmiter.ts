import { _decorator, Collider2D, Component, Contact2DType, IPhysics2DContact, Node, Quat, Vec3 } from 'cc';
const { ccclass, property } = _decorator;
const tempV3 = new Vec3()
const speed = 2
@ccclass('emmiter')
export class emmiter extends Component {

    public moveVector = new Vec3(-1, 1, 0).normalize().multiplyScalar(2)

    start() {


    }

    testPositionArray = [
        new Vec3(1.5,193,0),
        new Vec3(265,172),
        new Vec3(-265,175),
    ]
    tempV3 = new Vec3

    nearCheck(a:Vec3){
        const rawA = a.clone()
        const rawMove = this.moveVector.clone()
        const vector1=new Vec3(0,0,0)
        this.testPositionArray.forEach(e=>{
            if(Vec3.distance(a,e)<=80 ){
                
                this.moveVector.set(rotateRound(this.moveVector,new Vec3(0.92,-0.38)))
                
            }
        })
        return vector1
    }
    update(deltaTime: number) {
        this.moveVector.add(this.nearCheck(this.node.position.clone()))
        this.node.setPosition(this.node.position.add(this.moveVector))
    }
}

const vec3Reflect = (out:Vec3,a:Vec3,normal:Vec3)=>{
    out.set(a.subtract(normal.multiplyScalar(2 * a.dot(normal))));
    return out
}
// const tempV3 = new Vec3()
const tempQu = new Quat()
const tempNode = new Node()
var rotateRound = (pos:Vec3,rotation:Vec3)=>{
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