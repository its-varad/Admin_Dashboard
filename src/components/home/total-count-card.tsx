import React from 'react'
import { Card, Skeleton } from 'antd'
import { AreaConfig } from '@ant-design/plots'
import { Text } from '../layouts/text'
import Icon from '@ant-design/icons/lib/components/Icon'
import { totalCountVariants } from '@/constants'
import { Area } from '@ant-design/plots'
import { XFilled } from '@ant-design/icons'
type Props = {
    resource: "companies" | "contacts" | "deals",
    isLoading: boolean,
    totalCount?: number
}
export const DashBoardTotalCountCard=({
    resource,
    isLoading,
    totalCount}:Props)=>{
        const {primaryColor,secondaryColor,icon,title}=totalCountVariants[resource]
        const config:AreaConfig= {
            data: totalCountVariants[resource].data,
            xField: 'index',
            yField:'value',
            appendPadding:[1,0,0,0],
            padding:0,
            syncViewPadding:true,
            autoFit:true,
            tooltip:false,
            animation:false,
            xAxis:false,
            yAxis:{
                tickCount: 12,
                label:{
                    style:{
                        stronk: 'transparent'
                    }
                },
                grid: {
                    line:{
                        style: {
                            stroke:'transparent'
                        }
                        
                    }
                }
            },
            smooth:true,
            line: {
                color: primaryColor,

            },
            areaStyle: ()=>{
                return {
                    fill:``
                }
            }

        }
        return (
            <Card
            style={{
                height:"96px",padding:0
            }}
            bodyStyle={{
                padding:'8px 8px 8px 12px'
            }}
            size='small'>
                <div
                style={{
                    display:'flex',
                    alignItems:'center',
                    
                    gap:'8px',
                    whiteSpace:'nowrap'
                }}>
                    {icon}   
                        <Text size='md' className='secondary' style={{
                            marginLeft:'8px'
                     }}>{title}</Text>
                </div>
                <div
                style={{
                    display:'flex',
                    justifyContent:'space-between',
                }}>
                    <Text
                    size='xxl'
                    
                    style={{
                        flex:1,
                        whiteSpace:'nowrap',
                        flexShrink: 0,
                        textAlign:"start",
                        marginLeft:'48px',
                        fontVariantNumeric: 'tabular-nums',
                        fontWeight:'500'

                    }}>
                        {isLoading?(
                            <Skeleton.Button
                            style={{
                               marginTop:'8px' ,
                               width:'74px'
                            }}/>
                        ):totalCount }
                    </Text>
                        <Area{...config} style={{width: '50%'}} />
                </div>
            </Card>
        )
     }
    