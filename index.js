'use strict';

class SuperModel {
    
    constructor(options){
        options = options || {};
        this.data = options.data || {};
        this.mapping = options.mapping || {};
        this.filters = options.filters || {};
    }

    set(key, val){
        var prop = this.getMapping(key);
        this.data[prop] = this.filter(prop, val);
    }

    get(key){
        return this.data[key];
    }

    getMapping(key){
        return this.mapping[key] || key;
    }

    filter(prop, val){
        if( this.filters.hasOwnProperty(prop) ){
            return this.filters[prop](val);
        }

        return val;
    }

    import(data){
        for(var key in data){
            this.set(key, data[key]);
        }
    }

    export(){
        return this.data;
    }

}

module.exports = SuperModel;
