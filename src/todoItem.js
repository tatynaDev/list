import React, {useState} from 'react';
import {BsCheck, BsFillPencilFill} from "react-icons/bs";
import {RiDeleteBin6Line} from "react-icons/ri";

const TodoItem = ({el, isChecked, deleteTask, setTasks}) => {
    const [edit, setEdit] = useState(false)
    const [newTitle, setNewTitle] = useState(el.name)

    const openInput = () => {
        setEdit(true)
    }

    const closeInput = (id) => {
        setEdit(false)
        setTasks(state => state.map(el => el.id === id ? {...el, name: newTitle} : el))
    }
    return (
            <li className="py-2 px-4 rounded-t-lg border-b border-gray-200 dark:border-gray-600 flex items-center justify-between">
                             <span >
                                 <input checked={el.isCompleted} onClick={() => isChecked(el.id)} type="checkbox" className='mx-2 p-1'/>

                                 {
                                     edit ? <input onKeyDown={(e) => {
                                         if (e.key === "Enter") closeInput(el.id)
                                     }
                                         } onChange={(e) =>{
                                         setNewTitle(e.target.value)
                                     }
                                         } className='text-white px-1 bottom-0 outline-0 underline outline-1' type="text" value={newTitle}/>
                                         : <span>{el.name}</span>
                                 }

                             </span>

                <div>
                    <button onClick={() => edit ? closeInput(el.id) : openInput()} className='w-[20px] mx-10'>
                        {
                            edit ? <BsCheck style={{color: "green", fontSize:"25px", outline:"1px solid green"}}/> : <BsFillPencilFill/>
                        }
                        </button>
                    <button onClick={() => deleteTask(el.id)} className='w-[20px]'><RiDeleteBin6Line/></button>
                </div>
            </li>
    );
};

export default TodoItem