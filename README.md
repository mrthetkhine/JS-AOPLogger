# JS-AOPLogger
JavaScript AOP Based Logger for logging method call for the methods in a module.

Automatically write console.log for each method call in object module.
Demo

<html>
    <script src="debug.js">

    </script>
    <script>
        window.MyModule = window.MyModule || {};

        MyModule.methodOne = function()
        {
          console.log('Module Method one');
        };
        MyModule.methodTwo = function()
        {
            console.log('Module Method two');
        };

        //This line activate logging
        AOPDebugger.watch( MyModule,'MyModule');

        MyModule.methodOne();
        MyModule.methodTwo();

    </script>
</html>

Above code automatically add console.log to methodOne and methodTwo, so no need to write method call for complex module
and easy to remove logging. in one line by uncommenting this following line

AOPDebugger.watch( MyModule,'MyModule');
 
