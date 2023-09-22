
import { Badge } from '@/Components/ui/badge';
import { CheckCircle, FileTypeIcon, MapPin, SlidersHorizontal } from 'lucide-react';
import FilterItem from './filter-item';
import { rentType } from '@/lib/utils';
import { Card } from '@/Components/ui/card';
import { data } from 'autoprefixer';

const Filter = ({divisions, districts, upazilas}) => {

  const filterItems = [
    {
      label: 'Rent Type',
      icon: FileTypeIcon,
      data: rentType
      // active: ''
    },
    {
      label: 'Approval',
      icon: CheckCircle,
      data:[
        {
        value: 1,
        label: 'Approved',
        },
        {
          value: 0,
          label: 'Not approved',
        }
      ]
    },
    {
      label: 'Location',
      icon: MapPin,
      data:[
        ...divisions,
        // ...districts,
        // ...upazilas
      ]
    }
  ]
  console.log(filterItems[2].data[0])
  return (
    <Card className="flex items-center gap-2 p-3">
      <Badge>
          <SlidersHorizontal className="h-3 w-3" />
      </Badge>
      {
        filterItems.map( item => (
          <FilterItem 
          key={item.icon}
          label={item.label}
          icon={item.icon}
          data={item.data}
          />
        ))
      }
      
    </Card>
  )
}

export default Filter