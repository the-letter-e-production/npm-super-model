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
