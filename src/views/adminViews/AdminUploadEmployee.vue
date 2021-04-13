<template>
  <div class="admin-upload-employee">
    <h1 class="h4 text-center mb-3">Upload employees</h1>
    <ButtonToMenu/>
    <VueFileAgent
      ref="vueFileAgent"
      :theme="'list'"
      :meta="true"
      :accept="'.csv'"
      :maxSize="'20MB'"
      :maxFiles="1"
      :helpText="'Choose CSV file with employees'"
      :errorText="{
      type: 'Invalid file type. Only CSV Allowed',
      size: 'Files should not exceed 20MB in size',
    }"
      @select="fileSelectedAndUpload($event)"
      @delete="fileDeleted($event)"
      v-model="fileRecords"
    ></VueFileAgent>
    <v-app class="modal-error">
      <v-dialog
        v-model="dialog"
        width="500"
      >
        <v-card>
          <v-card-title class="headline red lighten-2">
            Error
          </v-card-title>
          <v-card-text>
            <br/>
            <h4>
              Invalid file type. Please select CSV file.
            </h4>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              @click="dialog = false"
            >
              Okay
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-app>
  </div>
</template>

<script>
import ButtonToMenu from '@components/Dashboard/ButtonToMenu.vue';

export default {
  name: 'AdminUploadEmployee',
  components: {
    ButtonToMenu,
  },
  data() {
    return {
      dialog: false,
      fileRecords: [],
      uploadHeaders: { 'X-Test-Header': 'vue-file-agent' },
      fileRecordsForUpload: [],
    };
  },
  methods: {
    fileSelectedAndUpload(fileRecordsNewlySelected) {
      const checkErrors = fileRecordsNewlySelected.find(file => file.error);
      if (checkErrors) {
        this.dialog = true;
      }
      const validFileRecords = fileRecordsNewlySelected.filter(fileRecord => !fileRecord.error);
      this.fileRecords = validFileRecords;
      this.fileRecordsForUpload = this.fileRecordsForUpload.concat(validFileRecords);
      if (this.fileRecordsForUpload) {
        this.uploadFiles();
      }
    },
    fileDeleted(fileRecord) {
      const i = this.fileRecordsForUpload.indexOf(fileRecord);
      if (i !== -1) {
        this.fileRecordsForUpload.splice(i, 1);
      } else {
        this.deleteUploadedFile(fileRecord);
      }
    },
    uploadFiles() {
      const formData = new FormData();
      formData.append('file', this.fileRecordsForUpload[0].file);
      this.$api.admin.uploadCSVEmployee(formData).then(() => {
        this.fileRecordsForUpload = [];
        this.fileRecords = [];
      }).catch(() => {
        this.fileRecordsForUpload = [];
        this.fileRecords = [];
      });
    },
  },
};
</script>

<style lang="scss">
  .admin-upload-employee .modal-error {
    width: 300px;
  }
  .admin-upload-employee {
    overflow: hidden;
  }
  .admin-upload-employee .v-application {
    height: 0;
  }
  .admin-upload-employee .vue-file-agent {
    width: 50%;
    height: 300px;
    margin-left: auto;
    margin-right: auto;
  }
  .admin-upload-employee .file-preview-new {
    height: 295px;
  }

  .admin-upload-employee .file-preview {
    top: 50px;
    left: 35%;
    position: relative;
    @media (max-width: 900px) {
      top: 50px;
      left: 0;
      position: relative;
    }
    @media (min-width: 2210px) {
      top: 50px;
      left: 41%;
      position: relative;
    }
    @media (min-width: 3750px) {
      top: 50px;
      left: 42%;
      position: relative;
    }
  }

  .admin-upload-employee .other-preview {
    top: 0;
    left: 0;
    position: relative;
  }
</style>
