import { GetterTree } from 'vuex'
import ProductState from './ProductState';
import RootState from '@/store/RootState'

const getters: GetterTree <ProductState, RootState> = {
  getCached (state) {
    return state.cached
  },
  getProduct: (state) => (productId: string) => {
    return state.cached[productId] ? state.cached[productId] : {};
  }
}
export default getters;
