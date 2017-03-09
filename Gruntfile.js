module.exports = function(grunt) {
	var node_modules = 'node_modules/',

		jquery = node_modules + 'jquery/dist/jquery.min.js',
		angular = node_modules + 'angular/angular.min.js',
		
		bootstrap_less = node_modules + 'bootstrap-less/bootstrap/bootstrap.less',
		fontawesome_less = node_modules + 'fontawesome/less/font-awesome.less';
		
		node_modules_less = 'src/less/node_modules.less',
		
		node_modules_js = 'dist/compile/node_modules.js',
		app_modules_js = 'src/app/**/*.js',

		appjs = 'dist/compile/app.js'
		mainjs = 'dist/compile/main.js',
		finaljs = 'dist/build/main.min.js',
		
		app_modules_less = 'src/app/**/*.less',
		
		app_less = 'src/less/app.less',
		style_less = 'src/less/stylesheet.less',
		
		style_css = 'dist/compile/stylesheet.css',
		main_min_css = 'dist/build/main.min.css',
		
		prettifyrc = '.prettifyrc';

	var default_task = [
		'concat:nodes_js',
		'concat:app_js', 
		'concat:build_js',
		//'concat:nodes_less', 
		'uglify',
		'concat:app_less',
		'less',
		'cssmin',
		'prettify'
	];
	
	//1. Configurations
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		concat: {
			nodes_js: {
				src: [
					jquery,
					angular
				],
				dest: node_modules_js
			},
			app_js: {
				src: app_modules_js,
				dest: appjs
			},
			build_js: {
				src: [
					node_modules_js,
					appjs
				],
				dest: mainjs
			},
			app_less: {
				src: app_modules_less,
				dest: app_less
			},
			nodes_less: {
				src: [bootstrap_less, fontawesome_less],
				dest: node_modules_less
			}
		},

		uglify: {
		  	build: {
				src: mainjs,
				dest: finaljs
			}
	   },

	   less: {
		 	all: {
				src: [bootstrap_less, fontawesome_less, style_less],
				dest: style_css
			}
	 	},

		cssmin: {
		 	css: {
				src: style_css,
				dest: main_min_css
			}
		},

		prettify: {
			options: {
				config: prettifyrc
			},
			files: {
			'dist/build/index.html': ['src/app/index.html']
			}
		},

		watch: {
			index: {
				files: ['src/app/index.html'],
				tasks: ['prettify'],
				options: {
					reload: true
				}	
			},
			less: {
				files: ['src/**/*.less'],
				tasks: default_task,
				options: {
					reload: true
				}	
			},
			js: {
				files: ['src/**/*.js'],
				tasks: default_task,
				options: {
					reload: true
				}	
			}
		}

	});
	
	//3. Load packages
	grunt.loadNpmTasks('grunt-contrib-coffee');
	
	grunt.loadNpmTasks('grunt-contrib-concat');
	
	grunt.loadNpmTasks('grunt-contrib-haml');
	
	grunt.loadNpmTasks('grunt-contrib-less');
	
	grunt.loadNpmTasks('grunt-contrib-sass');
	
	grunt.loadNpmTasks('grunt-contrib-uglify');
	
	grunt.loadNpmTasks('grunt-contrib-watch');
	
	grunt.loadNpmTasks('grunt-css');

	grunt.loadNpmTasks('grunt-prettify');
	
	//4. Add it to default grunt task
	grunt.registerTask('default', default_task);
};