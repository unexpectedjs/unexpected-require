Mocks out `require` statements using [mock-require](https://github.com/boblauer/mock-require).

```js
return expect(function (cb) {
    var fs = require('fs');
    fs.readFile('foo.txt', cb); 
}, 'with require mocked out', {
    'fs': {
        readFile: function (filename, cb) {
            setImmediate(function () {
                if (filename === 'foo.txt') {
                    return cb(null, new Buffer('Foo'));
                }
                cb(new Error('ENOENT'));
            });
        }
    }
}, 'to call the callback without error');
```
