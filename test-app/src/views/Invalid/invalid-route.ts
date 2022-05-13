import { defineComponent } from 'vue'
import router from '../../router'

export default defineComponent({
  name: 'invalid',

  props: [],

  emits: [],

  setup(props, { emit }) {
    function back() {
      router.push('/')
    }

    return {
      back
    }
  }
})