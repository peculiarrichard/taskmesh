// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

contract Todo {
    struct Work{
        string work;
        bool isCompleted;

    }

    mapping (address => Work[]) private Users;
   
    // function to add or create a task
    function createWork(string calldata _work) external{
        Users[msg.sender].push(Work ({
            work:_work,
            isCompleted: false
            
        }));
    }

// function to get task details
    function getWork (uint _workNumber) external view returns (Work memory){
        Work storage work = Users[msg.sender][_workNumber];
        return work;
    }

// function to change status of a task
    function changeStatus(uint256 _workNumber,bool _status) external{
        Users[msg.sender][_workNumber].isCompleted = _status;
   }

// function to delete a task
   function deleteWork(uint256 _workNumber) external{
       delete Users[msg.sender][_workNumber];
   }

// function to know how many tasks users have created
   function geWorkCount() external view returns (uint256){
    return Users[msg.sender].length;
    } 
}