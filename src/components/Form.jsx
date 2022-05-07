import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import Label from './Label';
import TodoItem from './TodoItem';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';

const defaultItem = {
    key: Math.random().toString(36).substring(2, 7),
    title: '',
    items: [],
    stamp: (new Date()).toString()
}

function Form(props) {
    const [item, setItem] = useState(defaultItem);
    const activeTodo = useSelector(state => state.activeTodo.value);
    const toast = useRef();

    useEffect(() => {
        if (activeTodo) {
            setItem(_.cloneDeep(activeTodo));
        }
        else {
            defaultItem.key = Math.random().toString(36).substring(2, 7);
            defaultItem.stamp = (new Date()).toString();
            setItem(defaultItem);
        }
    }, [activeTodo]);

    const handleAddTodoItem = () => {
        const nItem = _.cloneDeep(item);
        let { items } = nItem;
        items.push({key: Math.random().toString(36).substring(2, 7), text: '', checked: false, edit: true});
        setItem(nItem);
    }

    const handleUpdateTodoItem = (todo) => {
        const nItem = _.cloneDeep(item);
        const { items } = nItem;

        for (let i = 0; i < items.length; i++) {
            const { key } = items[i];
            if (key === todo.key) {
                items[i] = todo;
                setItem(nItem);
                break;
            }
        }
    }

    const handleRemoveTodoItem = (todo) => {
        const nItem = _.cloneDeep(item);
        const { items } = nItem;

        for (let i = 0; i < items.length; i++) {
            const { key } = items[i];
            if (key === todo.key) {
                items.splice(i, 1);
                setItem(nItem);
                break;
            }
        }
    }

    const handleSave = () => {
        props.onSave(_.cloneDeep(item));
        toast.current.show({ sticky: true, severity: 'success', className: '!border-none', contentClassName: '!border-none', content: (
            <div className="flex flex-col w-full">
                <div className="flex">
                    <div className="p-5">
                        <i className="pi pi-check-circle" style={{fontSize: '3rem'}}></i>
                    </div>
                    <div className="flex-grow flex flex-col justify-center px-3 py-5">
                        <h4>TODO list has been saved.</h4>
                    </div>
                </div>
                <div className="text-right pt-5">
                    <Button className="p-button-success" label="OK" onClick={onConfirm}></Button>
                </div>
            </div>
        )});
    }

    const handleDiscard = () => {
        toast.current.show({ sticky: true, severity: 'warn', className: '!border-none', contentClassName: '!border-none', content: (
            <div className="flex flex-col w-full">
                <div className="flex">
                    <div className="p-5">
                        <i className="pi pi-exclamation-triangle" style={{fontSize: '3rem'}}></i>
                    </div>
                    <div className="flex-grow flex flex-col justify-center px-3 py-5">
                        <h4>Are you sure you want to discard this list?</h4>
                        <p>Proceed to confirm</p>
                    </div>
                </div>
                <div className="text-right pt-5">
                    <span className="px-1">
                        <Button className="p-button-success" label="Yes" onClick={onConfirmDiscard}></Button>
                    </span>
                    <span className="px-1">
                        <Button className="p-button-secondary" label="No" onClick={onRejectDiscard}></Button>
                    </span>
                </div>
            </div>
        )});
    }

    const onConfirm = () => {
        toast.current.clear();
    }

    const onConfirmDiscard = () => {
        props.onDiscard(item);
        toast.current.clear();
    }

    const onRejectDiscard = () => {
        toast.current.clear();
    }

    return (
        <div className="w-full md:w-2/3 p-5 flex flex-col overflow-hidden">
            <div className="p-5">
                <Label text="Title" className="text-2xl" />
                <InputText type="text" value={item.title} className="w-full p-inputtext-lg" onChange={(ev) => setItem({ ...item, title: ev.target.value })} />
            </div>
            <div className="flex-grow overflow-hidden p-3 flex flex-col">
                <div className="p-2">
                    <Label text="TODO List" className="text-2xl" />
                    <div className="mt-2">
                        <Button label="Add" icon="pi pi-plus" onClick={handleAddTodoItem} />
                    </div>
                </div>
                <div className="flex-grow overflow-auto p-2">
                    <ul>
                        {item.items.map((item, index) => 
                        <li key={index} className="py-1">
                            <TodoItem item={item} onChange={handleUpdateTodoItem} onRemove={handleRemoveTodoItem} />
                        </li>
                        )}
                    </ul>
                </div>
            </div>
            <div className="text-right p-5">
                <Button label="Discard" icon="pi pi-trash" className="p-button-text p-button-danger" onClick={handleDiscard} />
                <Button label="Save" icon="pi pi-save" onClick={handleSave} />
            </div>
            <Toast ref={toast} position="center" />
        </div>
    )
}

export default Form;