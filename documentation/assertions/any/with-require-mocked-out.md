Mocks out `require` statements using [mock-require](https://github.com/boblauer/mock-require).

```js
function cb(err, fileContents) {
    console.log(err, fileContents);
}
expect(function (cb) {
    var fs = require('fs');
    fs.readFileSync('foo.txt', cb);
}, 'with require mocked out', {
    'fs': {
        readFileSync: function (filename, cb) {
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
