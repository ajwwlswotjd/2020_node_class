class RectAngle {
    constructor( height,width ){
        this.height = height;
        this.width = width;
        this.n = "사각형";
    }

    get area(){
        return this.width * this.height;
    }

    get name(){
        return this.n;
    }

    set name(value){
        this.n = value;
    }
}