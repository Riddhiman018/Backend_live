const mongoose=require("mongoose")
const bd =new mongoose.Schema({
  TOURNAMENT_ID:{
    type:Number,

  },
  STATUS:{
    type:Boolean,
    default:true,

  },
  LOCATION:{
    type:String,

  },
  TYPE:{
    type:String,
    default:"DYNAMIC",
  },
  GEOTAG:{     
    type:String,//API CALL

  },
  REGISTRATION_CLOSE_TIME:{
    type : Date, 
    default: Date.now,

  },
  SPORT:{
    type:Array,    //drop down

  },
  CANCELLATION_STATUS:{
    type:Boolean,
    default:false,

  },
  CATEGORIES:{
    type:Array,
   //drop down
  },
  MATCHES:{  //array of match ids
    type:[]
  },
  PARTICIPANTS:{
    type:[String],
    default:['pl1','pl2','pl3','pl4'] // Array of participants
  }
});

module.exports=mongoose.model('tournament', bd);
