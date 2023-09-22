import {create} from 'zustand'


const selectedListing = create((set)=>({
    selected: null,
    onSelect: (id)=> set({selected: id})
}))

export default selectedListing