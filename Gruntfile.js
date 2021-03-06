/**
 * Copyright: Edoardo Tenani - MIT license (c) - 2014
 * -----------------------------------------------------------------------------
 */

module.exports = function (grunt) {
    var path = require('path');

    // Show grunt execution times - https://github.com/sindresorhus/time-grunt
    require('time-grunt')(grunt);

    // Load task Just In Time - https://github.com/shootaroo/jit-grunt
    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin',
        custom: 'grunt-htmlmin',
        generateAutoPrefix: 'grunt-autoprefixer',
        cachebreaker: 'grunt-cache-breaker'
    });

    // Load grunt tasks options from separate folder - https://github.com/firstandthird/load-grunt-config
    require('load-grunt-config')(grunt, {
        configPath: path.join(process.cwd(), '.grunt'), //path to task.js files, defaults to grunt dir
        config: {
            fonts: {
                extensions: ['eot', 'ttf', 'woff', 'svg', 'woff2'].join(',')
            },
            images: {
                extensions: ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'].join(',')
            },
        },
        // disable auto loading tasks, loaded via jit-grunt
        loadGruntTasks: false
    });

    grunt.registerTask('customWatch', function () {
        var targets = Array.prototype.slice.call(arguments, 0);
        Object.keys(grunt.config('watch'))
            .filter(function (target) {
                return !(grunt.util._.indexOf(targets, target) !== -1);
            })
            .forEach(function (target) {
                grunt.log.writeln('Ignoring ' + target + '...');
                grunt.config(['watch', target], {files: []});
            });
        //grunt.task.run('watch');
    });

    return grunt;
};
