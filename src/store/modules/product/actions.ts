import { ActionTree } from 'vuex'
import RootState from '@/store/RootState'
import ProductState from './ProductState'
import * as types from './mutation-types'
import { fetchProducts } from '@hotwax/oms-api/src/product'
import { isError } from '@hotwax/oms-api/src/util'

const actions: ActionTree<ProductState, RootState> = {

  /**
   * Fetch cached products
   */
  async fetchProducts ( { commit, state }, { productIds }) {
    const cachedProductIds = Object.keys(state.cached);
    const productIdFilter= productIds.reduce((filter: Array<any>, productId: any) => {
      // If product does not exist in cached products then add the id
      if (!cachedProductIds.includes(productId) && productId) {
        filter.push(productId);
      }
      return filter;
    }, []);

    // If there are no product ids to search skip the API call
    if (productIdFilter.length <= 0) return;

    const resp = await fetchProducts({
      filters: { 'productId': productIdFilter },
      viewSize: productIdFilter.length,
      viewIndex: 0
    })

    if (!isError(resp)) {
      const products = resp.products;
      // Handled empty response in case of failed query
      if (products) commit(types.PRODUCT_ADD_TO_CACHED_MULTIPLE, { products });
    } else {
      console.error(resp)
    }
    // TODO Handle specific error
    return resp;
  },
}
export default actions;
