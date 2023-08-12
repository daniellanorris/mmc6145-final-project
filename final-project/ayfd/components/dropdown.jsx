import React, { useState, useEffect } from 'react';
import { useListContext, ListProvider } from '../context/ListContext';
const API_GENRE = 'https://app.ticketmaster.com/discovery/v2/classifications.json?apikey=VFznyrIiGGXWVay8OEG5vg5EwtST7pwp';

import Image from 'next/image';

const initialOptions = (genreEvents) => {
  if (!genreEvents || !Array.isArray(genreEvents)) {
    return [];
  }

  for (let i = genreEvents.length - 1; i >= 0; i--) {
    const classification = genreEvents[i];
    if (!classification.segment || classification.segment.name === 'Undefined') {
      genreEvents.splice(i, 1);
    }
  }

  return genreEvents
    .filter((classification) => classification.segment) // Filter out undefined classifications
    .map((classification) => {
      const segmentName = classification.segment.name;
      const segmentId = classification.segment.id;
      return {
        name: segmentName,
        id: segmentId
      };
    });
};

const generateUniqueKey = (id) => {
    return id.toString(); 
  };
  
export const useDropdown = (genreEvents) => {
    const [selectedValue, setSelectedValue] = useState('');
    const { list, setList } = useListContext();
    const [removedOptions, setRemovedOptions] = useState([]);
    const [options, setOptions] = useState([]); // Initialize the options state

  
    const addToFilter = (e) => {
      const selectedValue = e.target.value;
      setSelectedValue(selectedValue);
  
      const index = options.findIndex((option) => option.name === selectedValue);
  
      if (index !== -1) {
        const updatedOptions = [...options];
        const [removedOption] = updatedOptions.splice(index, 1);
        setOptions(updatedOptions);
        setList([...list, removedOption]);
      }
    };

    
  
    const addToOptions = (removedOption) => {
       
      setList(list.filter((item) => item !== removedOption));
      setOptions([...options, removedOption]);
    };
  
    const resetFilter = (genreEvents) => {
            setSelectedValue('');
            const newOptions = initialOptions(genreEvents).map((option) => ({
              ...option,
              key: generateUniqueKey(option.id),
            }));
            setOptions(newOptions);
            setList([]);
            setRemovedOptions([]);
          };
  
    return { selectedValue, list, options, setOptions, addToFilter, resetFilter, addToOptions }; // Return the options state from the hook
  };

  export default function Dropdown() {
    const [genreEvents, setGenreEvents] = useState([]); // Maintaining a single options state
    const { selectedValue, list, options, setOptions, addToFilter, resetFilter, addToOptions } = useDropdown();
  
    useEffect(() => {
      const fetchGenre = async () => {
        try {
          const response = await fetch(API_GENRE);
          if (!response.ok) {
            throw new Error('Failed to fetch data from the API');
          }
          const genreData = await response.json();
          setGenreEvents(genreData._embedded.classifications);
  
          // Check if genreData is not null or undefined before setting the options state
          if (genreData && genreData._embedded?.classifications) {
            setOptions(initialOptions(genreData._embedded.classifications)); // Set the initial options once the data is fetched
          }
        } catch (error) {
          console.error('Error fetching genres:', error);
        }
        return {genreEvents, initialOptions}
        // No need to return anything here
      };
      fetchGenre();
    }, []); // Empty dependency array to run only once
  
  
    return (
      <>
        <ListProvider>
          <div class="text-center" style={{padding: "10px"}}>
          <select onChange={addToFilter} name={selectedValue} style={{ border: "5px solid purple"}}>
            <option key="default" style={{ padding: '10px' }}>Select options to filter</option>
            {options.map((option) => (
              <option key={option.id} name={option.name}>
                {option.name}
              </option>
            ))}
          </select>
          </div>
          <div className={list.length > 0 ? 'card' : 'none'}>
            <h2> Selected Filters</h2>
            {list.map((item) => (
              <div onClick={() => addToOptions(item)} key={item.id}>
                <Image src='/delete_icon.png' alt='delete list value' width='20' height='20' style={{ margin: '5px' }} />
                {item.name}
              </div>
            ))}
          </div>
        </ListProvider>
      </>
    );
  }