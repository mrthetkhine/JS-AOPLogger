$(function()
{
    var debug = window.AOPDebugger = window.AOPDebugger || {};

    AOPDebugger.watch = function( debugObj ,objName)
    {
        objName = objName || '' ;
        objName += ".";
        function modifiedFunc(funcName, orgFunc)
        {
            var func =  function ()
            {
                var isConstructor = this instanceof arguments.callee && !this.__previouslyConstructedByThis;
                var args = Array.prototype.slice.call(arguments, 0);
                //console.log("Is constructor ",isConstructor);
                console.info( "Debug Call "+ funcName +"()") ;
                var retValue;
                //Check if the function is used as constructor by using new
                if( isConstructor )
                {
                    var obj = Object.create(orgFunc.prototype);
                    obj.__previouslyConstructedByThis = true;
                    orgFunc.apply(obj ,args);
                    retValue = obj;
                }
                else
                {
                    retValue = orgFunc.apply( debugObj, args );
                }
                //console.groupEnd();
                return retValue;
            }
            if( orgFunc.prototype)
            {
                func.prototype = orgFunc.prototype;
                func.prototype.constructor = orgFunc;
            }
            for(var v in orgFunc)
            {
                func[v] = orgFunc[v];
            }

            return func;
        }
        for(var v in debugObj)
        {
            if(typeof debugObj[v] == "function")
            {
                //console.info("Modified "+ v);
                var org = debugObj[v];
                debugObj[ v ] = modifiedFunc(objName+v, debugObj[v]);
                //debugObj[ v ].prototype  = new org();
            }

        }
    };
    //console.log("Debugger initialized");

    AOPDebugger.watchFunc = function(debugObj,funcName)
    {
        function modifiedFunc(funcName, orgFunc)
        {
            var func =  function ()
            {
                var isConstructor = this instanceof arguments.callee && !this.__previouslyConstructedByThis;
                var args = Array.prototype.slice.call(arguments, 0);
                //console.log("Is constructor ",isConstructor);
                console.info( "Debug Call "+ funcName +"()") ;
                var retValue;
                //Check if the function is used as constructor by using new
                if( isConstructor )
                {
                    var obj = Object.create(orgFunc.prototype);
                    obj.__previouslyConstructedByThis = true;
                    orgFunc.apply(obj ,args);
                    retValue = obj;
                }
                else
                {
                    retValue = orgFunc.apply( debugObj, args );
                }
                //console.groupEnd();
                return retValue;
            }
            if( orgFunc.prototype)
            {
                func.prototype = orgFunc.prototype;
                func.prototype.constructor = orgFunc;
            }
            for(var v in orgFunc)
            {
                func[v] = orgFunc[v];
            }

            return func;
        }
        var org = debugObj[funcName];
        debugObj[ funcName ] = modifiedFunc(funcName, debugObj[funcName]);
    }
    return debug;
});
