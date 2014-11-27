module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        gruntMavenProperties: grunt.file.readJSON('grunt-maven.json'),
        mvnProp: grunt.file.readJSON('maven-properties.json'),
        mavenPrepare: {
            options: {
                resources: ['**']
            },
            dev: {}
        },
        traceur: {
            options: {
                experimental: true
            },
            custom: {
                files: [{
                    expand: true,
                    cwd: 'js/src/es6',
                    src: ['**/*.js'],
                    dest: 'js/src/es5'
                }]
            }
        },
        concat: {
            files: {
                src: ['js/src/es5/**/*.js'],
                dest: 'js/app.min.js'
            }
        },
        clean: {
            before: {
                options: {
                    force: true
                },
                files: {
                    src: [
                        "js/**/*.js"
                    ]
                }
            },
            after: {
                options: {
                    force: true
                },
                files: {
                    src: [
                        "<%= mvnProp.outputDirectory %>/static/Gruntfile.js",
                        "<%= mvnProp.outputDirectory %>/static/package.json",
                        "<%= mvnProp.outputDirectory %>/static/maven-properties.json",
                        "<%= mvnProp.outputDirectory %>/static/js/**/*.js"
                    ]

                }
            }
        },
        mavenDist: {
            options: {
                warName: "classes",
                deliverables: [
                    "js/**/*.js",
                    "node_modules/grunt-traceur/node_modules/traceur/bin/traceur-runtime.js",
                    "bower_components/**/*"
                ]
            }
            ,
            dev: {}
        }
    });

    grunt.loadNpmTasks('grunt-maven');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-traceur');

    grunt.registerTask('beforeClean', ['clean:before']);

    grunt.registerTask('default', ['mavenPrepare', 'traceur', 'concat', 'mavenDist']);
}
;
