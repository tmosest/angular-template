angular.module('app')
.controller('MainController', 
[   '$timeout',
    function($timeout) {
        var vm = this;
        vm.hello = 'Hello World!';
    }
]);