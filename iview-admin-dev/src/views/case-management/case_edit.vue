<template>
    <div>
        <Row>
            <Col :md="24" :lg="24">
                <div class="step-header-con">
                    <h3>议案与建议编辑</h3>
                </div>
            </Col>
        </Row>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="标题" prop="title">
                <Input v-model="formValidate.title" placeholder="Enter your name"></Input>
            </FormItem>
            
            <FormItem label="类型" prop="type">
                <RadioGroup v-model="formValidate.type">
                    <Radio label="bill">议案</Radio>
                    <Radio label="proposal">建议</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="主办单位" prop="departmentIds">
                <Select v-model="formValidate.departmentId" placeholder="主办单位" filterable>
                    <Option v-for="(dept ,index) in departmentsList" :key="index" :value="dept.id">{{dept.name}}</Option>
                </Select>
            </FormItem>
            <FormItem label="内容" prop="content">
                <Input v-model="formValidate.content" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入议案或建议内容"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit(false)">保存</Button>
            </FormItem>
            <FormItem v-for="(reply,index) in replyList" :key="index" :label="'回复'+(index+1)">
                <div>
                  <span> {{reply.author}}</span>
                  <span> {{reply.time}}</span>
                </div>
                <Input v-model="reply.content" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入议案或建议内容"></Input>
                <div style="text-align:right">
                  <Button type="primary" size="small" @click="updateReply(reply)">修改</Button>
                  <Button type="warning" size="small" @click="removeReply(reply,index)">撤销</Button>
                </div>
            </FormItem>
        </Form>
    </div>
    
</template>
<script>
import caseService from "@/api/caseService";
import deparmentService from "@/api/departments";
import moment from "moment";
export default {
  data() {
    return {
      formValidate: {
        
      },
      ruleValidate: {
        title: [{ required: true, message: "标题不能为空", trigger: "blur" }],
        type: [{ required: true, message: "请选择类型", trigger: "change" }],
        content: [
          { required: true, message: "请输入议案或建议内容", trigger: "blur" }
        ]
      },
      departmentsList: [],
      replyList:[]
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs.formValidate.validate(valid => {
        if (valid) {
          // this.$Message.success('Success!');
          console.log(1);
          var params = {
            title: this.formValidate.title,
            type: this.formValidate.type,
            status: this.formValidate.status,
            content: this.formValidate.content,
            departmentIds: [this.formValidate.departmentId]
          };
          caseService.updateCaseById(this.formValidate.id, params).then(res => {
            this.$Notice.success({
              title: "SUCCESS",
              desc: "议案或建议修改成功"
            });
            this.$router.push({ name: "case_list" });
          });
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    getDepartmentsList() {
      deparmentService.departments().then(res => {
        console.log(res);
        // this.page.total = res.count
        this.departmentsList = JSON.parse(JSON.stringify(res.rows));
        // Cookies.set('departmentList',departmentList)
      });
    },
    getCaseInfo() {
        var self = this
      caseService.getCaseById(this.$route.query.id).then(res => {
        console.log("getCaseById", res);
        this.formValidate = res;
        this.formValidate.departmentId = parseInt(res.departmentIds);
      });
      caseService.getUpdateCaseById(this.$route.query.id).then(res => {
        self.replyList = [];
        res.rows.forEach(el => {
          deparmentService.getDepartmentById(el.departmentId).then(dept => {
              // status: statuslist[el.operation],
            el.time = moment(el.updatedAt).format('YYYY-MM-DD HH:mm:ss'),
            el.author = dept.name,
            self.replyList.push(el);
            // self.$apply();
          });
        });
        console.log("self.progress", self.replyList);
      });
    },
    updateReply(params){
      console.log('dd', params)
      caseService.patchCaseUpdateByUpdateId(params.id,{content:params.content}).then(res=>{
        // console.log()
        this.$Notice.success({
          title: "SUCCESS",
          desc: "回复修改成功"
        });
          // this.$router.push({ name: "case_list" });
      })
    },
    removeReply(params,index){
      caseService.deleteCaseUpdateByUpdateId(params.id).then(res=>{
        this.$Notice.success({
          title: "SUCCESS",
          desc: "回复撤销成功"
        });
        this.replyList.splice(index,1)
      })
    }
  },
  created() {
    this.getDepartmentsList();
  },
  mounted() {
    this.getCaseInfo();
  }
};
</script>