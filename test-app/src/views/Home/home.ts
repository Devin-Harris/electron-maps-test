import { computed, defineComponent, onMounted, onUnmounted, Ref, ref, watch } from 'vue'
import { MapboxMap, MapboxMarker, MapboxPopup, MapboxGeocoderControl, MapboxGeolocateControl, MapboxNavigationControl } from "vue-mapbox-ts";

export default defineComponent({
  name: 'home',

  components: {
    MapboxMap,
    MapboxMarker,
    MapboxPopup,
    MapboxGeocoderControl,
    MapboxGeolocateControl,
    MapboxNavigationControl
  },

  props: [],

  emits: [],

  setup(props, { emit }) {
    const zoom: Ref<number> = ref(12)
    const center: Ref<number[]> = ref([0, 0])
    const initialPositionSet: Ref<boolean> = ref(false)
    const accessToken = ref('pk.eyJ1IjoiZGV2aW5oYXJyaXMzNiIsImEiOiJjazZjc2E0ajMwNHU5M2VsbzVzZmJpazVsIn0.PuED6sTG_QuUsjJoW72vWQ')
    const mapStyle = ref('mapbox://styles/mapbox/streets-v11')
    const markers: Ref<any[]> = ref([])

    const markersInView = computed(() => {
      const centerLat = center.value[1]
      const centerLng = center.value[0]
      const range = (1 / Math.pow(2, Math.max(zoom.value - 9, 0)))
      return markers.value.filter(m => {
        const latDif = centerLat - m.lat
        const lngDif = centerLng - m.lng
        return range >= Math.sqrt(Math.pow(latDif, 2) + Math.pow(lngDif, 2))
      })
    })

    onMounted(() => {
      initializeLatAndLong()
    })

    function initializeLatAndLong(): void {
      // When loading app in electron, we need a process.env.GOOLE_API_KEY for navigator geolocation to work
      // Forcing map to load with add markers to map to get past this initially
      if (import.meta.env.MODE === 'production') {
        setTimeout(() => {
          getMarkersToMap()
          initialPositionSet.value = true
        }, 2000)
      }

      navigator.geolocation.getCurrentPosition(async (position) => {
        center.value = [position.coords.longitude, position.coords.latitude]
        await getMarkersToMap()
        initialPositionSet.value = true
      });
    }

    async function getMarkersToMap(): Promise<void> {
      // TODO: Get markers from backend request
      const data = [
        {
          lng: -84.516662,
          lat: 39.130986,
          postId: 1
        },
        {
          lng: -84.512511,
          lat: 39.133124,
          postId: 2
        },
      ]

      for (let i = 0; i < 100; i++) {
        data.push({
          lng: -84.512511 + (.01 * i),
          lat: 39.396083 - (.01 * i),
          postId: i + 2
        })
      }

      markers.value = data
    }

    function handleMapCenterUpdate(newCenter: number[]) {
      center.value = newCenter
    }
    function handleMapZoomUpdate(newZoom: number) {
      zoom.value = newZoom
    }

    return {
      accessToken,
      center,
      initialPositionSet,
      mapStyle,
      markers,
      markersInView,
      handleMapCenterUpdate,
      handleMapZoomUpdate,
      zoom
    }
  }
})