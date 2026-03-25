module.exports = {
    presets: [
        'babel-preset-expo',   // mantém o preset padrão do Expo
        '@babel/preset-flow',  // adiciona suporte ao Flow
    ],
    plugins: [
        '@babel/plugin-proposal-export-namespace-from',
        'react-native-reanimated/plugin',
    ],
};