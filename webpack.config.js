const path = require('path');
const exec = require('child_process').exec;
const CopyWebpackPlugin = require('copy-webpack-plugin');

const ENV = getEnvironment();

function printEnvironment (environment, colors) {
    console.log([
        colors ? '\x1b[34m' : '',
        '===================================',
        `Building for: ${environment}`,
        '===================================',
        colors ? '\x1b[0m' : ''
    ].join('\n'));
}

function getEnvironment () {
    const options = [ 'development', 'production', 'none' ];
    const env = process.env.NODE_ENV;

    return options.includes(env) ? env : 'production';
}

function switchEnvs (dev, prod) {
    if (ENV === 'development') return dev;

    return prod;
}

function cleanWorkspace () {
    exec('rm -rf build/');
}

printEnvironment(ENV, true);
cleanWorkspace();

module.exports = [

    {
        name: 'client',
        entry: path.resolve(__dirname, 'src/client/index.tsx'),
        mode: ENV,
        output: {
            path: path.resolve(__dirname, 'build/static/'),
            filename: 'app.js'
        },
        resolve: {
            extensions: [ '.js', '.ts', '.tsx' ]
        },
        module: {
            rules: [
                {
                    test: /\.(ts|tsx|js)$/,
                    exclude: [ /node_modules/, /\.spec.ts$/ ],
                    use: [
                        { loader: 'ts-loader' }
                    ]
                }
            ]
        },
        plugins: [
            new CopyWebpackPlugin([
                { from: 'src/client/**/*.css', to: 'style.css' },
                { from: 'src/client/assets' }
            ])
        ]
    },
    {
        name: 'server',
        entry: path.resolve(__dirname, 'src/server/index.ts'),
        mode: ENV,
        target: 'node',
        devtool: switchEnvs('cheap-module-source-map'),
        output: {
            path: path.resolve(__dirname, 'build/'),
            filename: 'app.js'
        },
        resolve: {
            extensions: [ '.js', '.ts', '.html' ]
        },
        externals: switchEnvs({
            express: 'commonjs express',
            knex: 'commonjs knex'
        }),
        module: {
            rules: [
                {
                    test: /\.(ts|tsx|js)$/,
                    exclude: [ /node_modules/ ],
                    use: [
                        { loader: 'ts-loader' }
                    ]
                },
                {
                    test: /\.html$/,
                    use: [
                        { loader: 'html-loader' }
                    ]
                }
            ]
        }
    }
];
