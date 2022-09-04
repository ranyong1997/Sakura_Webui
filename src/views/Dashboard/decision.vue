<!--
 * @Descripttion: 
 * @version: 
 * @Author: 冉勇
 * @Date: 2022-09-04 10:16:45
 * @LastEditTime: 2022-09-04 10:46:49
-->
<template>
    <div class="analysis-info">
        <el-row style="margin: 15px">
            <el-col :span="24" class="page-title-box">
                <h4 class="page-title">平台数据统计</h4>
                <!-- 日期筛选 -->
                <!-- <div class="page-title-right">
                    <div style="margin-right: 10px">
                        <el-date-picker v-model="pickDate" type="date" placeholder="选择日期"> </el-date-picker>
                    </div>
                    <el-button :icon="Refresh" circle type="primary" style="maring-left: 10px"></el-button>
                    <el-button :icon="Search" circle type="primary"></el-button>
                </div> -->
            </el-col>
        </el-row>
        <el-row>
            <el-col :xl="14">
                <el-row>
                    <!-- 用户总数及近一周新增 -->
                    <el-col :lg="6">
                        <el-card shadow="hover" class="card">
                            <div class="card-header">
                                <h5 class="text-muted">用户总数及近一周新增</h5>
                                <i class="widget-icon">
                                    <UserFilled />
                                </i>
                            </div>
                            <div class="card-middle margin-top-2 margin-bottom-2">
                                <h3>340</h3>
                            </div>
                            <div class="card-footer text-muted">
                                <span class="text-success margin-right-1">
                                    <!-- todo：echarts表 -->
                                    <div class="e-chart" style="height: 20px; width: 100%">
                                        <div ref="RefPolorChart" style="width: inherit; height: inherit"></div>
                                    </div>
                                </span>
                            </div>
                        </el-card>
                    </el-col>
                    <!-- 项目总数及近一周新增趋势 -->
                    <el-col :lg="6">
                        <el-card shadow="hover" class="card">
                            <div class="card-header">
                                <h5 class="text-muted">项目总数及近一周新增趋势</h5>
                                <i class="widget-icon">
                                    <Management />
                                </i>
                            </div>
                            <div class="card-middle margin-top-2 margin-bottom-2">
                                <h3>174</h3>
                            </div>
                            <div class="card-footer text-muted">
                                <span class="text-danger margin-right-1">
                                    <!-- todo：echarts表 -->
                                </span>
                            </div>
                        </el-card>
                    </el-col>
                    <!-- 测试用例总数及一周新增趋势 -->
                    <el-col :lg="6">
                        <el-card shadow="hover" class="card">
                            <div class="card-header">
                                <h5 class="text-muted">测试用例总数及一周新增趋势</h5>
                                <i class="widget-icon">
                                    <List />
                                </i>
                            </div>
                            <div class="card-middle margin-top-2 margin-bottom-2">
                                <h3>912</h3>
                            </div>
                            <div class="card-footer text-muted">
                                <!-- todo：echarts表 -->
                            </div>
                        </el-card>
                    </el-col>
                    <!-- 测试计划总数及一周新增趋势 -->
                    <el-col :lg="6">
                        <el-card shadow="hover" class="card">
                            <div class="card-header">
                                <h5 class="text-muted">测试计划总数及一周新增趋势</h5>
                                <i class="widget-icon">
                                    <TrendCharts />
                                </i>
                            </div>
                            <div class="card-middle margin-top-2 margin-bottom-2">
                                <h3>3</h3>
                            </div>
                            <div class="card-footer text-muted">
                                <span class="text-success margin-right-1">
                                    <!-- todo：echarts表 -->
                                </span>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
// 引入icon图标
import { TrendCharts, Management, List, UserFilled } from '@element-plus/icons-vue'
// 导入echarts数据
import { useInitPolorChart } from './useInitPolorChart'

