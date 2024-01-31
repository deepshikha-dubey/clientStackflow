import React from 'react'
import './RightSidebar.css'
//import widgetTags from './widgetTags'
import Widget from './Widget'
import WidgetTags from './widgetTags'
 

const RightSidebar = () => {
  return (
   <aside className='right-sidebar'>
<Widget />
<WidgetTags />
   </aside>
  )
}

export default RightSidebar
