module.exports = function(grunt) {

    // 1. All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            basic_and_extras: {
                files: {
                    'js/build/production.js': ['js/fitvids.js', 'js/functions.js']
                }
            }
        },
        uglify: {
            dist: {
                files: {
                    'js/build/production.min.js' : 'js/build/production.js',
                    'js/build/profile-image-uploader.min.js' : 'js/profile-image-uploader.js',
                    'js/build/postMessage.min.js' : 'js/postMessage.js',
                    'js/build/html5shiv.min.js' : 'js/html5shiv.js',
                    'js/build/respond.min.js' : 'js/respond.js'
                }
            }
        },
        watch: {
            scripts: {
                files: ['js/*.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false
                }
            },
            css: {
                files: ['sass/*.scss'],
                tasks: ['sass', 'autoprefixer', 'cssmin', 'cssjanus'],
                options: {
                    livereload: true,
                    spawn: false
                }
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'style.css': 'sass/style.scss',
                    'styles/customizer.css': 'sass/customizer.scss',
                    'styles/admin.css': 'sass/admin.scss'
                }
            }
        },
        autoprefixer: {
            dist: {
                options: {
                    browsers: ['last 1 version', '> 1%', 'ie 8']
                },
                files: {
                    'style.css': 'style.css',
                    'styles/customizer.css': 'styles/customizer.css',
                    'styles/admin.css': 'styles/admin.css'
                }
            }
        },
        cssjanus: {
            dev: {
                options: {
                    swapLtrRtlInUrl: false // replace 'ltr' with 'rtl'
                },
                src: ['style.css'],
                dest: 'styles/rtl.css'
            }
        },
        cssmin: {
            combine: {
                files: {
                    'style.min.css': ['style.css'],
                    'styles/customizer.min.css': ['styles/customizer.css'],
                    'styles/rtl.min.css': ['styles/rtl.css'],
                    'styles/admin.min.css': ['styles/admin.css']
                }
            }
        },
        compress: {
            main: {
                options: {
                    archive: '/Users/bensibley/Desktop/apex.zip'
                },
                files: [
                    {
                        src: ['**', '!node_modules/**','!sass/**', '!gruntfile.js', '!package.json', '!style-prefixed.css','!/.git/','!/.idea/','!/.sass-cache/','!**.DS_Store'],
                        filter: 'isFile'
                    }
                ]
            }
        },
        makepot: {
            target: {
                options: {
                    domainPath: '/languages',
                    exclude: ['library/.*/.*'],
                    potFilename: 'apex.pot',
                    type: 'wp-theme'
                }
            }
        },
        phpcs: {
            application: {
                dir: ['*.php']
            },
            options: {
                tabWidth: 4
            }
        },
        phpunit: {
            classes: {
                dir: 'tests/php/'
            },
            options: {
                bin: 'vendor/bin/phpunit',
                bootstrap: 'tests/php/phpunit.php',
                colors: true
            }
        },
        excludeFiles: '--exclude "*.gitignore" --exclude ".sass-cache/" --exclude "*.DS_Store" --exclude ".git/" --exclude ".idea/" --exclude "gruntfile.js" --exclude "node_modules/" --exclude "package.json" --exclude "sass/"',
        shell: {
            zip: {
                command: [
                    // delete existing copies (if they exist)
                    'rm -R /Users/bensibley/Documents/compete-themes/dist/apex || true',
                    'rm -R /Users/bensibley/Documents/compete-themes/dist/apex.zip || true',
                    // copy plugin folder without any project/meta files
                    'rsync -r /Applications/MAMP/htdocs/wordpress/wp-content/themes/apex /Users/bensibley/Documents/compete-themes/dist/ <%= excludeFiles %>',
                    // open dist folder
                    'cd /Users/bensibley/Documents/compete-themes/dist/',
                    // zip the apex folder
                    'zip -r apex.zip apex'
                ].join('&&')
            }
        }
    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-wp-i18n');
    grunt.loadNpmTasks('grunt-phpcs');
    grunt.loadNpmTasks('grunt-phpunit');
    grunt.loadNpmTasks('grunt-cssjanus');
    grunt.loadNpmTasks('grunt-shell');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['concat', 'uglify', 'watch', 'sass', 'autoprefixer', 'cssmin', 'compress', 'makepot', 'phpcs', 'phpunit', 'cssjanus', 'shell']);

};