const RefPolorChart = ref()
// 注册
onMounted(() => {
    useInitPolorChart(RefPolorChart.value)

})
</script>
<style lang="stylus" scoped>
.analysis-info{
  color black
  padding 0px 20px
  background-color #fafbfe

  .page-title-box{
    box-sizing border-box
    display flex
    flex-direction row
    justify-content space-between
    align-items center
    color #6c757d
    .page-title{
      font-size  18px
      margin  0
      line-height  85px
      overflow  hidden
      white-space: nowrap
      text-overflow  ellipsis
      color  inherit
      font-weight 700
    }
    .page-title-right{
      display flex
      flex-direction row
      justify-content space-around
      align-items center
    }
  }
  :deep(.el-card){
    margin-bottom 30px
    margin-right 20px
  }
  :deep(.el-card.bg-primary){
    background-color #46a0fc
  }
  :deep(.text-white.el-icon-more){
    color white
  }
  .card {
    .padding-top-1{
      padding-top  10px
    }
    .padding-bottom-1{
      padding-bottom  10px
    }
    .margin-bottom-pro{
      margin-bottom 15px
    }
    .margin-right-1{
      margin-right 10px
    }
    .margin-top-2{
      margin-top 20px
    }
     .margin-bottom-1{
      margin-bottom 10px
    }
    .margin-bottom-2{
      margin-bottom 20px
    }
    .font-nomal{
      font-weight 400
    }
    .icon{
      width 14px
      height 14px
      display inline-block
      border-radius 50%
    }
    .text-muted{
        color #98a6ad
      }
      .text-left{
        text-align left
      }
      .text-nowrap{
        white-space nowrap
      }
      .text-success{
        color #0acf97
      }
      .text-danger{
        color #fa5c7c
      }
      .text-primary{
        color #409eff
      }
      .text-light{
        color #e3eaef
      }
      .text-white{
        color white
      }
      .text-center{
        display flex
        flex-direction row
        justify-content center
        align-items center
      }
      .text-badge{
        margin-top 20px
        margin-bottom  10px
      }
      .font-13{
        font-size 13px
      }
      .badge{
        display: inline-block;
        padding: 0.25em 0.4em;
        font-size: 75%;
        font-weight: 700;
        line-height: 1;
        text-align: center;
        white-space: nowrap;
        vertical-align: baseline;
        border-radius: 0.25rem;
        -webkit-transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;
        transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;
        transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
        transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;
      }
      .badge-danger{
        color #fff
        background-color #fa5c7c
      }
      .btn-link{
        font-weight 400
        color #409eff
        text-decoration none
        cursor pointer
      }
      .bg-primary{
        background-color #409eff
      }
      .bg-green{
        background-color green
      }
      .icon-square{
        width 12px
        height 12px
        display inline-block
      }
      .red{
        background-color #ec6769
      }
      .green{
        background-color  #93cb79
      }
      .yellow {
        background-color #f9c761
      }
      .deep-blue{
        background-color #5572c3
      }
      .dot{
        width 12px
        height 12px
        display inline-block
        border-radius 50%
      }
      .chart-widget-list p{
        border-bottom 1px solid #f1f3fa
        margin-bottom 0.5rem
        padding-bottom 0.5rem
        display flex
        flex-direction row
        justify-content space-between
        align-items center
      }
    .header-title{
      display flex
      flex-direction row
      justify-content space-between
      align-items center
      margin-bottom 5px
      .dropdown{
        cursor pointer
      }
    }
    .chart-bg{
      background-color #f9f9fd
    }
    .card-header{
      display flex
      flex-direction row
      justify-content space-between
      align-items flex-start

      .widget-icon{
        color #248fed
        font-size 20px
        background-color #7fbdf33b
        height 40px
        width 40px
        text-align: center
        line-height 40px
        border-radius 3px
        display flex
        flex-direction column
        justify-content center
        align-items center
        .icon{
          width 20px
          height 20px
        }
      }
    }
    .card-middle{
      display flex
      flex-direction row
      justify-content flex-start
      align-items center
      color #6c757d
    }
    .card-footer{
      display flex
      flex-direction row
      justify-content flex-start
      align-items center
    }

    .e-chart{
      margin auto
      position relative
      width 100%
    }
  }

}
</style>