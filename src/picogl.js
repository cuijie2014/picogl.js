///////////////////////////////////////////////////////////////////////////////////
// The MIT License (MIT)
//
// Copyright (c) 2017 Tarek Sherif
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
///////////////////////////////////////////////////////////////////////////////////

(function() {
    "use strict";

    /**
        
        Global PicoGL module. For convenience, all WebGL enums are stored
        as properties of PicoGL (e.g. PicoGL.FLOAT, PicoGL.ONE_MINUS_SRC_ALPHA).
        
        @namespace PicoGL
        @prop {string} version Current PicoGL version.
    */
    var PicoGL = window.PicoGL = {
        version: "<%= VERSION %>"
    };

    (function() {
        // Absorb all GL enums for convenience
        var canvas = document.createElement("canvas");
        var gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        
        if (!gl) {
            return;
        }

        for (var enumName in gl) {
            if (enumName.match(/^[A-Z_]+$/) && typeof(gl[enumName]) === "number") {
                PicoGL[enumName] = gl[enumName];
            }
        }

    })();

    PicoGL.DUMMY_OBJECT = {};

    /**
        Create a PicoGL app. The app is the primary entry point to PicoGL. It stores
        the canvas, the WebGL context and all WebGL state.

        @function PicoGL.createApp
        @param {DOMElement} canvas The canvas on which to create the WebGL context.
        @param {Object} [contextAttributes] Context attributes to pass when calling getContext().
    */
    PicoGL.createApp = function(canvas, contextAttributes) {
        return new PicoGL.App(canvas, contextAttributes);
    };

    PicoGL.compileShader = function(gl, shader, source, debug) {
        gl.shaderSource(shader, source);
        gl.compileShader(shader);

        if (debug && !gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            var i, lines;

            console.error(gl.getShaderInfoLog(shader));
            lines = source.split("\n");
            for (i = 0; i < lines.length; ++i) {
                console.error((i + 1) + ":", lines[i]);
            }
        }
    };

})();
