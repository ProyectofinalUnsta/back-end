import mongoose from "mongoose"

const InscriptoSchema = new mongoose.Schema({
idEvento: {
    type:mongoose.Schema.type.ObjectId,
    ref:'Event',
    required:true,
    validate:{
        validator: function (v) {
            return mongoose.Types.ObjectId.isValid(v)
        },
        message: props => `${props.value} no es un ObjectId valido`
    }
},
nombreEvento: {
    type:String,
    required:true,
},
gmail:{
    type:String,
    required:true,
    validate:{
        validator: function (v) {
            return  /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim.test(v)
        },
        message: props => `${props.value} no es un email valido`
    }
},
nombre: {
type:String,
required:true,
},
apellido: {
type:String,
required:true
}
})

const Inscriptos = new mongoose.model('inscriptos',InscriptoSchema)

export default Inscriptos