import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import DirectoryItem from './DirectoryItem';

function Directory(props) {
    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems(props.items);
    }, [props.items]);

    return (
        <div className="w-full md:w-1/3 p-5">
            <div className="flex justify-between py-3">
                <Button label="New" icon="pi pi-plus" onClick={props.onCreate} />
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText type="text" placeholder="Search" />
                </span>
            </div>
            <ul>
                {items.map((item, index) => 
                <li key={index}><DirectoryItem item={item} onItemClick={props.onItemClick} /></li>
                )}
            </ul>
        </div>
    );
}

export default Directory;