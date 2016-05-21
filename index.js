var util = require('util');
var SuperModel = function(data){
    if( typeof data !== "undefined" ){
        this.data = data;
    }else{
        this.data = {}; 
    }   
};

SuperModel.prototype = {
    mapping: {}, 
    set: function(key, val){
        if( this.filters.hasOwnProperty(key) ){
            val = this.filters[key](val);
        }   
        this.data[key] = val;
    },  
    get: function(key){
        return this.data[key] || false;
    },  
    import: function(data){
        for(var key in data){
            var prop = this.mapping[key];
            if( prop ){
                this.set(prop, data[key]);
            }else{
                this.set(key, data[key]);
            }   
        }   
    },  
    export: function(){
        return this.data;
    },  
    filters: {
    }   
};

SuperModel.clone = function(options){
    var model = function(){
        SuperModel.call(this);
        for(var key in options){
            this[key] = options[key];
        }
    };
    util.inherits(model, SuperModel);
    
    return model;
};

module.exports = SuperModel;

/**
 * Sample Usage
 * /
var User = SuperModel.clone({
    mapping: {
        em: 'email'
    },
    filters: {
        email: function(val){
            return 'fixed:' + val;
        }
    }
});

var user = new User;
    user.import({em: 'eric@restorationmedia.com', extra: 'field'});
    console.log(user);
// */
