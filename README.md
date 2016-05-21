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

That's all that features currently available with this library and you can be sure that more will come as needed/requested. Head over to [GitHub](https://github.com/the-letter-e-production/npm-super-model) for feature requests or bug reports.
