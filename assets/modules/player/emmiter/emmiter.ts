import { _decorator, Collider2D, Component, Contact2DType, IPhysics2DContact, Node, Quat, Vec3 } from 'cc';
const { ccclass, property } = _decorator;
const tempV3 = new Vec3()
@ccclass('emmiter')
export class emmiter extends Component {

    public moveVector = new Vec3(-1, 1, 0)
    public speed =20
    start() {
        this.moveVector.normalize().multiplyScalar(this.speed)

    }

    testPositionArray = [
        new Vec3(1.5,193,0),
        new Vec3(265,172),
        new Vec3(-265,175),
    ]
    tempV3 = new Vec3

    nearCheck(a:Vec3){
        const vector1=new Vec3(0,0,0)
        this.testPositionArray.forEach(e=>{
            if(Vec3.distance(a,e)<=80 ){
                // 0.92,-0.38)
                // this.moveVector.set(rotateRound(this.moveVector,new Vec3(0.01,-0.01)))
            }
        })
        return vector1
    }
    i=0
    updater(deltaTime: number) {
        this.i++
        // this.nearCheck(this.node.position.clone())
            const nodeVector = new Vec3(0.5,0,0)
        this.testPositionArray.forEach(e=>{
            if(Vec3.distance(this.node.position,e)<=80 ){
                const temp1 = this.moveVector.clone().normalize()
                const temp2 = nodeVector.clone().normalize()
                this.moveVector.set(rotateRound(this.moveVector,printSineAndCosineForAnAngle(
                    getAngleByDistance(Vec3.distance(this.node.position,e) )+this.speed/5
                    )
                    ))
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