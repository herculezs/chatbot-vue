<template>
  <div class="admin-upload-employee">
    <h1 class="h4 text-center mb-3">Upload employees</h1>
    <ButtonToMenu/>
    <v-card v-if="showTable" class="table-upload-employee">
      <v-data-table
        item-key="id"
        :headers="headers"
        :items="parsedDate"
        :items-per-page="-1"
        mobile-breakpoint="1"
        hide-default-footer
      >
      </v-data-table>
    </v-card>
    <VueFileAgent
      ref="vueFileAgent"
      v-else
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
    <v-app class="modal-error modal-warning">
      <v-dialog
        class="v-dialog"
        v-model="showTable"
        min-width="200"
        max-width="400"
        persistent
      >
        <v-card>
          <v-card-title class="headline orange lighten-2">
            WARNING
          </v-card-title>
          <v-card-text>
            <br/>
            <h4>
              This action cannot be reversed
            </h4>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              @click="closeWarningModal()"
            >
              Cancel
            </v-btn>
            <v-btn
              color="primary"
              text
              @click="uploadFiles()"
            >
              Continue
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
      parsedDate: [],
      showTable: false,
      headers: [
        {
          text: 'NAME', value: 'name', align: 'center', sortable: false,
        },
        {
          text: 'SECOND NAME', value: 'surName', align: 'center', sortable: false,
        },
        {
          text: 'EMAIL', value: 'email', align: 'center', sortable: false,
        },
        {
          text: 'PHONE', value: 'phone', align: 'center', sortable: false,
        },
      ],
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
        this.parseFileBeforeSend();
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
        this.showTable = false;
        this.parsedDate = [];
      }).catch(() => {
        this.fileRecordsForUpload = [];
        this.fileRecords = [];
        this.showTable = false;
        this.parsedDate = [];
      });
    },
    closeWarningModal() {
      this.fileRecordsForUpload = [];
      this.fileRecords = [];
      this.showTable = false;
      this.parsedDate = [];
    },
    parseFileBeforeSend() {
      this.$papa.parse(this.fileRecordsForUpload[0].file, {
        preview: 5,
        complete: (resultParse) => {
          let i = 0;
          resultParse.data.forEach((x) => {
            if (i >= 1 && x[0] !== '') {
              this.parsedDate.push({
                name: x[0],
                surName: x[1],
                phone: x[5],
                email: x[6],
              });
              this.showTable = true;
            }
            i += 1;
          });
        },
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

  .table-upload-employee {
    width: 50%;
    margin-left: auto;
    margin-right: auto;
  }

  .v-dialog {
    position: absolute;
    bottom: 10%;
    @media (max-width: 1150px) {
      bottom: 0;
    }
  }
</style>
