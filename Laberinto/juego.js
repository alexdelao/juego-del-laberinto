let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');
//VARIABLES DE CUADRITOS
let anchoF = 50;
let altoF = 50;
//VARIABLES DE COLORES DE CUADRITOS
let tierra = 'grey';
let camino = 'blue';
let llave = 'yellow';
let puerta = 'red';
//EL PERSONAJE
p1 = new Personaje();
//EL ESCENARIO
let escenario = [
    [0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,1],
    [0,1,1,1,0,0,1,1,0,1,1,1,1,1,1,1],
    [0,0,0,1,0,1,1,1,1,1,0,0,1,0,0,0],
    [0,0,0,1,0,1,1,1,0,1,3,0,0,0,0,0],
    [0,1,1,1,0,1,0,0,0,0,0,0,1,1,0,0],
    [0,1,0,1,1,1,1,0,4,1,1,1,1,0,1,1],
    [0,0,0,1,0,0,1,0,0,0,0,0,1,0,1,0],
    [0,1,1,1,0,1,1,1,1,1,1,0,1,1,1,1],
    [0,1,0,0,0,1,1,1,0,0,1,1,1,0,1,0],
    [0,1,1,1,0,1,1,1,0,0,0,0,0,0,1,0],
]
//PARA CREAR EL PERSONAJE
function Personaje(){
    this.x = 1;
    this.y = 1;
    this.llave = false; //TIENE LA LLAVE O NO

    //DIBUJAR AL PERSONAJE
    this.dibuja = function(){
        ctx.fillStyle = 'white';
        ctx.fillRect(anchoF*this.x,altoF*this.y,anchoF,altoF);
    
}

//METODO PARA VER SI VA CHOCAR O NO PASANDOLE UNA POSICION
this.margenes = function(x,y){
    let colison = false;

    if(escenario[y][x]==0){
        colison = true;
    }
    return colison;
}

//METODOS PARA MOVER EL PERSONAJE
    this.arriba = function(){
        //USAMOS EL METODO SI ES ARRIBA ES Y-1 UNA POSICION ADELANTE PARA VER SI HAY COLISION
        //SI EL METODO RETORNA FALSO PUES SE PUEDE MOVER
        if(this.margenes(this.x,this.y-1)==false){
            this.y--;
            this.recogeObj();//SE ESTA EN ESA POSICION EJECUTA EL METODO
        }
    }
    this.abajo = function(){
        if(this.margenes(this.x,this.y+1)==false){
            this.y++;
            this.recogeObj();
        }
    }
    this.derecha = function(){
        if(this.margenes(this.x+1,this.y)==false){
            this.x++;
            this.recogeObj();
        }
    }
    this.izquierda = function(){
        if(this.margenes(this.x-1,this.y)==false){
            this.x--;
            this.recogeObj();
        }
    }

    //METODO PARA RECOGER LA LLAVE Y ENTRAR A LA PUERTA
    this.recogeObj = function(){
        //SE GUARDA LA POSICION ACTUAL PARA HACER LA COMPROBACION
        let posicion = escenario[this.y][this.x];

            //SI LA POCISION ES EL VALOR DE LA LLAVE(3)
        if(posicion == 3){
            this.llave = true;
            escenario[this.y][this.x] = 1;
            console.log('tienes la llave');
        }

        //SI LA POCISION ES EL VALOR DE LA PUERTA(4)
        if(posicion == 4){
            if(this.llave == true){
                this.victoria();
            }else{
                console.log('No tienes la llave');
            }
        }
    }

    //PRACTICAMENTE REINICIA EL JUEGO
    this.victoria = function(){
        // console.log('Felicidades ganaste');
        // this.x = 1;
        // this.y = 1;
        // this.llave = false;
        // escenario[3][10] = 3;
        console.log('GANASTE!!')
        p1 = new Personaje();
        this.llave = false;
        escenario[3][10] = 3;
    }
}

document.addEventListener('keydown',function(e){
    if(e.keyCode==38)
        p1.arriba();
    if(e.keyCode==40)
        p1.abajo();
    if(e.keyCode==39)
        p1.derecha();
    if(e.keyCode==37)
        p1.izquierda();
})

function dibujaEscenario(){
    let color;
    for(let y = 0; y<escenario.length; y++){
        for(let x = 0; x<escenario[0].length; x++){
            if(escenario[y][x] == 0)
                color = tierra;
            if(escenario[y][x] == 1)
                color = camino;
            if(escenario[y][x] == 2)
                color = cesped;
            if(escenario[y][x] == 3)
                color = llave;
            if(escenario[y][x] == 4)
                color = puerta;
            
            ctx.fillStyle = color;
            ctx.fillRect(anchoF*x,altoF*y,anchoF,altoF);

        }
    }

}

function dibuja(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    dibujaEscenario();
    p1.dibuja();
}

setInterval(dibuja, 10);
