<template>
  <div class="home-container">
    <p>This is the <strong>Home</strong> page</p>

    <div
      v-if="initialPositionSet"
      class="map-container"
      :style="{ height: '100%', width: '100%' }"
    >
      <mapbox-map
        :accessToken="accessToken"
        :mapStyle="mapStyle"
        :center="center"
        :zoom="zoom"
        :auto-resize="true"
        @update:center="handleMapCenterUpdate($event)"
        @update:zoom="handleMapZoomUpdate($event)"
      >
        <mapbox-geocoder-control position="bottom-left" />
        <mapbox-geolocate-control
          :showAccuracyCircle="false"
          position="bottom-left"
        />
        <mapbox-navigation-control position="bottom-left" />

        <mapbox-marker
          v-for="marker in markersInView"
          :key="'marker-' + marker.postId"
          :lngLat="[marker.lng, marker.lat]"
          :scale="1"
          :color="'red'"
        >
          <mapbox-popup :offset="[0, -25]">
            <div>
              I am the content of an attached Popup for post {{ marker.postId }}
            </div>
          </mapbox-popup>
        </mapbox-marker>
      </mapbox-map>
    </div>
  </div>
</template>

<script src="./home.ts" lang="ts"></script>

<style lang="scss" src="./home.scss"></style>
