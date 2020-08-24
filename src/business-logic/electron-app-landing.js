// import { define } from '../apps/utils/user-case';

const UC = {
    LANDS_WITH_UNKNOWN_CONFIG: 'User lands on electron app and has unknown configuration',
    LANDS_WITH_MIN_CONFIG: 'User lands on electron app and has the minimum configuration',
};

export const reducer = {
    [UC.LANDS_WITH_MIN_CONFIG]: () => {
        // postMessage({ action: { type: UC.LANDS_WITH_UNKNOWN_CONFIG }});
        return {
            state: {
                'electronAppLanding.landed': true,
            },
        };
    },
    [UC.LANDS_WITH_UNKNOWN_CONFIG]: () => {
        return {
            state: {
                'electronAppLanding.no-config': true,
            },
        };
    },
};

export default UC;
