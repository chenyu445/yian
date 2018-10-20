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
                <!-- <Form :model="step" :label-width="80" inline>
                    <FormItem class="product-search-input" label="产品编码:">
                        <Input  v-model="step.code" icon="ios-barcode"/>
                    </FormItem>
                    <FormItem class="product-search-input" label="产品名称:">
                        <Input  v-model="step.name" icon="pricetag"/>
                    </FormItem>
                    <FormItem class="product-search-input" label="注册证号:">
                        <Input  v-model="step.license" icon="key"/>
                    </FormItem>
                    <FormItem label="" class="product-search-btn">
                        <Button style="width:80px;" type="primary">
                            <Icon type="search" size="17"></Icon>查询
                        </Button>
                    </FormItem>
                    <FormItem label="" class="product-search-btn">
                        <Button style="width:80px;" type="default">
                            <Icon type="android-more-vertical" size="17"></Icon>更多
                        </Button>
                    </FormItem>
                </Form> -->
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
                            <Page :total="page.total" :page-size="page.pageSize" :current="page.current" @on-change="changePage" @on-page-size-change="pageSizeChange" show-total show-elevator show-sizer></Page>
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
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
                page:{
                    total:0,
                    current:1,
                    pageSize:10
                },
                query:{
                    type:'',
                    name:'',
                    start_time:'',
                    end_time:''
                }
            };
        },
        
        methods: {
            changePage() {

            },
            pageSizeChange(size){

            },
            search(){

            },
            initpage(){
                deparmentService.departments().then(res=>{
                    console.log(res)
                    this.page.total = res.count
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
                                desc: '部门成功'
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

