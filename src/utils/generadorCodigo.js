export class GeneradorCodigo {
    static codigoDisertante () {
    const palabras1 = ["ROJO", "AZUL", "VERDE", "LUNA", "SOL", "NUBE", "FUEGO", "MATE" , "MESSI" , "OBRA" ];
    const palabras2 = ["GATO", "PEZ", "RAYO", "ÁRBOL", "MONO", "TREN", "CIELO", "VUELO", "DIOS" , "JESUS" , "PERRO" , "TRUCO" , "ENVIDO"];
    const palabras3 = ["AUTO", "MAQUINA", "LAPIZ", "YERBA", "CELULAR", "CODIGO", "CORRER", "HOLA", "ADIOS" , "TECLADO" , "MOUSE" , "BANDA" , "LAPTOP"];
    const numero = Math.floor(Math.random() * 100)

    const palabra1 = palabras1[Math.floor(Math.random() * palabras1.length)];
    const palabra2 = palabras2[Math.floor(Math.random() * palabras2.length)];
    const palabra3 = palabras3[Math.floor(Math.random() * palabras3.length)];

    return `${palabra1}-${numero}-${palabra2}-${palabra3}`

    }
}


