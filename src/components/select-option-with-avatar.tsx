import React from 'react'
import { CustomAvatar } from './custom-avatar';
import { Text } from './layouts/text';
type Props ={
    name: string,
    avatarUrl?: string;
    shape?:'circle'|'square'
}
export const SelectOptionWithAvatar = ({avatarUrl,name,shape}: Props) => {
  return (
    <div
    style={{
        display:'flex',
        gap:'8px',
        alignItems:'center',
    
    }}>
      <CustomAvatar shape={shape} name={name} src={avatarUrl}/>
      <Text>{name}</Text>
    </div>
  )
}

