import mongoose from "mongoose";

const DisertanteSchema = new mongoose.Schema({

fullName:{
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
    },
},

IdEvento:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    validate:{
        validator: function (v) {
        return mongoose.Types.ObjectId.isValid(v)
        },
        message: props => `${props.value} no es un ObjectId valido`
    }
}

})

const Disertante =  mongoose.model("Disertante",DisertanteSchema)

export default Disertante