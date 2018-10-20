<style lang="less">
    @import '../../styles/common.less';
    @import './case_list.less';
</style>
<template>
    <div>
        <Row>
            <Col :md="24" :lg="24">
                <div class="step-header-con">
                    <h3>议案与建议列表</h3>
                </div>
                
                <div class="product-search-btn">
                    <Button style="width:80px;" type="primary" @click="add">
                        <Icon type="plus-round" size="17"></Icon>添加
                    </Button>
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
    import caseService from '@/api/caseService'
    import Cookies from 'js-cookie';
    import deparmentService from '@/api/departments'
    export default {
        name: 'caselist',
        data () {
            return {
                businessList: [
                    
                    {
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '议案建议名称',
                        key: 'title',
                        align: 'center'
                    },
                    {
                        title: '承办单位',
                        // key: 'department',
                        align: 'center',
                        render: (h, params) => {
                            var c = this.deparmentList.find(d=>{
                                return d.id == params.row.departmentIds
                            })
                            return h('div', {},!c ? '--' : c.name );
                        }
                    },
                    {
                        title: '类型',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', {},params.row.type === 'bill' ? '议案' : '建议');
                        }
                    },
                    {
                        title: '最新状态',
                        align: 'center',
                        render: (h, params) => {
                            var statuslist = {
                                'unpublished':'未发布', 'published':'已发布', 'replied':'已回复', 'finished':'已完成'
                            }
                            return h('div', {},statuslist[params.row.status]);
                        }
                    },
                    {
                        title: '更新时间',
                        key: 'updatedAt',
                        align: 'center'
                    },
                    {
                        title: '提交时间',
                        key: 'createdAt',
                        align: 'center'
                    },
                    
                    {
                        title: '操作',
                        align: 'center',
                        width:200,
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
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            console.log(params)
                                            this.reply(params.row)
                                        }
                                    }
                                }, '回复'),
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
                },
                deparmentList:[]
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
                var role = Cookies.get('userInfo').role
                if(role!='admin'){
                    caseService.caselist().then(res=>{
                        console.log(res)
                        this.page.total = res.count
                        this.businessData = JSON.parse(JSON.stringify(res.rows))
                    })
                }else{
                    caseService.caselist().then(res=>{
                        console.log(res)
                        this.page.total = res.count
                        this.businessData = JSON.parse(JSON.stringify(res.rows))
                    })
                }
                
            },
            add(){
                this.$router.push({
                    name:'case_add'
                })
            },
            remove(params){
                this.$Modal.confirm({
                    title: 'Title',
                    content: '<p>确定删除该议案或建议？</p>',
                    onOk: () => {
                        caseService.deleteCaseById(params.id).then(res=>{
                            this.$Notice.success({
                                title: 'SUCCESS',
                                desc: '议案或建议删除成功'
                            })

                            this.initpage()
                        })
                    },
                    onCancel: () => {
                        
                    }
                });
            },
            edit(params){
                this.$router.push({
                    name:'case_edit',
                    query:{id:params.id}
                })
            },
            reply(params){
                this.$router.push({
                    name:'case_reply',
                    query:{id:params.id}
                })
            }
        },
        created(){
            deparmentService.departments().then(res=>{
                console.log(res)
                this.page.total = res.count
                this.deparmentList = JSON.parse(JSON.stringify(res.rows))
            })
        },
        mounted () {
            this.initpage()
        }
    };
</script>
