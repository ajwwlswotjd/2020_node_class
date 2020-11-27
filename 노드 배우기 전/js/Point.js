class Point {
    
    constructor( x , y){
        this.x = x;
        this.y = y;
    }

    print(){
        console.log(`현재 좌표는 ${this.x} , ${this.y} 입니다.`);
    }

    static distance(p1 , p2){
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        return Math.hypot(dx, dy);

        // hypot 은 피타고라스
    }

}