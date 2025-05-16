import { api } from '@/convex/_generated/api'
import { useQueries } from 'convex/react'
import React from 'react'

function TemplateList() {
    const templateList=useQueries(api.templates.GetAllTemplates);
    console.log('templateList',templateList);
  return (
    <div>TemplateList</div>
  )
}

export default TemplateList