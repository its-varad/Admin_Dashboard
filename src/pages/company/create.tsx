import React from 'react'
import { CompanyList } from './list'
import { Input, Modal, Select } from 'antd'
import {Form} from 'antd'
import { SelectOptionWithAvatar } from '@/components/select-option-with-avatar'
import { useModal } from '@refinedev/core'
import { useSelect } from '@refinedev/antd'
import { useModalForm } from '@refinedev/antd'
import { useGo } from '@refinedev/core'
import { CREATE_COMPANY_MUTATION } from '@/graphql/mutations'
import { USERS_SELECT_QUERY } from '@/graphql/queries'
import { GetFields, GetFieldsFromList } from '@refinedev/nestjs-query'
import { UsersSelectQuery } from '@/graphql/types'
export const CompanyCreate = () => {
  const resource=[
    {
      name:"companies",
      list:'/compnaies',
      create:"/companies/create",
      edit:"/companies/edit"
    }
  ]
  const go = useGo();
  const goToListPage=() =>{
    go({
      to: {resource:'companies',action:'list'},
      options:{keepQuery:true},
      type:'replace'
    })
  }
  const {formProps,modalProps}=useModalForm({
    action: 'create',
    defaultVisible: true,
    resource:'companies',
    redirect:false,
    mutationMode:"pessimistic",
    onMutationSuccess: goToListPage,
    meta: {
        gqlMutation: CREATE_COMPANY_MUTATION
    }
  })

  const {selectProps,queryResult}= useSelect<GetFieldsFromList<UsersSelectQuery>>({
    resource: 'users',
    optionLabel: 'name',
    meta: {
      gqlQuery: USERS_SELECT_QUERY
    }

  })
  return (
    <CompanyList>
      <Modal {...modalProps}
      mask={true}
      onCancel={goToListPage}
      title="Create Company"
      width={512}
      >
        <Form {...formProps}layout="vertical">
          <Form.Item
           label="company name"
           name="name"
           rules={[{required: true}]}>
            <Input placeholder='Please input company name'/>
           </Form.Item>
           <Form.Item
           label='sales owner'
           name="salesOwnerId"
           rules={[{required:true}]}>
           <Select  
           placeholder="
           please select a sales owner"
           {...selectProps}
           options={
            queryResult.data?.data.map((user)=>({
              value: user.id,
              label: (
                <SelectOptionWithAvatar
                name={user.name}
                avatarUrl={user.avatarUrl??undefined}/>
              )
            }))??[]
           }/>
            </Form.Item>
        </Form>
      </Modal>
    </CompanyList>
  )
}


