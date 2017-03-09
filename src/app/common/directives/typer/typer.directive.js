(function () {
    'use strict';
    
    angular
        .module('app.common')
        .directive('typer', Typer);
    
    Typer.$inject = [
        '$interval',
        '$timeout'
    ];

    function Typer($interval, $timeout)
    {
        function link(scope, el, attrs) 
        {
            var timeoutId,
                text = el.text(),
                count = 0,
                height = el.height(),
                heightCSS = el.css('height'),
                display = el.css('display'),
                offsetHeight = el[0].offsetHeight,
                offsetwidth = el[0].offsetWidth,
                isResizing = false,
                resizeTimer;

            function updateText() {
                if(count + 1 <= text.length + 1)
                el.text(text.substr(0, ++count));
                else if(count > text.length + 20) count = 0;
                else ++count;
            }
                        
            scope.$watch(attrs.autotyper, function(value) {
                updateText();
            });

            el.on('$destroy', function() {
                $interval.cancel(timeoutId);
            });

            // start the UI update process; save the timeoutId for canceling
            timeoutId = $interval(function() {
                updateText(); // update DOM
            }, 126);
        }
        return {
            restrict: 'C',
            transclude: true,
            scope: {},
            link: link,
            template: '<ng-transclude></<ng-transclude>'
        };
    }

})();