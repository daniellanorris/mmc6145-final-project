import React, { useState } from 'react';
import Button from './button'
import { useListContext, ListProvider } from '../context/ListContext';

import Image from 'next/image';

const initialOptions = [
    { id: '1', value: 'Concerts' },
    { id: '2', value: 'Fairs & Festivals' },
    { id: '3', value: 'Markets' },
    { id: '4', value: 'Drag Brunch' },
    {id: '5', value: 'Dance/Electronic'},

];

export const useDropdown = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const [options, setOptions] = useState([...initialOptions]);
    const {list, setList} = useListContext();
    const [removedOptions, setRemovedOptions] = useState([])

    const addToFilter = (e) => {
        const selectedValue = e.target.value;
        setSelectedValue(selectedValue);
        console.log(selectedValue);

        const index = options.findIndex((option) => option.value === selectedValue);

        if (index !== -1) {
            const [removedOption] = options.splice(index, 1);
            setOptions([...options]);
            setList([...list, removedOption]);
            console.log(list);
            console.log(removedOption);
        }

    };

    const addToOptions = (removedOption) => {
        setList(list.filter((item) => item !== removedOption))
        setOptions([...options, removedOption])
    };

    const resetFilter = () => {
        setSelectedValue('');
        setOptions([...initialOptions]); // Add the removed options back to the dropdown
        setList([]);
        setRemovedOptions([]);
    };

    return { selectedValue, options, list, addToFilter, resetFilter, addToOptions };


};

export default function Dropdown() {
    const { selectedValue, options, list, addToFilter, resetFilter, addToOptions } = useDropdown();

    return (
        <>
        <ListProvider>
            <Button onResetClick={resetFilter}>Reset </Button>
            <select name="selectList" id="selectList" onChange={addToFilter} value={selectedValue}>
                <option style={{padding: "10px"}}>Select options to filter</option>
                {options.map((option) => (
                    <option key={option.id} value={option.value}>
                        {option.value}
                    </option>
                ))}
            </select>
            <div class={list.length > 0 ? "card"  : "none"}>
            <h2> Selected Filters</h2>
                 {list.map((item) => (
                <div onClick={() => addToOptions(item)} key={item.id}> 
                    <Image src='/delete_icon.png' alt="delete list value" width="20" height="20" style={{margin: "5px"}}/>{item.value} </div>))} </div>
        </ListProvider>
        </>
    );
}


