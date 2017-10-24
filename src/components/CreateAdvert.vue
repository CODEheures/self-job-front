<template>
  <div class="layout-padding">
    <div class="row sm-gutter">
      <div class="col-12">
        <q-stepper ref="stepper" contractable v-model="currentStep">
          <step-one :stringPageScopeName="stringPageScopeName" @stepOneStatusChange="setCompleteStepOne"></step-one>
          <step-two :stringPageScopeName="stringPageScopeName" :isCompleteStepOne="isCompleteStepOne"></step-two>
          <q-stepper-navigation>
            <q-btn v-if="currentStep !== 'stepOne' " flat @click="$refs.stepper.previous()">{{ strings.btnPreviousStep }}</q-btn>
            <q-btn v-if="currentStep !== 'stepTwo'" :disable="(currentStep === 'stepOne' && !isCompleteStepOne)" @click="$refs.stepper.next()">{{ strings.btnNextStep }}</q-btn>
          </q-stepper-navigation>
        </q-stepper>
      </div>
    </div>
  </div>
</template>

<script>
  import StepOne from './createAdvert/StepOne.vue'
  import StepTwo from './createAdvert/StepTwo.vue'
  import LanguageSetter from '../strings/languageSetter'

  export default {
    components: {
      StepOne,
      StepTwo
    },
    props: {
      stringPageScopeName: String
    },
    data () {
      return {
        strings: { },
        units: [],
        submit: false,
        currentStep: '',
        isCompleteStepOne: false
      }
    },
    mounted () {
      LanguageSetter.setStrings(this)
      LanguageSetter.setUnits(this)
    },
    methods: {
      setCompleteStepOne (event) {
        this.isCompleteStepOne = event.isCompleteStepOne
      }
    }
  }
</script>

<style>
</style>
