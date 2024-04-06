import React from 'react'
import { Card } from 'antd'
import { useList } from '@refinedev/core'
import { DollarOutlined } from '@ant-design/icons'
import { Text } from '../layouts/text'
import { config } from 'process'
import { Area, AreaConfig } from '@ant-design/plots'
import { useLink } from '@refinedev/core'
import { DASHBOARD_DEALS_CHART_QUERY } from '@/graphql/queries'
import { mapDealsData } from '@/utilities/helpers'
import { DashboardDealsChartQuery } from '@/graphql/types'
import { GetFieldsFromList } from '@refinedev/nestjs-query'
export const DealsChart = () => {
    const {data} = useList<GetFieldsFromList<DashboardDealsChartQuery>>({
        resource: 'dealStages',
        filters:[
            {
                field: 'title',operator: 'in', value:['WON',"LOST"]
            }
        ],
        meta: {
            gqlQuery: DASHBOARD_DEALS_CHART_QUERY
        }
    });
    const dealData = React.useMemo(()=>{
        return mapDealsData(data?.data)
    },[data?.data])

    const config: AreaConfig = {
        data:  dealData,
        xField: 'timeText',
    
        yField:'value',
        isStack:false,
        seriesField:'state',
        animation:true,
        startOnZero:false,
        smooth:true,
        legend: {
            offsetY: -6
        },
        yAxis: {
            tickCount:1,
            label: {
                formatter: (v: string)=>{
                    return `$${Number(v)/1000}K`
                }
            }
        },
        tooltip:{
            formatter: (data)=>{
                return {
                    name:data.state,
                value:`$${Number(data.value)/1000}k`
                }
                
            }
        },
        areaStyle: ()=>{
            return {
                fill:`transparent`
            }
        }



    }
    return (
    
    <Card
        style={{
            height:'100%',
        }}
        headStyle={{
            padding:'8px 16px'
        }}
        bodyStyle={{
            padding:'24px 24px 0px 24px'
        }}
        title={
            <div
            style={{
                display:'flex',
                alignItems:'center',
                gap:'8px',
                justifyContent:'center'
            }}><DollarOutlined/>
            <Text
            size='sm'
            style={{
                marginLeft:'0.5rem' }}>
                Deals
            </Text>
            </div>
            
        }>
            <Area{...config} height={325}/>
    </Card>)
}