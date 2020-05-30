import * as types from '@/store/mutation-types';

export default {
    [types.SET_DIRECTION_STATE](state, flag) {
        state.direction = flag
    },
    handleDirectionId(state, flag) {
        state.direction = flag;
    }
}
