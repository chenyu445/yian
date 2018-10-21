<style lang="less">
    @import '../../styles/common.less';
    @import './deptment_list.less';
</style>
<template>
    <div>
        <Row>
            <Col :md="24" :lg="24">
                <div class="step-header-con">
                    <h3>部门管理</h3>
                </div>
            </Col>
        </Row>
        <Form ref="formValidate" :model="query"  :label-width="80" inline>
            <FormItem label="名称" >
                <Input style="min-width:300px" v-model="query.name" placeholder="请输入标题"></Input>
            </FormItem>
            <FormItem >
                <Button style="width:80px;" type="primary" @click="search">
                    <Icon type="plus-round" size="17"></Icon>搜索
                </Button>
            </FormItem>
        </Form>
        <div class="product-search-btn">
            <Button style="width:80px;" type="primary" @click="add">
                <Icon type="plus-round" size="17"></Icon>添加
            </Button>
            <!-- <Button style="width:80px;" type="primary">
                <Icon type="edit" size="17"></Icon>编辑
            </Button>-->
            <!-- <Button style="width:80px;" type="warning">
                <Icon type="android-delete" size="17"></Icon>删除
            </Button> -->
            <!-- 
            <Button type="default">
                <Icon type="printer" size="17"></Icon>打印审批表
            </Button> -->
        </div>
        <div class="product-search-result">
            <Table  
                    ref="product-list"
                    :columns="businessList"
                    :data="businessData"
                    highlight-row
                    border
            ></Table>
            <div style="margin:10px;overflow:hidden;">
                <div>
                    <Page :total="total" :page-size="page.limit" :current="page.page" @on-change="changePage" @on-page-size-change="pageSizeChange" show-total show-elevator show-sizer></Page>
                </div>
            </div>
        </div>
           
    </div>
</template>
<script>
    import deparmentService from '@/api/departments'
    export default {
        name: 'caselist',
        data () {
            return {
                businessList: [
                    // {
                    //     type: 'selection',
                    //     width: 60,
                    //     align: 'center'
                    // },
                    {
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '部门名称',
                        key: 'name',
                        align: 'center'
                    },
                    {
                        title: '部门联系人',
                        key: 'contactName',
                        align: 'center'
                    },
                    {
                        title: '联系方式',
                        key: 'contactNumber',
                        align: 'center'
                    },
                    
                    {
                        title: '操作',
                        key: 'createDate',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            console.log(params)
                                            this.edit(params.row)
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.row)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                businessData: [
                    
                    
                ],
                total:0,
                page:{
                    page:1,
                    limit:10
                },
                query:{
                    name:''
                }
            };
        },
        
        methods: {
            changePage(page) {
                this.page.page = page
                var params = {
                    limit:this.page.limit,
                    page:page-1
                }
                this.initpage(params)
            },
            pageSizeChange(size){
                console.log(size)
                this.page.limit = size
                var params = {
                    limit:size,
                    page:this.page.page -1
                }
                this.initpage(params)
            },
            search(){

                this.initpage()
            },
            initpage(arg){
                var params = {
                    limit:this.page.limit,
                    page:this.page.page-1,
                    
                }
                if(this.query.name){
                    params.name = this.query.name
                }
                deparmentService.departments(params).then(res=>{
                    console.log(res)
                    this.total = res.count
                    this.businessData = JSON.parse(JSON.stringify(res.rows))
                })
            },
            edit(params){
                this.$router.push({
                    name:'department_edit',
                    query:params
                })
            },
            remove(params){
                this.$Modal.confirm({
                    title: 'Title',
                    content: '<p>确定删除该部门？</p>',
                    onOk: () => {
                        deparmentService.deleteDeparmentById(params.id).then(res=>{
                            this.$Notice.success({
                                title: 'SUCCESS',
                                desc: '部门删除成功'
                            })

                            this.initpage()
                        })
                    },
                    onCancel: () => {
                        
                    }
                });
            },
            add(){
                this.$router.push({
                    name:'deptment_add'
                })
            },
        },
        created(){
            this.initpage()
        },
        mounted () {

        }
    };
</script>

