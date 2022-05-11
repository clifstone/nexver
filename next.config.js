module.exports = {
    reactStrictMode: true,
    images: {
        loader: 'akamai',
        path: '',
        domains: ['localhost']
    },
    webpack: (config) => {
        config.experiments = config.experiments || {};
        config.experiments.topLevelAwait = true;
        return config;
    },
}