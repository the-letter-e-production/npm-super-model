# Super Model

    npm install super-model

This plugin was designed to rapidly create flexible JSON models that can easily be backed by any datasource of your choice.

## NOTE: Major Relase to ES6 implementation. Old API is now deprecated

## Example Usage

```
var SuperModel = require('super-model');

var model = new SuperModel([options]);

model.set('foo', 'bar');
console.log(model.get('foo')); //prints 'bar'

```

## Helper Features
1. Mapping
2. Filters
3. Interface

### 1. Mapping
Mapping allows you to easily fit incongruent input to your model. Perhaps you're taking the output from a third party module and you don't want to write an intermediate transform step...this is where mapping comes in.

```
class User extends SuperModel {

    constructor(options) {
        super(options);
        this.mapping = {
            foo: 'bar'
        };
    }

}

let user = new User;
user.set('foo', 'bar');
user.get('bar') //returns 'bar'
```

### 2. Filters
Filters allow you to pass values through arbitrary functions and return modified data to the model each time data is set. This can be handy for data consistency and sanitization.

```
class User extends SuperModel {

    constructor(options) {
        super(options);
        this.filters = {
            foo: function(val) {
                return val.toUpperCase();
            }
        };
    }

}

let user = new User;
user.set('foo', 'bar');
user.get('foo') //returns 'BAR'
```

### 3. Interface
Pseudo interface support is added in 2.0.1 to enforce a certain shape to your data model. It will make sure that data set is of allowed keys and types.

```
class User extends SuperModel {

    constructor(options) {
        super(options);
        this.interface = {
            foo: 'string'
        };
    }

}

let user = new User;
user.set('foo', false); //throws Error
```

**NOTE:** Use type 'any' to allow any data type to be passed.

## Data Source Support

Data source support is much simpler with the new ES6 implementation. All you need to do is extend the SuperModel base class

```
var SuperModel = require('super-model');

class MyModel extends SuperModel {
    
    find(id){
        return mongodb.find(id).bind(this).then(function(result){
            this.import(result);
        }); //pseudo bluebird promise code
    }

}

var mymodel = new MyModel(options);
    mymodel.find(1).then(function(){
        this.get('mydata'); //return myvalue
    });
```



That's all that features currently available with this library and you can be sure that more will come as needed/requested. Head over to [GitHub](https://github.com/the-letter-e-production/npm-super-model) for feature requests or bug reports.
