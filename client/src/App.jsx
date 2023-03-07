// import { EthProvider } from "./contexts/EthContext";
import Web3 from "web3";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import Todo from "./contracts/Todo.json";
import "./styles.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const [loading, setLoading] = useState(false);
  const [taskCount, setTaskCount] = useState(0);
  const [connected, setConnected] = useState(false);
  const provider = Web3.givenProvider || "http://localhost:7545";
  const web3 = new Web3(provider);
  const contractAddress = "0x0c410E9E8E36902e81Ce2AFEC09D41dbb420c50e";

  const todoContract = useMemo(() => {
    return new web3.eth.Contract(Todo.abi, contractAddress);
  }, [web3.eth.Contract, contractAddress]);

  const loadTasks = useCallback(async () => {
    setLoading(true);
    const tasks = [];
    for (let i = 0; i < taskCount; i++) {
      try {
        const task = await todoContract.methods
          .getWork(i)
          .call({ from: (await web3.eth.getAccounts())[0] });
        if (task[i]!== ''){ 
        tasks.push(task);
        }
      } catch (error) {
        console.error(error);
      }
      
    }
    setTasks(tasks);
    setLoading(false);
  }, [taskCount, todoContract, web3.eth]);

  // const loadTaskCount = useCallback(async () => {
  //   try{
  //   const count = await todoContract.methods
  //     .geWorkCount()
  //     .call({ from: (await web3.eth.getAccounts())[0] });
  //   setTaskCount(count)}
  //   catch (error) {
  //     console.error(error);
  //   }
  // }, [todoContract, web3.eth]);

  const loadTaskCount = useCallback(async () => {
  try {
    const accounts = await web3.eth.getAccounts();
    const count = await todoContract.methods.geWorkCount().call({ from: accounts[0] });
    setTaskCount(count);
  } catch (error) {
    console.error(error);
    // optionally, you can set the task count to a default value or null if an error occurs
  }
}, [setTaskCount, todoContract, web3.eth]);

const connectWallet =  (() => {
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then(() => setConnected(true))
        .catch((error) => console.log(error));
    }else {
    console.error('MetaMask not detected. Please install MetaMask and try again.');
  }
  });

  useEffect(() => {
    if (connected) {
      loadTaskCount();
    }
  }, [connected, taskCount, loadTaskCount]);

  useEffect(() => {
    if (connected) {
      
      loadTasks();
    }
  }, [taskCount, connected]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    if(connected){
    try {
      await todoContract.methods
        .createWork(inputValue)
        .send({ from: (await web3.eth.getAccounts())[0] });
      setInputValue("");
      await loadTaskCount();
    } catch (error) {
      console.error(error);
    }
    console.log("clicked");
    setLoading(false);
  }else{
    alert("you need to connect to metamask on the goerli testnet first")
    setLoading(false);
  }
  };

  const handleDelete = async (index) => {
    setLoading(true);
    await todoContract.methods
      .deleteWork(index)
      .send({ from: (await web3.eth.getAccounts())[0] });
      
    await loadTaskCount();
    await loadTasks();
    setLoading(false);
  };

  const handleStatusChange = async (index, status) => {
    setLoading(true);
    await todoContract.methods
      .changeStatus(index, status)
      .send({ from: (await web3.eth.getAccounts())[0] });
    await loadTaskCount();
    setLoading(false);
  };
  return (
    <div className="container">
      <div className="">
        <div className="title">
          <h1 className="title-text">TaskMesh</h1>
          {!connected ? (
            <button
              className="title-btn"
              onClick={connectWallet}
              // onClick={() =>
              //   window.ethereum
              //     .request({ method: "eth_requestAccounts" })
              //     .then(() => setConnected(true))
              // }
              >
              Connect wallet
            </button>
          ) : (
            <button className="title-btn">Connected</button>
          )}
        </div>
        <h3 className="">
          Get more done with TaskMesh. Manage, capture, and set goals from
          anywhere, at any time. you have complete control over your data and
          don't need a third-party service to manage it. With TaskMesh, you
          don't need to worry about your data being sold or used for other
          purposes without your consent.
        </h3>
        <h3 className="task" >
          You currently have {taskCount} tasks
        </h3>
      </div>
      <div className="">
        <div className="">
          <div className="">
            <div className="add-task">
              <h5 className="task-title">Create a new task:</h5>
              <form onSubmit={handleSubmit} className="create-task">
                <input
                  className="input"
                  type="text"
                  placeholder="Create a new to-do"
                  value={inputValue}
                  onChange={(event) => setInputValue(event.target.value)}
                />
                <button type="submit" className="submit-btn">
                  Add task
                </button>
              </form>
            </div>
          </div>

          {/* reload page to see effects */}
          {tasks.map((task, index) => {
            return (
              <div key={index} className="list">
                <div className="checked">
                  {task.work ? (
                    <input
                      type="checkbox"
                      checked={task.isCompleted}
                      onChange={(event) =>
                        handleStatusChange(index, event.target.checked)
                      }
                    />
                  ) : null}
                  <ul className="">
                    <li>{task.work}</li>
                  </ul>
                </div>
                {task.work ? (
                  <button
                    onClick={() => handleDelete(index)}
                    className="delete">
                    Delete
                  </button>
                ) : null}
              </div>
            );
          })}
        </div>
        {loading && <p>Loading...</p>}
      </div>
    </div>
  );
}

export default App;
