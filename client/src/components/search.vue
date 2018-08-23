<template>
  <v-app>
    <div>
      <v-toolbar class="main" height="60"></v-toolbar>
      <v-container mt-3>
        <v-form>
          <v-flex class="font-weight-bold text-xs-left" style="font-size:1.5em">
            Book Domestic and International flights
          </v-flex>
          <v-layout row align-end mt-3 class="text-xs-left">
            <v-flex style="position:relative">
              <span style="position:absolute;height:4px;width:20px;background:#7d5adf;top:0.7em;border-radius:2px"></span>
              <span style="margin-left:30px;font-size:1.1em" class="font-weight-bold">Flight Details</span>
            </v-flex>
          </v-layout>
          <v-layout mt-4 justify-center row wrap>
            <v-flex xs5 sm4 md3>
              <v-autocomplete
                v-model="from"
                :items="origins"
                hint="Choose origin of journey"
                color="main"
                label="From"
                v-on:input="alterTo()"
                append-icon="place"
                solo
              >
                <v-slide-x-reverse-transition
                  slot="append-outer"
                  mode="out-in"
                >
                </v-slide-x-reverse-transition>
              </v-autocomplete>
            </v-flex>
            <!-- <v-flex xs1>
              <v-btn icon class="main" @click="exchange()">
                <v-icon color="white">
                  compare_arrows
                </v-icon>
              </v-btn> -->
            <!-- </v-flex> -->
            <v-flex xs5 sm4 md3>
              <v-autocomplete
                color="main"
                hint="Choose destination of journey"
                v-model="to"
                :items="destinations"
                label="To"
                append-icon="place"
                solo
              >
                <v-slide-x-reverse-transition
                  slot="append-outer"
                  mode="out-in"
                >
                </v-slide-x-reverse-transition>
              </v-autocomplete>
            </v-flex>
            <v-flex xs5 sm4 md3>
              <v-menu
                ref="menu"
                :close-on-content-click="false"
                v-model="menu"
                :nudge-right="40"
                :return-value.sync="date"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                max-width="290px"
                min-width="290px"
              >
                <v-text-field
                  class="main--text"
                  color="main"
                  slot="activator"
                  v-model="date"
                  solo
                  label="Departure date"
                  append-icon="date_range"
                  readonly
                ></v-text-field>
                <v-date-picker
                  :min="aaj()"
                  color="main"
                  v-model="date"
                  type="date"
                  no-title
                  scrollable
                >
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                  <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                </v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex xs3 sm2 md1 ml-1>
              <v-text-field
              type="number"
              append-icon="people"
              color="main"
              v-model="number"
              min="1"
              solo
              >

              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout justify-center>
            <v-btn style="border-radius:4px" large class="main white--text" @click="search()">
              SEARCH
              <!-- <v-icon right dark>search</v-icon> -->
            </v-btn>
          </v-layout>

          <v-layout v-if="results.length > 0" row align-end mt-4 class="text-xs-left">
            <v-flex style="position:relative">
              <span style="position:absolute;height:4px;width:20px;background:#7d5adf;top:0.7em;border-radius:2px"></span>
              <span style="margin-left:30px;font-size:1.1em" class="font-weight-bold">Flight Results</span>
            </v-flex>
          </v-layout>

          <v-container v-if="results.length > 0">
            <v-list three-line subheader>
              <v-list-tile v-for="result in results" :key="result.id" class="border1 mb-2 white">
                <v-list-tile-avatar v-if="!mobile" style="margin-top:1px" class="ml-3" size="50">
                  <img :src="result.image">
                </v-list-tile-avatar>
                <v-layout>
                  <v-flex xs3 md2>
                    <v-layout column>
                      <v-flex font-weight-bold >
                        {{result.name}}
                      </v-flex>
                      <v-flex>
                        {{result.fcode}}
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex xs3 md2>
                    <v-layout column>
                      <v-flex font-weight-bold v-if="!mobile">
                        {{result.origin}}
                      </v-flex>
                      <v-flex font-weight-bold v-else>
                        {{result.ocode}}
                      </v-flex>
                      <v-flex>
                        {{momenty(result.departure)}}
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex xs2>
                    <v-layout column>
                      <v-flex font-weight-bold v-if="!mobile">
                        {{result.destination}}
                      </v-flex>
                      <v-flex font-weight-bold v-else>
                        {{result.dcode}}
                      </v-flex>
                      <v-flex>
                        {{momenty(result.arrival)}}
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex xs2 pt-3 pl-4 title font-weight-bold v-if="!mobile">
                    <v-icon>access_time</v-icon> {{duration(result.departure,result.arrival)}}
                  </v-flex>
                  <v-flex xs2 title pt-3 green--text v-if="!mobile">
                    ₹ {{amount(result.price)}}
                  </v-flex>
                  <v-flex xs2 ml-2>
                    <v-btn v-model="bookBar" style="border-radius:4px" class="main white--text" @click="book(result.name, result.fcode, result.origin,result.destination,result.departure,result.arrival,result.price)">
                      BOOK
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-list-tile>
            </v-list>
          </v-container>

          <v-container v-if="notFound" mt-5 pt-5>
            <div class="title">No tickets could be found with the above parameters. 😕</div>
          </v-container>

        </v-form>
        <v-dialog
          v-model="bookBar"
          max-width="420"
        >
          <v-card>
            <v-card-title class="headline font-weight-bold ma-2">{{head}}</v-card-title>

            <v-card-text class="subheading text-xs-left mx-2 mt-2">
              {{content}}
            </v-card-text>

            <v-layout>
              <v-spacer/>
              <v-btn
                color="green darken-1"
                flat="flat"
                @click="bookBar = false"
              >
                Okay
              </v-btn>
            </v-layout>
            <!-- </v-card-actions> -->
          </v-card>
        </v-dialog>
        <v-snackbar v-model="errorBar" :timeout=3000 color="red">
          Please fill in all the input fields.
        </v-snackbar>
      </v-container>
    </div>
  </v-app>
