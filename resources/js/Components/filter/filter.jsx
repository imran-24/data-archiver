
import { Badge } from '@/Components/ui/badge';
import { CheckCircle, FileTypeIcon, Hourglass, MapPin, Shapes, SlidersHorizontal } from 'lucide-react';
import { Card } from '@/Components/ui/card';
import { useSearchParams } from "react-router-dom";
import FilterItem from './filter-item';
import { expiredWithIn, rentType } from '@/lib/utils';


const Filter = ({divisions, districts, upazilas}) => {

  const filterItems = [
    {
      label: 'RentType',
      icon: Shapes,
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
      label: 'Division',
      icon: MapPin,
      data: divisions,
    },
    {
      label: 'District',
      icon: MapPin,
      data: districts,
    },
    {
      label: 'Upazila',
      icon: MapPin,
      data: upazilas,
    },
    {
      label: 'Expired-Within',
      icon: Hourglass,
      data: expiredWithIn
      // active: ''
    },

  ]

  let [searchParams, setSearchParams] = useSearchParams();

  
  return (
    <div className="flex items-center gap-2">
      <Badge>
          <SlidersHorizontal className="h-3 w-3" />
      </Badge>
      {
        filterItems.map( item => (
          <FilterItem 
          key={item.label}
          label={item.label}
          icon={item.icon}
          data={item.data}
          setSearchParams={setSearchParams}
          searchParams={searchParams}
          />
        ))
      }
      
    </div>
  )
}

export default Filter