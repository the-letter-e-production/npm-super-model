'use strict';

class SuperModel {
    
    constructor(options){
        options = options || {};
        this.data = options.data || {};
        this.mapping = options.mapping || {};
        this.filters = options.filters || {};
        this.interface = options.interface || false;
    }

    set(key, val){
        if( this.interface ) {
          if( !this.interface.hasOwnProperty(key) ){
              throw new Error('Invalid property passed: ' + key);
          } else if ( this.interface[key] !== 'any' && typeof val !== this.interface[key] ) {
              throw new Error('Invalid type `' + (typeof val) + '` passed to ' + key + ': Expected `' + this.interface[key] + '`');
          }
        }
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

    setInterface(obj) {
        this.interface = obj;
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
