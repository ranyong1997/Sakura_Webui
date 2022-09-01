/*
 * @Descripttion: 
 * @version: 
 * @Author: 冉勇
 * @Date: 2022-08-31 18:00:13
 * @LastEditTime: 2022-09-01 10:40:25
 */
// 用例成功、失败、跳过、汇总图
import * as echarts from 'echarts/core'
import { TooltipComponent, TooltipComponentOption, GridComponent, GridComponentOption } from 'echarts/components'
import { BarChart, BarSeriesOption } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([TooltipComponent, GridComponent, BarChart, CanvasRenderer])
type EChartsOption = echarts.ComposeOption<TooltipComponentOption | GridComponentOption | BarSeriesOption>
let option: EChartsOption
export const useInitBarChart = (chartDom: HTMLElement | undefined) => {
  const myChart = echarts.init(chartDom as HTMLElement)
  option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      show: false
    },
    yAxis: {
      type: 'value',
      show: false
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar'
      }
    ],
    color: '#409eff',
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        axis: 'auto',
        label: {
          backgroundColor: '#283b56'
        }
      }
    }
  }
  // eslint-disable-next-line no-unused-expressions
  option && myChart.setOption(option)
}
export default { useInitBarChart }
