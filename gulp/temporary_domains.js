'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var exec = require('child_process').exec;
var fs = require('fs');
var path = require('path');
var lodash = require('lodash');

var GOOD_DOMAINS = ['safe-mail.net', 'regbypass.comsafe-mail.net', '163.com'];
var BAD_DOMAINS = ['mixi.gq', 'a.gmail.gr.com'];

var TEMPORARY_DOMAINS_JSON = path.join('src/data/temporary-domains.json');

function downloadAndReadDomainsFromGit(gitUrl, filename, callback) {
  gutil.log('Removing old temporary-domains');
  exec('rm -rf .tmp-domains', function(err){
    if (err) { return callback(err); }
  
    gutil.log('Cloning repo to file');
    exec('git clone --depth=1 ' + gitUrl + ' .tmp-domains', function(err){
      if (err) { return callback(err); }

      gutil.log('Read gist domains');
      fs.readFile(path.join('.tmp-domains/' + filename), { encoding: 'UTF-8' }, function(err, content){
        if (err) { return callback(err); }
        var domains = content.split('\n');
        callback(null, domains);
      });
    });
  });
}

function readDomainsFromFile(filename, callback) {
  gutil.log('Read ' + filename + ' domains');
  fs.readFile(path.join(filename), { encoding: 'UTF-8' }, function(err, content){
    if (err) { return callback(err); }
    var domains = content.split('\n');
    callback(null, domains);
  });
}

function saveDomainsToFile(domains, callback) {
  lodash.remove(domains, function(domain){
    return GOOD_DOMAINS.indexOf(domain) > -1;
  });
  gutil.log('Write json to file');
  fs.writeFile(TEMPORARY_DOMAINS_JSON, JSON.stringify(domains), 'UTF-8', callback );
}

gulp.task('temporary-domains', function (callback) {
  var allDomains = [];
  downloadAndReadDomainsFromGit('https://gist.github.com/adamloving/4401361', 'temporary-email-address-domains', function(err, domains) {
    if (err) { return callback(err); }
    allDomains = lodash.union(allDomains, domains);

    downloadAndReadDomainsFromGit('https://gist.github.com/michenriksen/8710649', 'disposable-email-provider-domains', function(err, domains) {
      if (err) { return callback(err); }
      allDomains = lodash.union(allDomains, domains);

      downloadAndReadDomainsFromGit('https://github.com/martenson/disposable-email-domains', 'disposable_email_blacklist.conf', function(err, domains) {
        if (err) { return callback(err); }
        allDomains = lodash.union(allDomains, domains);

        readDomainsFromFile('files/oneminutemail.txt', function(err, domains) {
          if (err) { return callback(err); }
          allDomains = lodash.union(allDomains, domains);
          allDomains = lodash.union(allDomains, BAD_DOMAINS);
          console.log('COUNT', allDomains.length);

          saveDomainsToFile(allDomains, callback);
        });
      });
    });
  });
});
