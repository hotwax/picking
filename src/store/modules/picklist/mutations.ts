import { MutationTree } from 'vuex'
import PicklistState from './PicklistState'
import * as types from './mutation-types'

const mutations: MutationTree <PicklistState> = {
  [types.PRODUCT_ADD_TO_CACHED_MULTIPLE] (state, payload) {
     if (payload.products) {
        payload.products.forEach((product: any) => {
            state.cached[product.productId] = product
        });
        // console.log("Products",payload)
        console.log("Cached",state.cached)
     }
  },
  [types.PICKLIST_CURRENT] (state, payload) {
    state.current = payload.current;
  },
  [types.PICKLIST_ITEMS] (state, payload) {
    state.list = payload.list;
  },
  [types.PICKLIST_SELECTED_PRODUCTS] (state, payload) {
    state.selectedProducts = payload.selectedProducts
  },
}
export default mutations;
