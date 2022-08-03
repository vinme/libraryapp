<template>
<div>
  <section id="profile">
    <el-page-header @back="goBack" title="Back" >
    </el-page-header>
    <mdb-row>
      <mdb-col md="12">
        <mdb-card cascade narrow>
          <mdb-card-body class="text-center">
            <mdb-card-title class="font-bold mb-2">
              <h3>{{bookDetails.title}}</h3>
            </mdb-card-title>
            <h5 class="indigo-text">
              <strong>{{bookDetails.author}}</strong>
            </h5>
            <h6 class="text-justify">
              <strong>About:</strong>
            </h6>
            <p class="text-justify">{{bookDetails.description}}</p>
            <mdb-row>
              <mdb-col col="2" class="text-left text-bold">
                <strong>Title:</strong>
              </mdb-col>
              <mdb-col col="10" class="text-left">
                {{bookDetails.title}}
              </mdb-col>
            </mdb-row>
            <mdb-row>&nbsp;</mdb-row>
            <mdb-row>
              <mdb-col col="2" class="text-left text-bold">
                <strong>Author:</strong>
              </mdb-col>
              <mdb-col col="10" class="text-left">
                {{bookDetails.author}}
              </mdb-col>
            </mdb-row>
            <mdb-row>&nbsp;</mdb-row>
            <mdb-row>
              <mdb-col col="2" class="text-left text-bold">
                <strong>Owner:</strong>
              </mdb-col>
              <mdb-col col="10" class="text-left">
                {{bookDetails.owner}}
              </mdb-col>
            </mdb-row>
            <mdb-row>&nbsp;</mdb-row>
            <mdb-row>
              <mdb-col col="2" class="text-left text-bold">
                <strong>Type:</strong>
              </mdb-col>
              <mdb-col col="10" class="text-left">
                {{bookDetails.bookType.type}}
              </mdb-col>
            </mdb-row>
            <mdb-row>&nbsp;</mdb-row>
            <mdb-row>
              <mdb-col col="2" class="text-left text-bold">
                <strong>Location:</strong>
              </mdb-col>
              <mdb-col col="10" class="text-left">
                {{bookDetails.bookLocation.location}}
              </mdb-col>
            </mdb-row>
            <mdb-row>&nbsp;</mdb-row>
            <mdb-row>
              <mdb-col col="2" class="text-left text-bold">
                <strong>Status:</strong>
              </mdb-col>
              <mdb-col col="10" class="text-left">
                <span v-if="bookDetails.bookStatus.status == 'Available'" style="color: green">{{bookDetails.bookStatus.status}}</span>
                <span v-if="bookDetails.bookStatus.status == 'Checked Out'" style="color: orange">{{bookDetails.bookStatus.status}} by <strong>{{bookDetails.checkOutBy}}</strong> on <strong>{{bookDetails.checkOutDate}}</strong></span>
                <span v-if="bookDetails.bookStatus.status == 'Damaged'" style="color: red">{{bookDetails.bookStatus.status}}</span>
                <span v-if="bookDetails.bookStatus.status == 'Lost'" style="color: red">{{bookDetails.bookStatus.status}}</span>

              </mdb-col>
              <mdb-col>
                <div class="text-right">
                  <mdb-btn outline="primary" rounded size="md" :disabled="bookDetails.bookStatus.status != 'Available'" @click="checkOut">Check Out This Book</mdb-btn>
                </div>
              </mdb-col>
            </mdb-row>
          </mdb-card-body>
        </mdb-card>
      </mdb-col>
    </mdb-row>
  </section>
  <br />
  <el-divider content-position="left"><h6>Comments</h6></el-divider>
  <mdb-row>
    <mdb-col>
      <div class="comment-wrap">
      <div slot="header" class="clearfix">

      </div>
      <div style="background: #FFFFFF; border-raduis: 3px; padding: 10px;">
        <mdbTextarea label="Comment" rows="4" v-model="commentText" />
        <span v-if="commentError"><small style="color: #FF0000;">Please enter your comment.</small></span>
      </div>
      <mdb-btn outline="primary" rounded size="sm" @click="postComment" >Comment</mdb-btn>
      </div>
    </mdb-col>
  </mdb-row>
  <mdb-row v-for="item in comments" :key="item">
    <mdb-col>
      <div class="comment-wrap">
      <div slot="header" class="clearfix">
        <span><el-avatar size="small" :src="squareUrl" style="float: left; margin-right: 5px;;"></el-avatar>{{item.user}}</span>
        <span style="float: right; padding: 3px 0" type="text"><small>{{item.commentDateFormatted}}</small></span>
      </div>
      <div style="background: #FFFFFF; border-raduis: 3px; padding: 10px;">
        {{item.commentText}}
      </div>        
      </div>
    </mdb-col>
    </mdb-row>
    <el-row>
      <el-dialog title="Log in" :visible.sync="showCheckin">
        <el-row type="flex" class="row-bg" justify="center"> 
          <el-col :span="20" style="text-align:center;">
          <el-input placeholder="Your Name" v-model="user">
            <template slot="prepend">Your Name</template>
          </el-input>
             
          </el-col>

        </el-row>
        <el-row type="flex" class="row-bg" justify="center">

          <el-col :span="24" style="text-align:center;">          <br />          
          <el-button size="medium"  type="primary" @click="checkin">Log In</el-button>
            <br /><br />
          </el-col>
        </el-row>
      </el-dialog>

      <el-dialog title="Do you want to check out this book?" :visible.sync="checkOutFormVisible">
      <el-form >
        <el-form-item label="" :label-width="formLabelWidth">
          <el-input placeholder="Your Name" v-model="user">
            <template slot="prepend">Your Name</template>
          </el-input>
          <span v-if="checkOutUserError"><small>Please login with your name.</small></span>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="checkOutFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="confirmCheckOut">Confirm</el-button>
      </span>
      </el-dialog>
    </el-row>
