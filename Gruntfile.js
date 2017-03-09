module.exports = function(grunt) {
	//1. Configurations
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		concat: {
			nodes: {
				src: [
					'node_modules/jquery/dist/jquery.min.js',
					'node_modules/angular/angular.min.js'
				],
				dest: 'dist/js/node_modules.js'
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
	
	//4. Add it to default grunt task
	grunt.registerTask('default', ['concat:nodes']);
};