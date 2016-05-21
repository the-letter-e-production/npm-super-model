# Super Model

    npm install super-model

This plugin was designed to rapidly create flexible JSON models that can easily be backed by any datasource of your choice.

## Example Usage

```
/**
 * Require Super Model
 */
var sm = require('super-model');

/**
 * Define your custom model
 */
var User = sm.clone({
    mapping: { //used to normalize imported keys to model values
        em: 'email',
        fn: 'first_name',
        ln: 'last_name',
        ps: 'password'
    },
    filters: { //used to filter values at set time
        email: function(val){
            //do email validation
            return val;
        },
        password: function(val){
            //hash your password
            return md5(val); //pseudo code
        }
    }
});

/**
 * Create your instance of a User Model
 */
var user = new User;
    user.import({ //import data from a database, query string, etc...
        em: 'user@host.com',
        fn: 'Jane',
        ln: 'Doe',
        ps: 'abcd1234'
    });

/**
 * Use Setters/Getters
 */ 
user.set('extra', 'field') //add any value you want with set
var email = user.get('email'); //user@host.com

/**
 * Export all user data to JSON
 */
 var udata = user.export();
```

## Data Source Support

This library supports custom data sources that you can add to the library and use on a model by model basis. Here's how!

```
/**
 * Require Super Model
 */
var sm = require('super-model');

/**
 * Add a data source
 */
sm.addDataSource({
    name: 'mongodb',
    source: {
        find: function(id, cb){
            //use options
            var url = this.data_sources.mongodb._options.host + ':' + this.data_sources.mongodb._options.port; //options defined at global level
            var db = this.data_sources.mongodb._options.database; //options defined at clone level
            //find user by id using your mongo code of choice
            this.import(json); //import json object returned by your mongo code
            cb(this);
        },
        findByKey: function(key, val, cb){
            //use options
            var url = this.data_sources.mongodb._options.host + ':' + this.data_sources.mongodb._options.port; //options defined at global level
            var db = this.data_sources.mongodb._options.database; //options defined at clone level
            //find user by custom key using your mongo code of choice
            this.import(json); //import json object returned by your mongo code
            cb(this);
        },
        _options: {
            host: "localhost",
            port: "27017"
        }
    }
});

/**
 * Create your instance of a User Model
 */
var User = sm.clone({
    mapping: { //used to normalize imported keys to model values
        em: 'email',
        fn: 'first_name',
        ln: 'last_name',
        ps: 'password'
    },
    filters: { //used to filter values at set time
        email: function(val){
            //do email validation
            return val;
        },
        password: function(val){
            //hash your password
            return md5(val); //pseudo code
        }
    }
}, 'mongodb', {"database": "db-name"}); //add your data source name and override options, optional

/**
 * Now use your new data source access methods!
 */
var user = new User;
    user.find(1, //find user with id == 1
        function(user){ //callback once user is retrieved
            var email = user.get('email');
        });
```

All source methods will be added to your models prototype and are ready to use as you see fit. It's that easy!

__NOTE:__ If you try to create a source method with the same name as a default property of SuperModel an error will be thrown.

## List of Data Sources

[__CouchDB__](https://www.npmjs.com/package/super-model-couchdb)




That's all that features currently available with this library and you can be sure that more will come as needed/requested. Head over to [GitHub](https://github.com/the-letter-e-production/npm-super-model) for feature requests or bug reports.
