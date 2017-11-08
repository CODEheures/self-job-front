/* eslint-disable no-undef */
import { Events } from 'quasar'

const googleAutocomplete = {
  initAutocomplete () {
    console.log('launch init auto complete')
    // let _parent = document.querySelector('#inputAutoComplete')
    let _input = document.querySelector('#inputAutoComplete input')
    let _options = {
      types: ['(regions)']
    }
    let autocomplete = new google.maps.places.Autocomplete(_input, _options)
    autocomplete.addListener('place_changed', function () {
      let place = autocomplete.getPlace()
      if (place.geometry !== undefined) {
        Events.$emit('placeChanged', place)
      }
    })
  }
}

export default googleAutocomplete
