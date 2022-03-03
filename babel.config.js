module.exports = function (api) {
    api.cache(true);

    const presets = [
        [
            '@babel/preset-env',
            {
                useBuiltIns: 'usage', // or "entry"
                corejs: 3,
            },
        ],
        ['@babel/preset-react'],
    ];
    const plugins = ['@babel/plugin-proposal-class-properties'];

    return {
        presets,
        plugins,
    };
};