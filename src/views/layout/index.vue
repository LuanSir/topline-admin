<template>
  <div>
    <Appside></Appside>
    <Appheader></Appheader>
  </div>
</template>

<script>
import Appside from './component/Appside'
import Appheader from './component/Appheader'
export default {
  name: 'Appindex',
  components: {
    Appside,
    Appheader
  },
  data () {
    return {}
  }
}
</script>
