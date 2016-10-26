Package.describe({
  name: 'astrocoders:easy-testing',
  version: '1.0.0',
  // Brief, one-line summary of the package.
  summary: 'One-install Meteor full testing setup',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/Astrocoders/meteor-easy-testing',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Npm.depends({
  'lodash.merge': '4.6.0',
})

Package.onUse(function(api) {
  api.versionsFrom('1.4.1.2');
  api.use('ecmascript');

  api.imply([
    'lmieulet:meteor-coverage@1.1.3',
    'practicalmeteor:mocha@2.4.5_6',
    'practicalmeteor:mocha-console-runner@0.2.1',
    'dispatch:mocha-phantomjs@0.1.7',
    'xolvio:backdoor@0.2.1',
    'xolvio:cleaner@0.3.1',
  ])

  api.mainModule('easy-testing.js');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('astro:easy-testing');
  api.mainModule('easy-testing-tests.js');
});
