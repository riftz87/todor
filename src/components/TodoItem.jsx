import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

function TodoItem(props) {
    const [item, setItem] = useState({});
    const [bText, setBText] = useState(null);

    useEffect(() => {
        setItem(props.item);
    }, [props.item]);

    const handleEdit = () => {
        const { text } = item;
        setBText(text);
        setItem({ ...item, edit: true });
    }

    const handleCancelEdit = () => {
        setItem({ ...item, text: bText, edit: false });
    }

    const handleConfirmEdit = () => {
        saveItem();
    }

    const handleInput = (ev) => {
        const { key } = ev;
        if (key === 'Enter') {
            saveItem();
        }
    }

    const saveItem = () => {
        const nItem = {...item, edit: false};
        setItem(nItem);
        props.onChange(nItem);
    }

    const handleRemove = () => {
        props.onRemove(item);
    }

    return (
        <div>
            {item.edit
            ? <div className="flex items-center">
                <InputText autoFocus type="text" value={item.text} className="flex-grow" onChange={(ev) => setItem({ ...item, text: ev.target.value })} onKeyPress={handleInput} />
                <div className="px-1">
                    <span className="px-1">
                        <Button icon="pi pi-times" onClick={handleCancelEdit} />
                    </span>
                    <span className="px-1">
                        <Button icon="pi pi-check" onClick={handleConfirmEdit} />
                    </span>
                </div>
            </div>
            : <div className="flex items-center">
                <Button icon={item.checked ? 'pi pi-check' : 'pi'} className={['p-button-sm p-button-rounded', item.checked ? 'p-button-success' : 'p-button-outlined']} onClick={() => setItem({ ...item, checked: !item.checked })} />
                <div className="flex-grow px-5 text-xl">{ item.text }</div>
                <Button icon="pi pi-trash" className="p-button-text p-button-danger" onClick={handleRemove} />
                <Button icon="pi pi-pencil" className="p-button-text" onClick={handleEdit} />
            </div>}
        </div>
    );
}

export default TodoItem;