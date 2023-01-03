import './App.css';
import {useState} from "react";
import TodoItem from "./todoItem";

function App() {

    const [tasks, setTasks] = useState([])
    const [value, setValue] = useState('')
    const handleChange = (e) => {
        setValue(e.target.value)
    }
    const getTask = () => {
        const foundItem = tasks.some(el => el.name === value)

        const newTask = {
            name: value,
            id: tasks.length ? tasks[tasks.length -1 ].id + 1 : 0,
            isCompleted: false
        }

        if(!foundItem){
            setTasks([...tasks, newTask])
        }else{
            alert("Already exist!")
        }

        localStorage.setItem("task",JSON.stringify(newTask))
    }
    const deleteTask = (id) => {
        setTasks(tasks.filter((el) => el.id !== id))
    }
    const isChecked = (id) => {
        setTasks(tasks.map(el => el.id === id ? {...el, isCompleted: !el.isCompleted} : el))
    }

  return (
    <div className="container">
      <div className="flex flex-col items-center">

          <div className="relative">
              <input onChange={handleChange} type="text" id="floating_outlined"
                     className="block m-2 px-2.5 pb-3 pt-4 w-[200px] text-sm text-gray-900 bg-yellow-700 rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                     placeholder=" "/>
              <label htmlFor="floating_outlined"
                     className="absolute mx-2 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-transparent px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                  Create your plans..</label>
          </div>


              <button onClick={getTask}  type="button"
                  className="focus:outline-none text-white my-2 bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
              ADD
          </button>


         <div className="text-center my-10 flex items-center justify-between">
            <div>
                <p className='dark:text-white m-5 font-serif text-xl font-medium text-gray-900'>Plans:</p>
                <ul className="w-[400px] font-serif text-xl font-medium text-gray-900  rounded-lg dark:text-white mx-20">
                    {
                        tasks.filter(el => !el.isCompleted).map(el => <TodoItem
                            el={el}
                            deleteTask={deleteTask}
                            isChecked={isChecked}
                        setTasks ={setTasks}
                        />)
                    }
                </ul>
            </div>


            <div>
                <p className='dark:text-white m-5 font-serif text-xl font-medium text-gray-900'>Accomplished:</p>
                <ul className="w-[400px] font-serif text-xl font-medium text-gray-900 border-y-green-100 rounded-lg dark:text-white mx-20">
                    {
                        tasks.filter(el => el.isCompleted).map(el => <TodoItem
                        el={el}
                        deleteTask={deleteTask}
                        isChecked={isChecked}
                        setTasks ={setTasks}/>)
                    }
                </ul>
            </div>
         </div>
      </div>
    </div>);
}

export default App;
