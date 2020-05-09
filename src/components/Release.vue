<template>
  <section 
    v-if="release" 
    class="releases"
    :style="backgroundColorStyle"
  >
    <b-container fluid>
      <b-row 
        style="height: 100%; padding: 0px;"
      >
        <b-col 
          class="release-column"
          cols="12" 
          md="6"
          style="padding: 0px"
        >
          <div class="release-info">
            <h1 
              :class="{'txt-small': release.txtSmall}"
              class="release-title txt-primary"
            >
              {{ release.title }} 
            </h1>
            <br>
            <span 
              :class="{'txt-white': release.dark}"
              class="label"
            >
              &copy; {{ release.label }} 2020
            </span>
          </div>
          <div 
            :class="{'txt-white': release.dark}"
            class="release-type txt-secondary"
          >
            <span 
              v-for="index in 6" 
              :key="index"
            >
              <span v-if="release.released">
                listen now 
              </span>
              <span v-else>
                presave now
              </span>
              <span class="desktop-only">
                &#x21F8;&#x21F8;
              </span>
              <span class="mobile-only">
                &#x21A1;&#x21A1; 
              </span>
              
              <br>
            </span>
          </div>
        </b-col>
        <b-col 
          cols="12"
          md="6"
          style="padding: 0px"
        >
          <div 
            v-if="release.readLink"
            class="release-art"
          >
            <div 
              class="top-left"
              @click="openRelease()"
            >
              <v-icon 
                class="play-icon"
                :name="release.released ? 'play' : 'save'" 
              />
              <div 
                class="release-art-img" 
                :style="artstyle"
                @click="openRelease()"
              />
            </div>
            <div class="bottom-left desktop-only">
              <div class="read-prompt txt-secondary">
                <span 
                  v-for="index in 6" 
                  :key="index"
                >
                  read now 
                  <span class="desktop-only">
                    &#x21F8;&#x21F8;
                  </span>
                  <span class="mobile-only">
                    &#x21A1;&#x21A1; 
                  </span>
                </span>
              </div>
            </div>
            <div 
              class="bottom-right"
              @click="openWriteup()"
            >
              <v-icon 
                class="play-icon"
                name="book-open" 
              />
              <div 
                class="release-art-img" 
                :style="artstyle"
              />
            </div>
          </div>

          <div 
            v-else
            class="release-art"
            @click="openRelease()"
          >
            <v-icon 
              class="play-icon"
              :name="release.released ? 'play' : 'save'" 
            />
            <div 
              class="release-art-img"
              :style="artstyle"
            />
          </div>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
export default {
  props: {
    release: {
      type: Object,
      default: () => {}
    },
  },
  computed: {
    artstyle() {
      return 'background-image: url(' + this.release.artwork + ');'
    },
    backgroundColorStyle() {
      return 'background-color: ' + this.release.backgroundColor
    }
  },
  methods: {
    openRelease() {
      this.$gtag.event('release');
      window.open(this.release.url, '_blank')
    },
    openWriteup() {
      this.$gtag.event('writeup');
      window.open(this.release.readLink, '_blank')
    },
    releaseScene() {
      const scene = new this.$scrollmagic.Scene({
        triggerElement: '.release-info',
        triggerHook: 'onEnter',
        duration: '200%'
      })
      .on('enter', () => {
        console.log("enter!");
      })
      .setPin('.releases')

      this.$ksvuescr.$emit('addScene', 'releaseScene', scene)
    }
  }
}
</script>

<style lang="scss" scoped>


.txt-small {
  font-size: 15em;
  @media (max-width: $sm) {
    font-size: 20vw;
  }
}

.release-column {
  z-index: 999;
  @media (max-width: $sm) {
    height: 0%;
  }
}
.release-type {
  position:absolute;
  top: 2%;
  left: 70%;
  @media (max-width: $sm) {
    left: 60%;
  }
}

.release-art {
  height: 100%;
  width: auto;
  cursor: pointer;
  /*border-style: dotted;
  border-width: 20px;
  border-color: #444444;*/
}

.release-art-img {
  position: absolute;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: 20% 50%;
  width: 100%;
  height: 100%;
}
.play-icon {
  position: absolute;
  top: 25%;
  left: 25%;
  width: 50%;
  z-index: 999;
  color: #828953;
  &:hover {
    color: black;
  }
  transition: color .2s;
}

.release-info {
  z-index: 3;
  margin: 20vh 10px 10px 10px;
  color: white;
  @media (max-width: $sm) {
    margin: 5vh 10px 10px 10px;
  }
}

.label {
  color: black;
  position: absolute;
  bottom: 20px;
  @media (max-width: $sm) {
    bottom: -48vh;
    font-size: 4vw;
  }
}

.txt-white {
  color: white;
}
</style>
