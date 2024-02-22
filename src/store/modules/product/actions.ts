import { ActionTree } from 'vuex'
import RootState from '@/store/RootState'
import ProductState from './ProductState'
import * as types from './mutation-types'
import { ProductService } from '@/services/ProductService'
import { hasError } from '@/adapter'

const actions: ActionTree<ProductState, RootState> = {

  /**
   * Fetch cached products
   */
  async fetchProducts ( { commit, state }, { productIds }) {
    const cachedProductIds = Object.keys(state.cached);
    const remainingProductIds = productIds.filter((productId: any) => !cachedProductIds.includes(productId))

    const productIdFilter = remainingProductIds.join(' OR ')

    // If there are no products skip the API call
    if (productIdFilter === '') return;

    const resp = await ProductService.fetchProducts({
      "filters": ['productId: (' + productIdFilter + ')'],
      "viewSize": productIds.length
    })
    if (resp.status === 200 && !hasError(resp)) {
      const products = resp.data.response.docs;
      // Handled empty response in case of failed query
      if (resp.data) commit(types.PRODUCT_ADD_TO_CACHED_MULTIPLE, { products });
    }
    // TODO Handle specific error
    return resp;
  },
}
export default actions;
