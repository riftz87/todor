import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import Directory from './Directory';
import Form from './Form';
import { setActiveTodo } from '../features/activeTodo/activeTodoSlice';

function Workspace() {
    const [items, setItems] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const activeTodo = useSelector(state => state.activeTodo.value);
    const dispatch = useDispatch();

    const handleItemClick = () => {
        setShowForm(true);
    }

    const handleCreate = () => {
        dispatch(setActiveTodo(null));
        setShowForm(true);
    }

    const handleSave = (item) => {
        let nItems = _.cloneDeep(items);

        if (activeTodo) {
            for (let i = 0; i < nItems.length; i++) {
                const { key } = nItems[i];
                if (key === item.key) {
                    nItems[i] = item;
                    break;
                }
            }
        }
        else {
            nItems.push(item);
        }

        setItems(nItems);
        dispatch(setActiveTodo(item));
    }

    const handleDiscard = (item) => {
        const nItems = _.cloneDeep(items);
        
        for (let i = 0; i < nItems.length; i++) {
            const { key } = nItems[i];
            if (key === item.key) {
                nItems.splice(i, 1);
                setItems(nItems);
                setShowForm(false);
                break;
            }
        }
    }

    return (
        <div className="flex-grow flex overflow-hidden">
            <Directory items={items} onCreate={handleCreate} onItemClick={handleItemClick} />
            {showForm && <Form onSave={handleSave} onDiscard={handleDiscard} />}
        </div>
    );
}

export default Workspace;