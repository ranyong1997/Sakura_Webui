/*
 * @Descripttion: 
 * @version: 
 * @Author: 冉勇
 * @Date: 2022-08-31 18:00:13
 * @LastEditTime: 2022-09-01 10:36:21
 */
// 趋势图
import * as echarts from 'echarts/core'
import { GridComponent, GridComponentOption } from 'echarts/components'
import { LineChart, LineSeriesOption } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([GridComponent, LineChart, CanvasRenderer, UniversalTransition])

type EChartsOption = echarts.ComposeOption<GridComponentOption | LineSeriesOption>

let option: EChartsOption

export const useInitGridChart = (chartDom: HTMLElement | undefined) => {
  const myChart = echarts.init(chartDom as HTMLElement)

  option = {
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [55, 45, 60, 45, 37, 52, 44],
        type: 'line',
        smooth: true
      },
      {
        name: 'Search Engine',
        type: 'line',
        emphasis: {
          focus: 'series'
        },
        smooth: true,
        areaStyle: {},
        data: [44, 31, 48, 34, 26, 40, 31]
      }
    ]
  }

  // eslint-disable-next-line no-unused-expressions
  option && myChart.setOption(option)
}

export default { useInitGridChart }
