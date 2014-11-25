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
        concat: {
            files: {
                src: ['js/src/namespace.js', 'js/src/**/*.js', 'js/src/main.js'],
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
                deliverables: ["js/**/*.min.js"]
            }
            ,
            dev: {}
        }
    });

    grunt.loadNpmTasks('grunt-maven');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('beforeClean', ['clean:before']);

    grunt.registerTask('default', ['mavenPrepare', 'concat', 'clean:after', 'mavenDist']);
}
;
