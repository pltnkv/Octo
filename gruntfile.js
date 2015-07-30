module.exports = function (grunt) {

	var tsServerPath = 'src/server/'
	var tsClientPath = 'src/client/'

	grunt.initConfig({
		ts: {
			server: {
				src: ['dts/server/*.d.ts', tsServerPath + '**/*.ts'],
				outDir: 'target/server',
				options: {
					module: 'commonjs',
					fast: 'never'
				}
			},
			client: {
				src: ['dts/client/*.d.ts', tsClientPath + '**/*.ts'],
				outDir: 'target/client',
				options: {
					module: 'amd',
					fast: 'never'
				}
			}
		},
		requirejs: {
			client: {
				options: {
					baseUrl: 'target/client',
					optimize: 'none',
					name: 'client/index',
					out: 'target/client/scripts/app.js'
				}
			}
		},

		//*********************************
		//*******  static  ****************
		//*********************************

		clean: {
			target: ['target']
		},

		copy: {
			static: {
				files: [
					{expand: true, cwd: 'static/', src: ['**'], dest: 'target/client/'}
				]
			}
		},

		stylus: {
			compile: {
				options: {
					compress: false
				},
				files: {
					'target/client/styles/styles.css': 'target/client/styles/style.styl'
				}
			}
		},
		autoprefixer: {
			make: {
				src: 'target/client/styles/**/*.css'
			}
		},
		cssmin: {
			production: {
				expand: true,
				src: 'target/client/styles/**/*.css',
				dest: ''
			}
		},

		//*********************************
		//*****  production  **************
		//*********************************

		uglify: {
			options: {
				mangle: false,
				beautify: true
			},
			controls: {
				files: {
					'target/static/scripts/controls.js': 'target/static/scripts/controls.js'
				}
			},
			screen: {
				files: {
					'target/static/scripts/screen.js': 'target/static/scripts/screen.js'
				}
			}
		},

		//*********************************
		//******  watchers  ***************
		//*********************************

		watch: {
			options: {
				spawn: false
			},
			server: {
				files: [tsServerPath + '**/*.ts'],
				tasks: ['ts:server']

			},
			screen: {
				files: [tsClientPath + '**/*.ts'],
				tasks: ['ts:screen', 'requirejs:screen', 'uglify:screen']
			},
			static: {
				files: ['static/**/*'],
				tasks: ['copy:static']
			}
		},

		nodemon: {
			dev: {
				script: 'target/server/index.js',
				options: {
					env: {
						'NODE_ENV': 'development',
						'NODE_CONFIG': 'dev'
					},
					watch: ['target/server'],
					delay: 300
				}
			}
		},


		concurrent: {
			dev: {
				tasks: ['nodemon', 'watch:server', 'watch:screen', 'watch:controls', 'watch:static'],
				options: {
					logConcurrentOutput: true
				}
			}
		}
	})
	/*
	 grunt.event.on('watch', function (action, filepath) {
	 // Update the config to only build the changed less file.
	 console.log('!!!', action, filepath)
	 //{src: filepath, dest: './library/css/' + path.basename(filepath, '.less') + '.css'}

	 console.log('get0', grunt.config.get('ts.server_watch.src'))

	 //grunt.config('ts.server.cwd', './server')
	 //grunt.config('ts.server.dest', './server')
	 //grunt.config('ts.server_watch.src', ['dts/*.d.ts', filepath])

	 console.log('get1', grunt.config.get('ts.server_watch.src'))
	 })*/

	grunt.loadNpmTasks('grunt-nodemon')
	grunt.loadNpmTasks('grunt-concurrent')
	grunt.loadNpmTasks('grunt-ts')
	grunt.loadNpmTasks('grunt-autoprefixer')
	grunt.loadNpmTasks('grunt-contrib-watch')
	grunt.loadNpmTasks('grunt-contrib-copy')
	grunt.loadNpmTasks('grunt-contrib-clean')
	grunt.loadNpmTasks('grunt-contrib-requirejs')
	grunt.loadNpmTasks('grunt-contrib-uglify')
	grunt.loadNpmTasks('grunt-contrib-stylus')
	grunt.loadNpmTasks('grunt-contrib-cssmin')


	var compileDevTasks = ['clean:target',
		'copy:static', 'stylus:compile', 'autoprefixer:make',
		'ts:server', 'ts:client', 'requirejs:client']

	//grunt.registerTask('default', compileTasks.concat('concurrent'))
	//grunt.registerTask('compile', compileTasks)

	grunt.registerTask('compile', compileDevTasks)

	//todo
	// собрать сервер
	// собрать клиент
	// запустить отдельные вочеры клиент, сервер, статика
	// запустить общий вочер

}