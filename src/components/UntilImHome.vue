<template>
  <section class="releases">
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
            <h1 class="release-title txt-primary">
              {{ title }} 
            </h1>
            <br>
            <!--<player 
              class="soundcloud-player"
              :track-url="soundcloud" 
            />-->
            <span class="label">
              &copy; stereofox 2020
            </span>
          </div>
          <div class="release-type txt-secondary">
            <span 
              v-for="index in 6" 
              :key="index"
            >
              listen now 
              <span class="desktop-only">
                &#x21F8;&#x21F8;
              </span>
              <span class="mobile-only">
                &#x21A1;&#x21A1; 
              </span>
            </span>
          </div>
        </b-col>
        <b-col 
          cols="12"
          md="6"
          style="padding: 0px"
        >
          <div 
            class="release-art"
          >
            <!--<b-img 
              class="release-art-img"
              src="/img/releases/pebblebeach.jpg"
              alt="Pebble Beach album cover"
              fluid
            />-->
            <div 
              class="top-left"
              @click="openRelease()"
            >
              <v-icon 
                class="play-icon-2"
                name="play" 
              />
              <div 
                class="release-art-img-2" 
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
                class="play-icon-2"
                name="book-open" 
              />
              <div 
                class="release-art-img-2" 
                :style="artstyle"
              />
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'title'
    },
    soundcloud: {
      type: String,
      default: ''
    },
    artwork: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      default: ''
    }
  },
  computed: {
    artstyle() {
      return 'background-image: url(' + this.artwork + ');'
    }
  },
  methods: {
    openRelease() {
      this.$gtag.event('release');
      window.open(this.url, '_blank')
    },
    openWriteup() {
      this.$gtag.event('writeup');
      window.open('https://label.stereofox.com/release/imagiro-until-im-home/', '_blank')
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
.releases {
  background-color: #C2CCEF;
}
.release-column {
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

.read-prompt {
  margin: 50px 5px 50px 200px;
}

.top-left {
  position: absolute;
  top: 0;
  left: 0;
  right: 50%;
  bottom: 50%;
}

.bottom-left {
  position: absolute;
  top: 50%;
  bottom: 0%;
  right: 50%;
  left: 0%;
}

.bottom-right {
  position: absolute;
  top: 50%;
  left: 50%;
  right: 0%;
  bottom: 0%;
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
  height: 100%;
  width: auto;
}
.release-art-img-2 {
  position: absolute;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: 0% 50%;
  width: 100%;
  height: 100%;
}
.play-icon-2 {
  position: absolute;
  top: 25%;
  left: 25%;
  width: 50%;
  z-index: 999;
  color: #C2CCEF;
  &:hover {
    color: #4D3F3E;
  }
  transition: color .2s;
}

.release-info {
  z-index: 3;
  margin: 20vh 10px 10px 10px;
  color: white;
  .release-title {
    font-size: 14vw;
  }
  @media (max-width: $sm) {
    .release-title {
      font-size: 25vw;
    }
    margin: 5vh 10px 10px 10px;
  }
}

.soundcloud-player {
  position: absolute;
  bottom: 20px;
  @media (max-width: $sm) {
    bottom: -48vh;
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
</style>
