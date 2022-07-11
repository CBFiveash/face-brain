import React from "react";

<<<<<<< HEAD
const Rank = ({ name, entries }) => {
    return (
      <div>
        <div className='white f3'>
          {`${name}, your current entry count is...`}
=======
const  Rank = ({ name, entries }) => {
    return (
        <div>
            <div className="white f3">
                {`${name}, your current entry count is... `}
            </div>
            <div className="white f1">
                { entries }
            </div>
>>>>>>> 399ec4ac3210389ccbc42233309c95ff7f30f146
        </div>
        <div className='white f1'>
          {entries}
        </div>
      </div>
    );
  }
export default Rank;