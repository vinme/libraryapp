<template>
<section id="dashboard">
    <mdb-card class="mb-4">
      <mdb-card-body class="d-sm-flex justify-content-between">
        <h5 class="mb-sm-0 pt-2">
          <a href="#" target="_blank">Home</a><span>/</span><span>All Books</span>
        </h5>
        <form class="d-flex md-form justify-content-center" style="margin:0;">
          <input aria-label="Search" class="form-control" placeholder="Type your query" type="search" />
          <mdb-btn color="primary" size="sm" class="my-0" type="submit"><i class="fa fa-search"></i></mdb-btn>
        </form>
        <mdbBtn color="primary" @click="addNewBook">Add Book</mdbBtn>
      </mdb-card-body>
    </mdb-card>
  <section id="tables">
    <mdb-row>
      <mdb-col md="12">
        <mdb-card cascade narrow class="mt-5">
          <mdb-card-body>
      <el-table
      :data="tableData"
      style="width: 100%"
      show-header
      >
      <el-table-column
        prop="title"
        label="Title">
      </el-table-column>
      <el-table-column
        prop="author"
        label="Author">
      </el-table-column>
      <el-table-column
        prop="owner"
        label="Owner">
      </el-table-column>
      <el-table-column
        prop="bookLocation.location"
        label="Location">
      </el-table-column>
      <el-table-column
        prop="checkOutBy"
        label="Checked Out By">
      </el-table-column>
      <el-table-column
        prop="checkOutDateFormatted"
        label="Checked Out Date">
      </el-table-column>
      <el-table-column
        prop="bookStatus.status"
        label="Status">
      </el-table-column>
      <el-table-column align="right">
      <template slot-scope="scope">
        <mdbBtn color="primary" @click="handleView(scope.$index, scope.row)">View</mdbBtn>
      </template>
    </el-table-column>
    </el-table>
          </mdb-card-body>
        </mdb-card>
      </mdb-col>
    </mdb-row>
  </section>

  <el-dialog
  title="Add new book"
  :visible.sync="dialogVisible"
  width="50%">
    <mdb-row>
      <mdb-col col="6">
          <mdbInput label="Title" v-model="title"  :class="titleError ? 'error-happened': 'no-error'" />
      </mdb-col>
      <mdb-col col="6">
        <mdbInput label="Description" v-model="description"  />
      </mdb-col>
      <mdb-col col="6">
        <mdbInput label="Author" v-model="author" :class="authorError ? 'error-happened': 'no-error'" />
      </mdb-col>
       <mdb-col col="6">
        <mdbInput label="Owner" v-model="owner" :class="ownerError ? 'error-happened': 'no-error'" />
      </mdb-col>
      <mdb-col col="6">
          <el-select v-model="bookTypeId" placeholder="Type"  class="library-select" :class="typeError ? 'error-happened': 'no-error'" style="width: 100%">
            <el-option
              v-for="item in bookTypes"
              :key="item.value"
              :label="item.type"
              :value="item.id">
            </el-option>
          </el-select>
      </mdb-col>
      <mdb-col col="6">
          <el-select v-model="bookLocationId" placeholder="Location" class="library-select"  :class="locationError ? 'error-happened': 'no-error'" style="width: 100%">
            <el-option
              v-for="item in bookLocations"
              :key="item.value"
              :label="item.location"
              :value="item.id">
            </el-option>
          </el-select>
      </mdb-col>
    </mdb-row>
    <span slot="footer" class="dialog-footer">
      <mdbBtn color="secondary" @click="dialogVisible = false">Close</mdbBtn>
      <mdbBtn color="primary" @click="submitBook">Save changes</mdbBtn>
    </span>
  </el-dialog>
</section>
</template>

