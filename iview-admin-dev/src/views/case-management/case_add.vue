<template>
    <div>
        <Row>
            <Col :md="24" :lg="24">
                <div class="step-header-con">
                    <h3>议案与建议添加</h3>
                </div>
            </Col>
        </Row>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="标题" prop="title">
                <Input v-model="formValidate.title" placeholder="请输入标题"></Input>
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
                <Button type="primary" @click="handleSubmit(false)">添加</Button>
                <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
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
                    status:'published',
                    content: '',
                    departmentId:'',
                    departmentIds:[]
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
                departmentsList: []
            }
        },
        methods: {
            handleSubmit (name) {
                
                this.$refs.formValidate.validate((valid) => {
                    if (valid) {
                        // this.$Message.success('Success!');
                        console.log(1)
                        var params = {
                            title: this.formValidate.title,
                            type: this.formValidate.type,
                            status:this.formValidate.status,
                            content: this.formValidate.content,
                            departmentIds:[this.formValidate.departmentId]
                        }
                        caseService.createcase(params).then(res=>{
                            this.$Notice.success({
                                title: 'SUCCESS',
                                desc: '议案或建议添加成功'
                            });
                            this.handleReset()
                            // this.$router.push({name:'case_list'})
                        })
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset () {
                this.$refs.formValidate.resetFields();
            },
            getDepartmentsList(){
                deparmentService.departments().then(res=>{
                    console.log(res)
                    // this.page.total = res.count
                    this.departmentsList = JSON.parse(JSON.stringify(res.rows))
                    // Cookies.set('departmentList',departmentList)
                })
            }
        },
        created(){
            this.getDepartmentsList()
        }
    }
</script>