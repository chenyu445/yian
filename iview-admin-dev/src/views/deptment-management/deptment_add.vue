<template>
    <div>
        <Row>
            <Col :md="24" :lg="24">
                <div class="step-header-con">
                    <h3>部门添加</h3>
                </div>
            </Col>
        </Row>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="部门名称" prop="name">
                <Input v-model="formValidate.name" placeholder="请输入部门名称"></Input>
            </FormItem>
            <FormItem label="联系人" prop="contactName">
                <Input v-model="formValidate.contactName" placeholder="请输入联系人姓名"></Input>
            </FormItem>
            <FormItem label="联系方式" prop="contactNumber">
                <Input v-model="formValidate.contactNumber" placeholder="请输入联系方式"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')">添加</Button>
                <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
    import deparmentService from '@/api/departments'
    export default {
        name: 'department_add',
        data () {
            return {
                formValidate: {
                    name: '',
                    contactName: '',
                    contactNumber: ''
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '部门名称不能为空', trigger: 'blur' }
                    ],
                    contactName: [
                        { required: true, message: '请输入联系人', trigger: 'blur' },
                        // { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
                    ],
                    contactNumber: [
                        { required: true, message: '请输入联系电话', trigger: 'change' }
                    ],
                    // gender: [
                    //     { required: true, message: 'Please select gender', trigger: 'change' }
                    // ],
                    // interest: [
                    //     { required: true, type: 'array', min: 1, message: 'Choose at least one hobby', trigger: 'change' },
                    //     { type: 'array', max: 2, message: 'Choose two hobbies at best', trigger: 'change' }
                    // ],
                    // date: [
                    //     { required: true, type: 'date', message: 'Please select the date', trigger: 'change' }
                    // ],
                    // time: [
                    //     { required: true, type: 'string', message: 'Please select time', trigger: 'change' }
                    // ],
                    // desc: [
                    //     { required: true, message: 'Please enter a personal introduction', trigger: 'blur' },
                    //     { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
                    // ]
                }
            };
        },
        
        methods: {
            
            handleSubmit(){
                this.$refs.formValidate.validate((valid) => {
                    if (valid) {
                        // this.$Message.success('Success!');
                        deparmentService.createDepartments(this.formValidate).then(res=>{
                            console.log(res)
                            this.$Notice.success({
                                title: 'SUCCESS',
                                desc: '添加部门成功'
                            });
                            this.handleReset ()
                            this.$router.push({name:'deptment_list'})
                        })
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
                
            },
            handleReset () {
                this.$refs.formValidate.resetFields();
            }
        },
        created(){
            // this.initpage()
        },
        mounted () {

        }
    };
</script>

<style scoped>

</style>