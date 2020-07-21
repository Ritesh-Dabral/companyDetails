var mongoose        = require('mongoose'),
    URI             = "mongodb://127.0.0.1:27017/companyList",
    mongo_need_obj  = {
                        useNewUrlParser: true,
                        useFindAndModify: true,
                        useCreateIndex: true,
                        useUnifiedTopology:true,
                    }

mongoose.connect(URI,mongo_need_obj, function(err,db_response){
    if(err){
        console.log(err);
    }
    else {
        console.log('connected to companyList');
    }
});

var company_schema = new mongoose.Schema({
    name: String,
    CIN: String, 
});

module.exports = Company = mongoose.model("companies",company_schema);