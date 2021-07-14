<template>
  <div class="identification-card" data-app>
    <Content>
      <Loading :is-loading.sync="loadFile" :scroll-lock="false"/>
      <h1 class="h4 text-center mb-3">Identification Card</h1>
      <div class="content-building-your-credibility-score-main
      content-building-your-credibility-score-main-1">
        We need to build a picture of who you say you are so we can vouch
        for your profile’s credibility
      </div>
      <div class="content-building-your-credibility-score-main
      content-building-your-credibility-score-main-2">
        Part of that is uploading a valid photo identification.
        This could be a id card, driving licence or passport.
        In fact, anything that is government issued and has your picture on it.
      </div>
      <div class="content-building-your-credibility-score-main
       content-building-your-credibility-score-main-3">
        We will store these details but, as with all you data, you control it completely. Nothing
        will passed to <b>any third parties without your obvious consent.</b>
        In the future, we may give you an option to login using facial recognition but not for now.
      </div>
      <div class="content-building-your-credibility-score-main
       content-building-your-credibility-score-main-3">
        Just drop a photo or a scan of the id below and it's done
      </div>
      <div class="upload-id-data">
        <VueFileAgent
          ref="vueFileAgent"
          :theme="'list'"
          :meta="true"
          :accept="'image/*'"
          :maxSize="'20MB'"
          :maxFiles="5"
          :thumbnailSize="120"
          :deletable="true"
          :multiple="true"
          :helpText="'Drop or paste your photo here'"

          :errorText="{
      type: 'Please select an image',
      size: 'Files should not exceed 20MB in size',
    }"
          @select="fileSelectedAndUpload($event)"
          @beforedelete="fileDeleted($event)"
          v-model="fileRecords"
        ></VueFileAgent>
      </div>
      <div class="form-group form-group_submit">
        <div class="button-identification-card">
          <button
            :disabled="disableSubmitButton"
            @click="uploadFiles"
            class="button button_w-100 button_theme-default button_size-m">
            <span class="outer-space-button-text">Submit</span>
          </button>
        </div>
        <div class="button-identification-card">
          <button
            @click="skipButton"
            class="button button_w-100 button_theme-default button_size-m">
            <span class="outer-space-button-text">Skip</span>
          </button>
        </div>
      </div>
      <div>
        <v-dialog
          class="v-dialog"
          v-model="dialog"
          min-width="200"
          max-width="400"
        >
          <v-card>
            <v-card-title class="headline red lighten-2">
              Error
            </v-card-title>
            <v-card-text>
              <br/>
              <h4>
                Please select an image
              </h4>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                text
                @click="dialogOff"
              >
                Continue
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </Content>
  </div>
</template>

<script>
import Content from '@components/Content/Content.vue';
import { mapGetters } from 'vuex';
import Loading from '@components/Spinner/Loading.vue';

export default {
  name: 'IdentificationCard',
  components: {
    Content,
    Loading,
  },
  data: () => ({
    fileRecords: [],
    fileRecordsForUpload: [],
    dialog: false,
    disableSubmitButton: true,
    loadFile: false,
  }),
  computed: {
    ...mapGetters({
      getProfile: 'auth/getProfile',
    }),
  },
  methods: {
    fileSelectedAndUpload(fileRecordsNewlySelected) {
      const checkErrors = fileRecordsNewlySelected.find(file => file.error);
      if (checkErrors) {
        this.dialog = true;
      }

      if (this.fileRecords.length) {
        this.disableSubmitButton = false;
      }
    },
    fileDeleted(fileRecord) {
      this.$refs.vueFileAgent.deleteFileRecord(fileRecord);
    },
    uploadFiles() {
      this.loadFile = true;
      const formData = new FormData();

      this.fileRecords.forEach((x) => {
        formData.append('file', x.file);
      });

      this.$api.auth.uploadIdentificationCardUser(formData, this.getProfile.id, false).then(() => {
        this.updateData();
      }).catch(() => {
        this.updateData();
      });
    },
    dialogOff() {
      this.dialog = false;
      this.fileRecords.pop();
    },
    updateData() {
      this.fileRecordsForUpload = [];
      this.fileRecords = [];
      this.disableSubmitButton = true;
      this.loadFile = false;
      this.$router.push({ name: 'building-credibility-score' });
    },
    skipButton() {
      const formData = new FormData();
      this.$api.auth.uploadIdentificationCardUser(formData, this.getProfile.id, true).then(() => {
        this.updateData();
      }).catch(() => {
        this.updateData();
      });
    },
  },

};
</script>

<style lang="scss">
  .content-building-your-credibility-score-main {
    margin-bottom: 20px;
    font-style: normal;
    font-weight: normal;
  }
  .content-building-your-credibility-score-main-3 {
    font-size: 18px;
    line-height: 22px;
    align-items: center;
    text-align: center;
  }
  .content-building-your-credibility-score-main-2 {
    font-size: 18px;
    line-height: 22px;
    align-items: center;
    text-align: center;
  }
  .content-building-your-credibility-score-main-1 {
    font-size: 18px;
    line-height: 22px;
    align-items: center;
    text-align: center;
  }
  .identification-card .vue-file-agent  {
    height: 300px;
    border: 1px solid #ccc;
  }

  .identification-card .file-preview-new {
    height: 0;
  }

  .identification-card .v-card__title {
    background: red;
    color: white;
  }
  .identification-card .v-btn {
    color: #5dc7cc;
  }

  .identification-card .form-group_submit {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .identification-card .button-identification-card {
    padding-right: 10px;
    padding-left: 10px;
    width: 100%;
  }
  /*.identification-card .file-preview span{*/
  /*  width: 71%;*/
  /*  left: 20% !important;*/
  /*}*/
  /*.identification-card .theme-list .vue-file-agent .file-preview-new svg {*/
  /*  left: 0 !important;*/
  /*}*/

  .identification-card button:disabled,
  button[disabled]{
    border: 1px solid #999999;
    background-color: #cccccc;
    color: #666666;
  }
</style>
