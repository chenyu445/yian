<template>
    <div>
        <Row>
            <Col :md="24" :lg="24">
                <div class="step-header-con">
                    <h3>议案与建议回复</h3>
                </div>
            </Col>
        </Row>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="标题" prop="title">
                <Input v-model="formValidate.title" placeholder="输入标题" disabled></Input>
            </FormItem>
            
            <FormItem label="类型" prop="type">
                <RadioGroup v-model="formValidate.type" >
                    <Radio label="bill" disabled>议案</Radio>
                    <Radio label="proposal" disabled>建议</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="主办单位" prop="departmentIds">
                <Select v-model="formValidate.departmentId" disabled placeholder="主办单位">
                    <Option v-for="(dept ,index) in departmentsList" :key="index" :value="dept.id">{{dept.name}}</Option>
                </Select>
            </FormItem>
            <FormItem label="内容" prop="content" >
                <Input v-model="formValidate.content" disabled type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入议案或建议内容"></Input>
            </FormItem>
            <FormItem label="回复内容">
                <Input v-model="replyContent" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入回复内容"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit(false)">回复</Button>
                <!-- <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button> -->
            </FormItem>
        </Form>
    </div>
    
</template>
<script>
    import caseService from '@/api/caseService'
    import deparmentService from '@/api/departments'
    export default {
        data () {
            return {
                formValidate: {
                    title: '',
                    type: '',
                    status:'replied',
                    content: '',
                    departmentId:''
                },
                ruleValidate: {
                    title: [
                        { required: true, message: '标题不能为空', trigger: 'blur' }
                    ],
                    type: [
                        { required: true, message: '请选择类型', trigger: 'change' }
                    ],
                    content: [
                        { required: true, message: '请输入议案或建议内容', trigger: 'blur' }
                    ]
                },
                departmentsList: [],
                replyContent:''
            }
        },
        methods: {
            handleSubmit (name) {
                this.$refs.formValidate.validate((valid) => {
                    if (valid) {
                        // this.$Message.success('Success!');
                        // console.log(1)
                        // var params = {
                        //     title: this.formValidate.title,
                        //     type: this.formValidate.type,
                        //     status:'replied',
                        //     content: this.formValidate.content,
                        //     departmentIds:[this.formValidate.departmentId]
                        // }
                        // caseService.updateCaseById(this.formValidate.id,params).then(res=>{
                            
                            
                        // })
                        caseService.postUpdateCaseById(this.formValidate.id,{content:this.replyContent}).then(reslut=>{
                            this.$Notice.success({
                                title: 'SUCCESS',
                                desc: '议案或建议回复成功'
                            });
                            this.$router.push({name:'case_list'})
                        })
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            getDepartmentsList(){
                deparmentService.departments().then(res=>{
                    console.log(res)
                    // this.page.total = res.count
                    this.departmentsList = JSON.parse(JSON.stringify(res.rows))
                    // Cookies.set('departmentList',departmentList)
                })
            },
            getCaseInfo(){
                caseService.getCaseById(this.$route.query.id).then(res=>{
                    console.log('getCaseById', res)
                    this.formValidate = res
                    this.formValidate.departmentId = parseInt(res.departmentIds)
                })
            }

        },
        created(){
            this.getDepartmentsList()
        },
        mounted(){
            this.getCaseInfo()
        }
    }
</script>