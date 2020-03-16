<template>
  <div>
    <b-button @click="resume()">
      Play
    </b-button>
    <b-button @click="pause()">
      Pause
    </b-button>
    <b-button @click="forward(10)">
      +10s
    </b-button>
    <b-button @click="back(10)">
      -10s
    </b-button>

    <b-progress :max="max">
      <b-progress-bar
        :value="songtime"
        :label="Math.floor(songtime / 60000) + ':' + ('0' + Math.floor(songtime / 1000) % 60).slice(-2)"
      />
    </b-progress>
  </div>
</template>

<script>
export default {
  props: {
    trackUrl: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      max: 0,
      songtime: 0,
      player: null
    };
  },
  mounted() {
    this.$sc.initialize({
      client_id: "Uz4aPhG7GAl1VYGOnvOPW1wQ0M6xKtA9"
    });
    this.$sc.get('/user/183/tracks').then(function(tracks){
      alert('Latest track: ' + tracks[0].title);
    });
    this.getTrackInfo(this.trackUrl);
  },
  beforeDestroy() {
    if (this.player !== null) {
      this.player.pause();
    }
  },
  methods: {
    getTrackInfo(trackUrl) {
      var track = null;
      this.$sc.get('/resolve', {
        url: trackUrl
      })
      .then(r_track => {
        track = r_track;
        console.log(track);
      })
    },
    setupPlayer(player, track) {
      let vue = this;
      vue.player = player;

      player.play().then(function() {
        vue.playing = true;
        vue.max = parseInt(track.duration);
      });

      player.on("finish", function() {
        vue.playing = false;
        setTimeout(function() {
          vue.songtime = 0;
        }, 500);
      });
      player.on("time", function(time) {
        if (vue.playing) {
          vue.songtime = Math.round(time / 100) * 100;
        }
      });
    },
    playTrack(track) {
      console.log(track);
      let vue = this;
      if (track.secret_token == null) {
        vue.$sc.stream("/tracks/" + track.track_id).then(function(player) {
          vue.setupPlayer(player, track);
        });
      } else {
        vue.$sc
          .stream("/tracks/" + track.track_id, track.secret_token)
          .then(function(player) {
            vue.setupPlayer(player, track);
          });
      }
    },

    pause() {
      if (this.player !== null) {
        this.player.pause();
      }
    },

    resume() {
      if (this.player !== null) {
        this.player.play();
      }
    },

    forward(amount) {
      var skipamount = amount * 1000;
      if (this.player !== undefined) {
        if (this.songtime + skipamount > this.max) {
          this.player.seek(this.max - 100);
        } else {
          this.player.seek(this.songtime + skipamount);
        }
      }
    },

    back(amount) {
      var skipamount = amount * 1000;
      if (this.player !== undefined) {
        if (this.songtime - skipamount < 0) {
          this.player.seek(1);
        } else {
          this.player.seek(this.songtime - skipamount);
        }
      }
    }
  }
};
</script>