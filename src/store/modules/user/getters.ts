import { GetterTree } from 'vuex'
import UserState from './UserState'
import RootState from '@/store/RootState'

const getters: GetterTree <UserState, RootState> = {
    isAuthenticated (state) {
        return !!state.token;
    },
    isUserAuthenticated(state) {
        return state.token && state.current
    },
    getUserToken (state) {
        return state.token
    },
    getUserProfile (state) {
        return state.current
    },
    getCurrentEComStore(state) {
        return state.currentEComStore;
    },
    getCurrentFacility (state) {
        return state.currentFacility;
    },
    getInstanceUrl (state) {
        const baseUrl = process.env.VUE_APP_BASE_URL;
        return baseUrl ? baseUrl : state.instanceUrl;
    },
    getPicklistItemSortBy (state) {
        return state.picklistItemSortBy;
    },
    getPwaState(state) {
        return state.pwaState;
    },
    getBaseUrl(state) {
        let baseURL = process.env.VUE_APP_BASE_URL;
        if (!baseURL) baseURL = state.instanceUrl;
        return baseURL.startsWith('http') ? baseURL : `https://${baseURL}.hotwax.io/api/`;
    },
}
export default getters;