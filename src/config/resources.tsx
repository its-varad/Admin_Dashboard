import { DashboardOutlined, ProjectOutlined, ShopOutlined } from "@ant-design/icons"
import { IResourceItem } from "@refinedev/core"
export const resources: IResourceItem[]=[
    {
        name:'dashboard',
        list:'/',
        meta:{
            label:"Dashboard",
            icon:<DashboardOutlined/>
        }
    },
    {
        name:'companies',
        list:'/companies',
        create:'/companies/create',
        edit:'/companies/edit/:id',
        meta:{
            label:"Compaines",
            show:'/companies/:id',
            meta: {
                label:'Companies',
                icon:<ShopOutlined/>
            }
           
        }
    },
     {
        name:'tasks',
        list:'/tasks',
        create:'/tasks/new',
        edit:'/tasks/edit/:id',
        meta: {
            label:'Tasks',
            icon:<ProjectOutlined/>
        }
     }

]