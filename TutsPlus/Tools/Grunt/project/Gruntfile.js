module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        str: grunt.template.process("My name is <%= name %>", { data: { name: "Rafal" } } ),
        uglify: {
            options: {
                mangle: true,
                compress: true,
                sourceMap: "dist/application.map",
                banner: "/* <%= str %>\n\n<%= pkg.author %> | <%= pkg.license %> " +
                        "<%= grunt.template.date(new Date(), 'yyyy-mm-dd') %> */\n"
                        // "<%= grunt.template.today('yyyy-mm-dd') %> */\n"
            },
            target: {
                src: "dist/application.js",
                dest: "dist/application.min.js"
            },
        },

        jshint: {
            options: {
                jshintrc: ".jshintrc"
            },
            target: {
                src: "src/*.js"
            }
        },

        concat: {
            options: {
                seperator: ":"
            },
            target: {
                src: ["src/application.js", "src/util.js"],
                dest: "dist/application.js"
            }
        },

        watch: {
            scripts: {
                files: ['src/*.js'],
                tasks: ['jshint']
            }
        },

        coffee: {
            options: {
                bare: false,
                join: false,
                seperator: ";"
            },
            target: {
                expand: true,
                cwd: 'src/',
                src: '*.coffee',
                dest: "lib/",
                ext: ".js"
            }
        },

        nodeunit: {
            target: 'test/*_test.js'
        },

        clean: {
            target: ['dist', 'lib']
        },
        multi: {
            target: {
                name: 'Rafal',
                age: 29
            },
            other: {
                arr: [1,2,3],
                bool: false
            },
            last: {
                obj: {
                    one: 1,
                    two: 2
                }
            }
        },

        fnList: {
            target: {
                src : "src/*js"
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadTasks('../fnList/tasks');

    grunt.registerTask("default", ['jshint', 'concat', 'uglify']);
    grunt.registerTask("reboot", ['clean', 'default']);


    grunt.registerTask('tutorial', 'this is an example task', function(){
        if( +new Date() % 2 === 0) {
            console.log('the time is even.');
        } else {
            console.log('the time is odd.');
        }
    });

    grunt.registerTask('withArgs', function(one, two) {
        var str = this.name + ": ";
        str += one || "one";
        str += two ? ", " +  two : ", two";
        console.log(str);
    });

    grunt.registerMultiTask('multi', function() {
        console.log('targe value:', this.target);
        console.log('data value:', this.data);
    });
};