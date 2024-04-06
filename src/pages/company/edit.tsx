import React from 'react'
import {Edit} from '@refinedev/antd'
import { Input, InputNumber, Layout, Row } from 'antd'
import {Col} from "antd"
import { Form } from 'antd'
import { SelectOptionWithAvatar } from '@/components/select-option-with-avatar'
import { USERS_SELECT_QUERY } from '@/graphql/queries'
import { GetFieldsFromList } from '@refinedev/nestjs-query'
import { UsersSelectQuery } from '@/graphql/types'
import { useSelect } from '@refinedev/antd'
import { useForm } from '@refinedev/antd'
import {Select} from 'antd'
import { UPDATE_COMPANY_MUTATION } from '@/graphql/mutations'
import { CustomAvatar } from '@/components/custom-avatar'
import { getNameInitials } from '@/utilities'
import { businessTypeOptions, companySizeOptions, industryOptions } from '@/constants'
import { CompanyContactsTable } from './contacts-table'
export const EditPage = () => {
  const {
    saveButtonProps,formProps,formLoading,queryResult
  } = useForm({
    redirect:false,
    meta: {
      gqlMutation: UPDATE_COMPANY_MUTATION
    }
  })
  const {avatarUrl,name}=queryResult?.data?.data || {}
  const {selectProps,queryResult:queryResultUsers}= useSelect<GetFieldsFromList<UsersSelectQuery>>({
    resource: 'users',
    optionLabel: 'name',
    pagination: {
      mode:'off'
    },
    meta: {
      gqlQuery: USERS_SELECT_QUERY
    }

  })
  return (
    <div>
      <Row
      gutter={[32,32]}>
        <Col xs={32}
        xl={12}>
          <Edit
          isLoading={formLoading}
          saveButtonProps={saveButtonProps}
          breadcrumb={false}>
          <Form {...formProps} layout='vertical'>
            <CustomAvatar
            shape='square'
            src={avatarUrl}
            name={getNameInitials(name||'')}
            style={{
              width:96,height:96,marginBottom:'24px'
            }}/>
            <Form.Item
           label='sales owner'
           name="salesOwnerId"
           initialValue={formProps?.initialValues?.salesOwner?.id}>
           <Select  
           placeholder="
           please select a sales owner"
           {...selectProps}
           options={
            queryResultUsers.data?.data.map((user)=>({
              value: user.id,
              label: (
                <SelectOptionWithAvatar
                name={user.name}
                avatarUrl={user.avatarUrl??undefined}/>
              )
            }))??[]
           }/>
            </Form.Item>
            <Form.Item label="Company size">
              <Select
              defaultValue={""}
              options={companySizeOptions}/>
            </Form.Item>
            <Form.Item label="Revenue">
              <InputNumber autoFocus
              addonBefore="$"
              min={0}
              placeholder='0,00'
              />
            </Form.Item>
            <Form.Item label="Industry">
              <Select
              options={industryOptions}></Select>
            </Form.Item >
            <Form.Item label="Business Type">
              <Select
              options={businessTypeOptions}></Select>
            </Form.Item>
            <Form.Item label="Country" name="country">
              <Input
              placeholder='country'></Input>
            </Form.Item>
            <Form.Item label="Web-site" name="website">
              <Input
              placeholder='Website'></Input>
            </Form.Item>
          </Form>
          </Edit>
        </Col>
        <Col xs={24} xl={12}>
          <CompanyContactsTable/>
        </Col>
      </Row>
    </div>
  )
}


