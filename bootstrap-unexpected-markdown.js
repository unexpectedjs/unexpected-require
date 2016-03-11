/*global unexpected:true*/
unexpected = require('unexpected').clone();
unexpected.use(require('./lib/unexpected-require'));
unexpected.output.preferredWidth = 80;
