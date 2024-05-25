// https://boxlang.ortusbooks.com
(function (Prism) {

    Prism.languages.boxlang = Prism.languages.extend('clike', {
        'comment': [
            {
                pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
                lookbehind: true,
                inside: {
                    'annotation': {
                        pattern: /(?:^|[^.])@[\w\.]+/,
                        alias: 'punctuation'
                    }
                }
            },
            {
                pattern: /(^|[^\\:])\/\/.*/,
                lookbehind: true,
                greedy: true
            }
        ],
        'keyword': /\b(?:abstract|as|break|class|catch|castAs|component|continue|default|do|else|extends|final|finally|for|function|if|in|instanceof|interface|include|import|lazy|null|package|private|property|public|remote|required|rethrow|return|static|switch|throw|try|var|while|when|xml)\b(?!\s*=)/,
        'operator': [
            /\+\+|--|&&|\|\||::|=>|[!=]==|[-+*/%&|^!=<>]=?|\?(?:\.|:)?|:/,
            /\b(?:and|contains|eq|equal|eqv|gt|gte|imp|is|lt|lte|mod|not|or|xor)\b/
        ],
        'scope': {
            pattern: /\b(?:application|arguments|cgi|client|cookie|local|request|session|super|this|variables)\b/,
            alias: 'global'
        },
        'type': {
            pattern: /\b(?:any|array|component|class|binary|boolean|date|guid|integer|function|numeric|number|query|string|struct|uuid|void|xml)\b/,
            alias: 'builtin'
        }
    });

    Prism.languages.insertBefore('boxlang', 'keyword', {
        // This must be declared before keyword because we use "function" inside the lookahead
        'function-variable': {
            pattern: /[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
            alias: 'function'
        }
    });

    var interpolation = {
        pattern: /((?:^|[^\\$])(?:\\{2})*)\$(?:\w+|\{[^{}]*\})/,
        lookbehind: true,
        inside: {
            'interpolation-punctuation': {
                pattern: /^\#\?|\#$/,
                alias: 'punctuation'
            },
            'expression': {
                pattern: /[\s\S]+/,
                inside: null // see below
            }
        }
    };
    Prism.languages.insertBefore('boxlang', 'string', {
        'shebang': {
            pattern: /#!.+/,
            alias: 'comment',
            greedy: true
        },
        'interpolation-string': {
            pattern: /"""(?:[^\\]|\\[\s\S])*?"""|(["/])(?:\\.|(?!\1)[^\\\r\n])*\1|\$\/(?:[^/$]|\$(?:[/$]|(?![/$]))|\/(?!\$))*\/\$/,
            greedy: true,
            inside: {
                'interpolation': interpolation,
                'string': /[\s\S]+/
            }
        }
    });

    delete Prism.languages.boxlang['class-name'];
    Prism.languages.bx = Prism.languages['boxlang'];
}(Prism));
