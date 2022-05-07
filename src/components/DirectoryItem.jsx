import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { setActiveTodo } from '../features/activeTodo/activeTodoSlice';

function DirectoryItem(props) {
    const [item, setItem] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        setItem(props.item);
    }, [props.item]);

    const handleItemClick = () => {
        props.onItemClick();
        dispatch(setActiveTodo(item));
    }

    return (
        <div className="flex items-center my-1 bg-blue-50 hover:bg-blue-100 cursor-pointer p-5 rounded-lg" onClick={handleItemClick}>
            <Icon icon={faClipboardList} className="text-3xl text-blue-500" />
            <div className="px-5 text-xl">
                <div>{ item.title }</div>
                <div className="text-xs opacity-75">{ item.stamp }</div>
            </div>
        </div>
    );
}

export default DirectoryItem;