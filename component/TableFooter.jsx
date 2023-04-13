import React, { useEffect } from "react";
import myordersStyles from "../styles/Myorders.module.css"

const TableFooter = ({ range, setPage, page, slice }) => {
  useEffect(() => {
    if (slice.length < 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [slice, page, setPage]);

  function checkLimit(buttonType, page, range){
    
    let maxIndex = range.length;
    console.log(maxIndex);
    
    if(page != 1 && buttonType == "previous"){
        setPage(page - 1);
    }
    else if(page < maxIndex && buttonType == "next"){
        setPage(page +1);
    }

    console.log("currentPage "+page)
    
  }

  return (
    <div>
        <nav>
        <ul className={myordersStyles.tablePaginationContainer}>
            <li>
            <button onClick={() => checkLimit("previous",page,range)} className={myordersStyles.tablePaginationPrevious}>Previous</button>
            </li>
            {range.map((el, index) => (
                <li>
                <button key={index} onClick={() => setPage(el)} className={`${page != el ? myordersStyles.tablePaginationNumber : myordersStyles.tablePaginationNumberCurrent}`}>{el}</button>
                </li>                 
            ))}
            <li>
            <button onClick={() => checkLimit("next",page,range)} className={myordersStyles.tablePaginationNext}>Next</button>
            </li>
        </ul>
        </nav>

    </div>
  );
};

export default TableFooter;