const backendBuild = require('./build-config/backend.build');
const frontendBuild = require('./build-config/frontend.build');

const wpbuild = (env, args) => {
    console.info('Build process started');
    console.info('Checking build mode:');
    let mode = (args.mode || (env && env.mode ? env.mode : 'development')).toLowerCase();
    mode = (mode === 'production' ? mode : 'development');
    console.info(`Build mode: ${mode}`);

    const configs = [];
    configs.push(backendBuild(mode));
    configs.push(frontendBuild(mode));
    return configs;
};

module.exports = wpbuild;