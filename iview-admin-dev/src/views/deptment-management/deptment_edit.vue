<template>
    <div>
        <Row>
            <Col :md="24" :lg="24">
                <div class="step-header-con">
                    <h3>部门编辑</h3>
                </div>
            </Col>
        </Row>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="部门名称" prop="name">
                <Input v-model="formValidate.name" placeholder="请输入部门名称" disabled></Input>
            </FormItem>
            <FormItem label="联系人" prop="contactName">
                <Input v-model="formValidate.contactName" placeholder="请输入联系人姓名"></Input>
            </FormItem>
            <FormItem label="联系方式" prop="contactNumber">
                <Input v-model="formValidate.contactNumber" placeholder="请输入联系方式"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')">修改</Button>
                <Button @click="handleReset('formValidate')" style="margin-left: 8px">取消</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
    import deparmentService from '@/api/departments'
    export default {
        name: 'department_edit',
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
                    ]
                }
            };
        },
        
        methods: {
            
            handleSubmit(){
                var that = this
                this.$refs.formValidate.validate((valid) => {
                    if (valid) {
                        // this.$Message.success('Success!');
                        // debugger
                        deparmentService.patchDepartmentById(that.formValidate).then(res=>{
                            console.log(res)
                            this.$Notice.success({
                                title: 'SUCCESS',
                                desc: '编辑部门成功'
                            });
                            this.$router.push({name:'deptment_list'})
                        })
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
                
            }
        },
        created(){
            // this.initpage()
            console.log('this.route', this.$route)
            this.formValidate = JSON.parse(JSON.stringify(this.$route.query))
        },
        beforeMount(){
             console.log('this.route beforeMount', this.$route)
        },
        mounted () {
            console.log('this.route mounted', this.$route)
        }
    };
</script>

<style scoped>

</style>