<script>
import axios from '@/axios.config.js';
import moment from 'moment'
import { mdbRow, mdbCol, mdbCard, mdbCardBody, mdbBtn, mdbInput } from 'mdbvue'
console.log(axios)
export default {
  name: 'Tables',
  components: {
    mdbRow,
    mdbCol,
    mdbCard,
    mdbCardBody,
    mdbBtn,
    mdbInput
  },
  data () {
    return {
      tableData: [],
      dialogVisible: false,
      bookLocations: [],
      bookTypes: [],
      title: '',
      description: '',
      author: '',
      owner: '',
      bookTypeId: '',
      bookLocationId: '',
      titleError: false,
      ownerError: false,
      authorError: false,
      typeError: false,
      locationError: false
    }
  },
  methods: {
    getAllBooks(){
      axios.get("Book").then((result) => {
        this.tableData = result.data.books;
        this.tableData.forEach(item => {
          if(item.bookStatus.status == "Checked Out"){
            item.checkOutDateFormatted = moment(item.checkOutDate).format("DD MMM YYYY");
          }else{
            item.checkOutDateFormatted = "";
          }
        });
      })
    },
     getMasterData(){
      axios.get("master").then((result) => {
        this.bookLocations =  result.data.bookLocations.bookLocations;
        this.bookTypes =  result.data.bookTypes.bookTypes;

      })
    },
    closeModal(){
      this.dialogVisible = false;
    },
    addNewBook(){
      this.clearFileds();
      this.dialogVisible = true;
    },
    submitBook(){
      let errorCount = 0; 
      if(this.title == ""){
        this.titleError = true;
        errorCount++;
      }
      if(this.author == ""){
        this.authorError = true;
        errorCount++;
      }
      if(this.owner == ""){
        this.ownerError = true;
        errorCount++;
      }
      if(this.bookTypeId == ""){
        this.typeError = true;
        errorCount++;
      }
      if(this.bookLocationId == ""){
        this.locationError = true;
        errorCount++;
      }

      let params = {
          "id": 0,
          "title": this.title,
          "description": this.description,
          "author": this.author,
          "owner": this.owner,
          "checkOutBy": this.checkOutBy,
          "checkOutDate": new Date().toISOString(),
          "bookStatusId": 1,
          "bookLocationId": this.bookLocationId,
          "bookTypeId": this.bookTypeId
      }
      let successMessage = "New Book has been entered successfully.";
      if(errorCount <=0){
          axios.post('Book/Add', params).then((result) => {
          if(result.status == 200){
            this.showPopup = false;
            this.showSuccessMessage(successMessage);
            this.dialogVisible= false;
            this.getAllBooks();
          }else{
            console.log(result);
            this.showErrorMessage();
            this.dialogVisible= false;
          }
        });
      }

    },
    handleView(index, row){
      console.log(row);
      this.$router.push('/book/'+row.id);
    },
    showSuccessMessage(msg) {
        this.$notify({
          title: 'Success',
          message: msg,
          type: 'success'
        });
      },
    showErrorMessage() {
        this.$notify.error({
          title: 'Error',
          message: 'An error occured, Please try again.'
        });
      },

    clearFileds(){
      this.title = '';this.titleError=false;
      this.description = ''; 
      this.author = ''; this.authorError = false;
      this.owner = ''; this.ownerError = false;
      this.bookTypeId = ''; this.typeError = false;
      this.bookLocationId = ''; this.locationError = false;
    }
  },
  mounted(){
    this.getAllBooks();
    this.getMasterData();
  }
}
</script>

<style>
.library-select .el-input__inner {
  border: none !important;
  border-radius: 0 !important;
  border-bottom: 1px solid #ced4da !important;
  padding: 0px !important;
  margin-top: 15px !important;
}

.error-happened .form-control{
  border-bottom: 1px solid #FF0000 !important;
}

</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card.card-cascade .view.gradient-card-header {
  padding: 1rem 1rem;
  text-align: center;
}
.card.card-cascade h3,
.card.card-cascade h4 {
  margin-bottom: 0;
}




</style>
