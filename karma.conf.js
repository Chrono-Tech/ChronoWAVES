// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', 'angular-cli'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-remap-istanbul'),
      require('angular-cli/plugins/karma')
    ],
    files: [
      { pattern: './src/test.ts', watched: false },
      "./node_modules/amcharts3/amcharts/amcharts.js",
      "./node_modules/amcharts3/amcharts/xy.js",
      "./node_modules/amcharts3/amcharts/gauge.js",
      "./node_modules/amcharts3/amcharts/serial.js",
      "./node_modules/amcharts3/amcharts/pie.js",
      "./node_modules/amcharts3/amcharts/themes/light.js",
      "./node_modules/amcharts3/amcharts/themes/dark.js",
      "./node_modules/amcharts3/amcharts/themes/black.js",
      "./node_modules/amcharts3/amcharts/plugins/responsive/responsive.min.js"
    ],
    preprocessors: {
      './src/test.ts': ['angular-cli']
    },
    mime: {
      'text/x-typescript': ['ts','tsx']
    },
    remapIstanbulReporter: {
      reports: {
        html: 'coverage',
        lcovonly: './coverage/coverage.lcov'
      }
    },
    angularCli: {
      config: './angular-cli.json',
      environment: 'dev'
    },
    reporters: config.angularCli && config.angularCli.codeCoverage
              ? ['progress', 'karma-remap-istanbul']
              : ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  });
};
