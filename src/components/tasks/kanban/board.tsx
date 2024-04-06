import { DndContext, DragEndEvent, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import React, { Children } from 'react'
type Props = {
  onDargEnd: (event:DragEndEvent) => void;
}
export const KanbanBoardContainer = ({children}:React.PropsWithChildren) => {

  return (
    <div style={{
        width:'calc(100%+64px)',
        height: 'calc(100vh - 64px)',
        display:'flex',
        justifyContent:'colunm',
        scrollbarWidth:'none'
        
    }}>
    <div style={{
          width:'100%',
          height: '100%',
          display:'flex',
          padding: '32px',
          overflow:'scroll',
          scrollbarWidth:'none',
          scrollbarColor:'transparent'
          
    }}>
      {children}
      </div>   
    </div>
  )
}

export const KanbanBoard = ({children,onDargEnd}:React.PropsWithChildren<Props>) => {
  const mouseSensor = useSensor(MouseSensor,{
    activationConstraint : {
      distance: 5,
    }
  })
  const touchSensor = useSensor(TouchSensor,{
    activationConstraint: {
      distance: 5
    }
  })
  const sensors= useSensors(mouseSensor,touchSensor)
  return (
    <DndContext
    onDragEnd={onDargEnd} sensors={sensors}>
      {children}
    </DndContext>
  )
}
