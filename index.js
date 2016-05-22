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
    filters: {},
    data_sources: {}
};

SuperModel.addDataSource = function(pkg){
    SuperModel.prototype.data_sources[pkg.name] = pkg.source;
};

SuperModel.clone = function(options, data_source, data_source_options){
    var model = function(){
        SuperModel.call(this);
        for(var key in options){
            this[key] = options[key];
        }
        if( typeof data_source !== "undefined" && this.data_sources.hasOwnProperty(data_source) ){
            for(var key in data_source_options){
                this.data_sources[data_source]._options[key] = data_source_options[key];
            }
            this._options = JSON.parse(JSON.stringify(this.data_sources[data_source]._options));
            for(var key in this.data_sources[data_source]){
                if( key == '_options' ){
                    continue;
                }
                if( this.hasOwnProperty(key) ){
                    throw new Error('Data sources are not allowed to override default properties! Invalid property: ' + key);
                }
                this[key] = this.data_sources[data_source][key];
            }
        }
    };
    util.inherits(model, SuperModel);

    return model;
};

module.exports = SuperModel;

/**
 * Sample Usage
 * /
SuperModel.addDataSource({
    name: 'mongodb',
    source: {
        find: function(id){
            this.import({em: 'eric@restorationmedia.com', extra: 'field'});
        },
        findBy: function(key, val){
            console.log(this);
        }
    }
});

var User = SuperModel.clone({
    mapping: {
        em: 'email'
    },
    filters: {
        email: function(val){
            return 'fixed:' + val;
        }
    }
}, 'mongodb');

var user = new User;
    user.find(1);
    console.log(user.get('email'));
// */
