const Tarea = require('./tarea');
/**
 *  _listado:
 *  { 'uuid-132123-543534-3-5: {id:12, desc:asd, completadoEn: 910108} },
 */
class Tareas {

    _listado = {};

    get listadoArr() {

        const listado = [];
        //tiene keys, traigo la key y el retorno lo mando al foreach
        // y foreach llave lo que hago es armar la tarea y publicarla al listado
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push( tarea );
        });

        return listado;
    }

    constructor(){
            this._listado = {};
    }

    borrarTarea( id = '') {
        if ( this._listado[id] ) {
            delete this._listado[id];
        }
    }

    cargarTareasFromArr( tareas = [] ) {

        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea;
        });
        
    }

    crearTarea( desc = '' ){

        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;

    }

    listadoCompleto() {

        console.log('\n');

        this.listadoArr.forEach( (tarea, i) => {
            const idx = `${i + 1}.`.green; // el 2do parametro de for each es el indice siempre
            const { desc, completadoEn } = tarea; //desestructurar trayendo la desc de la tarea.

            const estado = ( completadoEn )         //creo un ternario popular DECODE? creo que si
                            ? 'Completada'.green
                            : 'Pendiente'.red;

            console.log(`${ idx } ${ desc } :: ${ estado } `);
        });
    }

    listarPendientesCompletadas( completadas = true ) {
        console.log('\n');
        let idx = 0;
        this.listadoArr.forEach( tarea  => {
            const { desc, completadoEn } = tarea; 
            const estado = ( completadoEn )         //creo un ternario popular DECODE? creo que si
                            ? completadoEn.green
                            : 'Pendiente'.red;

            if ( completadas ) {
                //mostrar completadas
                if ( completadoEn ) {
                    idx += 1;
                    console.log(`${ (idx + '.').green } ${ desc } :: ${ estado } `);                    
                }
            } else {
                //mostrar pendientes
                if ( !completadoEn ) {
                    idx += 1;
                    console.log(`${ (idx + '.').green } ${ desc } :: ${ estado } `);  
                }
            }
        });
    }

    toggleCompletadas( ids = [] ) {

        ids.forEach( id => {

            const tarea = this._listado[id];
            if ( !tarea.completadoEn ) {
                //Completar la tarea
                tarea.completadoEn = new Date().toISOString(); //le pongo la fecha
            }

        });

        this.listadoArr.forEach( tarea => {
            if ( !ids.includes(tarea.id) ) { //Si en mi arreglo de IDS no incluye la tarea.id que se encuentra registrada.
                this._listado[tarea.id].completadoEn = null;
            }

        });

    }


}


module.exports = Tareas;