</div>
</template>

<script>
import { mdbRow, mdbCol, mdbCard, mdbCardBody, mdbBtn, mdbTextarea} from 'mdbvue'
import axios from '@/axios.config.js';
import moment from 'moment';
export default {
  name: 'Profile',
  components: {
    mdbRow,
    mdbCol,
    mdbCard,
    mdbCardBody,
    mdbBtn,
    mdbTextarea
  },
  data () {
    return {
      bookDetails: null,
      comments: [],
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
      sizeList: ["large", "medium", "small"],
      showCheckin: false,
      commentText: '',
      user: '',
      commentError: false,
      checkOutFormVisible: false,
      checkOutUserError: false,
    }
  },
  methods:{
    getBookDetials(){
      let params = {bookId: this.$route.params.id}
      axios.get("Book/Id?bookId="+ params.bookId).then((result) => {
        this.bookDetails = result.data;
        this.getComments(result.data.id);
      })
    },
    getComments(bookId){
      let params = {bookId: bookId}
      console.log(params);
      axios.get("Book/GetComments?bookId="+params.bookId).then((result) => {
        this.comments = result.data.comments;
        console.log(this.comments);
        this.comments.forEach(item => {
            item.commentDateFormatted = moment(item.commentDate).format("DD MMM YYYY, hh:mm");
        });
      })
    },
    goBack(){
      this.$router.push('/books');
    },
      checkin(){
        this.$cookies.set("theExLibUser",this.user,"1d");
        this.showCheckin = false;  
      },

      validateUser(){
          let ck = this.$cookies.get("theExLibUser");
          if(!ck){
            this.showCheckin = true;
            this.user = null;
            return false;
          }else{
            this.user = ck;
            return true;
          }
      },
      postComment(){
        this.validateUser();
        let errorCount = 0;
        if(!this.validateUser()){return}
        if(this.commentText == ""){
            this.commentError = true;
            errorCount++;
        }else{
          this.commentError = false;
          let params = {
            bookId: this.bookDetails.id,
            user: this.user,
            commentDate: new Date().toISOString(),
            commentText: this.commentText
          }

          if(errorCount <=0){
            axios.post('Book/AddComment', params).then((result) => {
            if(result.status == 200){
              this.showSuccessMessage("Comment posted successfully")
              this.commentText = "";
              this.getComments(this.bookDetails.id);
            }else{
              console.log(result);
            }
        });
      }
        }
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

      checkOut(){
        this.checkOutFormVisible = true;
      },

      confirmCheckOut(){
        if(this.user == ""){
            this.checkOutUserError == true;
            return
          }else{
            this.checkOutUserError = false;
            let params = this.bookDetails;
            params.checkOutBy = this.user;
            this.$cookies.set("theExLibUser",this.user,"1d");
            axios.post('Book/CheckOut', params).then((result) => {
            if(result.status == 200){
                this.showSuccessMessage("Checked out successfully")
                this.checkOutFormVisible = false;
                this.getComments(this.bookDetails.id);
            }else{
              console.log(result);
            }
          });
        }
      },

      logoutUser(){
        this.$cookies.remove("theExLibUser");
        this.user = null;
      }
  },
  mounted(){
    this.getBookDetials();
    this.validateUser();
  }
}
</script>
<style>
.comment-wrap {
    width: 100%;
    margin: 0 auto;
    border-radius: 4px;
    /* border: 1px solid #c8b8d6; */
    padding: 10px;
    margin: 10px 0;


box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  }
</style>
<style scoped>
.profile-card-footer {
  background-color: #F7F7F7 !important;
  padding: 1.25rem;
}
.card.card-cascade .view {
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.15), 0 3px 12px 0 rgba(0, 0, 0, 0.15);
}
</style>