</template>

<script>
import moment from 'moment'
import axios from 'axios'
export default {
  name: 'search',
  data () {
    return {
      head: '',
      content: '',
      date: '2018-10-01',
      mobile: false,
      window: {
        width: 0,
        height: 0
      },
      notFound: false,
      errorBar: false,
      bookBar: false,
      menu: false,
      number: 1,
      results: [],
      from: '',
      to: '',
      origins: [],
      destinations: []
    }
  },
  methods: {
    aaj () {
      return moment(new Date()).format('YYYY-MM-DD')
    },
    alterTo () {
      axios.post('http://localhost:3000/correspondingDestinations', {
        origin: this.from.slice(0, -6)
      }).then((res) => {
        this.destinations = res.data
      })
    },
    book (name, fcode, origin, destination, departure, arrival, price) {
      this.head = 'Thank you for booking your ticket with us. 😊'
      this.content = 'Your flight ' + name + ' (' + fcode + ') will depart from ' + origin + ' at ' + this.momenty(departure) + ' and arrive in ' + destination + ' at ' + this.momenty(arrival)
      this.bookBar = true
    },
    amount (price) {
      if (this.number === 1) {
        return price
      } else {
        return price + ' x ' + this.number + ' = ₹' + price * this.number
      }
    },
    duration (a, b) {
      var hours = parseInt(moment.duration(moment(b).diff(moment(a))).asHours())
      var mins = parseInt(moment.duration(moment(b).diff(moment(a))).asMinutes()) % 60
      return hours + 'h' + mins + 'm'
    },
    momenty (t) {
      return moment(t).format('kk:mm')
    },
    search () {
      if (this.from === '' || this.to === '' || this.date === '') {
        this.errorBar = true
      } else {
        axios.post('http://localhost:3000/flights', {
          origin: this.from.slice(0, -6),
          destination: this.to.slice(0, -6)
        }).then((res) => {
          this.results = res.data
          if (res.data.length === 0) {
            this.notFound = true
          } else {
            this.notFound = false
          }
        })
      }
    },
    exchange () {
      var temp = this.from
      this.from = this.to
      this.to = temp
    },
    handleResize () {
      this.window.width = window.innerWidth
      this.window.height = window.innerHeight
      if (this.window.width < 500) {
        this.mobile = true
      }
    }
  },
  created () {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
    window.removeEventListener('resize', this.handleResize)
    axios.get('http://localhost:3000/airports').then((res) => {
      this.origins = res.data.origins.sort()
      this.destinations = res.data.destinations.sort()
    })
  }
}
</script>

<style>
ul li {
  display: inline;
  font-size: 0.8em;
  position: relative;
}
.border1 {
  border: 1px solid #7d5adf;
  background: white;
  margin-bottom: 20px;
  border-radius:4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}
</style>
